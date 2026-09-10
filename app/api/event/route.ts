import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// Every name a client may send. Anything else is dropped, so a name that the
// site pings but that is missing here counts silently nothing.
const ALLOWED_EVENTS = new Set([
  'download_intent',      // download button clicked
  'lead_download_page',   // email opt-in after the download started
  'download_trial',       // legacy, from the trial/paid split before 1.1.0
  'download_paid',        // legacy, same era
])

export async function POST(req: NextRequest) {
  let event: string | undefined
  try {
    const body = await req.json()
    event = body?.event
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!event || !ALLOWED_EVENTS.has(event)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const day = new Date().toISOString().slice(0, 10)

  await Promise.all([
    redis.incr(`event:${event}:total`),
    redis.incr(`event:${event}:day:${day}`),
  ])

  return NextResponse.json({ ok: true })
}
