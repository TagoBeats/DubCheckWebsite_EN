import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-12'

export const metadata: Metadata = {
  title: 'Storytel Audiobook Requirements: Complete Spec Reference',
  description:
    'Storytel audiobook delivery in one table: RMS -23 to -18 dBFS, -3 dBTP peak ceiling, -60 dBFS noise floor, 44.1/48 kHz, mono preferred, WAV or FLAC.',
  alternates: { canonical: '/specs/storytel' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/storytel',
    images: ['/og/spec-storytel'],
    type: 'article',
    title: 'Storytel Audiobook Requirements: Complete Spec Reference',
    description:
      'Every Storytel audiobook delivery requirement in one table, with measurement notes for narrators.',
  },
}

const REQUIREMENTS = [
  { param: 'RMS level',           value: '-23 to -18 dBFS',        note: 'Same working range as ACX, consistent across all files' },
  { param: 'Integrated loudness', value: 'Approx. -20 LUFS',       note: 'Where a spoken-word master in the RMS range typically lands' },
  { param: 'Max peak',            value: '-3.0 dBTP',              note: 'Measured as oversampled true peak, hard requirement' },
  { param: 'Noise floor',         value: '-60 dBFS or lower',      note: 'Holds in every silence, not just the head of the file' },
  { param: 'Sample rate',         value: '44.1 or 48 kHz',         note: 'Required' },
  { param: 'Bit depth',           value: '16-bit minimum',         note: '24-bit masters accepted' },
  { param: 'File format',         value: 'WAV or FLAC',            note: 'Lossless delivery, unlike ACX\'s MP3 requirement' },
  { param: 'Channel format',      value: 'Mono preferred',         note: 'Stereo accepted, mono recommended for narration' },
]

const FAQ = [
  {
    question: 'Can I reuse my ACX master for Storytel?',
    answer:
      'Mostly, with one important difference: the file format. Storytel takes lossless WAV or FLAC while ACX requires encoded MP3. Deliver the pre-encode master to Storytel and the encoded MP3 to ACX. The level targets (RMS -23 to -18 dBFS, -3 dB peak, -60 dBFS noise floor) line up, so one leveling pass covers both.',
  },
  {
    question: 'Does Storytel reject files automatically like ACX?',
    answer:
      'Storytel\'s intake is less automated than ACX but the published requirements are the review baseline. Files outside the level or format requirements come back for redelivery, which on a 40-file audiobook costs more time than checking before upload.',
  },
  {
    question: 'Why deliver mono when stereo is accepted?',
    answer:
      'Single-narrator audiobooks carry no stereo information, so a stereo delivery doubles file size for identical content and introduces the risk of channel-balance issues. Storytel recommends mono for narration; stereo makes sense only for productions with real spatial content like multi-voice drama or music beds.',
  },
  {
    question: 'Is the -3 dB peak sample peak or true peak?',
    answer:
      'Treat it as true peak. Measuring the oversampled true peak (dBTP) is the stricter reading, so a file that passes at -3.0 dBTP also passes any sample-peak check. Since Storytel takes lossless files there is no encoder to raise peaks after your QC pass, but the safe measurement practice stays the same.',
  },
  {
    question: 'How does the noise floor requirement compare to ACX?',
    answer:
      'It is the same number: -60 dBFS or lower, held in every silence throughout the file. Room tone, breath gaps and pauses between sentences all count. A recording chain that passes the ACX noise floor check passes Storytel\'s too.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Storytel Audiobook Requirements', item: `${SITE_URL}/specs/storytel` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Storytel Audiobook Requirements: Complete Spec Reference',
  description:
    'Every Storytel audiobook delivery requirement in one table, with measurement notes for narrators.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/storytel` },
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

export default function StorytelSpecPage() {
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
              Spec Reference · Storytel
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Storytel Audiobook Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              What Storytel expects from an audiobook delivery: ACX-compatible levels,
              lossless files instead of MP3, and mono as the preferred channel format.
              Values verified against the Storytel publisher documentation.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 12, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://www.storytel.com/about/publishers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Storytel source
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
                  <th>Requirement</th>
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

            <h2>How Storytel Delivery Differs From ACX</h2>

            <h3 data-n="01">Same levels, lossless files</h3>
            <p>
              The level targets mirror the ACX working range: <strong>-23 to -18 dBFS RMS</strong>,
              <strong> -3 dB peak</strong>, <strong>-60 dBFS noise floor</strong>. The delivery format does not:
              Storytel takes <strong>WAV or FLAC</strong>, so you ship the master before MP3 encoding.
              That removes the encoder-raises-peaks problem that catches ACX submissions,
              but it also means your QC pass runs on a different file than the one you send to ACX.
            </p>

            <h3 data-n="02">Mono by recommendation</h3>
            <p>
              Storytel accepts stereo but recommends <strong>mono</strong> for narration.
              For single-voice audiobooks mono is the technically better delivery:
              half the data, no channel-balance risk, identical listening result.
              Keep stereo for productions that actually use the stereo field.
            </p>

            <h3 data-n="03">Consistency across the audiobook</h3>
            <p>
              Like every audiobook platform, Storytel evaluates the title as a set.
              Chapters recorded weeks apart need the same RMS level, the same noise floor
              character and the same channel format. A per-file pass with per-set consistency
              is what keeps a 40-file delivery from bouncing on file 37.
            </p>

            <h2>Distribution Context</h2>
            <p>
              Storytel is subscription-based and strong in Europe, the Nordics and emerging markets,
              which makes it a common second delivery target after ACX for wide-distribution titles.
              If your master passes ACX levels, the additional work for Storytel is packaging
              (lossless, mono) rather than re-leveling.
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
                RMS, peak, noise floor, format and per-chapter consistency checked against the exact Storytel spec.
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
