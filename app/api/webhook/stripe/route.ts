import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Redis } from '@upstash/redis'
import productsJson from '@/scripts/stripe_products.json'
import { sendLicenseEmail } from '@/lib/license-email'

export const runtime = 'nodejs'

type ProductEntry = {
  label: string
  edition: string
  tier: string
  keys_to_send: number
  payment_link?: string
}

const PRODUCTS = (productsJson as { products: Record<string, ProductEntry> })
  .products

const redis = Redis.fromEnv()

function listName(edition: string, tier: string): string {
  return `keys:${edition.toLowerCase()}:${tier.toLowerCase()}`
}

async function popKeys(list: string, n: number): Promise<string[]> {
  const keys: string[] = []
  for (let i = 0; i < n; i++) {
    const k = await redis.rpop<string>(list)
    if (!k) break
    keys.push(k)
  }
  return keys
}

async function returnKeys(list: string, keys: string[]): Promise<void> {
  for (const k of keys) await redis.lpush(list, k)
}

async function alertAdmin(subject: string, body: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ADMIN_ALERT_EMAIL
  if (!apiKey || !to) {
    console.error(`[stripe-webhook] ADMIN ALERT (no mail creds): ${subject}\n${body}`)
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DubCheck Alerts <alerts@robinbusse.dev>',
      to,
      subject: `[DubCheck] ${subject}`,
      text: body,
    }),
  }).catch(err => console.error('[stripe-webhook] alert failed', err))
}

export async function POST(req: NextRequest) {
  const liveSecret = process.env.STRIPE_WEBHOOK_SECRET
  const testSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST
  const liveKey = process.env.STRIPE_SECRET_KEY
  const testKey = process.env.STRIPE_SECRET_KEY_TEST

  if (!liveSecret && !testSecret) {
    console.error('[stripe-webhook] no signing secret configured')
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const raw = await req.text()

  const secrets = [liveSecret, testSecret].filter(Boolean) as string[]
  let event: Stripe.Event | null = null
  let verifyError: unknown = null
  const bootstrapStripe = new Stripe(liveKey || testKey || 'placeholder')
  for (const s of secrets) {
    try {
      event = bootstrapStripe.webhooks.constructEvent(raw, sig, s)
      break
    } catch (err) {
      verifyError = err
    }
  }
  if (!event) {
    console.error('[stripe-webhook] signature verify failed', verifyError)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const stripeKey = event.livemode ? liveKey : testKey || liveKey
  if (!stripeKey) {
    console.error(`[stripe-webhook] no secret key for livemode=${event.livemode}`)
    return NextResponse.json({ error: 'Server not configured for this mode' }, { status: 500 })
  }
  const stripe = new Stripe(stripeKey)

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const email =
    session.customer_details?.email ||
    session.customer_email ||
    (typeof session.customer === 'string' || !session.customer || session.customer.deleted
      ? undefined
      : session.customer.email ?? undefined)

  if (!email) {
    await alertAdmin(
      'Purchase without email',
      `Session ${session.id} completed but no email attached. Amount: ${session.amount_total}`
    )
    return NextResponse.json({ received: true, warning: 'no email' })
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 10,
    expand: ['data.price'],
  })

  const salesLog: Array<{ price_id: string; keys: string[]; label: string }> = []

  for (const item of lineItems.data) {
    const priceId = item.price?.id
    if (!priceId) continue

    const alreadyFulfilled = await redis.exists(`sold:${session.id}:${item.id}`)
    if (alreadyFulfilled) continue

    const product = PRODUCTS[priceId]
    if (!product) {
      await alertAdmin(
        'Unknown price_id in checkout',
        `Session ${session.id}, price ${priceId}. Not in stripe_products.json. Manual fulfillment needed.`
      )
      continue
    }

    const qty = item.quantity ?? 1
    const totalKeys = product.keys_to_send * qty
    const list = listName(product.edition, product.tier)

    const keys = await popKeys(list, totalKeys)

    if (keys.length < totalKeys) {
      await returnKeys(list, keys)
      await alertAdmin(
        `Key inventory empty: ${list}`,
        `Session ${session.id} for ${email} needed ${totalKeys} keys from ${list}, only ${keys.length} available. Payment succeeded; keys returned to pool. Restock and send manually.`
      )
      continue
    }

    try {
      await sendLicenseEmail({
        to: email,
        keys,
        label: product.label,
        edition: product.edition,
        tier: product.tier,
      })
    } catch (err) {
      await returnKeys(list, keys)
      await alertAdmin(
        'License email send failed',
        `Session ${session.id} for ${email}, product ${product.label}. Keys returned to pool. Error: ${err instanceof Error ? err.message : String(err)}`
      )
      continue
    }

    await redis.hset(`sold:${session.id}:${item.id}`, {
      email,
      price_id: priceId,
      label: product.label,
      keys: keys.join('|'),
      at: new Date().toISOString(),
    })

    salesLog.push({ price_id: priceId, keys, label: product.label })
  }

  return NextResponse.json({ received: true, sales: salesLog.length })
}
