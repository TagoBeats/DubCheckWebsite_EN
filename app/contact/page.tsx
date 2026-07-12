import type { Metadata } from 'next'
import Link from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact DubCheck - Support, sales, licensing, NDA',
  description:
    'Reach DubCheck for support, sales, licensing, or NDA questions. Email, phone, postal address, and what to include in a support request.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    images: ['/og.png'],
    title: 'Contact DubCheck',
    description:
      'Email, phone and postal address for DubCheck support, sales, and licensing.',
  },
}

export default function ContactPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[100px] max-w-[820px]">

          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Contact</div>
          <h1 className="text-[32px] md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] mb-6">
            Get in touch.
          </h1>
          <p className="text-dc-ink2 text-[17px] leading-[1.7] mb-12 max-w-[640px]">
            Email is the fastest channel. I answer support requests in the order they arrive, usually within one working day, often the same day.
          </p>

          <div className="mb-12">
            <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-orange mb-2">Support / general</div>
              <a href="mailto:info@audio-dubcheck.com" className="text-dc-ink text-[18px] font-semibold underline underline-offset-2 hover:text-white transition-colors">
                info@audio-dubcheck.com
              </a>
              <p className="text-dc-ink3 text-[14px] leading-[1.6] mt-3">
                License keys, install issues, report questions, bug reports.
              </p>
            </div>
          </div>

          <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mb-3">What to include in a support request</h2>
          <p className="text-dc-ink2 text-[15.5px] leading-[1.7] mb-3">
            Sending these in the first email cuts the back-and-forth roughly in half:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-dc-ink2 text-[15.5px] leading-[1.7] mb-10">
            <li>macOS version (Apple menu → About this Mac)</li>
            <li>DubCheck version (License screen → About)</li>
            <li>License tier and order number, if the question is licensing-related</li>
            <li>The exact spec you ran the file against</li>
            <li>The PDF report DubCheck generated, if one exists</li>
            <li>The input file, if you are allowed to share it (otherwise: a short description of format, sample rate, bit depth, channels, and duration)</li>
          </ul>

          <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mb-3">NDA, procurement, invoicing</h2>
          <p className="text-dc-ink2 text-[15.5px] leading-[1.7] mb-10">
            For NDA, sub-processor questionnaires, or alternative invoicing terms (PO, net 30, etc.), email{' '}
            <a href="mailto:info@audio-dubcheck.com" className="text-dc-ink underline underline-offset-2">info@audio-dubcheck.com</a>. DubCheck does not store, transmit, or process customer audio at any point, which usually shortens the questionnaire significantly.
          </p>

          <p className="text-dc-ink3 text-[14px] leading-[1.7]">
            Looking for the legal notice instead? See the{' '}
            <Link href="/imprint" className="text-dc-ink underline underline-offset-2">imprint</Link>.
          </p>
        </main>
        <Footer />
      </div>
    </>
  )
}
