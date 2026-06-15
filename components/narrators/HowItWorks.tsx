const STEPS = [
  {
    n: '01',
    title: 'Drop your chapter',
    body: 'WAV, MP3, FLAC or AIFF. One file or a whole audiobook batch. Files never leave your machine.',
  },
  {
    n: '02',
    title: 'DubCheck runs the spec checks',
    body: 'RMS, peak, noise floor and room tone are measured against ACX, Spotify Audiobooks or Storytel specs in seconds.',
  },
  {
    n: '03',
    title: 'Get a clear PDF report',
    body: 'Pass / fail per chapter. Specific values for every measurement. Clear notes if something is out of range.',
  },
  {
    n: '04',
    title: 'Fix and re-check',
    body: 'Adjust your master in your DAW, drop the file in again, verify it passes before you upload to ACX.',
  },
]

export default function NarratorHowItWorks() {
  return (
    <section className="py-[120px]" id="how">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 03 · Workflow</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Drop a file. Get the verdict.
          </h2>
        </div>
        <p className="max-w-[40ch] text-dc-ink2 text-[15px] md:shrink-0">
          The same engine professional broadcasters use, packaged into a tool a solo
          narrator can run in under 10 seconds. No DAW plugin. No cloud. No login.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map(step => (
          <div
            key={step.n}
            className="border border-white/[0.08] rounded-[12px] p-[24px_22px] bg-dc-surface flex flex-col"
          >
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">
              Step {step.n}
            </div>
            <h3 className="text-[17px] font-semibold tracking-[-0.005em] mb-[10px]">
              {step.title}
            </h3>
            <p className="text-[13.5px] text-dc-ink2 leading-[1.6]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
