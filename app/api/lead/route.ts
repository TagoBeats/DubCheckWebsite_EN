import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'nodejs'

const RESEND_API = 'https://api.resend.com'

const redis = Redis.fromEnv()

// The endpoint is public, so the source cannot be trusted. Anything the site
// does not send itself is filed as "unknown" instead of ending up in a key.
const KNOWN_SOURCES = new Set(['download_page'])

function normalizeSource(raw: string): string {
  const s = raw.trim().toLowerCase()
  return KNOWN_SOURCES.has(s) ? s : 'unknown'
}

/**
 * The source this address was first seen with, or null if it is new. On a Redis
 * failure it reads as new, so the current source is used rather than none.
 */
async function firstSource(email: string): Promise<string | null> {
  try {
    return await redis.hget<string>(`lead:${email}`, 'source')
  } catch (err) {
    console.error('[lead] Upstash read failed', err)
    return null
  }
}

/**
 * Records where a contact came from. Resend has no custom fields, so the source
 * doubles as last_name to stay visible in the dashboard; Upstash keeps the full
 * record with timestamps. Never throws — a bookkeeping miss must not cost a lead.
 */
async function recordSource(email: string, source: string, isNew: boolean) {
  try {
    const now = new Date().toISOString()
    const key = `lead:${email}`

    if (isNew) {
      await redis.hset(key, { email, source, first_seen: now, last_seen: now, hits: 1 })
      await redis.sadd('leads', email)
      await redis.incr(`lead:source:${source}:total`)
    } else {
      // Keep the first source: that is the one that actually won the contact.
      await redis.hset(key, { last_seen: now })
      await redis.hincrby(key, 'hits', 1)
    }
  } catch (err) {
    console.error('[lead] Upstash write failed', err)
  }
}

export async function POST(req: NextRequest) {
  let email: string
  let source: string

  try {
    const body = await req.json()
    email = String(body.email || '').trim().toLowerCase()
    source = normalizeSource(String(body.source || ''))
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  // No Resend creds yet → log and accept so local dev still works.
  if (!apiKey || !audienceId) {
    console.log(`[lead] (no Resend creds) ${email} · source=${source} · ${new Date().toISOString()}`)
    return NextResponse.json({ ok: true, stored: 'log-only', source })
  }

  // Resend upserts on POST instead of rejecting a known address, and an omitted
  // field is cleared, not kept. So the stored first source has to be sent along
  // on every repeat: that is the source that actually won the contact.
  const known = await firstSource(email)
  const isNew = known === null
  const contact = { email, unsubscribed: false, last_name: known ?? source }

  try {
    const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      // Defensive: older accounts answered 409 instead of upserting.
      if (res.status === 409 || /already/i.test(data?.message || '')) {
        await recordSource(email, source, isNew)
        return NextResponse.json({ ok: true, stored: 'already_existed', source })
      }
      console.error('[lead] Resend error', res.status, data)
      return NextResponse.json({ error: 'Could not save contact' }, { status: 502 })
    }

    await recordSource(email, source, isNew)
    return NextResponse.json({ ok: true, stored: 'resend', source })
  } catch (err) {
    console.error('[lead] Resend request failed', err)
    return NextResponse.json({ error: 'Network error' }, { status: 502 })
  }
}
