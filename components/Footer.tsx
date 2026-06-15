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
          <img src="/logo.svg" alt="DubCheck" width={22} height={22} decoding="async" className="block" />
          <span className="text-[15px] font-semibold text-dc-ink">DubCheck</span>
          <span className="text-sm text-[var(--ink-3)]">© 2026 DubCheck</span>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          <a href="/about" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            About
          </a>
          <a href="/contact" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            Contact
          </a>
          <a href="/imprint" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            Imprint
          </a>
          <a href="/privacy" className="text-sm text-[var(--ink-3)] hover:text-white transition-colors duration-150">
            Privacy
          </a>
          <a href="mailto:info@audio-dubcheck.com" className="text-sm text-[var(--ink-3)] font-mono hover:text-white transition-colors duration-150">
            info@audio-dubcheck.com
          </a>
        </div>
      </div>
    </footer>
  )
}
