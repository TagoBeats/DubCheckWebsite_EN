import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'narrators' | 'studios'

const COPY: Record<Variant, {
  label:     string
  headline:  string
  body:      ReactNode
  ctaLabel:  string
  ctaHref:   string
  accent:    string
  ledClass:  string
}> = {
  narrators: {
    label:    'Also deliver to streamers?',
    headline: 'Mixing for Netflix, Apple TV+, Disney+ or Prime?',
    body:     <>Same app, same download, no second purchase. DubCheck ships every spec in one binary, so the profiles for <strong className="font-semibold text-dc-ink">NOLS, Apple TV+, Disney+, Prime Video, EBU R128 and ATSC A/85</strong> are already sitting in the dropdown next to your ACX ones. Multi-spec in one pass, audit-ready PDF.</>,
    ctaLabel: 'See the studio workflow',
    ctaHref:  '/studios',
    accent:   'text-dc-orange',
    ledClass: 'led-orange',
  },
  studios: {
    label:    'Also cutting audiobooks?',
    headline: 'Recording an audiobook for Audible / ACX?',
    body:     <>Same app, same download, no second purchase. The <strong className="font-semibold text-dc-ink">ACX, Spotify Audiobooks, Storytel and Podtrac</strong> profiles are already in the same dropdown as your Netflix and EBU ones, RMS and room tone checks included.</>,
    ctaLabel: 'See the narrator workflow',
    ctaHref:  '/narrators',
    accent:   'text-dc-cyan',
    ledClass: 'led',
  },
}

export default function EditionBridge({ variant }: { variant: Variant }) {
  const c = COPY[variant]

  return (
    <section className="py-[60px]">
      <div
        className="border border-white/[0.08] rounded-[12px] p-[28px_28px] md:p-[34px_38px] flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        style={{ background: '#17171A' }}
      >
        <div className="flex-1">
          <div className={`font-mono text-[12px] tracking-[0.14em] uppercase mb-3 flex items-center gap-2 ${c.accent}`}>
            <span className={c.ledClass} />
            {c.label}
          </div>
          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] leading-[1.2] mb-3 text-dc-ink">
            {c.headline}
          </h3>
          <p className="text-dc-ink2 text-[14px] leading-[1.6] max-w-[68ch]">
            {c.body}
          </p>
        </div>

        <Link
          href={c.ctaHref}
          className="inline-flex items-center gap-[10px] text-[14px] font-medium px-5 py-[13px] rounded-[6px] border border-white/[0.08] text-dc-ink2 hover:text-dc-ink hover:border-white/[0.18] transition-all duration-150 self-start md:self-center shrink-0"
        >
          {c.ctaLabel}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
