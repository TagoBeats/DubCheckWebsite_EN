export default function ReportShowcase() {
  return (
    <section className="py-[120px]" id="report">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 02 · Report</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Ein signiertes PDF, das dein Delivery Manager ohne Rückfragen akzeptiert.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Jeder Messwert ist fest an einen Timecode geknüpft, jeder Fail direkt in der Timeline.
          Keine schnellen Screenshots, keine endlosen Slack-Threads, sondern ein technischer
          Nachweis auf Engineering-Niveau, den du direkt an dein Delivery anhängst.
        </p>
      </div>

      {/* Mac window */}
      <div
        className="rounded-[12px] overflow-hidden border border-white/[0.08]"
        style={{
          background: 'linear-gradient(180deg, #1A1A1E 0%, #131316 100%)',
          boxShadow: '0 60px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Chrome */}
        <div
          className="flex items-center gap-2 px-[14px] py-3 border-b border-white/[0.08]"
          style={{ background: 'linear-gradient(180deg, #202024 0%, #1A1A1E 100%)' }}
        >
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
          <div className="flex-1 text-center font-mono text-[12px] text-dc-ink3 tracking-[0.06em]">
            <b className="text-dc-ink2 font-medium">DubCheck Report</b>
            {' · chapter_01_final.wav · ACX · AudioBook Edition'}
          </div>
          <span className="font-mono text-[12px] text-dc-ink4">r-7F3A9B2</span>
        </div>

        {/* PDF embed */}
        <iframe
          src="/narrators_report.pdf#toolbar=0&navpanes=0&view=FitH"
          className="block w-full h-[500px] md:h-[700px] bg-white"
          style={{ border: 'none' }}
          title="DubCheck Test Report"
        />
      </div>

      {/* Download button */}
      <div className="flex justify-end mt-6">
        <a
          href="/narrators_report.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[6px] font-mono text-[12px] tracking-[0.06em] text-white transition-all hover:brightness-110"
          style={{
            background: 'linear-gradient(180deg, #FF7A1A 0%, #E06410 100%)',
            boxShadow: '0 2px 12px rgba(255,122,26,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" />
          </svg>
          Download Sample Report
        </a>
      </div>
    </section>
  )
}
