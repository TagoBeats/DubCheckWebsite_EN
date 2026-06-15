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
          <div className="text-[17px] text-dc-ink2 leading-[1.7] max-w-[640px] mb-14 space-y-5">
            <p>
              Guides on loudness standards, platform specs and audio delivery. Written for narrators and mix engineers who want to get the file right the first time - instead of redelivering after rejection.
            </p>
            <p>
              We cover the things the platform spec sheets do not: why ACX rejects a chapter even though your DAW says it is in spec, what a Netflix dialog-gated measurement actually does to your numbers, where EBU R128 short-form differs from long-form, how an inter-sample peak ends up 2 dB above what your meter showed, and the day-to-day workflow choices that quietly drag a master out of compliance.
            </p>
            <p>
              Every article is written against the same EBU 3341/3342 certified measurement engine that ships inside DubCheck - so the numbers you read here are the numbers the audit will hold you to.
            </p>
          </div>

          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-4">Latest articles</div>
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/[0.06] bg-dc-surface hover:bg-dc-surf2 rounded-[10px] px-6 py-5 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan">
                    {post.category}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
                  <span className="font-mono text-[12px] text-dc-ink3">{post.readingMinutes} min read</span>
                </div>
                <h2 className="text-[18px] font-semibold text-dc-ink group-hover:text-white transition-colors duration-150 leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-[15.5px] text-dc-ink3 leading-[1.6]">{post.excerpt}</p>
              </Link>
            ))}
          </div>

          <section className="mt-20 max-w-[720px]">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">What you will find here</div>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] mb-4 text-dc-ink">Articles, not press releases.</h2>
            <div className="text-dc-ink2 text-[15.5px] leading-[1.75] space-y-4">
              <p>
                Most loudness writing online either reprints a platform spec sheet or copies the wrong numbers from a forum thread from 2014. We do not do that. Each article on this site is written against a single source of truth - the measurement engine inside DubCheck - and the numbers in the article match the numbers a working audit will produce on the same file.
              </p>
              <p>
                Topics we keep coming back to: how the platforms actually measure (gating, dialog detection, weighting), where the major delivery specs disagree with each other and what that means for a master, common workflow traps (dither, channel order, sample-rate conversion), and the failure modes that look fine in a DAW but get caught in QC.
              </p>
              <p>
                If there is a topic you wish was here,{' '}
                <Link href="/contact" className="text-dc-ink underline underline-offset-2">tell us</Link>. We write from the inbox.
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
