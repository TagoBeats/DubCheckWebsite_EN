export default function CTABand() {
  return (
    <section className="py-[120px]" id="cta">
      <div
        className="border border-white/[0.08] rounded-[14px] p-[56px_48px] flex flex-col items-center text-center relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 100% at 100% 50%, rgba(255,122,26,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 100% at 0% 50%, rgba(34,211,238,0.08) 0%, transparent 60%),
            linear-gradient(180deg, #18181C 0%, #131316 100%)
          `,
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3 mb-[14px]">
          § 08 · Support &amp; Feedback
        </div>
        <h2 className="text-[26px] md:text-[40px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] font-semibold mb-[10px] max-w-[24ch]">
          Missing a delivery spec? Question about the report?
        </h2>
        <p className="text-dc-ink2 text-[15px] max-w-[54ch] mb-8">
          DubCheck is constantly being extended with new platform specs. Reach out directly
          if you need a specific standard for an upcoming project, or want to share feedback.
        </p>

        <a
          href="mailto:hello@audio-dubcheck.com"
          className="inline-flex items-center gap-[10px] text-[14px] font-semibold px-5 py-[13px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
          style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-[16px] h-[16px]">
            <path d="M3 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3Zm-.293 1h14.586l-6.94 5.215a.5.5 0 0 1-.606 0L2.707 5ZM2 6.332l6.447 4.846a1.5 1.5 0 0 0 1.806 0L17 6.332V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.332Z" />
          </svg>
          Send a message
        </a>
        <span className="text-sm text-[var(--ink-3)] font-mono mt-3">hello@audio-dubcheck.com</span>
      </div>
    </section>
  )
}
