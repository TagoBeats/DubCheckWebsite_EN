import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import PricingCards from '@/components/PricingCards'
import { BATCH_PRICE_EUR, PLATFORM_COUNT, SPEC_COUNT } from '@/lib/pricing'

const SITE_URL = 'https://audio-dubcheck.com'

export const metadata: Metadata = {
  title: 'Pricing - Free, or €29 once for batch',
  description:
    `DubCheck is free: check one file per run against all ${SPEC_COUNT} platform specs and export a signed PDF. €${BATCH_PRICE_EUR} once unlocks unlimited batch checking. No subscription.`,
  alternates: { canonical: '/pricing' },
  openGraph: {
    url: '/pricing',
    images: ['/og.png'],
    title: 'DubCheck Pricing - Free, or €29 once for batch',
    description:
      `Free forever for single files. €${BATCH_PRICE_EUR} once for unlimited batch checking. One payment, no subscription.`,
  },
}

const FAQ = [
  {
    q: 'What is actually free?',
    a: `The app. You check one file per run against all ${SPEC_COUNT} spec profiles across ${PLATFORM_COUNT} platforms and export the signed PDF report. No account, no card, no expiry, no watermark on the report. The free version is not a trial.`,
  },
  {
    q: `What do I get for €${BATCH_PRICE_EUR}?`,
    a: 'Batch. Instead of one file per run you drop a whole folder, a full season or an entire audiobook, and DubCheck checks every file in one pass and adds a summary report across the batch. Same measurement engine, same specs.',
  },
  {
    q: 'Is it really a one-time payment?',
    a: `Yes. €${BATCH_PRICE_EUR} buys a lifetime key. No subscription, no annual renewal. Updates within the major version are free, including new platform specs as they ship.`,
  },
  {
    q: 'Can I try batch before paying?',
    a: 'Yes. The app starts a 7-day batch trial on first launch, no card and no signup. When it ends nothing gets locked, you simply drop back to the free single-file version.',
  },
  {
    q: 'Why is the free version not crippled?',
    a: 'Because a QC tool that hides half its checks behind a paywall is useless for deciding whether to trust it. Every spec, every measurement and the full PDF are in the free version. The paid part is throughput, not accuracy.',
  },
  {
    q: 'Do I need to be online?',
    a: 'Only to download the app. Every check runs locally on your machine, your audio never leaves it, and the free version needs no license check at all.',
  },
  {
    q: 'How many machines can I use my key on?',
    a: 'The key is tied to you, not to a machine. Studio Mac and laptop is exactly what it is for. Just do not hand it around.',
  },
  {
    q: 'Do you offer a refund?',
    a: 'Yes. 14-day money-back guarantee, no questions asked. Email support and we will refund the original payment method.',
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

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/pricing#dubcheck`,
  name: 'DubCheck',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'macOS',
  description:
    'Offline loudness and delivery QC for audiobooks, podcasts, broadcast and streaming. Free for single files, one-time payment for batch checking.',
  url: `${SITE_URL}/pricing`,
  brand: { '@type': 'Brand', name: 'DubCheck' },
  offers: [
    {
      '@type': 'Offer',
      name: 'DubCheck Free',
      priceCurrency: 'EUR',
      price: '0',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/download`,
    },
    {
      '@type': 'Offer',
      name: 'DubCheck Batch',
      priceCurrency: 'EUR',
      price: String(BATCH_PRICE_EUR),
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
    },
  ],
}

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
      <JsonLd data={[productSchema, faqSchema, breadcrumbSchema]} />
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />

        <main className="pt-[60px] pb-[100px]">
          {/* Hero */}
          <header className="max-w-[860px] mx-auto text-center">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Pricing</div>
            <h1 className="text-[34px] md:text-[52px] font-semibold tracking-[-0.025em] leading-[1.08]">
              Free for one file. €{BATCH_PRICE_EUR} once for the whole folder.
            </h1>
            <p className="text-dc-ink2 text-[17px] leading-[1.6] mt-5 max-w-[640px] mx-auto">
              Every spec, every measurement and the full signed PDF are in the free version.
              The only thing you ever pay for is checking more than one file at a time.
            </p>
          </header>

          <PricingCards />

          {/* What is included */}
          <section className="max-w-[860px] mx-auto mt-10">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ In both versions</div>
            <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] mb-6">
              The engine does not change when you pay.
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-dc-ink2 text-[15px]">
              {[
                'EBU 3341/3342 certified BS.1770 engine',
                '66 / 66 conformance tones bit-for-bit match',
                `All ${SPEC_COUNT} spec profiles, ${PLATFORM_COUNT} platforms`,
                'Signed PDF report per file',
                '100% local processing, no upload',
                'Dialog gating, true peak, LRA, channel order',
                'Free updates within the major version',
                'macOS, runs offline',
              ].map(f => (
                <li key={f} className="flex items-start gap-3 py-1">
                  <span className="mt-[8px] inline-block w-[5px] h-[5px] rounded-full bg-dc-ink3" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Service tier (managed QC) */}
          <section className="max-w-[1100px] mx-auto mt-24">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Studio Service · optional</div>
            <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] mb-3">Want us to run the QC for you?</h2>
            <p className="text-dc-ink2 text-[15.5px] leading-[1.7] mb-8 max-w-[680px]">
              The app is the free part. For studios that would rather outsource the final delivery check entirely,
              we also run it as a service: send the masters, get back a signed delivery PDF and a list of any platform spec misses.
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
            <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.02em] mb-4">Not sure it fits your delivery?</h2>
            <p className="text-dc-ink2 text-[15.5px] mb-6">
              Read the use-case breakdown for{' '}
              <Link href="/narrators" className="text-dc-cyan underline underline-offset-2">narrators</Link>
              {' or '}
              <Link href="/studios" className="text-dc-orange underline underline-offset-2">studios</Link>
              , or skim the{' '}
              <Link href="/help" className="text-dc-ink underline underline-offset-2">help docs</Link>{' '}
              to see how the report reads on a real delivery. Then just download it, it costs nothing.
            </p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
