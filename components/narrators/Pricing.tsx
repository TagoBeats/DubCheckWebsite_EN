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
    blurb:     'For solo narrators who want spec checks on every chapter.',
    reframe:   'Less than the time to re-edit one ACX rejection.',
    amount:    '29',
    amountWas: '49',
    per:       'one-time · lifetime updates',
    featured:  false,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'ACX spec checks (RMS, peak, noise floor, room tone)', v: 'all 4' },
      { l: 'PDF report per chapter',        v: 'included' },
      { l: 'Single file checking',         v: 'per file' },
      { l: '12 months updates ', v: 'included' },
      { l: 'Local processing · offline',    v: 'always' },
    ],
  },
  {
    tag:       'Lifetime · Pro · Recommended',
    ledClass:  'led-orange',
    slug:      'pro',
    name:      'Pro',
    blurb:     'For pro narrators with full audiobook batches and multiple platforms.',
    reframe:   'Less than one ACX rejection.',
    amount:    '64',
    amountWas: '129',
    per:       'one-time · lifetime updates',
    featured:  true,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'Everything in Solo',                    v: '✓' },
      { l: 'Batch checking (whole audiobooks)',     v: 'unlimited' },
      { l: 'Multi-platform (ACX + Spotify + EBU)',  v: 'all' },
      { l: 'Branded PDF report (your logo)',        v: 'included' },
      { l: 'Priority support email',                v: '24h' },
    ],
  },
  {
    tag:       'Team License · Multi-seat',
    ledClass:  'led-amber',
    slug:      'team',
    name:      'Team',
    blurb:     'For audiobook production teams coordinating multiple narrators.',
    reframe:   'Less than one bad redelivery week across the team.',
    amount:    '199',
    amountWas: '399',
    per:       'one-time · 5 seats',
    featured:  false,
    popup:     true,
    cta:       'Claim 50% Early Bird →',
    ctaHref:   '',
    items: [
      { l: 'Everything in Pro',          v: '✓' },
      { l: 'Seats included',             v: '5' },
      { l: 'Project-level QC reports',   v: 'included' },
      { l: 'Priority support',           v: '12h' },
      { l: 'Onboarding call',            v: '30 min' },
    ],
  },
]

export default function NarratorPricing() {
  return (
    <section className="py-[120px]" id="pricing">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 06 · Pricing · AudioBook Edition</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Clear pricing. No subscriptions.
          </h2>
        </div>
        <p className="max-w-[40ch] text-dc-ink2 text-[15px] md:shrink-0">
          AudioBook Edition pricing. Pay once, own forever. Spec updates included
          for the first 12 months and likely longer. Backed by a 30-day
          money-back guarantee, no questions asked.
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
            {/* Tag */}
            <div className={`flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] uppercase mb-[14px] ${plan.featured ? 'text-dc-orange' : 'text-dc-ink3'}`}>
              <span className={plan.ledClass} />
              {plan.tag}
            </div>

            <h3 className="text-[22px] font-semibold tracking-[-0.01em] mb-[6px]">{plan.name}</h3>
            <p className="text-[13.5px] text-dc-ink2 mb-[10px]" style={{ minHeight: '2.8em' }}>{plan.blurb}</p>
            <p className={`font-mono text-[12px] tracking-[0.02em] mb-[18px] italic ${plan.featured ? 'text-dc-orange' : 'text-dc-cyan'}`}>
              {plan.reframe}
            </p>

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
                Early Bird — {Math.round((1 - Number(plan.amount) / Number(plan.amountWas)) * 100)}% off · ends 31 Jul
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
                href={`/checkout?edition=audiobook&plan=${plan.slug}`}
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

      {/* Refund note */}
      <p className="font-mono text-[12px] text-dc-ink3 tracking-[0.05em] text-center mt-10">
        100% refund guarantee · 30-day money-back, no questions asked.
      </p>
    </section>
  )
}
