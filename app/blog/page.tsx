import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog | DubCheck',
  description:
    'Guides and resources on audio loudness, platform specs, and delivery compliance for narrators and mixers.',
}

export default function BlogPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1165px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[100px]">

          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">
            Resources
          </div>
          <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.025em] mb-3">
            Blog
          </h1>
          <p className="text-[17px] text-dc-ink2 leading-[1.7] max-w-[560px] mb-14">
            Guides on loudness standards, platform specs, and audio delivery. Written for narrators and mixers who want to get it right the first time.
          </p>

          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/[0.06] bg-dc-surface hover:bg-dc-surf2 rounded-[10px] px-6 py-5 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-dc-cyan">
                    {post.category}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
                  <span className="font-mono text-[11px] text-dc-ink3">{post.readingMinutes} min read</span>
                </div>
                <h2 className="text-[18px] font-semibold text-dc-ink group-hover:text-white transition-colors duration-150 leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-[15.5px] text-dc-ink3 leading-[1.6]">{post.excerpt}</p>
              </Link>
            ))}
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}
