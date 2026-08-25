function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[14px] h-[14px] text-dc-cyan flex-shrink-0">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  )
}

const PLANS = [
  {
    tag:      'Single Delivery',
    ledClass: 'led-amber',
    name:     'Einzelprojekt',
    blurb:    'Ein Film oder eine Episode – komplett geprüft.',
    amount:   '149.00',
    per:      'pro Delivery',
    featured: false,
    cta:      'Anfragen',
    ctaHref:  'https://buy.stripe.com/7sY14o8y3cLPcSV7SS4Vy01',
    items: [
      { l: 'Full Mix, M&E und alle zugehörigen Stems',  v: '1' },
      { l: '4-seitiger PDF-Report inkl. Pass/Fail',          v: '18' },
      { l: 'Programmlänge',          v: '≤ 90 min' },
      { l: 'Fast Delivery',         v: '48 h' },
      { l: 'Retention',              v: '7 Tage' },
    ],
  },
  {
    tag:      'Staffel-Paket · Empfohlen',
    ledClass: 'led-orange',
    name:     'Studio Batch',
    blurb:    'Ganze Staffel, Film + Trailer. ein Preis, ein Ansprechpartner.',
    amount:   '449.00',
    per:      'pro Batch · bis 12 Programme',
    featured: true,
    cta:      'Anfragen',
    ctaHref:  'https://buy.stripe.com/dRm6oIcOj8vz3il6OO4Vy02',
    items: [
      { l: 'Programme inkl.',        v: '12' },
      { l: 'Episode-Report - einzeln & gebündelt',         v: 'signiert' },
      { l: 'Master Delivery PDF',    v: '1' },
      { l: 'Priority Delivery',        v: '24 h' },
      { l: 'Retention',              v: '30 Tage' },
    ],
  },
  {
    tag:      'Retainer · Studios @ Volumen',
    ledClass: 'led-sm',
    name:     'Studio-Retainer',
    blurb:    'Für Studios mit kontinuierlichem Durchsatz.',
    amount:   '899.00',
    per:      'pro Monat',
    featured: false,
    cta:      'Anfragen',
    ctaHref:  'https://buy.stripe.com/3cI8wQaGbfY14mp4GG4Vy03',
    items: [
      { l: 'Deliveries pro Monat',              v: 'unbegrenzt' },
      { l: 'Custom profiles',        v: 'bis 6' },
      { l: 'Direkter Slack-Kanal zum Operator',             v: '30 min' },
      { l: 'Skip-the-Line Priority',      v: 'ASAP' },
      { l: 'Deep-Dive Fail-Analyse & Operator-Consulting',              v: 'signiert' },
    ],
  },
]

export default function Pricing() {
  return (
    <section className="py-[120px]" id="pricing">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 06 · Pricing</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Klare Preise. Keine Sternchen.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Alle Pläne beinhalten den vollständigen Check-Umfang:
          12 automatische Checks, alle unterstützten Plattform-Specs, M&E-vs-Mix Delta und 4-seitigen PDF-Report.
        </p>
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
            <p className="text-[13.5px] text-dc-ink2 mb-[22px]" style={{ minHeight: '2.8em' }}>{plan.blurb}</p>

            <div className="font-mono text-[40px] text-dc-ink tracking-[-0.02em] leading-none mb-1">
              <span className="text-[20px] text-dc-ink3 mr-[2px] align-[6px]">€</span>
              {plan.amount}
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
              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-full text-[14px] font-semibold px-5 py-[13px] rounded-[6px] transition-colors duration-150 ${
                  plan.featured
                    ? 'text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33]'
                    : 'text-dc-ink2 border border-white/[0.08] hover:text-dc-ink hover:border-white/[0.18]'
                }`}
                style={plan.featured ? { boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' } : undefined}
              >
                {plan.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
