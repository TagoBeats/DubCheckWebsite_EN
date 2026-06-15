import type { Metadata }   from 'next'
import Nav            from '@/components/Nav'
import Footer         from '@/components/Footer'
import CTABand        from '@/components/CTABand'
import EditionBridge  from '@/components/EditionBridge'
import Hero           from '@/components/studios/Hero'
import WhyControl     from '@/components/studios/WhyControl'
import HowItWorks     from '@/components/studios/HowItWorks'
import Pricing        from '@/components/studios/Pricing'
import FAQ            from '@/components/studios/FAQ'
import DubCheckMockup from '@/components/DubCheckMockup'

export const metadata: Metadata = {
  title: 'DubCheck for Studios | Multi-platform delivery QC',
  description:
    'Verify final mixes against Netflix NOLS, Apple TV+, Disney+ and Prime delivery specs in one pass. Local processing, EBU 3341/3342 certified engine, NDA-safe, auditable PDF report.',
}

export default function StudiosPage() {
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
              <DubCheckMockup edition="studios" />
            </div>
          </section>

          <WhyControl />
          <HowItWorks />
          <Pricing />
          <EditionBridge variant="studios" />
          <FAQ />
          <CTABand />
        </main>
        <Footer />
      </div>
    </>
  )
}
