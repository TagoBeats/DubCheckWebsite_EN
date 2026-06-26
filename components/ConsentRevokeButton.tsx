'use client'

import { useEffect, useState } from 'react'
import { CONSENT_EVENT, clearConsent, getConsent } from '@/lib/consent'

export default function ConsentRevokeButton() {
  const [state, setState] = useState<'granted' | 'denied' | null>(null)

  useEffect(() => {
    setState(getConsent())
    const onChange = () => setState(getConsent())
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  const label =
    state === 'granted'
      ? 'Analytics: enabled'
      : state === 'denied'
        ? 'Analytics: disabled'
        : 'Analytics: not set'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
      <span className="text-[13px] font-mono text-dc-ink3">{label}</span>
      <button
        type="button"
        onClick={() => clearConsent()}
        className="text-[13px] font-semibold px-4 py-[8px] rounded-[6px] border border-white/[0.12] text-dc-ink hover:bg-white/[0.04] transition-colors duration-150 w-fit"
      >
        Change cookie settings
      </button>
    </div>
  )
}
