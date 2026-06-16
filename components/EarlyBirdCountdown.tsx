'use client'

import { useEffect, useState } from 'react'

const DEADLINE = new Date('2026-07-31T23:59:59+02:00').getTime()

function diff(now: number) {
  const ms = Math.max(0, DEADLINE - now)
  const d = Math.floor(ms / 86_400_000)
  const h = Math.floor((ms % 86_400_000) / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  return { d, h, m, s, expired: ms === 0 }
}

function Cell({ value, label }: { value: number; label: string }) {
  const v = value.toString().padStart(2, '0')
  return (
    <div className="flex flex-col items-center min-w-[58px]">
      <span className="font-mono text-[26px] md:text-[30px] leading-none font-semibold text-dc-ink tabular-nums">
        {v}
      </span>
      <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-dc-ink3 mt-[6px]">
        {label}
      </span>
    </div>
  )
}

export default function EarlyBirdCountdown({ compact = false }: { compact?: boolean }) {
  // Start with null so SSR and first client paint render identical placeholder
  // (a hydration mismatch otherwise - Date.now differs between server render and client hydrate).
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null)

  useEffect(() => {
    setT(diff(Date.now()))
    const id = setInterval(() => setT(diff(Date.now())), 1000)
    return () => clearInterval(id)
  }, [])

  if (t?.expired) return null

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 border border-white/[0.08] rounded-[10px] ${
        compact ? 'px-4 py-3' : 'px-6 py-5'
      }`}
      style={{ background: 'rgba(255,122,26,0.04)' }}
    >
      <div className="flex items-center gap-[10px]">
        <span className="led-orange" />
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dc-orange">
          Early Bird ends 31 Jul 2026
        </span>
      </div>
      <div className="flex items-start gap-3 md:gap-5">
        <Cell value={t?.d ?? 0} label="Days" />
        <span className="font-mono text-[22px] text-dc-ink3 leading-none mt-[2px]">:</span>
        <Cell value={t?.h ?? 0} label="Hrs" />
        <span className="font-mono text-[22px] text-dc-ink3 leading-none mt-[2px]">:</span>
        <Cell value={t?.m ?? 0} label="Min" />
        <span className="font-mono text-[22px] text-dc-ink3 leading-none mt-[2px]">:</span>
        <Cell value={t?.s ?? 0} label="Sec" />
      </div>
    </div>
  )
}
