import type { Metadata } from 'next'
import Link from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About DubCheck - Built by an audio engineer',
  description:
    'The background behind DubCheck: who builds it, the audio engineering and DSP work it grew out of, and the principles behind running every measurement locally.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    images: ['/og.png'],
    title: 'About DubCheck - Built by an audio engineer',
    description:
      'Background, principles, and the engineering thinking behind a locally-run audio QC tool.',
  },
}

export default function AboutPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[100px]">

          <div className="max-w-[820px] mx-auto">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ About</div>
            <h1 className="text-[32px] md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] mb-8">
              An audio QC tool, built by an audio engineer.
            </h1>

            <div className="text-dc-ink2 text-[16.5px] leading-[1.75] space-y-6">
              <p>
                DubCheck is built and maintained by{' '}
                <Link href="/imprint" className="text-dc-ink underline underline-offset-2">Robin Busse</Link>, an audio engineer and producer based in Germany. It is a one-person operation. Every line of code, every measurement curve, every wording decision on this site is mine.
              </p>

              <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mt-10 mb-3">Background</h2>
              <p>
                The technical foundation comes from a Bachelor of Engineering in Audio Engineering at Hochschule Mittweida. The applied side comes from an internship at NoiseWorks Audio, where I worked on audio software development and DSP prototyping. That combination of work, on the science of how loudness and dynamics are measured, and on the engineering of how those measurements get built into shipping software, is what eventually became DubCheck.
              </p>

              <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mt-10 mb-3">Why it exists</h2>
              <p>
                Every delivery target, whether ACX, EBU R128, Netflix NOLS, ATSC A/85 or anything else, has its own loudness gate, its own true-peak limit, its own dialog rule, its own channel-order convention. Miss one and the file gets bounced, often with no useful explanation beyond "out of spec". Tracking all of that by hand, across multiple platforms, in the final hours before a deadline, is exactly the kind of work software should be doing.
              </p>
              <p>
                DubCheck is the tool I wanted to have on my own deliveries: drop the file in, pick the target, see every threshold the platform actually checks, and walk away with a PDF that documents the result. The measurement core follows ITU-R BS.1770-4 and the EBU 3341/3342 method set, with explicit per-spec gating so the numbers reflect what the platform itself will measure, not a generic approximation.
              </p>

              <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mt-10 mb-3">How the work is done</h2>
              <p>
                Everything runs locally. Files do not leave the machine, there is no upload queue, no cloud storage of confidential audio, no remote rendering of the report. The PDF is written to a path on disk and that is the end of it. The only outbound call the app makes is the update check, and it can be switched off in settings.
              </p>
              <p>
                There are no third-party analytics, no telemetry, no crash reports sent home by default. The product is a tool, not a funnel. When something breaks I would rather hear about it in an email than see it in a dashboard.
              </p>

              <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mt-10 mb-3">Two editions, one engine</h2>
              <p>
                <strong className="text-dc-ink">DubCheck Studios</strong> is the orange edition, aimed at broadcast, streaming and dubbing work: Netflix NOLS, EBU R128, ATSC A/85, Apple TV+, Disney+, Prime Video, YouTube.{' '}
                <strong className="text-dc-ink">DubCheck Narrators</strong> is the cyan edition, aimed at audiobooks and podcasts: ACX, Audible, Storytel, Spotify Audiobooks, Podtrac. The edition is read from the license key. Both share the exact same measurement core, so a number measured in one will match a number measured in the other.
              </p>

              <h2 className="text-dc-ink text-[22px] font-semibold tracking-[-0.02em] mt-10 mb-3">Getting in touch</h2>
              <p>
                The fastest way to reach me is by email. For sales, licensing, NDA-related questions or bug reports, see the{' '}
                <Link href="/contact" className="text-dc-ink underline underline-offset-2">contact page</Link>. For company details and the legal notice, see the{' '}
                <Link href="/imprint" className="text-dc-ink underline underline-offset-2">imprint</Link>.
              </p>
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}
