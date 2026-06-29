'use client'

import { useEffect, useState, FormEvent } from 'react'

type Stats = Record<string, { total: number; days: Record<string, number> }>

const EVENT_LABELS: Record<string, string> = {
  download_intent: 'Intent (Button-Klick)',
  download_trial: 'Trial-Download',
  download_paid: 'Paid-Download',
}

export default function StatsPage() {
  const [key, setKey] = useState('')
  const [days, setDays] = useState(14)
  const [data, setData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('dc-stats-key')
    if (saved) setKey(saved)
  }, [])

  async function load(k: string, d: number) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/stats?key=${encodeURIComponent(k)}&days=${d}`)
      if (!res.ok) throw new Error(res.status === 401 ? 'Wrong key' : `HTTP ${res.status}`)
      const json = (await res.json()) as Stats
      setData(json)
      localStorage.setItem('dc-stats-key', k)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
      setData(null)
    }
    setLoading(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    load(key, days)
  }

  const events = data ? Object.keys(data) : []
  const allDays = data && events[0] ? Object.keys(data[events[0]].days) : []

  const intentTotal = data?.download_intent?.total ?? 0
  const trialTotal = data?.download_trial?.total ?? 0
  const paidTotal = data?.download_paid?.total ?? 0
  const conversion = intentTotal > 0 ? ((trialTotal / intentTotal) * 100).toFixed(1) : '—'

  return (
    <div className="min-h-screen bg-dc-bg text-dc-ink p-6 md:p-12">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-[28px] font-bold mb-2">Download Stats</h1>
        <p className="text-dc-ink2 text-[14px] mb-8">
          Anonymous counters from /api/event. Refresh anytime.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-8 items-end">
          <div className="flex-1 min-w-[260px]">
            <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-[#FFB07A] mb-1.5">
              Stats secret
            </label>
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="paste STATS_SECRET"
              className="w-full px-3 py-2.5 rounded-[8px] text-[14px] bg-[#0F0F12] border border-white/[0.08] outline-none focus:border-[rgba(255,122,26,0.4)]"
            />
          </div>
          <div className="w-[100px]">
            <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-[#FFB07A] mb-1.5">
              Days
            </label>
            <input
              type="number"
              min={1}
              max={90}
              value={days}
              onChange={e => setDays(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-[8px] text-[14px] bg-[#0F0F12] border border-white/[0.08] outline-none focus:border-[rgba(255,122,26,0.4)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !key}
            className="px-5 py-2.5 rounded-[8px] text-[14px] font-semibold bg-dc-orange text-[#1A0A00] hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load'}
          </button>
        </form>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-[8px] bg-[rgba(255,80,80,0.08)] border border-[rgba(255,80,80,0.3)] text-[#FF8080] text-[14px]">
            {error}
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <Stat label="Intent total" value={intentTotal} />
              <Stat label="Trial DL total" value={trialTotal} />
              <Stat label="Paid DL total" value={paidTotal} />
              <Stat label="Intent → Trial" value={`${conversion}%`} />
            </div>

            <div className="rounded-[10px] border border-white/[0.08] overflow-hidden">
              <table className="w-full text-[13px]">
                <thead className="bg-white/[0.03]">
                  <tr>
                    <th className="text-left px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-[#FFB07A]">
                      Day
                    </th>
                    {events.map(ev => (
                      <th
                        key={ev}
                        className="text-right px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-[#FFB07A]"
                      >
                        {EVENT_LABELS[ev] ?? ev}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allDays.map(day => (
                    <tr key={day} className="border-t border-white/[0.05]">
                      <td className="px-4 py-2.5 font-mono text-dc-ink2">{day}</td>
                      {events.map(ev => {
                        const n = data[ev].days[day] ?? 0
                        return (
                          <td
                            key={ev}
                            className={`px-4 py-2.5 text-right font-mono ${
                              n > 0 ? 'text-dc-ink' : 'text-dc-ink3'
                            }`}
                          >
                            {n}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#FFB07A] mb-1.5">
        {label}
      </div>
      <div className="text-[24px] font-semibold tracking-[-0.02em]">{value}</div>
    </div>
  )
}
