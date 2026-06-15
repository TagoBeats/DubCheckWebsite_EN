const STEPS = [
  {
    n: '01',
    title: 'Drop your final mix + M&E',
    body: 'WAV, BWAV, RF64. Stereo, 5.1, 7.1 or Atmos rerender. Files never leave your studio. DubCheck runs locally, no cloud, no telemetry.',
  },
  {
    n: '02',
    title: 'Select your delivery platform',
    body: 'Netflix NOLS, Apple TV+, Disney+, Prime Video or EBU R128. Multi-spec runs in one pass, so a single delivery covers all your streamer obligations.',
  },
  {
    n: '03',
    title: 'DubCheck verifies every measurable spec',
    body: 'Integrated loudness, true peak, dialog gating, LRA, Silence detection, channel routing, sample rate, bit depth, file integrity. Pass / fail per check.',
  },
  {
    n: '04',
    title: 'Sign-off-ready PDF report',
    body: 'A clean, auditable report you attach to the delivery. Producers get a clear pass/fail at the top, full measurement detail underneath. No more Excel QC sheets.',
  },
]

export default function StudiosHowItWorks() {
  return (
    <section className="py-[120px]" id="how">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 03 · Workflow</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Verify in seconds. Deliver with confidence.
          </h2>
        </div>
        <p className="max-w-[40ch] text-dc-ink2 text-[15px] md:shrink-0">
          DubCheck runs alongside your DAW. No plugin, no session integration, no
          workflow rewrite. Drop the master, get the verdict, ship the file.
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
