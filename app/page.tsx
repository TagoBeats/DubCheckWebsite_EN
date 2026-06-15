import type { Metadata } from 'next'
import Link from 'next/link'
import Nav            from '@/components/Nav'
import Footer         from '@/components/Footer'
import DubCheckMockup from '@/components/DubCheckMockup'
import DemoSection   from '@/components/DemoSection'

export const metadata: Metadata = {
  title: 'DubCheck - The ultimate final check for your audio',
  description:
    'Two editions, one EBU R128 certified engine. Catch ACX, Netflix, Apple TV+ and Disney+ spec failures before delivery.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'DubCheck - The ultimate final check for your audio',
    description:
      'Two editions, one EBU R128 certified engine. Catch ACX, Netflix, Apple TV+ and Disney+ failures before delivery.',
  },
}

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
          <WhyItExists />
        </main>
        <Footer />
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   Persona switch - primary CTA on the root.
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
        <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">
          Two editions · one engine · EBU R128 certified
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[36px] md:text-[54px] lg:text-[64px] leading-[1.06] md:leading-[1.02] tracking-[-0.035em] mb-[22px] font-semibold max-w-[18ch]"
        style={{ color: '#06D4F3' }}
      >
        The ultimate final check for your audio.
      </h1>

      {/* Lede */}
      <p className="text-[18px] leading-[1.55] text-dc-ink2 max-w-[62ch] mb-12">
        Bulletproof your deliveries. DubCheck comes in two editions sharing the same EBU 3341/3342
        certified engine. Pick the edition built for your workflow:
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
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-4 flex items-center gap-2">
            <span className="led" />
            DubCheck AudioBook Edition
          </div>
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3 text-dc-ink">
            Upload your audiobook with 100% confidence.
          </h2>
          <p className="text-dc-ink2 text-[15px] leading-[1.6] mb-7 max-w-[40ch]">
            Drag your chapters in and get a clear pass/fail PDF in seconds. Verify your
            RMS, true peak and noise floor before you hit submit. Stop redelivering.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">
              From €30 lifetime
            </span>
            <span aria-label="See DubCheck Narrators details" className="inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-dc-cyan group-hover:translate-x-[4px] transition-transform duration-200">
              Explore the Narrators edition
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
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-orange mb-4 flex items-center gap-2">
            <span className="led-orange" />
            DubCheck Studios Edition
          </div>
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3 text-dc-ink">
            Deliver your final mix with absolute certainty.
          </h2>
          <p className="text-dc-ink2 text-[15px] leading-[1.6] mb-7 max-w-[40ch]">
            Verify your audio against strict Netflix, Apple TV+ and EBU R128 specs in one
            pass. Get a certified PDF report and hand off your masters with 100% confidence.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">
              From €49 lifetime
            </span>
            <span aria-label="See DubCheck Studios details" className="inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-dc-orange group-hover:translate-x-[4px] transition-transform duration-200">
              Explore the Studios edition
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Live demo mockup - Audiobook edition */}
      <div className="mt-16 md:mt-20 max-w-[960px] mx-auto">
        <DemoSection
          edition="narrators"
          accent="cyan"
          sectionLabel="Live · 8-second demo · no signup"
          headline="Watch DubCheck run on a real audio file."
          headlineSize="h3"
        />
        <div className="flex justify-center mt-8">
          <Link
            href="/narrators"
            className="inline-flex items-center gap-[10px] px-7 py-4 rounded-[8px] font-semibold text-[15px] text-[#0E0E10] transition-all duration-200 hover:brightness-110 hover:scale-[1.03]"
            style={{
              background: '#22D3EE',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.4), 0 10px 30px -10px rgba(34,211,238,0.55)',
            }}
          >
            See the Narrators edition in action
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[15px] h-[15px]">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Engine credibility strip - shared trust signal.
   ────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────
   Why DubCheck exists - long-form copy block for context & SEO.
   ────────────────────────────────────────────────────────────── */
function WhyItExists() {
  return (
    <section className="py-[80px] max-w-[820px]">
      <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">
        § Why DubCheck exists
      </div>
      <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.025em] leading-[1.15] mb-6">
        Built by a mix engineer, for the people who have to ship the file.
      </h2>
      <div className="space-y-5 text-dc-ink2 text-[16px] leading-[1.7]">
        <p>
          Every audio delivery sits behind a wall of numbers - integrated loudness, true peak, dialog gating, LRA, channel order, sample rate, dither, phase correlation. Get one wrong and the file gets bounced. The platform never tells you which one; you have to guess.
        </p>
        <p>
          DubCheck does that check for you. Drop a file in, pick a target - ACX, EBU R128, Netflix NOLS, Apple TV+, Disney+, Prime Video, Spotify, Audible, Storytel, Podtrac - and you get a pass/fail in seconds with every measurement annotated against the spec. No silent failures, no <em>"why does my DAW disagree with the platform meter"</em> rabbit holes. The engine is EBU 3341/3342 certified and matches the reference tone-set bit-for-bit on all 66 conformance tests.
        </p>
        <p>
          Everything happens locally. Files never leave your machine, no upload queue, no cloud storage of confidential mixes, no telemetry. The PDF report it generates is the same one you hand to a client or attach to a delivery portal - readable by humans, signed off by the engine, and complete enough to settle a redelivery dispute on its own.
        </p>
      </div>
    </section>
  )
}

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
            <div className="font-mono text-[12px] text-dc-ink3 tracking-[0.1em] uppercase">{s.k}</div>
            <div className="font-mono text-[15px] md:text-[17px] text-dc-ink mt-1">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
