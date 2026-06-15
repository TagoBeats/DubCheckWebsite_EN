import type { Metadata }   from 'next'
import Nav            from '@/components/Nav'
import Footer         from '@/components/Footer'
import CTABand        from '@/components/CTABand'
import EditionBridge  from '@/components/EditionBridge'
import Hero           from '@/components/narrators/Hero'
import HowItWorks     from '@/components/narrators/HowItWorks'
import Pricing        from '@/components/narrators/Pricing'
import FAQ            from '@/components/narrators/FAQ'
import DubCheckMockup from '@/components/DubCheckMockup'
import DemoSection   from '@/components/DemoSection'

export const metadata: Metadata = {
  title: 'DubCheck for Narrators - ACX QC & PDF',
  description:
    'Stop getting ACX-rejected. DubCheck verifies RMS, peak, noise floor and room tone on every chapter and hands you a clean pass/fail PDF. Lifetime license from €30.',
  alternates: { canonical: '/narrators' },
  openGraph: {
    url: '/narrators',
    title: 'DubCheck for Narrators - ACX QC & PDF',
    description:
      'Verify every chapter against ACX RMS, peak, noise floor and room tone. Pass/fail PDF in seconds.',
  },
}

export default function NarratorsPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />
        <main>
          <Hero />

          {/* Live product demo */}
          <section className="py-[80px]" id="demo">
            <DemoSection
              edition="narrators"
              accent="cyan"
              headline="Watch DubCheck run on a real ACX chapter."
            />
          </section>

          <HowItWorks />
          <Pricing />
          <EditionBridge variant="narrators" />
          <FAQ />
          <CTABand />
        </main>
        <Footer />
      </div>
    </>
  )
}
