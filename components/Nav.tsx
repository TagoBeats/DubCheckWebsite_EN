'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const STATIC_LINKS = [
  { href: '/narrators', label: 'Narrators' },
  { href: '/studios',   label: 'Studios' },
  { href: '/blog',      label: 'Blog' },
  { href: '/help',      label: 'Help' },
  { href: '/about',     label: 'About' },
  { href: '/download',  label: 'Download' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const base = pathname.startsWith('/studios') ? '/studios' : '/narrators'

  const onPersonaPage = pathname.startsWith('/narrators') || pathname.startsWith('/studios')
  const contextLinks = onPersonaPage
    ? [...STATIC_LINKS, { href: `${base}#faq`, label: 'FAQ' }]
    : STATIC_LINKS

  const pricingHref = `${base}#pricing`

  return (
    <nav className="flex items-center justify-between py-[22px] border-b border-white/[0.04] relative z-10">

      {/* Brand */}
      <Link href="/" className="flex items-center gap-[10px]">
        <img src="/logo.svg" alt="DubCheck" width={22} height={22} className="block" />
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-dc-ink">DubCheck</span>
        <span className="font-mono text-[12px] text-dc-ink3 border border-white/[0.08] px-[6px] py-[2px] rounded-[3px] tracking-[0.08em] ml-1">
          QC / v2.4
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-7 text-[13.5px] text-dc-ink2">
        {contextLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-dc-ink transition-colors duration-150"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex gap-[10px] items-center">
        <Link
          href="/download"
          className="inline-flex items-center gap-[10px] text-[13.5px] font-semibold px-4 py-[10px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
          style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
        >
          Free trial
          <ArrowRight />
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={`block w-5 h-[1.5px] bg-dc-ink transition-all duration-200 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
        <span className={`block w-5 h-[1.5px] bg-dc-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-[1.5px] bg-dc-ink transition-all duration-200 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 md:hidden border-b border-white/[0.08] py-4 px-6 flex flex-col gap-4 z-50"
          style={{ background: 'linear-gradient(180deg, #1A1A1E 0%, #131316 100%)' }}
        >
          {contextLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[15px] text-dc-ink2 hover:text-dc-ink transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-[10px] text-[14px] font-semibold px-4 py-[12px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150 mt-2"
            style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
          >
            Free trial
            <ArrowRight />
          </Link>
        </div>
      )}
    </nav>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
