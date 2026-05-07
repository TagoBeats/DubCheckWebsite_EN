import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Thank You — DubCheck",
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />

      {/* Green ambient aura */}
      <div
        className="fixed left-1/2 -translate-x-1/2 top-[-120px] z-0 pointer-events-none"
        style={{
          width: 900, height: 600,
          background: 'radial-gradient(ellipse at center top, rgba(34,201,139,0.10) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-[900px] mx-auto px-5 md:px-10">
        <main className="pt-[80px] pb-[120px] flex flex-col items-center text-center">

          {/* ── Success icon ── */}
          <div className="relative mb-10">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: 'rgba(34,201,139,0.20)', transform: 'scale(1.4)' }}
            />
            <div
              className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center border"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(34,201,139,0.18) 0%, rgba(34,201,139,0.06) 100%)',
                borderColor: 'rgba(34,201,139,0.35)',
                boxShadow: '0 0 40px rgba(34,201,139,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="#22C98B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[38px] h-[38px]"
                style={{ filter: 'drop-shadow(0 0 8px rgba(34,201,139,0.7))' }}
              >
                <path d="M6 17l7 7L26 9" />
              </svg>
            </div>
          </div>

          {/* ── Status pill ── */}
          <div
            className="inline-flex items-center gap-[9px] px-[14px] py-[7px] rounded-full border mb-7 font-mono text-[11px] tracking-[0.14em] uppercase"
            style={{
              background: 'rgba(34,201,139,0.08)',
              borderColor: 'rgba(34,201,139,0.28)',
              color: '#5EEBB3',
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full flex-shrink-0 animate-pulse"
              style={{ background: '#22C98B', boxShadow: '0 0 8px rgba(34,201,139,0.9)' }}
            />
            Pre-order confirmed
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
            You&apos;re officially an<br />Early Adopter!{' '}
            <span style={{ WebkitTextFillColor: 'initial' }}>🚀</span>
          </h1>

          {/* ── Subtext ── */}
          <p className="text-[17px] md:text-[18px] text-dc-ink2 leading-[1.6] max-w-[52ch] mb-12">
            Your pre-order was successful and your lifetime license is now reserved.
            We&apos;ve sent a receipt to your email address.
          </p>

          {/* ── Next steps card ── */}
          <div
            className="w-full max-w-[580px] rounded-[14px] border p-8 md:p-10 mb-12 text-left"
            style={{
              borderColor: 'rgba(34,201,139,0.20)',
              background: 'radial-gradient(ellipse at top, rgba(34,201,139,0.06) 0%, transparent 60%), linear-gradient(180deg, #17171A 0%, #131316 100%)',
              boxShadow: '0 0 0 1px rgba(34,201,139,0.08), 0 30px 80px -30px rgba(34,201,139,0.12)',
            }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,201,139,0.12)', border: '1px solid rgba(34,201,139,0.25)' }}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="#22C98B" strokeWidth="1.6"
                  strokeLinecap="round" className="w-[15px] h-[15px]">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3.5l2 2" />
                </svg>
              </div>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#22C98B]">
                What happens now?
              </span>
            </div>

            <p className="text-[15px] text-dc-ink2 leading-[1.7] m-0">
              We are working hard on the V1 release.{' '}
              <span className="text-dc-ink font-medium">
                Expect your download link and license key in your inbox within the next 6 weeks.
              </span>{' '}
              You&apos;ll be among the first to know the moment it&apos;s ready.
            </p>

            {/* Divider */}
            <div className="border-t border-white/[0.04] mt-7 pt-6 flex items-center gap-6 flex-wrap">
              {[
                { icon: 'M3 8.5l3 3 7-7', label: 'Receipt sent to your inbox' },
                { icon: 'M3 8.5l3 3 7-7', label: 'License key reserved' },
                { icon: 'M3 8.5l3 3 7-7', label: '100% refund guarantee' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-[8px] text-[13px] text-dc-ink2">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#22C98B" strokeWidth="2"
                    className="w-[13px] h-[13px] flex-shrink-0">
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <Link
            href="/"
            className="inline-flex items-center gap-[10px] text-[14px] font-semibold px-6 py-[14px] rounded-[9px] transition-all duration-150 hover:brightness-110"
            style={{
              background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
              color: '#1A0A00',
              boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)',
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
              className="w-[14px] h-[14px]">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            Back to Homepage
          </Link>

          {/* Footer sig */}
          <p className="font-mono text-[10px] text-[#44444B] tracking-[0.18em] uppercase mt-14">
            DubCheck QC · v1.0 RC · pre-order · 2026
          </p>

        </main>

        <Footer />
      </div>
    </>
  )
}
