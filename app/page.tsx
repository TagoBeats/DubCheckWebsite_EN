import Link from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Fixed grid background */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Page wrapper */}
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />
        <main>
          <PersonaSwitch />
          <EngineCredibility />
        </main>
        <Footer />
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   Persona switch — primary CTA on the root.
   ────────────────────────────────────────────────────────────── */
function PersonaSwitch() {
  return (
    <section className="pt-[80px] pb-[60px] relative overflow-hidden" id="top">
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

      {/* Label */}
      <div className="flex items-center gap-[10px] mb-[26px]">
        <span className="led" />
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3">
          Two editions · one engine · EBU R128 certified
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[36px] md:text-[54px] lg:text-[64px] leading-[1.06] md:leading-[1.02] tracking-[-0.035em] mb-[22px] font-semibold max-w-[18ch]"
        style={{ color: '#06D4F3' }}
      >
        Pass spec on the first upload.
      </h1>

      {/* Lede */}
      <p className="text-[18px] leading-[1.55] text-dc-ink2 max-w-[62ch] mb-12">
        DubCheck comes in two editions sharing the same EBU 3341/3342 certified engine —
        the AudioBook Edition for narrators and audiobook teams, the Studios Edition for
        localization studios delivering to Netflix, Apple TV+, Disney+ and Prime. Pick
        the edition built for your workflow:
      </p>

      {/* Persona cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Narrator card */}
        <Link
          href="/narrators"
          className="group block rounded-[14px] border border-white/[0.08] p-8 md:p-10 relative overflow-hidden transition-all duration-200 hover:border-white/[0.18]"
          style={{
            background: 'linear-gradient(180deg, rgba(34,211,238,0.04) 0%, #17171A 60%)',
          }}
        >
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-cyan mb-4 flex items-center gap-2">
            <span className="led" />
            DubCheck AudioBook Edition
          </div>
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3 text-dc-ink">
            ACX rejected your chapter again?
          </h2>
          <p className="text-dc-ink2 text-[15px] leading-[1.6] mb-7 max-w-[40ch]">
            Drag your file in. Get a pass/fail PDF in seconds. RMS, peak, noise floor,
            room tone — every value ACX checks, on every chapter. Stop redelivering.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">
              From €39 lifetime
            </span>
            <span className="inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-dc-cyan group-hover:translate-x-[4px] transition-transform duration-200">
              See details
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Studios card */}
        <Link
          href="/studios"
          className="group block rounded-[14px] border border-white/[0.08] p-8 md:p-10 relative overflow-hidden transition-all duration-200 hover:border-white/[0.18]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,122,26,0.05) 0%, #17171A 60%)',
          }}
        >
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-orange mb-4 flex items-center gap-2">
            <span className="led-orange" />
            DubCheck Studios Edition
          </div>
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3 text-dc-ink">
            Stop the streamer normalizing your mix.
          </h2>
          <p className="text-dc-ink2 text-[15px] leading-[1.6] mb-7 max-w-[40ch]">
            Verify final mixes against Netflix NOLS, Apple TV+, Disney+ and Prime — in
            one pass. Keep control over how your work actually sounds at the viewer's end.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">
              From €149 / project
            </span>
            <span className="inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-dc-orange group-hover:translate-x-[4px] transition-transform duration-200">
              See details
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Engine credibility strip — shared trust signal.
   ────────────────────────────────────────────────────────────── */
function EngineCredibility() {
  const STATS = [
    { k: 'ENGINE', v: 'EBU 3341/3342 certified' },
    { k: 'TEST RESULTS', v: '66 / 66 passed' },
    { k: 'PROCESSING', v: '100% local · offline' },
    { k: 'INTERNAL PRECISION', v: '32-bit float' },
  ]

  return (
    <section className="py-[80px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-9 pt-[26px] border-t border-white/[0.04] max-w-[1100px]">
        {STATS.map(s => (
          <div key={s.k}>
            <div className="font-mono text-[11px] text-dc-ink3 tracking-[0.1em] uppercase">{s.k}</div>
            <div className="font-mono text-[15px] md:text-[17px] text-dc-ink mt-1">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
