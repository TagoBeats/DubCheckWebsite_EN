import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-12'

export const metadata: Metadata = {
  title: 'Apple Digital Masters: Audio Requirements Reference',
  description:
    'Apple Digital Masters requirements in one table: -16 LUFS Sound Check target, -1 dBTP true peak, clipping as a hard fail, and AAC 256 kbps conversion headroom.',
  alternates: { canonical: '/specs/apple-digital-masters' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/apple-digital-masters',
    images: ['/og/spec-apple-digital-masters'],
    type: 'article',
    title: 'Apple Digital Masters: Audio Requirements Reference',
    description:
      'The -16 LUFS Sound Check target, the -1 dBTP ceiling and AAC conversion headroom, with measurement notes.',
  },
}

const REQUIREMENTS = [
  { param: 'Integrated loudness', value: '-16 LUFS (Sound Check)',        note: 'EBU-gated per ITU-R BS.1770-4, typical range -18 to -14 LUFS' },
  { param: 'Max true peak',       value: '-1.0 dBTP',                     note: 'Headroom for AAC 256 kbps conversion' },
  { param: 'Clipping',            value: 'Not allowed',                   note: 'Clipped samples are a hard fail in Apple ingestion' },
  { param: 'Sample rate',         value: '44.1 / 48 / 88.2 / 96 kHz',     note: 'All accepted; hi-res preferred for Digital Masters badge' },
  { param: 'Bit depth',           value: '16-bit minimum',                note: '24-bit recommended' },
  { param: 'Delivery codec',      value: 'AAC 256 kbps (converted)',      note: 'Apple encodes from your master; you deliver lossless' },
]

const FAQ = [
  {
    question: 'Is the -16 LUFS target a rejection criterion?',
    answer:
      'No. Sound Check normalizes playback to roughly -16 LUFS, so loudness deviations are corrected on the listener side, not rejected at ingestion. What Apple does reject is clipping: files with samples at or above 0 dBFS fail. Loudness is advisory, clean peaks are mandatory.',
  },
  {
    question: 'Why does Apple use -16 LUFS when Spotify uses -14?',
    answer:
      'Different platform decisions, same measurement standard. Both compute integrated loudness per ITU-R BS.1770 with EBU gating; Apple simply normalizes to a quieter reference. A -16 LUFS master plays 2 dB quieter than the Spotify reference before normalization, and identical after it, since both platforms level-match playback.',
  },
  {
    question: 'What does the -1 dBTP ceiling protect against?',
    answer:
      'AAC encoding at 256 kbps reconstructs the waveform and can push inter-sample peaks above the highest sample value in your master. A file that sample-peaks at -0.2 dBFS can clip after conversion. Keeping oversampled true peak at or below -1.0 dBTP means the encoded AAC stays clean.',
  },
  {
    question: 'Do I need a hi-res master for Apple Digital Masters?',
    answer:
      'For the Apple Digital Masters badge, Apple prefers masters at high sample rates (88.2 or 96 kHz) delivered through a certified mastering workflow. For plain ingestion, 44.1 kHz / 16-bit is accepted. Either way the loudness and true peak requirements on this page are the same.',
  },
  {
    question: 'Does this spec apply to Apple TV+ deliveries?',
    answer:
      'No. Apple TV+ long-form content has its own delivery specification with dialogue-anchored loudness, closer to the Netflix model. This page covers music delivery to Apple Music and the iTunes Store via Apple Digital Masters.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Apple Digital Masters Requirements', item: `${SITE_URL}/specs/apple-digital-masters` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Apple Digital Masters: Audio Requirements Reference',
  description:
    'The -16 LUFS Sound Check target, the -1 dBTP ceiling and AAC conversion headroom, with measurement notes.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/apple-digital-masters` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function AppleDigitalMastersSpecPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1040px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[120px]">

          <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

          {/* Header */}
          <div className="max-w-[990px]">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-cyan mb-4">
              Spec Reference · Apple
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Apple Digital Masters Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              What Apple Music expects from a master: the Sound Check loudness reference,
              the true peak ceiling that protects the AAC conversion, and the one thing
              that gets files rejected outright. Values verified against the official
              Apple Digital Masters documentation.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 12, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://www.apple.com/apple-music/apple-digital-masters/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Apple source
              </a>
            </div>
          </div>

          <div className="border-t border-white/[0.06] my-10" />

          {/* Quick reference table */}
          <article className="prose-dubcheck max-w-[990px]">
            <h2>Quick Reference</h2>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {REQUIREMENTS.map(r => (
                  <tr key={r.param}>
                    <td>{r.param}</td>
                    <td><strong>{r.value}</strong></td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>How Apple Evaluates Your Master</h2>

            <h3 data-n="01">Sound Check normalizes, clipping rejects</h3>
            <p>
              The two requirements have different weights. Loudness relative to the
              <strong> -16 LUFS</strong> Sound Check reference is corrected on playback and never blocks a release.
              Clipped samples do: a master that touches 0 dBFS is a hard fail at ingestion.
              QC priority follows from that - verify peaks first, then check where the loudness sits.
            </p>

            <h3 data-n="02">True peak, measured after your limiter</h3>
            <p>
              The <strong>-1.0 dBTP ceiling</strong> exists because Apple converts every master to AAC 256 kbps,
              and lossy encoding raises inter-sample peaks. Measure the final master with an oversampled
              true-peak meter (BS.1770-4 Annex 2). A limiter set to -1.0 dB output ceiling in sample-peak mode
              can still let true peaks through above the limit.
            </p>

            <h3 data-n="03">Loudness range is a mastering choice, not a spec</h3>
            <p>
              Apple publishes no LRA requirement. But because Sound Check level-matches everything to
              <strong> -16 LUFS</strong>, a master crushed to -9 LUFS gains nothing except the distortion
              it took to get there. The platform normalization makes dynamics free: the headroom you keep
              is the punch listeners hear after level matching.
            </p>

            <h3 data-n="04">Sample rate and the Digital Masters badge</h3>
            <p>
              Ingestion accepts <strong>44.1, 48, 88.2 and 96 kHz</strong> at 16-bit or better.
              The Apple Digital Masters program prefers hi-res sources through certified mastering houses,
              but the technical checks on this page apply to every delivery regardless of badge status.
            </p>

            <h2>FAQ</h2>
            {FAQ.map(item => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </article>

          {/* CTA */}
          <div className="max-w-[990px] mt-16">
            <div
              className="rounded-[12px] px-7 py-8 border border-dc-orange/20"
              style={{ background: 'radial-gradient(ellipse 120% 120% at 0% 50%, rgba(255,122,26,0.07) 0%, transparent 70%), #121214' }}
            >
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-dc-orange mb-4">
                Check before you upload
              </div>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-dc-ink mb-3">
                DubCheck verifies every value on this page in one click
              </h2>
              <p className="text-[14.5px] text-dc-ink2 leading-[1.7] mb-6 max-w-[480px]">
                Integrated loudness, true peak, clipping and format checked against the exact Apple targets.
                Pass/Fail PDF report included. Runs 100% locally on your machine.
              </p>
              <Link
                href="/download"
                className="inline-flex items-center gap-[10px] text-[13.5px] font-semibold px-5 py-[11px] rounded-[6px] text-[#1A0A00] bg-dc-orange hover:bg-[#FF8A33] transition-colors duration-150"
                style={{ boxShadow: '0 0 0 1px rgba(255,140,50,0.5), 0 10px 30px -10px rgba(255,122,26,0.6)' }}
              >
                Download free 7-day Pro trial
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
