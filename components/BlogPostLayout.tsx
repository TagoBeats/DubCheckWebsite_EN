import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface TldrItem {
  text: React.ReactNode
}

interface BlogPostLayoutProps {
  category: string
  title: string
  date: string
  readingMinutes: number
  tldr: TldrItem[]
  children: React.ReactNode
}

export default function BlogPostLayout({
  category,
  title,
  date,
  readingMinutes,
  tldr,
  children,
}: BlogPostLayoutProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1040px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[120px]">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-dc-ink3 hover:text-dc-ink2 transition-colors mb-10"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[13px] h-[13px]">
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            All articles
          </Link>

          {/* Header */}
          <div className="max-w-[990px]">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-4">
              {category}
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap">
              <span className="rel-author">
                By <a href="/about" rel="author" className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2">Robin Busse</a>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <time dateTime={date}>{formatted}</time>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <span>{readingMinutes} min read</span>
            </div>
          </div>

          {/* Article structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: title,
                description: title,
                image: ['https://audio-dubcheck.com/og.png'],
                datePublished: date,
                dateModified: date,
                author: [{
                  '@type': 'Person',
                  name: 'Robin Busse',
                  url: 'https://audio-dubcheck.com/about',
                }],
                publisher: {
                  '@type': 'Organization',
                  name: 'DubCheck',
                  url: 'https://audio-dubcheck.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://audio-dubcheck.com/logo.svg',
                  },
                },
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': 'https://audio-dubcheck.com/blog',
                },
                articleSection: category,
              }),
            }}
          />

          {/* Divider */}
          <div className="border-t border-white/[0.06] my-10" />

          {/* TL;DR */}
          <div className="max-w-[990px] mb-12">
            <div className="relative pl-5 border-l-2 border-dc-cyan">
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-dc-cyan mb-4">
                TL;DR
              </div>
              <ul className="space-y-3">
                {tldr.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-dc-ink2 leading-[1.65]">
                    <span className="font-mono text-[12px] text-dc-cyan mt-[3px] shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Article */}
          <article className="prose-dubcheck max-w-[990px]">
            {children}
          </article>

          {/* CTA */}
          <div className="max-w-[990px] mt-16">
            <div
              className="rounded-[12px] px-7 py-8 border border-dc-orange/20"
              style={{ background: 'radial-gradient(ellipse 120% 120% at 0% 50%, rgba(255,122,26,0.07) 0%, transparent 70%), #121214' }}
            >
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-dc-orange mb-4">
                Stop checking manually
              </div>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-dc-ink mb-3">
                DubCheck runs all of these checks automatically
              </h2>
              <p className="text-[14.5px] text-dc-ink2 leading-[1.7] mb-6 max-w-[480px]">
                LUFS, True Peak, Noise Floor, and LRA checked against the exact platform spec in one click. Pass/Fail PDF report included. Runs 100% locally on your machine.
              </p>
              <Link
                href="/download"
                className="inline-flex items-center gap-[10px] text-[13.5px] font-semibold px-5 py-[11px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
                style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
              >
                Download free 14-day Pro trial
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[14px] h-[14px]">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}
