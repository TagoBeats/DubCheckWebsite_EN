/* Pre-compute meter bar heights (seeded RNG, same algo as original) */
function buildMeterBars() {
  let seed = 3
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  return Array.from({ length: 48 }, (_, i) => {
    const t    = i / 47
    const base = Math.pow(Math.sin(t * Math.PI * 0.9 + 0.2), 2)
    const jitter = 0.75 + 0.25 * rnd()
    return Math.max(8, base * jitter * 86)
  })
}

const METER_BARS = buildMeterBars()

const SPECS = [
  {
    idx: '01',
    title: 'ITU-R BS.1770-4 Loudness',
    body: 'Momentary, Short-term und Integrated LUFS. Exakt gemessen mit normgerechtem K-Weighting und dem strikten -70 / -10 LU Gating.',
    tag: 'BS.1770-4',
  },
  {
    idx: '02',
    title: '4× oversampled True-Peak',
    body: 'Inter-Sample-Detection mit höchster Präzision (soxr VHQ). Konfigurierbare Ceilings pro Profil. Keine übersehenen Peaks auf hart limitierten Stems.',
    tag: 'dBTP · 4× OS',
  },
  {
    idx: '03',
    title: 'KI-gestütztes Dialog-Gating',
    body: 'Modernste Voice-Activity-Detection analysiert den Sprachanteil. Dynamischer Wechsel auf BS.1770-1 bei über 15 % Dialog-Ratio nach offiziellem Streamer-Standard.',
    tag: 'Silero VAD',
  },
  {
    idx: '04',
    title: 'Channel-Routing & Format-Sanity',
    body: 'Strikte Prüfung der SMPTE-Kanalzuordnung. Identifiziert LFE-Fehler, DC-Offsets und ungültige Bit-Tiefen, bevor dein File abgelehnt wird.',
    tag: '5.1 / Stereo / 7.1.4 ',
  },
  {
    idx: '05',
    title: 'Signiertes Prüfprotokoll',
    body: 'Kryptografische Signatur über Datei-Hash, Profil-Version und Messergebnisse. Ein auditierbarer Beweis für dein Delivery, kein billiger Screenshot.',
    tag: 'SHA-256',
    last: true,
  },
]

export default function SpecDetail() {
  return (
    <section className="py-[120px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 05 · Engine</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Messwerte, die in jedem Delivery-Review standhalten.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Jeder Wert im DubCheck-Report ist zu 100 % reproduzierbar.
          Gleicher Input, gleiches Profil, exakt dieselbe Zahl.
          Absolute Engineering-Parität mit den Referenz-Metern der Ingest-Server auf der anderen Seite.
        </p>
      </div>

      {/* Split layout */}
      <div className="grid gap-10 items-center grid-cols-1 lg:grid-cols-[1.1fr_1fr]">

        {/* Spec list */}
        <div className="border-t border-white/[0.04]">
          {SPECS.map(s => (
            <div
              key={s.idx}
              className={`grid gap-[18px] py-[18px] items-baseline ${s.last ? '' : 'border-b border-white/[0.04]'}`}
              style={{ gridTemplateColumns: '28px 1fr auto' }}
            >
              <span className="font-mono text-[12px] text-dc-ink3 pt-[2px]">{s.idx}</span>
              <div>
                <h4 className="text-[17px] font-semibold tracking-[-0.005em] mb-1">{s.title}</h4>
                <p className="text-dc-ink2 text-[13.5px] max-w-[44ch]">{s.body}</p>
              </div>
              <span className="font-mono text-[12px] text-dc-ink3 border border-white/[0.08] px-2 py-1 rounded-[3px] tracking-[0.06em] self-start">
                {s.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Meter card */}
        <div
          className="border border-white/[0.08] rounded-[12px] p-[22px]"
          style={{ background: 'linear-gradient(180deg, #17171A 0%, #131316 100%)' }}
        >
          {/* Head */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-mono text-[12px] text-dc-ink3 tracking-[0.14em] uppercase">Live · Integrated</div>
              <div className="font-mono text-[28px] text-dc-ink mt-1">
                –24.0<span className="text-[13px] text-dc-ink3 ml-1">LUFS</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[12px] text-dc-ink3 tracking-[0.14em] uppercase">Peak</div>
              <div className="font-mono text-[16px] text-dc-red mt-1">–2.1 dBTP</div>
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-[3px] h-[86px] mb-[14px]">
            {METER_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-[1px] opacity-85"
                style={{
                  height: `${h.toFixed(1)}px`,
                  background: i > 44
                    ? 'linear-gradient(180deg, #FF3B47 0%, rgba(255,59,71,0.3) 100%)'
                    : i > 39
                    ? 'linear-gradient(180deg, #FF7A1A 0%, rgba(255,122,26,0.3) 100%)'
                    : 'linear-gradient(180deg, #22D3EE 0%, rgba(34,211,238,0.3) 100%)',
                }}
              />
            ))}
          </div>

          {/* Scale */}
          <div className="flex justify-between font-mono text-[12px] text-dc-ink4 border-t border-white/[0.04] pt-2">
            {['-60','-48','-36','-24','-18','-12','-6','0'].map(v => <span key={v}>{v}</span>)}
          </div>

          {/* Metrics grid */}
          <div className="mt-[22px] border-t border-white/[0.04] pt-4 grid grid-cols-2 gap-[14px]">
            {[
              { k: 'LRA',         v: '11.4 LU' },
              { k: 'DIALOG',      v: '–26.8 LKFS' },
              { k: 'SAMPLE RATE', v: '48.0 kHz' },
              { k: 'BIT DEPTH',   v: '24 bit' },
            ].map(m => (
              <div key={m.k}>
                <div className="font-mono text-[12px] text-dc-ink3 tracking-[0.12em] uppercase">{m.k}</div>
                <div className="font-mono text-[16px] text-dc-ink mt-1">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
