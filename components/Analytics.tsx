'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_EVENT, getConsent } from '@/lib/consent'

const GA_ID = 'G-LMBRRE65BR'

export default function Analytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    setGranted(getConsent() === 'granted')
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setGranted(detail === 'granted')
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (!granted) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
