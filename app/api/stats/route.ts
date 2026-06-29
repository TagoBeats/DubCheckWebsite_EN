import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const EVENTS = ['download_intent', 'download_trial', 'download_paid'] as const

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const secret = process.env.STATS_SECRET

  if (!secret || key !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const days = Number(req.nextUrl.searchParams.get('days') ?? 14)
  const today = new Date()
  const dayKeys: string[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setUTCDate(today.getUTCDate() - i)
    dayKeys.push(d.toISOString().slice(0, 10))
  }

  const result: Record<string, { total: number; days: Record<string, number> }> = {}

  for (const event of EVENTS) {
    const total = (await redis.get<number>(`event:${event}:total`)) ?? 0
    const dayValues = await Promise.all(
      dayKeys.map(d => redis.get<number>(`event:${event}:day:${d}`))
    )
    const days: Record<string, number> = {}
    dayKeys.forEach((d, i) => {
      days[d] = dayValues[i] ?? 0
    })
    result[event] = { total, days }
  }

  return NextResponse.json(result)
}
