import Link from 'next/link'
import {
  BATCH_FEATURES,
  BATCH_HREF,
  BATCH_LINK_IS_LIVE,
  BATCH_PRICE_EUR,
  FREE_FEATURES,
} from '@/lib/pricing'

function Bullet({ color }: { color: 'cyan' | 'orange' }) {
  return (
    <span
      className={`mt-[7px] inline-block w-[6px] h-[6px] rounded-full flex-shrink-0 ${
        color === 'cyan' ? 'bg-dc-cyan' : 'bg-dc-orange'
      }`}
    />
  )
}

interface Props {
  /** Section eyebrow, e.g. "§ 05 · Pricing". Omit to render the cards bare. */
  eyebrow?: string
  headline?: string
  intro?: string
}

export default function PricingCards({ eyebrow, headline, intro }: Props) {
  return (
    <section className="py-[100px]" id="pricing">
      {(eyebrow || headline || intro) && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
          <div>
            {eyebrow && (
              <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">{eyebrow}</div>
            )}
            {headline && (
              <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[20ch]">
                {headline}
              </h2>
            )}
          </div>
          {intro && <p className="max-w-[40ch] text-dc-ink2 text-[15px] md:shrink-0">{intro}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] mx-auto">
        {/* Free */}
        <div
          className="border rounded-[14px] p-[32px_30px] flex flex-col"
          style={{
            borderColor: 'rgba(0,242,255,0.35)',
            background: '#17171A',
            boxShadow: '0 40px 100px -40px rgba(0,242,255,0.18)',
          }}
        >
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase mb-3 text-dc-cyan">
            Free forever
          </div>
          <h3 className="text-[28px] font-semibold tracking-[-0.015em] mb-1">DubCheck</h3>
          <p className="text-[14.5px] text-dc-ink2 mb-7" style={{ minHeight: '3em' }}>
            Check a delivery against any platform spec and walk away with a signed PDF.
          </p>

          <div className="font-mono text-[48px] text-dc-ink tracking-[-0.02em] leading-none mb-1">
            <span className="text-[22px] text-dc-ink3 mr-[2px] align-[8px]">€</span>0
          </div>
          <div className="font-mono text-[12px] text-dc-ink3 mb-7">no key · no account · no expiry</div>

          <ul className="list-none p-0 m-0 mb-8 border-t border-white/[0.06]">
            {FREE_FEATURES.map(f => (
              <li
                key={f}
                className="flex items-start gap-3 py-[11px] border-b border-white/[0.06] text-[14px] text-dc-ink2"
              >
                <Bullet color="cyan" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/download"
            className="mt-auto flex items-center justify-center w-full text-[14px] font-semibold px-5 py-[14px] rounded-[8px] transition-colors duration-150 text-[#001318] bg-dc-cyan hover:bg-[#33f5ff]"
          >
            Download for macOS →
          </Link>
        </div>

        {/* Batch */}
        <div
          className="border rounded-[14px] p-[32px_30px] flex flex-col"
          style={{
            borderColor: 'rgba(255,122,26,0.35)',
            background: 'linear-gradient(180deg, rgba(255,122,26,0.06) 0%, #17171A 30%)',
            boxShadow: '0 40px 100px -40px rgba(255,122,26,0.20)',
          }}
        >
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase mb-3 text-dc-orange">
            One-time payment
          </div>
          <h3 className="text-[28px] font-semibold tracking-[-0.015em] mb-1">DubCheck Batch</h3>
          <p className="text-[14.5px] text-dc-ink2 mb-7" style={{ minHeight: '3em' }}>
            Same app, no file limit. Drop a season or a whole audiobook and get one summary across the batch.
          </p>

          <div className="font-mono text-[48px] text-dc-ink tracking-[-0.02em] leading-none mb-1">
            <span className="text-[22px] text-dc-ink3 mr-[2px] align-[8px]">€</span>
            {BATCH_PRICE_EUR}
          </div>
          <div className="font-mono text-[12px] text-dc-ink3 mb-7">once · lifetime key · free updates</div>

          <ul className="list-none p-0 m-0 mb-8 border-t border-white/[0.06]">
            {BATCH_FEATURES.map(f => (
              <li
                key={f}
                className="flex items-start gap-3 py-[11px] border-b border-white/[0.06] text-[14px] text-dc-ink2"
              >
                <Bullet color="orange" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href={BATCH_HREF}
            className="mt-auto flex items-center justify-center w-full text-[14px] font-semibold px-5 py-[14px] rounded-[8px] transition-colors duration-150 text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33]"
          >
            {BATCH_LINK_IS_LIVE ? 'Get the Batch key →' : 'Ask for a Batch key →'}
          </a>
        </div>
      </div>

      <p className="font-mono text-[12px] text-dc-ink3 tracking-[0.05em] text-center mt-8">
        Batch is free to try for 7 days from inside the app. No card, no signup.
      </p>
    </section>
  )
}
