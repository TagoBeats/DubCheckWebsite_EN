import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Audio Delivery Spec References',
  description:
    'Verified reference pages for audio delivery specs: ACX, Storytel, EBU R128, ATSC A/85, Netflix, Prime Video, Spotify, Apple. Every requirement in one table.',
  alternates: { canonical: '/specs' },
}

const SPECS = [
  {
    href: '/specs/acx',
    tag: 'ACX / Audible',
    title: 'ACX Audio Submission Requirements',
    summary: 'RMS level, peak, noise floor, MP3 format, room tone and per-file consistency for audiobook delivery.',
  },
  {
    href: '/specs/ebu-r128',
    tag: 'EBU R128',
    title: 'EBU R128 Loudness Requirements',
    summary: '-23 LUFS in EBU Mode, -1 dBTP true peak, LRA descriptor and the shortform variant for European broadcast.',
  },
  {
    href: '/specs/netflix',
    tag: 'Netflix',
    title: 'Netflix Audio Delivery Requirements',
    summary: 'Dialogue-gated -27 LKFS, the 15% low-dialogue fallback, -2 dBTP true peak and format requirements for near-field mixes.',
  },
  {
    href: '/specs/storytel',
    tag: 'Storytel',
    title: 'Storytel Audiobook Requirements',
    summary: 'ACX-compatible levels delivered lossless: RMS -23 to -18 dBFS, -3 dBTP peak, -60 dBFS noise floor, WAV or FLAC, mono preferred.',
  },
  {
    href: '/specs/prime-video',
    tag: 'Prime Video',
    title: 'Prime Video Audio Delivery Requirements',
    summary: 'Program loudness -24 LKFS ±2 LU without dialogue gating, -2 dBTP true peak and 48 kHz PCM in WAV or MOV.',
  },
  {
    href: '/specs/atsc-a85',
    tag: 'ATSC A/85',
    title: 'ATSC A/85 Loudness Requirements',
    summary: 'The CALM Act standard for US broadcast: -24 LKFS ±2 LU program loudness, -2 dBTP true peak and dialnorm metadata.',
  },
  {
    href: '/specs/spotify',
    tag: 'Spotify',
    title: 'Spotify Loudness Normalization',
    summary: 'The -14 LUFS playback reference, the -1 dBTP ceiling for lossy encoding and the Loud/Normal/Quiet playback modes.',
  },
  {
    href: '/specs/apple-digital-masters',
    tag: 'Apple',
    title: 'Apple Digital Masters Requirements',
    summary: '-16 LUFS Sound Check reference, -1 dBTP true peak, clipping as a hard fail and AAC 256 kbps conversion headroom.',
  },
]

export default function SpecsIndexPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1040px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[120px]">

          <div className="max-w-[990px]">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-4">
              Spec References
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Audio Delivery Spec References
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              The technical requirements of the major delivery platforms, verified against the official
              sources and kept current. Every page carries a last-verified date and a link to the
              original document.
            </p>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch] mt-4">
              Each reference puts the full spec in one table: loudness target and gating mode,
              true peak ceiling, noise floor where the platform checks one, and the format requirements.
              The measurement notes explain how each value is actually computed, because most rejected
              deliveries fail on the measurement method, not the number. These are the same specs the
              DubCheck engine tests against, so every value on these pages is one a working audit
              can verify on your files.
            </p>
          </div>

          <div className="border-t border-white/[0.06] my-10" />

          <div className="max-w-[990px] grid gap-4">
            {SPECS.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="block border border-white/[0.08] rounded-[12px] px-6 py-5 hover:border-white/[0.16] transition-colors"
                style={{ background: 'linear-gradient(180deg, #17171A 0%, #131316 100%)' }}
              >
                <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-2">
                  {s.tag}
                </div>
                <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-dc-ink mb-2">
                  {s.title}
                </h2>
                <p className="text-[14px] text-dc-ink2 leading-[1.65] max-w-[70ch]">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}
