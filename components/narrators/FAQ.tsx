'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'

type Faq = { n: string; q: string; a: ReactNode }

const FAQS: Faq[] = [
  {
    n: 'Q/01',
    q: 'Does this guarantee ACX accepts my book?',
    a: (
      <>
        No. DubCheck guarantees that the four measurable specs ACX cares about RMS, peak, noise floor and room tone are correctly measured and reported. ACX may still reject a file for content-quality reasons (mouth clicks, breath issues, performance, lip-sync). What DubCheck eliminates are the technical reject reasons. Your ear handles the rest.{' '}
        <Link href="/blog/acx-submission-rejected" className="text-dc-cyan underline underline-offset-2 hover:text-dc-ink transition-colors">
          Read the full guide to every technical ACX reject reason →
        </Link>
      </>
    ),
  },
  {
    n: 'Q/02',
    q: 'How accurate are the measurements?',
    a: 'The measurement engine is built on ITU-R BS.1770-4 algorithms and validated against the official EBU 3341/3342 reference test set. All 66 reference tests pass within ±0.1 LU tolerance. This is the same standard used by professional broadcasters and streaming QC houses.',
  },
  {
    n: 'Q/03',
    q: 'Will my audio files be uploaded anywhere?',
    a: 'No. DubCheck runs locally on your machine. Files never leave your computer, never upload to a server, never get cached in a cloud. This is intentional, it solves the NDA and confidentiality concerns many professional narrators have.',
  },
  {
    n: 'Q/04',
    q: 'Which platforms are supported?',
    a: 'DubCheck covers ACX (Audible), Spotify Audiobooks, Storytel, Podtrac and EBU R128. New platform specs are added based on what customers need - drop us a note if a spec is missing. Most can be added quickly because specs are defined as data, not code.',
  },
  {
    n: 'Q/05',
    q: 'Which file formats do you accept?',
    a: 'WAV (PCM 16/24/32-bit), MP3 (192 kbps, the ACX delivery format), FLAC and AIFF. Both your unmastered source files and finished ACX-format MP3s work. You can verify the spec at every stage of your workflow.',
  },
  {
    n: 'Q/06',
    q: 'Can I try it before I buy?',
    a: 'Yes. Download DubCheck and you automatically get a 7-day free trial of the Pro edition - no account, just your email. Run full batches of your chapters through ACX, Spotify and Storytel profiles locally. If it earns its keep, claim the 50% Early Bird license before 31 July 2026. If not, walk away with zero friction.',
  },
  {
    n: 'Q/07',
    q: 'How is this different from the free ACX Check tool?',
    a: 'ACX Check (Tony Maro) is a great free tool and we respect it. DubCheck differs in three ways: the measurement engine is EBU-certified rather than ad-hoc, the report is a clean PDF you can share with your producer or coach, and it covers multiple platforms in one tool (ACX, Spotify, Storytel, EBU R128) rather than ACX-only.',
  },
  {
    n: 'Q/08',
    q: 'What happens if I find a bug or want a feature?',
    a: 'Every customer gets direct email access to the developer. Feedback shapes the roadmap directly. The Pro tier includes priority support with a 24-hour response time.',
  },
]

export default function NarratorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-[120px]" id="faq">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 07 · Questions</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Frequently asked questions.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Anything else? Email{' '}
          <a href="mailto:info@audio-dubcheck.com" className="font-mono text-dc-ink2 underline underline-offset-2 hover:text-dc-ink transition-colors">
            info@audio-dubcheck.com
          </a>
          {' '}I read every message personally.
        </p>
      </div>

      {/* Accordion */}
      <div className="border-t border-white/[0.08]">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.n} className="border-b border-white/[0.08]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between py-[22px] px-[4px] text-left group cursor-pointer"
              >
                <div className="flex items-center gap-[14px]">
                  <span className="font-mono text-[12px] text-dc-ink3 shrink-0 w-[36px]">{faq.n}</span>
                  <span className="text-[15px] font-semibold tracking-[-0.005em]">{faq.q}</span>
                </div>
                <span
                  className="text-dc-ink3 text-[20px] leading-none shrink-0 ml-4 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-dc-ink2 text-[13.5px] leading-[1.6] pl-[54px] pr-[40px] pb-[22px]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
