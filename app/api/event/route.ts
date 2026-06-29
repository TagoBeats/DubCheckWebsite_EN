import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const ALLOWED_EVENTS = new Set([
  'download_intent',
  'download_trial',
  'download_paid',
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
