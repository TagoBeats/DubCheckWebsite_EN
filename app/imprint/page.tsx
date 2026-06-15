import type { Metadata } from 'next'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Imprint | DubCheck',
}

export default function ImprintPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[900px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[80px]">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Legal</div>
          <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em] mb-8">Imprint</h1>

          <div className="text-dc-ink2 text-[15px] leading-[1.7] space-y-6">
            <div className="space-y-1">
              <p>Robin Busse</p>
              <p>Westgasse 6</p>
              <p>04509 Löbnitz</p>
              <p>Germany</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Contact</h2>
              <p>Phone: +49 1624961133</p>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@audio-dubcheck.com" className="text-dc-ink underline underline-offset-2">
                  info@audio-dubcheck.com
                </a>
              </p>
            </div>

            <p className="font-mono text-[11px] text-dc-ink3">Source: eRecht24</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
