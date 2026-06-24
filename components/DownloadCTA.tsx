'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

interface Props {
  downloadUrl: string
  version: string
}

export default function DownloadCTA({ downloadUrl, version }: Props) {
  const searchParams = useSearchParams()
  const bypassed = searchParams.get('via') === 'email'

  const [stage, setStage] = useState<'idle' | 'form' | 'sending' | 'done'>('idle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  /* ── Paid user path: direct download link, no gate ── */
  if (bypassed) {
    return (
      <a
        href={downloadUrl}
        className="group inline-flex items-center gap-[14px] px-9 py-[18px] rounded-[11px] transition-all duration-150 hover:brightness-110 mb-12"
        style={{
          background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
          color: '#1A0A00',
          boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 14px 36px -10px rgba(255,122,26,0.6)',
        }}
      >
        <ArrowDown />
        <ButtonLabel version={version} />
      </a>
    )
  }

  /* ── Trial user path: email gate ── */
  if (stage === 'done') {
    return (
      <div className="mb-12 flex flex-col items-center gap-3">
        <div
          className="inline-flex items-center gap-[9px] px-[14px] py-[8px] rounded-full border font-mono text-[12px] tracking-[0.14em] uppercase"
          style={{
            background: 'rgba(34,201,139,0.08)',
            borderColor: 'rgba(34,201,139,0.28)',
            color: '#5EEBB3',
          }}
        >
          <Check />
          Download starting…
        </div>
        <a
          href={downloadUrl}
          className="text-[13px] text-dc-ink2 hover:text-dc-ink underline-offset-2 hover:underline"
        >
          Click here if it didn&apos;t start
        </a>
      </div>
    )
  }

  if (stage === 'form' || stage === 'sending') {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[460px] mb-12 flex flex-col gap-3"
      >
        <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#FFB07A] text-left">
          Where should we send updates?
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={e => { setEmail(e.target.value); setError(null) }}
            placeholder="you@studio.com"
            disabled={stage === 'sending'}
            className="flex-1 px-4 py-[14px] rounded-[10px] text-[14px] text-dc-ink bg-[#0F0F12] border outline-none transition-colors duration-150 focus:border-[rgba(255,122,26,0.4)] disabled:opacity-50"
            style={{ borderColor: error ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
          />
          <button
            type="submit"
            disabled={stage === 'sending'}
            className="inline-flex items-center justify-center gap-2 px-6 py-[14px] rounded-[10px] text-[14px] font-semibold transition-all duration-150 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
              color: '#1A0A00',
              boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)',
            }}
          >
            {stage === 'sending' ? 'Sending…' : 'Get installer →'}
          </button>
        </div>
        <p className="text-[12px] text-dc-ink2 text-left leading-relaxed">
          We&apos;ll only email you about DubCheck updates. No spam. Unsubscribe anytime.
        </p>
        {error && (
          <p className="text-[12px] text-[#FF8080] text-left">{error}</p>
        )}
      </form>
    )
  }

  /* ── Idle: same button as paid path, but click reveals form ── */
  return (
    <button
      type="button"
      onClick={() => setStage('form')}
      className="group inline-flex items-center gap-[14px] px-9 py-[18px] rounded-[11px] transition-all duration-150 hover:brightness-110 mb-12"
      style={{
        background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
        color: '#1A0A00',
        boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 14px 36px -10px rgba(255,122,26,0.6)',
      }}
    >
      <ArrowDown />
      <ButtonLabel version={version} />
    </button>
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
      // Fail-open: still let the user download. Email loss is preferable to lost conversion.
    }
    setStage('done')
    window.location.href = downloadUrl
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

function ButtonLabel({ version }: { version: string }) {
  return (
    <span className="flex flex-col items-start leading-tight">
      <span className="text-[16px] font-semibold">Download for macOS</span>
      <span className="font-mono text-[11px] tracking-[0.08em] opacity-75">
        DubCheck {version} · 200 MB · macOS 13+
      </span>
    </span>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="#22C98B" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px]">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  )
}
