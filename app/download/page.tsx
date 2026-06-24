import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import DownloadCTA from '@/components/DownloadCTA'

const CURRENT_VERSION = '1.0.7'
const DOWNLOAD_URL = 'https://github.com/TagoBeats/DubCheck-downloads/releases/latest/download/DubCheck.pkg'
const SUPPORT_EMAIL = 'support@audio-dubcheck.com'

export const metadata: Metadata = {
  title: 'Download DubCheck for macOS',
  description: `Download DubCheck ${CURRENT_VERSION} for macOS — the offline QC tool for narrators and studios.`,
}

export default function DownloadPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />

      <div className="relative z-[1] max-w-[1560px] mx-auto px-5 md:px-10">
        <Nav />
      </div>


      {/* Orange ambient aura */}
      <div
        className="fixed left-1/2 -translate-x-1/2 top-[-120px] z-0 pointer-events-none"
        style={{
          width: 900, height: 600,
          background: 'radial-gradient(ellipse at center top, rgba(255,122,26,0.10) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-[900px] mx-auto px-5 md:px-10">
        <main className="pt-[80px] pb-[120px] flex flex-col items-center text-center">

          {/* ── macOS icon ── */}
          <div className="relative mb-10">
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: 'rgba(255,122,26,0.20)', transform: 'scale(1.4)' }}
            />
            <div
              className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center border"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(255,122,26,0.18) 0%, rgba(255,122,26,0.06) 100%)',
                borderColor: 'rgba(255,122,26,0.35)',
                boxShadow: '0 0 40px rgba(255,122,26,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="#FF7A1A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[38px] h-[38px]"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,122,26,0.7))' }}
              >
                <path d="M16 4v18" />
                <path d="M9 15l7 7 7-7" />
                <path d="M5 26h22" />
              </svg>
            </div>
          </div>

          {/* ── Version pill ── */}
          <div
            className="inline-flex items-center gap-[9px] px-[14px] py-[7px] rounded-full border mb-7 font-mono text-[12px] tracking-[0.14em] uppercase"
            style={{
              background: 'rgba(255,122,26,0.08)',
              borderColor: 'rgba(255,122,26,0.28)',
              color: '#FFB07A',
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full flex-shrink-0 animate-pulse"
              style={{ background: '#FF7A1A', boxShadow: '0 0 8px rgba(255,122,26,0.9)' }}
            />
            Free 14-day trial · macOS · v{CURRENT_VERSION}
          </div>

          {/* ── Headline ── */}
          <h1
            className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.03em] mb-5"
            style={{
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #C8C8CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get DubCheck for macOS.
          </h1>

          {/* ── Subtext ── */}
          <p className="text-[17px] md:text-[18px] text-dc-ink2 leading-[1.6] max-w-[52ch] mb-10">
            Download the installer. Run free for 14 days — no card, no signup.
            Paste your license key anytime to unlock for good.
          </p>

          {/* ── Primary CTA (email-gated for trial, direct for paid via ?via=email) ── */}
          <Suspense fallback={null}>
            <DownloadCTA downloadUrl={DOWNLOAD_URL} version={CURRENT_VERSION} />
          </Suspense>

          {/* ── Help card ── */}
          <div
            className="w-full max-w-[580px] rounded-[14px] border p-8 md:p-10 mb-12 text-left"
            style={{
              borderColor: 'rgba(255,122,26,0.20)',
              background: 'radial-gradient(ellipse at top, rgba(255,122,26,0.06) 0%, transparent 60%), linear-gradient(180deg, #17171A 0%, #131316 100%)',
              boxShadow: '0 0 0 1px rgba(255,122,26,0.08), 0 30px 80px -30px rgba(255,122,26,0.12)',
            }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,122,26,0.12)', border: '1px solid rgba(255,122,26,0.25)' }}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="#FF7A1A" strokeWidth="1.6"
                  strokeLinecap="round" className="w-[15px] h-[15px]">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3.5l2 2" />
                </svg>
              </div>
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[#FFB07A]">
                Need a hand?
              </span>
            </div>

            <div className="space-y-3">
              {/* Quickstart row */}
              <Link
                href="/help"
                className="group flex items-start gap-4 rounded-[10px] border border-white/[0.05] p-4 hover:border-[rgba(255,122,26,0.25)] hover:bg-[rgba(255,122,26,0.03)] transition-colors duration-150"
              >
                <div className="w-9 h-9 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,122,26,0.10)', border: '1px solid rgba(255,122,26,0.20)' }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="#FFB07A" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                    <path d="M2.5 3a1 1 0 0 1 1-1H8v12H3.5a1 1 0 0 1-1-1V3z" />
                    <path d="M13.5 3a1 1 0 0 0-1-1H8v12h4.5a1 1 0 0 0 1-1V3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-dc-ink font-medium mb-[3px]">Just downloaded?</div>
                  <div className="text-[13.5px] text-dc-ink2 leading-[1.55]">
                    Read the Quickstart — install, activate, run your first check in under 2 minutes.
                  </div>
                </div>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
                  className="w-[14px] h-[14px] text-[#6E6E78] group-hover:text-[#FFB07A] mt-[10px] flex-shrink-0 transition-colors duration-150">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>

              {/* Paid customer row */}
              <div className="flex items-start gap-4 rounded-[10px] border border-white/[0.05] p-4">
                <div className="w-9 h-9 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,122,26,0.10)', border: '1px solid rgba(255,122,26,0.20)' }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="#FFB07A" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
                    <path d="M2.5 4.5L8 9l5.5-4.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-dc-ink font-medium mb-[3px]">Just bought DubCheck?</div>
                  <div className="text-[13.5px] text-dc-ink2 leading-[1.55]">
                    Your license key is in your inbox — paste it on the activation screen.
                    Can&apos;t find the email? Write us at{' '}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-[#FFB07A] hover:text-[#FF7A1A] underline-offset-2 hover:underline"
                    >
                      {SUPPORT_EMAIL}
                    </a>.
                  </div>
                </div>
              </div>

              {/* Pricing row */}
              <div className="flex items-start gap-4 rounded-[10px] border border-white/[0.05] p-4">
                <div className="w-9 h-9 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,122,26,0.10)', border: '1px solid rgba(255,122,26,0.20)' }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="#FFB07A" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                    <path d="M8.5 1.5L14.5 7.5 8 14 1.5 7.5V1.5h7z" />
                    <circle cx="5" cy="5" r="1" fill="#FFB07A" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-dc-ink font-medium mb-[3px]">Trying it out first?</div>
                  <div className="text-[13.5px] text-dc-ink2 leading-[1.55]">
                    Trial runs free for 14 days. When ready, pick a plan for{' '}
                    <Link href="/narrators" className="text-[#FFB07A] hover:text-[#FF7A1A] underline-offset-2 hover:underline">
                      Narrators
                    </Link>{' '}
                    or{' '}
                    <Link href="/studios" className="text-[#FFB07A] hover:text-[#FF7A1A] underline-offset-2 hover:underline">
                      Studios
                    </Link>.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  )
}
