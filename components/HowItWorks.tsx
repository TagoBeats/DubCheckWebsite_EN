const STEPS = [
  {
    num: '01',
    label: 'SUBMIT',
    title: 'Sende uns deinen Printmaster oder das Stem-Package.',
    body: 'Secure Ingest via Aspera, MASV oder WeTransfer. Voller Support für WAV, BWAV und RF64 (16/24/32-bit float).',
    mini: ['ingest KRONOS_S02E04_v7.wav --secure_drop'],
  },
  {
    num: '02',
    label: 'MEASURE',
    title: 'Wir binden das Delivery-Profil und starten die Engine.',
    body: 'Deep-Scan deines Mixes. ITU-R BS.1770-4, Integrated Loudness, LRA und 4× OS True-Peak (soxr VHQ). Dazu striktes Channel-Routing, Format-Sanity und KI-basiertes Dialog-Gating (Silero VAD) für komplexe Streamer-Specs.',
    mini: ['dubcheck run --profile netflix_51 --target -27'],
  },
  {
    num: '03',
    label: 'DELIVER',
    title: 'Der fertige Report für dein Delivery.',
    body: 'Du erhältst ein manipulationssicheres, signiertes PDF. Jeder Fail ist mit exaktem Timecode dokumentiert. Ein wasserdichter Nachweis, 100 % Delivery-ready.',
    mini: ['report_KRONOS_v7.pdf · SHA-256 signed'],
  },
]

export default function HowItWorks() {
  return (
    <section className="py-[120px]" id="how">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 04 · Workflow</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Drei Schritte. Keine Plugin-Installation. Kein erneutes Rendern.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Du übermittelst uns deine Mixes über deinen präferierten Studio-Link.
          Die QC-Engine läuft dediziert und offline, volle Diskretion für deine Assets. Keine Cloud-Verarbeitung, keine Leaks.
          Rohdaten werden nach 14 Tagen gelöscht.
        </p>
      </div>

      {/* 3-column grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-[12px] overflow-hidden border border-white/[0.08]"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {STEPS.map(step => (
          <div key={step.num} className="bg-dc-bg px-7 py-8 min-h-[220px] relative">
            <div className="flex items-center gap-[10px] font-mono text-[12px] text-dc-ink3 tracking-[0.14em] mb-[18px]">
              {step.num}
              <div className="flex-1 h-px bg-white/[0.04]" />
              <span>{step.label}</span>
            </div>
            <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">{step.title}</h3>
            <p className="text-dc-ink2 text-[14px] leading-[1.55] max-w-[34ch]">{step.body}</p>
            <div className="mt-[18px] font-mono text-[12px] text-dc-ink3 leading-[1.7]">
              {step.mini.map(line => <div key={line}>{line}</div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
