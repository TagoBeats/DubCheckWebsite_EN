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

export const metadata: Metadata = {
  title: 'DubCheck for Narrators | ACX spec check & PDF report',
  description:
    'Stop getting ACX-rejected. DubCheck verifies RMS, peak, noise floor and room tone on every chapter and delivers a clean pass/fail PDF, built on an EBU 3341/3342 certified engine. Local processing, lifetime license from €30.',
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
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3 mb-[14px]">
              § 02 · Live Demo
            </div>
            <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.025em] font-semibold mb-[40px] max-w-[22ch]">
              See exactly what you get before you buy.
            </h2>
            <div className="overflow-x-auto pb-2 flex justify-center">
              <DubCheckMockup edition="narrators" />
            </div>
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
