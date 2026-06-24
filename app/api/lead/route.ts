import { NextRequest, NextResponse } from 'next/server'

const RESEND_API = 'https://api.resend.com'

export async function POST(req: NextRequest) {
  let email: string
  let source: string

  try {
    const body = await req.json()
    email = String(body.email || '').trim().toLowerCase()
    source = String(body.source || 'unknown')
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
    return NextResponse.json({ ok: true, stored: 'log-only' })
  }

  try {
    const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      // Treat "already exists" (409) as success — don't penalize repeat downloaders.
      if (res.status === 409 || /already/i.test(data?.message || '')) {
        return NextResponse.json({ ok: true, stored: 'already_existed' })
      }
      console.error('[lead] Resend error', res.status, data)
      return NextResponse.json({ error: 'Could not save contact' }, { status: 502 })
    }

    return NextResponse.json({ ok: true, stored: 'resend' })
  } catch (err) {
    console.error('[lead] Resend request failed', err)
    return NextResponse.json({ error: 'Network error' }, { status: 502 })
  }
}
