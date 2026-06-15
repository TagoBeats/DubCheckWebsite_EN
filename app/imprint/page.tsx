import type { Metadata } from 'next'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Imprint - Legal information and operator contact',
  description:
    'Legal notice for DubCheck (§5 TMG): operator details, postal address, phone and email contact for Robin Busse, the publisher of audio-dubcheck.com.',
  alternates: { canonical: '/imprint' },
  openGraph: {
    url: '/imprint',
    title: 'Imprint - DubCheck',
    description: 'Legal notice and operator contact for audio-dubcheck.com.',
  },
  robots: { index: true, follow: true },
}

export default function ImprintPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[900px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[80px]">
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Legal</div>
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

            <div className="space-y-2">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Responsible for content</h2>
              <p>Robin Busse, Westgasse 6, 04509 Löbnitz, Germany (per § 18 Abs. 2 MStV).</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Liability for content</h2>
              <p>
                As a service provider we are responsible for our own content on this website according to § 7 (1) TMG and the general laws. According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this respect, however, is only possible from the point in time at which a concrete infringement of the law becomes known. As soon as we become aware of such infringements, we will remove this content immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Liability for links</h2>
              <p>
                Our offer contains links to external websites of third parties whose content we have no influence over. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. Permanent monitoring of the content of the linked pages is not reasonable without concrete indications of an infringement. If we become aware of any infringements of the law, we will remove such links immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Copyright</h2>
              <p>
                The content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. If you become aware of a copyright infringement, please notify us. As soon as we become aware of any infringements, we will remove such content immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-dc-ink font-semibold text-[16px] mb-2">Dispute resolution</h2>
              <p>
                The European Commission provides a platform for online dispute resolution (OS) at{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-dc-ink underline underline-offset-2">
                  ec.europa.eu/consumers/odr
                </a>
                . We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>

            <p className="font-mono text-[12px] text-dc-ink3">Imprint generated with reference to eRecht24 templates.</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
