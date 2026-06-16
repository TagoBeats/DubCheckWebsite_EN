type Edition = 'studios' | 'narrators'

const QUOTES = [
  {
    text: 'Genuinely love the idea — this is the kind of safety net we have been missing.',
    role: 'Re-recording Mixer',
    city: 'Berlin',
  },
  {
    text: 'Can’t wait to check it out. A deterministic pre-check is exactly what delivery prep has been crying out for.',
    role: 'Tonmeister',
    city: 'Berlin',
  },
]

function QuoteMark({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.4" className="w-[28px] h-[28px] flex-shrink-0">
      <path d="M7 7c-2 0-4 2-4 5v5h5v-5H5c0-2 1-3 2-3V7zm10 0c-2 0-4 2-4 5v5h5v-5h-3c0-2 1-3 2-3V7z" />
    </svg>
  )
}

export default function Testimonials({ edition }: { edition: Edition }) {
  const isStudios = edition === 'studios'
  const accent = isStudios ? '#FF7A1A' : '#06D4F3'
  const accentText = isStudios ? 'text-dc-orange' : 'text-dc-cyan'
  const accentDim = isStudios ? 'rgba(255,122,26,0.10)' : 'rgba(6,212,243,0.10)'

  return (
    <section className="py-[80px]" aria-labelledby="testimonials-heading">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">
            § 05.5 &middot; Early signal
          </div>
          <h2
            id="testimonials-heading"
            className="text-[28px] md:text-[40px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[20ch]"
          >
            What people in post are saying.
          </h2>
        </div>
        <p className="max-w-[40ch] text-dc-ink2 text-[14.5px] md:shrink-0">
          Early reactions from mix engineers we&apos;ve been talking to during development.
          Independent pros, no commercial relationship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUOTES.map((q) => (
          <figure
            key={q.role + q.city}
            className="border rounded-[12px] p-7 flex flex-col gap-5"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: `linear-gradient(180deg, ${accentDim} 0%, transparent 60%), #17171A`,
            }}
          >
            <QuoteMark accent={accent} />
            <blockquote className="text-[16.5px] leading-[1.55] text-dc-ink m-0">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.04]">
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}aa` }}
              />
              <span className={`font-mono text-[12px] tracking-[0.14em] uppercase ${accentText}`}>
                {q.role}
              </span>
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">
                &middot; {q.city}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
