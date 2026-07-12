import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'

export const metadata: Metadata = {
  title: 'Pricing - Lifetime license from €30',
  description:
    'DubCheck pricing: Narrators edition €30 lifetime for audiobook QC, Studios edition €49 lifetime for broadcast delivery. One-time payment, free updates.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    url: '/pricing',
    images: ['/og.png'],
    title: 'DubCheck Pricing - Lifetime license from €30',
    description:
      'Narrators €30, Studios €49. One-time, lifetime, free updates. Pick the edition that matches your delivery workflow.',
  },
}

const EDITIONS = [
  {
    name: 'Narrators',
    color: 'cyan',
    tag: 'For audiobook & podcast delivery',
    price: '30',
    blurb: 'ACX, Audible, Storytel, Spotify Audiobooks, Apple Podcasts, Podtrac.',
    href: '/narrators',
    features: [
      'ACX RMS, peak, noise floor, room tone',
      'Audible, Storytel, Findaway specs',
      'Spotify, Apple Podcasts, Podtrac targets',
      'Per-chapter pass/fail PDF',
      'Free lifetime updates',
    ],
  },
  {
    name: 'Studios',
    color: 'orange',
    tag: 'For broadcast, streaming, dubbing',
    price: '49',
    blurb: 'Netflix NOLS, Apple TV+, Disney+, Prime Video, YouTube, EBU R128, ATSC A/85.',
    href: '/studios',
    features: [
      'Netflix NOLS + EBU R128 + ATSC A/85',
      'Apple TV+, Disney+, Prime Video specs',
      'Dialog gating, true peak, LRA, channel order',
      'Signed delivery PDF per asset',
      'Free lifetime updates',
    ],
  },
]

const FAQ = [
  {
    q: 'Is it really a one-time payment?',
    a: 'Yes. €30 for Narrators or €49 for Studios buys a lifetime license. No subscription, no annual renewal. Updates within the major version are free, including new platform specs as they ship.',
  },
  {
    q: 'What is the difference between Narrators and Studios?',
    a: 'Same measurement engine, different target sets. Narrators ships with audiobook and podcast platform specs (ACX, Audible, Spotify, Apple Podcasts). Studios ships with broadcast, streaming and dubbing specs (Netflix NOLS, Apple TV+, Disney+, EBU R128, ATSC A/85). The edition is read from the license key.',
  },
  {
    q: 'Can I upgrade from Narrators to Studios later?',
    a: 'Yes. The price difference plus a small admin fee. Email support@audio-dubcheck.com with your license key and we will issue a Studios key.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes, 7 days, full feature set, no card required. The trial runs against every supported platform spec so you can validate it on a real delivery before paying.',
  },
  {
    q: 'How many machines can I activate?',
    a: 'Two. Most engineers run one studio Mac and one laptop. If you need more seats for a team, see the Studio Batch service tier below.',
  },
  {
    q: 'Do you offer a refund?',
    a: 'Yes. 14-day money-back guarantee, no questions asked. Email support and we will refund the original payment method.',
  },
  {
    q: 'Is DubCheck a subscription?',
    a: 'No. A lifetime license is a one-time payment for the version you buy plus all minor updates. A future major version may be a separate upgrade, but you can keep using the version you paid for indefinitely.',
  },
  {
    q: 'Do you need an invoice for VAT?',
    a: 'Stripe issues a proper invoice with VAT and reverse-charge handling for EU business buyers at checkout.',
  },
]

const SERVICE_TIERS = [
  { name: 'Single Delivery', price: '149', per: 'per delivery', note: '1 program · 48 h turnaround · 7-day retention' },
  { name: 'Studio Batch',    price: '449', per: 'per batch',    note: 'Up to 12 programs · 24 h priority · 30-day retention', featured: true },
  { name: 'Studio Retainer', price: '899', per: 'per month',    note: 'Unlimited deliveries · Slack channel · custom profiles' },
]

const offerSchemas = EDITIONS.map(e => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/pricing#${e.name.toLowerCase()}`,
  name: `DubCheck ${e.name} Edition`,
  description: e.blurb,
  url: `${SITE_URL}${e.href}`,
  brand: { '@type': 'Brand', name: 'DubCheck' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    price: e.price,
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}/pricing`,
  },
}))

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',    item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE_URL}/pricing` },
  ],
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[...offerSchemas, faqSchema, breadcrumbSchema]} />
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />

        <main className="pt-[60px] pb-[100px]">
          {/* Hero */}
          <header className="max-w-[860px] mx-auto text-center">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Pricing</div>
            <h1 className="text-[34px] md:text-[52px] font-semibold tracking-[-0.025em] leading-[1.08]">
              One payment. Lifetime license. No subscription.
            </h1>
            <p className="text-dc-ink2 text-[17px] leading-[1.6] mt-5 max-w-[640px] mx-auto">
              DubCheck ships in two editions sharing the same EBU 3341/3342 certified measurement engine.
              Pick the one that matches what you deliver.
            </p>
          </header>

          {/* Editions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14 max-w-[1100px] mx-auto">
            {EDITIONS.map(e => {
              const accent = e.color === 'cyan' ? 'rgba(0,242,255,0.35)' : 'rgba(255,122,26,0.35)'
              const glow   = e.color === 'cyan' ? 'rgba(0,242,255,0.18)' : 'rgba(255,122,26,0.20)'
              const btnCls = e.color === 'cyan'
                ? 'text-[#001318] bg-dc-cyan hover:bg-[#33f5ff]'
                : 'text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33]'
              return (
                <div
                  key={e.name}
                  className="border rounded-[14px] p-[32px_30px] flex flex-col relative"
                  style={{
                    borderColor: accent,
                    background: '#17171A',
                    boxShadow: `0 40px 100px -40px ${glow}`,
                  }}
                >
                  <div className={`font-mono text-[12px] tracking-[0.14em] uppercase mb-3 ${e.color === 'cyan' ? 'text-dc-cyan' : 'text-dc-orange'}`}>
                    {e.tag}
                  </div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.015em] mb-1">DubCheck {e.name}</h2>
                  <p className="text-[14.5px] text-dc-ink2 mb-7" style={{ minHeight: '3em' }}>{e.blurb}</p>

                  <div className="font-mono text-[48px] text-dc-ink tracking-[-0.02em] leading-none mb-1">
                    <span className="text-[22px] text-dc-ink3 mr-[2px] align-[8px]">€</span>
                    {e.price}
                  </div>
                  <div className="font-mono text-[12px] text-dc-ink3 mb-7">one-time · lifetime license · free updates</div>

                  <ul className="list-none p-0 m-0 mb-8 border-t border-white/[0.06]">
                    {e.features.map(f => (
                      <li key={f} className="flex items-start gap-3 py-[11px] border-b border-white/[0.06] text-[14px] text-dc-ink2">
                        <span className={`mt-[6px] inline-block w-[6px] h-[6px] rounded-full flex-shrink-0 ${e.color === 'cyan' ? 'bg-dc-cyan' : 'bg-dc-orange'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={e.href}
                    className={`mt-auto flex items-center justify-center w-full text-[14px] font-semibold px-5 py-[14px] rounded-[8px] transition-colors duration-150 ${btnCls}`}
                  >
                    Explore the {e.name} edition →
                  </Link>
                </div>
              )
            })}
          </div>

          {/* What is included (shared engine) */}
          <section className="max-w-[860px] mx-auto mt-24">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Included in every license</div>
            <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] mb-6">Everything ships with the lifetime license.</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-dc-ink2 text-[15px]">
              {[
                'EBU 3341/3342 certified BS.1770 engine',
                '66 / 66 conformance tones bit-for-bit match',
                'Signed PDF report per file',
                'Two activations (studio + laptop)',
                '100% local processing, no upload',
                '7-day free trial, full feature set',
                'Free updates within major version',
                '14-day money-back guarantee',
              ].map(f => (
                <li key={f} className="flex items-start gap-3 py-1">
                  <span className="mt-[8px] inline-block w-[5px] h-[5px] rounded-full bg-dc-ink3" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Service tier (Studio Batch QC) */}
          <section className="max-w-[1100px] mx-auto mt-24">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Studio Service · optional</div>
            <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] mb-3">Want us to run the QC for you?</h2>
            <p className="text-dc-ink2 text-[15.5px] leading-[1.7] mb-8 max-w-[680px]">
              For studios that prefer to outsource the final delivery check, we offer a managed QC service.
              Send the masters, get back a signed delivery PDF and a list of any platform spec misses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICE_TIERS.map(t => (
                <div
                  key={t.name}
                  className="border rounded-[12px] p-[24px_22px]"
                  style={t.featured ? {
                    borderColor: 'rgba(255,122,26,0.35)',
                    background: 'linear-gradient(180deg, rgba(255,122,26,0.06) 0%, #17171A 30%)',
                  } : {
                    borderColor: 'rgba(255,255,255,0.08)',
                    background: '#17171A',
                  }}
                >
                  <div className={`font-mono text-[11px] tracking-[0.14em] uppercase mb-2 ${t.featured ? 'text-dc-orange' : 'text-dc-ink3'}`}>
                    {t.featured ? 'Recommended' : 'Service tier'}
                  </div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">{t.name}</h3>
                  <div className="font-mono text-[28px] text-dc-ink tracking-[-0.02em] leading-none mb-1">
                    <span className="text-[15px] text-dc-ink3 mr-[2px] align-[5px]">€</span>
                    {t.price}
                  </div>
                  <div className="font-mono text-[11px] text-dc-ink3 mb-4">{t.per}</div>
                  <p className="text-[13.5px] text-dc-ink2 leading-[1.55]">{t.note}</p>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-dc-ink3 mt-4">
              Service tier inquiries: <Link href="/contact" className="text-dc-ink2 underline underline-offset-2">contact us</Link>.
            </p>
          </section>

          {/* FAQ */}
          <section className="max-w-[820px] mx-auto mt-24">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ FAQ</div>
            <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] mb-8">Common questions about pricing.</h2>
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {FAQ.map(f => (
                <details key={f.q} className="group py-5">
                  <summary className="flex justify-between items-start gap-6 cursor-pointer list-none text-dc-ink text-[16px] font-medium">
                    <span>{f.q}</span>
                    <span className="text-dc-ink3 text-[20px] leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-dc-ink2 text-[15px] leading-[1.7] mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-[760px] mx-auto mt-24 text-center">
            <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.02em] mb-4">Still picking an edition?</h2>
            <p className="text-dc-ink2 text-[15.5px] mb-6">
              Read the use-case breakdown for{' '}
              <Link href="/narrators" className="text-dc-cyan underline underline-offset-2">Narrators</Link>
              {' or '}
              <Link href="/studios" className="text-dc-orange underline underline-offset-2">Studios</Link>
              , or skim the{' '}
              <Link href="/help" className="text-dc-ink underline underline-offset-2">help docs</Link>{' '}
              to see how the report reads on a real delivery.
            </p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
