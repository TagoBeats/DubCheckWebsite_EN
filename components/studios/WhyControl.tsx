const REASONS = [
  {
    n: '01',
    title: 'Server-side normalization is silent',
    body: 'Netflix has become more lenient on small spec misses, but instead of rejecting, they auto-normalize your mix before the viewer hears it. Your dialog level, your dynamic range, your intent: silently overridden.',
    accent: 'text-dc-cyan',
  },
  {
    n: '02',
    title: 'Redeliveries kill your margin',
    body: 'A reject means that you have to reopen the session, track down the error, re-bounce, and re-upload. A single technical rejection loop on a feature film mix costs you a lot of time and real money.',
    accent: 'text-dc-orange',
  },
  {
    n: '03',
    title: 'Multi-platform deliveries multiply the risk',
    body: 'A single localized title often ships to four streamers, each with a slightly different spec sheet. Manually checking each one against the latest delivery bible is the kind of work that fails silently.',
    accent: 'text-dc-cyan',
  },
  {
    n: '04',
    title: 'Proof of compliance',
    body: 'Your name is in the credits. Protect your reputation with concrete proof. The DubCheck PDF certificate serves as your technical shield against studio heads or clients. You know the file will pass before you even send it off.',
    accent: 'text-dc-orange',
  },
]

export default function StudiosWhyControl() {
  return (
    <section className="py-[120px]" id="why">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3">§ 02 · THE DELIVERY REALITY</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[20ch]">
            Handing off your mix shouldn't be a gamble.
          </h2>
        </div>
        <p className="max-w-[40ch] text-dc-ink2 text-[15px] md:shrink-0">
          The post-production landscape has changed. Between strict automated QC bots,
          shifting delivery bibles, and silent server-side normalization,
          hitting "export" feels riskier than ever. DubCheck removes the guesswork.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REASONS.map(r => (
          <div
            key={r.n}
            className="border border-white/[0.08] rounded-[12px] p-[28px_28px] bg-dc-surface relative"
          >
            <div className={`font-mono text-[11px] tracking-[0.14em] uppercase mb-3 ${r.accent}`}>
              § {r.n}
            </div>
            <h3 className="text-[18px] font-semibold tracking-[-0.005em] mb-[10px]">
              {r.title}
            </h3>
            <p className="text-[14px] text-dc-ink2 leading-[1.6]">
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
