'use client'

import { useEffect, useState } from 'react'
import { CONSENT_EVENT, getConsent, setConsent } from '@/lib/consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getConsent() === null)
    const onChange = () => setVisible(getConsent() === null)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (!visible) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] z-50 rounded-lg border border-white/[0.08] bg-[#0E0E10]/95 backdrop-blur-md p-5 shadow-2xl"
    >
      <p className="text-[13px] leading-relaxed text-dc-ink mb-1 font-semibold">
        Cookies & analytics
      </p>
      <p className="text-[13px] leading-relaxed text-[var(--ink-3)] mb-4">
        We&apos;re a small team. Accepting helps us see what&apos;s working and improve the site.
        Anonymous only, no tracking without your consent. See our{' '}
        <a href="/privacy" className="underline hover:text-white">
          privacy policy
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 text-[13px] font-semibold px-4 py-[10px] rounded-[6px] border border-white/[0.12] text-dc-ink hover:bg-white/[0.04] transition-colors duration-150"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 text-[13px] font-semibold px-4 py-[10px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
