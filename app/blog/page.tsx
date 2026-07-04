import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog - Loudness, platform specs, delivery',
  description:
    'Guides on loudness standards, platform specs and audio delivery. Written for narrators and mix engineers who want to ship clean masters on the first try.',
  alternates: { canonical: '/blog' },
  openGraph: {
    url: '/blog',
    title: 'DubCheck Blog - Loudness, platform specs, delivery compliance',
    description:
      'Guides on loudness standards, platform specs and audio delivery for narrators and mix engineers.',
  },
}

export default function BlogPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1165px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[100px]">

          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">
            Resources
          </div>
          <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.025em] mb-3">
            Blog
          </h1>
          <p className="text-[17px] text-dc-ink2 leading-[1.7] max-w-[560px] mb-12">
            Loudness, platform specs and delivery - written against the same measurement engine
            that ships inside DubCheck, so the numbers here match what the audit will say.
          </p>

          {/* Spec reference strip */}
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">Spec references</div>
            <Link href="/specs" className="text-[13px] text-dc-ink3 hover:text-dc-ink transition-colors duration-150">
              All specs →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-14">
            {[
              { href: '/specs/acx',      tag: 'ACX / Audible', line: 'RMS, peak, noise floor, MP3 format' },
              { href: '/specs/ebu-r128', tag: 'EBU R128',      line: '-23 LUFS, -1 dBTP, EBU Mode' },
              { href: '/specs/netflix',  tag: 'Netflix',       line: 'Dialog-gated -27 LKFS, -2 dBTP' },
            ].map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="group border border-white/[0.06] bg-dc-surface hover:bg-dc-surf2 rounded-[10px] px-5 py-4 transition-colors duration-150"
              >
                <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-1">{s.tag}</div>
                <div className="text-[13.5px] text-dc-ink3 group-hover:text-dc-ink2 transition-colors duration-150">{s.line}</div>
              </Link>
            ))}
          </div>

          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-4">Latest articles</div>
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-white/[0.06] bg-dc-surface hover:bg-dc-surf2 rounded-[10px] px-6 py-5 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan">
                    {post.category}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
                  <span className="font-mono text-[12px] text-dc-ink3">{post.readingMinutes} min read</span>
                </div>
                <h2 className="text-[18px] font-semibold text-dc-ink group-hover:text-white transition-colors duration-150 leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-[14.5px] text-dc-ink3 leading-[1.6] line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>

          <section className="mt-20 max-w-[720px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] mb-4 text-dc-ink">Articles, not press releases.</h2>
            <p className="text-dc-ink2 text-[15.5px] leading-[1.75]">
              Each article is written against a single source of truth - the measurement engine inside
              DubCheck - not copied from a forum thread from 2014. If there is a topic you wish was here,{' '}
              <Link href="/contact" className="text-dc-ink underline underline-offset-2">tell us</Link>. We write from the inbox.
            </p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
