'use client'

import { useState } from 'react'

const FAQS = [
  {
    n: 'Q/01',
    q: 'Which streamer specs are supported?',
    a: 'V1 covers Netflix NOLS (including dialog-gated −27 LKFS for Originals), Apple TV+, Disney+, Prime Video, EBU R128 (broadcast), ATSC A/85 (US broadcast) and ACX. New profiles are added based on what early-access partners need. Specs are defined as data, so additions ship as quick updates rather than code releases.',
  },
  {
    n: 'Q/02',
    q: 'How does dialog-gated loudness measurement work?',
    a: 'For Netflix Originals (and similar dialog-gated specs), the loudness target depends on the dialog content of the file. DubCheck detects speech automatically: enough dialog measures against -27 LKFS, less dialog falls back to the -24 LKFS gate. The PDF report transparently states which gate was applied and why, so the result is auditable.',
  },
  {
    n: 'Q/03',
    q: 'How accurate are the measurements?',
    a: 'The engine implements ITU-R BS.1770-4 and is validated against the official EBU 3341/3342 reference test set. All 66 reference tests pass within ±0.1 LU tolerance. True-peak measurement uses 4× oversampling. This is the standard professional broadcasters and streaming QC houses rely on.',
  },
  {
    n: 'Q/04',
    q: 'Is this safe for content under NDA?',
    a: 'Yes. DubCheck runs locally on your studio machine. Files never leave the building, never upload to a server, never get cached in a cloud. Your audio is the most sensitive material in your studio, and it should stay there.',
  },
  {
    n: 'Q/05',
    q: 'Will my IT team need to onboard a new vendor?',
    a: 'No. DubCheck is a standalone application that you install once. There is no cloud account, no server connection, no third-party data flow. ISO 27001 / TPN-certified studios can run it without going through the standard external-vendor risk-assessment process.',
  },
  {
    n: 'Q/06',
    q: 'Does it cover Atmos?',
    a: 'V1 covers 5.1, 7.1 and Atmos via 5.1 rerender, the workaround most studios use today when delivering against streamer specs that themselves are 5.1-based. Native Atmos object-level analysis depends on Dolby renderer licensing and is on the roadmap; we will not promise a date until the licensing path is clear.',
  },
  {
    n: 'Q/07',
    q: 'Why DubCheck if we already run Nugen MasterCheck or iZotope Insight?',
    a: 'Those tools are excellent loudness meters. DubCheck adds the layer above them: it knows the current Netflix / Apple / Disney+ / Prime spec sheets, runs every required check in one pass, and outputs a sign-off-ready PDF for the delivery package. You replace the manual cross-check against multiple PDFs and the Excel QC sheet with a single button.',
  },
  {
    n: 'Q/08',
    q: 'What about the comparison to a 3rd-party QC house?',
    a: '3rd-party QC houses do content QC, watching the picture, listening for issues, catching subjective problems a tool cannot. DubCheck does measurable spec QC, the layer that should never reach the QC house in a failing state. They are complementary, not competitive. Studios using both report fewer iterations and faster sign-off.',
  },
  {
    n: 'Q/09',
    q: 'What happens when streamer specs change?',
    a: 'Specs are versioned in the application. When Netflix or Apple publishes a delivery-bible update, the relevant profile is updated and shipped via app update. The exact spec version used appears on every PDF report, so the delivery is auditable years later.',
  },
  {
    n: 'Q/10',
    q: 'When does V1 ship?',
    a: 'Within 6 weeks of your pre-order. If we miss that window, you get a full automatic refund. The measurement engine is already EBU-certified and feature-complete. V1 is the desktop wrapper (macOS + Windows) and the studio-facing UI.',
  },
]

export default function StudiosFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-[120px]" id="faq">
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
          {' '}I read every studio inquiry personally.
        </p>
      </div>

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
