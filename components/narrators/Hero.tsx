import Link from 'next/link'

const STATS = [
  { k: 'ENGINE',         v: 'EBU 3341/3342 certified' },
  { k: 'CHECKS PER FILE',v: 'RMS · Peak · Noise · Tone' },
  { k: 'PROCESSING',     v: '100% local · offline' },
  { k: 'PROJECTS RUN',   v: 'Audiobooks · Podcasts' },
]

const SPECS = ['ACX (Audible)', 'Spotify Audiobooks', 'Storytel', 'Podtrac', 'EBU R128']

export default function NarratorHero() {
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

      <div className="crosshair hidden md:block" style={{ left: '-9px', top: '60px' }} />
      <div className="crosshair hidden md:block" style={{ right: '-9px', top: '60px' }} />

      {/* Label */}
      <div className="flex items-center gap-[10px] mb-[26px]">
        <span className="led" />
        <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">
          DubCheck AudioBook Edition · For Narrators &amp; Production Teams
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[36px] md:text-[54px] lg:text-[68px] leading-[1.06] md:leading-[1.02] tracking-[-0.035em] mb-[22px] font-semibold max-w-[16ch]"
        style={{ color: '#06D4F3' }}
      >
          Upload your audiobook <br />
          with 100% confidence.
      </h1>

      {/* Lede */}
      <p className="text-[18px] leading-[1.55] text-dc-ink2 max-w-[58ch] mb-9">
          Drag your chapters in and get a clear pass/fail PDF in seconds.
          DubCheck verifies your RMS, true peak, and noise floor against strict
          Audible and ACX standards. Verify every single chapter before you hit submit,
          so you never have to re-edit a rejected file again.
          Built on an EBU 3341/3342 certified measurement engine.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-3">
        <Link
          href="/download"
          className="inline-flex items-center gap-[10px] text-[14px] font-semibold px-5 py-[13px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
          style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
        >
          Download free 14-day Pro trial
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
        <a
          href="/narrators_report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[10px] text-[14px] font-medium px-5 py-[13px] rounded-[6px] border border-white/[0.08] text-dc-ink2 hover:text-dc-ink hover:border-white/[0.18] transition-all duration-150"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <rect x="2.5" y="2.5" width="11" height="11" rx="1" /><path d="M5.5 6.5h5M5.5 9h3" />
          </svg>
          See sample report
        </a>
      </div>
      <p className="font-mono text-[12px] tracking-[0.06em] text-dc-ink3 mb-11">
        No account · just your email · runs locally · macOS
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-9 pt-[26px] border-t border-white/[0.04] max-w-[900px]">
        {STATS.map(s => (
          <div key={s.k}>
            <div className="font-mono text-[12px] text-dc-ink3 tracking-[0.1em] uppercase">{s.k}</div>
            <div className="font-mono text-[15px] md:text-[17px] text-dc-ink mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Spec badges */}
      <div className="flex items-center gap-4 md:gap-12 flex-wrap py-8 border-t border-b border-white/[0.04] mt-10">
        <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.14em] uppercase mr-2">
          Supported specs
        </span>
        {SPECS.map(spec => (
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
