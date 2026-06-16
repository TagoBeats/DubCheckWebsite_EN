import Link from 'next/link'
import EarlyBirdCountdown from '../EarlyBirdCountdown'

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[14px] h-[14px] text-dc-cyan flex-shrink-0">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  )
}

const PLANS = [
  {
    tag:       'Lifetime · Single user',
    ledClass:  'led-sm',
    slug:      'solo',
    name:      'Solo',
    blurb:     'For freelance mixers who need a fast, accurate check on every file.',
    amount:    '49',
    amountWas: '99',
    per:       'one-time · lifetime access',
    featured:  false,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'Single file checking',          v: 'per file' },
      { l: 'PDF compliance report',         v: 'included' },
      { l: 'All streamer specs (Netflix, Apple, Disney, Prime)', v: 'all' },
      { l: 'Local processing · NDA-safe',   v: 'always' },
      { l: 'Lifetime app access',           v: 'included' },
    ],
  },
  {
    tag:       'Lifetime · Pro · Recommended',
    ledClass:  'led-orange',
    slug:      'pro',
    name:      'Pro',
    blurb:     'For active mixers who deliver entire episodes and feature films.',
    amount:    '149',
    amountWas: '299',
    per:       'one-time · lifetime access',
    featured:  true,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'Everything in Solo',                              v: '✓' },
      { l: 'Unlimited batch checking (whole folders)',        v: 'unlimited' },
      { l: '12 months of spec updates (Netflix, Apple, etc.)', v: 'included' },
      { l: 'Priority support',                               v: '24h' },
    ],
  },
  {
    tag:       'Team License · Multi-seat',
    ledClass:  'led-amber',
    slug:      'team',
    name:      'Team',
    blurb:     'For post-production studios coordinating multiple mixers.',
    amount:    '399',
    amountWas: '799',
    per:       'one-time · 5 seats',
    featured:  false,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'Everything in Pro',            v: '✓' },
      { l: 'Seats included',               v: '5' },
      { l: 'Project-level QC reports',     v: 'included' },
    ],
  },
]

export default function StudiosPricing() {
  return (
    <section className="py-[120px]" id="pricing">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 06 · Pricing · Studios Edition</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[20ch]">
            Built for delivery economics.
          </h2>
        </div>
        <p className="max-w-[42ch] text-dc-ink2 text-[15px] md:shrink-0">
          Studios Edition pricing. Lock in your lifetime license at 50% off &mdash; Early Bird ends 31 Jul 2026.
          Files are always processed locally, zero vendor onboarding required from your IT team.
          Backed by a 30-day money-back guarantee, no questions asked.
        </p>
      </div>

      {/* Early Bird countdown */}
      <div className="flex justify-center mb-12">
        <EarlyBirdCountdown />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map(plan => (
          <div
            key={plan.name}
            className="border rounded-[12px] p-[28px_26px_26px] flex flex-col relative"
            style={plan.featured ? {
              borderColor: 'rgba(255,122,26,0.35)',
              background: 'linear-gradient(180deg, rgba(255,122,26,0.06) 0%, #17171A 30%)',
              boxShadow: '0 40px 80px -40px rgba(255,122,26,0.25)',
            } : {
              borderColor: 'rgba(255,255,255,0.08)',
              background: '#17171A',
            }}
          >
            <div className={`flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] uppercase mb-[14px] ${plan.featured ? 'text-dc-orange' : 'text-dc-ink3'}`}>
              <span className={plan.ledClass} />
              {plan.tag}
            </div>

            <h3 className="text-[22px] font-semibold tracking-[-0.01em] mb-[6px]">{plan.name}</h3>
            <p className="text-[13.5px] text-dc-ink2 mb-[22px]" style={{ minHeight: '2.8em' }}>{plan.blurb}</p>

            <div className="text-xl text-gray-500 line-through decoration-gray-600 mb-1 font-mono">
              € {plan.amountWas}
            </div>
            <div className="text-5xl font-extrabold text-white tracking-tight leading-none mb-3">
              <span className="text-2xl font-bold text-gray-300 mr-[2px] align-[5px]">€</span>
              {plan.amount}
            </div>
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${
                plan.featured
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              }`}>
                Early Bird — 50% off · ends 31 Jul
              </span>
            </div>
            <div className="font-mono text-[12px] text-dc-ink3 mb-6">{plan.per}</div>

            <ul className="list-none p-0 m-0 mb-7 border-t border-white/[0.04]">
              {plan.items.map(item => (
                <li key={item.l} className="flex justify-between items-center gap-3 py-3 border-b border-white/[0.04] text-[13.5px] text-dc-ink2">
                  <span className="flex items-center gap-[10px]">
                    <CheckIcon />
                    {item.l}
                  </span>
                  <span className="font-mono text-[12px] text-dc-ink">{item.v}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Link
                href={`/checkout?edition=studios&plan=${plan.slug}`}
                target="_blank"
                rel="noopener"
                className={`flex items-center justify-center w-full text-[14px] font-semibold px-5 py-[13px] rounded-[6px] transition-colors duration-150 cursor-pointer ${
                  plan.featured
                    ? 'text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33]'
                    : 'text-dc-ink2 border border-white/[0.08] hover:text-dc-ink hover:border-white/[0.18]'
                }`}
                style={plan.featured ? { boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' } : undefined}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[12px] text-dc-ink3 tracking-[0.05em] text-center mt-10">
        100% refund guarantee · 30-day money-back, no questions asked.
      </p>
    </section>
  )
}
