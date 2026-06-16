import type { Metadata }   from 'next'
import Nav            from '@/components/Nav'
import Footer         from '@/components/Footer'
import CTABand        from '@/components/CTABand'
import EditionBridge  from '@/components/EditionBridge'
import Hero           from '@/components/studios/Hero'
import WhyControl     from '@/components/studios/WhyControl'
import HowItWorks     from '@/components/studios/HowItWorks'
import Pricing        from '@/components/studios/Pricing'
import Testimonials   from '@/components/Testimonials'
import FAQ            from '@/components/studios/FAQ'
import DubCheckMockup from '@/components/DubCheckMockup'
import DemoSection   from '@/components/DemoSection'

export const metadata: Metadata = {
  title: 'DubCheck for Studios - Multi-platform delivery QC',
  description:
    'Verify final mixes against Netflix NOLS, Apple TV+, Disney+ and Prime specs in one pass. NDA-safe, fully local, with an auditable PDF report for every delivery.',
  alternates: { canonical: '/studios' },
  openGraph: {
    url: '/studios',
    title: 'DubCheck for Studios - Multi-platform delivery QC',
    description:
      'Verify mixes against Netflix, Apple TV+, Disney+ and Prime specs in one pass. NDA-safe, local, auditable.',
  },
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
            <DemoSection
              edition="studios"
              accent="orange"
              headline="Watch DubCheck run on a real Netflix delivery."
            />
          </section>

          <WhyControl />
          <HowItWorks />
          <Testimonials edition="studios" />
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
