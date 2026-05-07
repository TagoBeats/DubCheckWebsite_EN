export default function Footer() {
  return (
    <footer className="pt-[60px] pb-12 border-t border-white/[0.04] mt-20">
      {/* Scroll to top */}
      <div className="flex justify-center mb-10">
        <a
          href="#top"
          className="inline-flex items-center gap-[6px] text-[13px] font-semibold px-4 py-[10px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
          style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
            <path d="M8 13V3M4 7l4-4 4 4" />
          </svg>
          Back to top
        </a>
      </div>

      {/* Footer row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: brand + copyright */}
        <div className="flex items-center gap-[10px]">
          <div className="w-[22px] h-[22px] grid place-items-center border border-white/[0.08] rounded-[4px] bg-dc-surface">
            <span
              className="w-[10px] h-[10px] rounded-full bg-dc-cyan"
              style={{ boxShadow: '0 0 10px rgba(34,211,238,0.6), inset 0 0 4px rgba(255,255,255,0.4)' }}
            />
          </div>
          <span className="text-[15px] font-semibold text-dc-ink">DubCheck</span>
          <span className="text-sm text-[var(--ink-3)]">© 2026 DubCheck</span>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          <a href="/imprint" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            Imprint
          </a>
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            Privacy
          </a>
          <a href="mailto:hello@audio-dubcheck.com" className="text-sm text-[var(--ink-3)] font-mono hover:text-white transition-colors duration-150">
            hello@audio-dubcheck.com
          </a>
        </div>
      </div>
    </footer>
  )
}
