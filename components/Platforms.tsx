const PLATFORMS = [
  {
    name: 'Netflix',
    version: 'profile_netflix · v1.6 · 2024',
    rows: [
      { l: 'Integrated',   v: '-27.0 LKFS' },
      { l: 'True peak',    v: '≤ -2.0 dBTP' },
      { l: 'Tolerance',       v: '± 2.0 LU' },
      { l: 'Dialog',          v: '≥ 15% Speech' },
      { l: 'Sample rate',  v: '48.0 kHz' },
    ],
  },
  {
    name: 'EBU R128',
    version: 'profile_ebu_r128 · v5.0 · 2023',
    rows: [
      { l: 'Integrated',  v: '–23.0 LUFS' },
      { l: 'True peak',   v: '–1.0 dBTP' },
      { l: 'LRA',         v: '≤ 18 LU' },
      { l: 'Tolerance',   v: '±0.5 LU' },
      { l: 'Gate',        v: '–70 / –10 LU' },
    ],
  },
  {
    name: 'Theatrical',
    version: 'profile_theatrical · Cinema',
    rows: [
      { l: 'Integrated',  v: '–27.0 LKFS' },
      { l: 'True peak',   v: '≤ -2.0 dBTP' },
      { l: 'Severity',      v: 'fail' },
      { l: 'Bed',         v: '5.1 / Atmos' },
      { l: 'Focus',     v: 'experience' },
    ],
  },
  {
    name: 'ATSC A/85',
    version: 'profile_atsc · A/85:2013',
    rows: [
      { l: 'Integrated',   v: '-24.0 LKFS' },
      { l: 'True peak',        v: '≤ -2.0 dBTP' },
      { l: 'Bed',         v: '5.1 / 7.1 / Atmos' },
      { l: 'Tolerance',   v: '± 2.0 LU' },
      { l: 'Gate',  v: 'Dialog Anchor' },
    ],
  },
]

export default function Platforms() {
  return (
    <section className="py-[120px]" id="platforms">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 03 · Spec profiles</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Die Delivery-Specs jeder Plattform. Immer aktuell, <br className="hidden md:block" />
            damit du keine Changelogs lesen musst.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Wir tracken 18 aktive Profile über 7 Anbieter und updaten die Targets am Tag der Änderung.
          Hier sind vier Beispiele - jedes mit einem vollständigen Regelwerk im Report, signiert auf Basis der am QC-Tag gültigen Version.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORMS.map(p => (
          <div
            key={p.name}
            className="border border-white/[0.08] bg-dc-surface rounded-[10px] p-[22px] relative overflow-hidden transition-all duration-200 hover:border-white/[0.14] hover:bg-dc-surf2"
          >
            <h4 className="text-[15px] font-semibold tracking-[-0.005em] mb-[2px]">{p.name}</h4>
            <div className="font-mono text-[12px] text-dc-ink3 mb-[18px]">{p.version}</div>
            {p.rows.map((row, i) => (
              <div
                key={row.l}
                className={`flex justify-between py-2 text-[12.5px] ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
              >
                <span className="font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">{row.l}</span>
                <span className="font-mono text-dc-ink">{row.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
