import Link from 'next/link'

type Variant = 'narrators' | 'studios'

const COPY: Record<Variant, {
  label:     string
  headline:  string
  body:      string
  ctaLabel:  string
  ctaHref:   string
  accent:    string
  ledClass:  string
}> = {
  narrators: {
    label:    'Need streamer specs instead?',
    headline: 'Mixing for Netflix, Apple TV+, Disney+ or Prime?',
    body:     'The AudioBook Edition focuses on ACX, Spotify Audiobooks, Storytel and Podtrac. If you deliver final mixes to streaming platforms, the Studios Edition covers NOLS, Apple TV+, Disney+, Prime Video, EBU R128 and ATSC A/85. Multi-spec in one pass, audit-ready PDF.',
    ctaLabel: 'See Studios Edition',
    ctaHref:  '/studios',
    accent:   'text-dc-orange',
    ledClass: 'led-orange',
  },
  studios: {
    label:    'Just need ACX or audiobook specs?',
    headline: 'Recording an audiobook for Audible / ACX?',
    body:     'The Studios Edition is built for streamer-grade deliveries (Netflix, Apple TV+, Disney+, Prime). If your workflow centers on audiobook submissions, the lighter AudioBook Edition covers ACX, Spotify Audiobooks, Storytel and Podtrac, at audiobook pricing.',
    ctaLabel: 'See AudioBook Edition',
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
          <div className={`font-mono text-[11px] tracking-[0.14em] uppercase mb-3 flex items-center gap-2 ${c.accent}`}>
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
