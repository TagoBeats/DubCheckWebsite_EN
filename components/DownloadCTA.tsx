'use client'

import { useState, FormEvent } from 'react'

function pingEvent(event: string) {
  fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {})
}

interface Props {
  downloadUrl: string
  version: string
}

/**
 * The download is never gated. The email opt-in appears after the click, when
 * the installer is already on its way — the moment where asking costs nothing.
 */
export default function DownloadCTA({ downloadUrl, version }: Props) {
  const [downloaded, setDownloaded] = useState(false)
  const [stage, setStage] = useState<'idle' | 'sending' | 'done'>('idle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="w-full max-w-[520px] mb-12 flex flex-col items-center gap-6">
      <a
        href={downloadUrl}
        onClick={() => { pingEvent('download_intent'); setDownloaded(true) }}
        className="group inline-flex items-center gap-[14px] px-9 py-[18px] rounded-[11px] transition-all duration-150 hover:brightness-110"
        style={{
          background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
          color: '#1A0A00',
          boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 14px 36px -10px rgba(255,122,26,0.6)',
        }}
      >
        <ArrowDown />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[16px] font-semibold">Download for macOS</span>
          <span className="font-mono text-[11px] tracking-[0.08em] opacity-75">
            DubCheck {version} · 183 MB · macOS 13+
          </span>
        </span>
      </a>

      {downloaded && stage !== 'done' && (
        <div
          className="w-full rounded-[12px] border p-6 text-left"
          style={{ borderColor: 'rgba(255,122,26,0.20)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-[9px] mb-3">
            <Check />
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[#5EEBB3]">
              Download started
            </span>
          </div>
          <p className="text-[14px] text-dc-ink mb-1 font-medium">
            Want to hear when a platform changes its spec?
          </p>
          <p className="text-[13px] text-dc-ink2 leading-relaxed mb-4">
            Platforms move their targets without telling anyone. Leave your email and you get a
            note when a profile is updated or a new one ships. Nothing else, unsubscribe in one click.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={e => { setEmail(e.target.value); setError(null) }}
              placeholder="you@studio.com"
              disabled={stage === 'sending'}
              className="flex-1 px-4 py-[13px] rounded-[10px] text-[14px] text-dc-ink bg-[#0F0F12] border outline-none transition-colors duration-150 focus:border-[rgba(255,122,26,0.4)] disabled:opacity-50"
              style={{ borderColor: error ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
            />
            <button
              type="submit"
              disabled={stage === 'sending'}
              className="inline-flex items-center justify-center gap-2 px-6 py-[13px] rounded-[10px] text-[14px] font-semibold transition-all duration-150 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
                color: '#1A0A00',
                boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)',
              }}
            >
              {stage === 'sending' ? 'Sending…' : 'Keep me posted'}
            </button>
          </form>

          {error && <p className="text-[12px] text-[#FF8080] mt-2">{error}</p>}

          <a
            href={downloadUrl}
            className="inline-block mt-4 text-[12.5px] text-dc-ink3 hover:text-dc-ink2 underline-offset-2 hover:underline"
          >
            Download didn&apos;t start? Click here.
          </a>
        </div>
      )}

      {stage === 'done' && (
        <div
          className="w-full rounded-[12px] border p-6 text-left"
          style={{ borderColor: 'rgba(34,201,139,0.28)', background: 'rgba(34,201,139,0.06)' }}
        >
          <div className="flex items-center gap-[9px] mb-2">
            <Check />
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[#5EEBB3]">
              You&apos;re on the list
            </span>
          </div>
          <p className="text-[13px] text-dc-ink2 leading-relaxed">
            You&apos;ll hear from us when a platform spec moves. In the meantime the app is yours,
            no key needed.
          </p>
        </div>
      )}
    </div>
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setStage('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'download_page' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }
    } catch (err) {
      console.error('lead capture failed', err)
      setStage('idle')
      setError('Could not save that, try again in a second.')
      return
    }
    pingEvent('lead_download_page')
    setStage('done')
  }
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      className="w-[18px] h-[18px] transition-transform duration-150 group-hover:translate-y-[1px]"
    >
      <path d="M8 2v9M4 7l4 4 4-4M2 14h12" />
    </svg>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="#22C98B" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] flex-shrink-0">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  )
}
