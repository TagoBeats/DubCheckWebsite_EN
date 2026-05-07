import Link from 'next/link'

/* ── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { k: 'MESSGENAUIGKEIT',  v: '±0.1 LU Toleranz' },
  { k: 'DELIVERY SPECS',   v: '18 aktive Profile' },
  { k: 'INTERNE ENGINE',   v: '32-bit float' },
  { k: 'SECURITY',         v: '100% Offline / Lokal' },
]

/* ── Delivery spec badges ───────────────────────────────────── */
const BADGES = ['EBU R128 s1', 'ATSC A/85', 'Netflix (–27 LKFS)', '5.1 M&E Stems', 'Theatrical Mix', 'Amazon Prime']

/* ── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="pt-[90px] pb-[80px] relative overflow-hidden" id="top">
      {/* Glow */}
      <div
        className="absolute -z-[1] pointer-events-none"
        style={{
          left: '50%', top: '46%', transform: 'translate(-50%, -50%)',
          width: '900px', height: '380px',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 35%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Corner crosshairs */}
      <div className="crosshair hidden md:block" style={{ left: '-9px', top: '60px' }} />
      <div className="crosshair hidden md:block" style={{ right: '-9px', top: '60px' }} />

      {/* Label */}
      <div className="flex items-center gap-[10px] mb-[26px]">
        <span className="led" />
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3">
          Loudness &amp; Delivery QC · build 2026.04
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[36px] md:text-[54px] lg:text-[72px] leading-[1.06] md:leading-[1.02] tracking-[-0.035em] mb-[22px] font-semibold max-w-[14ch]"
        style={{ color: '#06D4F3' }}
      >
        Liefere Mixes ab,<br />
        die beim ersten Upload bestehen.

      </h1>

      {/* Lede */}
      <p className="text-[18px] leading-[1.55] text-dc-ink2 max-w-[58ch] mb-9">
        DubCheck prüft deine Film- und Serien-Mixes gegen jede relevante Plattform-Norm –
        Loudness, True-Peak, Dialog-Gating, Channel-Routing – und liefert dir einen
        auditierbaren PDF-Report. Gebaut für Post-Production-Studios, die in zehntel dB messen.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-11">
        <Link
          href="#pricing"
          className="inline-flex items-center gap-[10px] text-[14px] font-semibold px-5 py-[13px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
          style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
        >
          Platz anfragen
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
        <Link
          href="#report"
          className="inline-flex items-center gap-[10px] text-[14px] font-medium px-5 py-[13px] rounded-[6px] border border-white/[0.08] text-dc-ink2 hover:text-dc-ink hover:border-white/[0.18] transition-all duration-150"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <rect x="2.5" y="2.5" width="11" height="11" rx="1" /><path d="M5.5 6.5h5M5.5 9h3" />
          </svg>
          Muster-Report ansehen
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-9 pt-[26px] border-t border-white/[0.04] max-w-[900px]">
        {STATS.map(s => (
          <div key={s.k}>
            <div className="font-mono text-[11px] text-dc-ink3 tracking-[0.1em] uppercase">{s.k}</div>
            <div className="font-mono text-[17px] text-dc-ink mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Delivery profiles strip */}
      <div className="flex items-center gap-4 md:gap-12 flex-wrap py-8 border-t border-b border-white/[0.04] mt-10">
        <span className="font-mono text-[11px] text-dc-ink3 tracking-[0.14em] uppercase mr-2">
          Delivery profiles
        </span>
        {BADGES.map(spec => (
          <span
            key={spec}
            className="font-mono text-[13px] text-dc-ink2 px-3 py-[6px] border border-white/[0.08] rounded-[4px] inline-flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-dc-ink3 flex-shrink-0" />
            {spec}
          </span>
        ))}
      </div>
    </section>
  )
}
