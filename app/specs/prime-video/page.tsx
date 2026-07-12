import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-12'

export const metadata: Metadata = {
  title: 'Prime Video Audio Delivery Requirements: Spec Reference',
  description:
    'Every Prime Video audio spec in one table: -24 LKFS ±2 LU program loudness, -2 dBTP true peak, 48 kHz PCM, WAV or MOV. Verified against the Amazon partner spec.',
  alternates: { canonical: '/specs/prime-video' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/prime-video',
    images: ['/og/spec-prime-video'],
    type: 'article',
    title: 'Prime Video Audio Delivery Requirements: Spec Reference',
    description:
      'Every Prime Video audio delivery requirement in one table, with measurement notes and common failure reasons.',
  },
}

const REQUIREMENTS = [
  { param: 'Program loudness', value: '-24 LKFS ± 2 LU',        note: 'Pass range -26 to -22 LKFS, measured per ITU-R BS.1770-3' },
  { param: 'Gating',           value: 'Program (ungated)',      note: 'No dialogue gating - different from Netflix' },
  { param: 'Max true peak',    value: '-2.0 dBTP',              note: 'Oversampled true peak, hard requirement' },
  { param: 'Sample rate',      value: '48 kHz',                 note: 'Required' },
  { param: 'File format',      value: 'WAV or MOV (QuickTime)', note: 'MOV is accepted, unlike most broadcast specs' },
  { param: 'Encoding',         value: 'PCM only',               note: 'No lossy or bitstream deliveries' },
  { param: 'Channel formats',  value: 'Stereo up to 5.1',       note: 'Loudness target applies across mix formats' },
]

const FAQ = [
  {
    question: 'Is Prime Video measured like Netflix?',
    answer:
      'No, and this is the most common cross-platform mistake. Netflix measures dialogue-gated loudness at -27 LKFS; Prime Video measures program loudness (the full mix, no dialogue gating) at -24 LKFS ±2 LU per ITU-R BS.1770-3. The same master can pass one and fail the other. Measure each delivery against its own spec.',
  },
  {
    question: 'Where does the -24 LKFS target come from?',
    answer:
      'It is the ATSC A/85 target from US broadcast television, written into law by the CALM Act. Amazon adapted the broadcast standard for OTT delivery, which is why Prime Video and US broadcast share the same numbers: -24 LKFS ±2 LU with a -2.0 dBTP ceiling.',
  },
  {
    question: 'Is LKFS different from LUFS?',
    answer:
      'No. LKFS (ATSC terminology) and LUFS (EBU terminology) are the same unit: K-weighted loudness per ITU-R BS.1770. A -24 LKFS requirement and a -24 LUFS requirement describe an identical measurement. The gating mode is what actually differs between specs, not the unit.',
  },
  {
    question: 'Why is the true peak limit -2 dBTP instead of -1?',
    answer:
      'Broadcast-derived specs keep more headroom because downstream transcodes and legacy playout chains clip earlier than music streaming stacks. Best practice is limiting around -2.3 dBTP so measurement tolerance never pushes the reading over the -2.0 limit.',
  },
  {
    question: 'Can I deliver the same file to Prime Video and Netflix?',
    answer:
      'Usually not without re-levelling. A dialogue-heavy mix at Netflix\'s -27 LKFS dialogue-gated target typically measures quieter than -26 LKFS program loudness and fails the Prime Video floor. Check the file against both specs before assuming one master covers both platforms.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Prime Video Audio Delivery Requirements', item: `${SITE_URL}/specs/prime-video` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Prime Video Audio Delivery Requirements: Spec Reference',
  description:
    'Every Prime Video audio delivery requirement in one table, with measurement notes and common failure reasons.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/prime-video` },
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

export default function PrimeVideoSpecPage() {
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
              Spec Reference · Prime Video
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Prime Video Audio Delivery Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              Amazon&apos;s audio delivery spec for long-form content on Prime Video: broadcast numbers
              adapted for OTT, measured as program loudness without dialogue gating.
              Values verified against the Amazon Video Central delivery documentation.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 12, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://videocentral.amazon.com/support/delivery-experience/audio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Amazon source
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

            <h2>How Prime Video Measures These Values</h2>

            <h3 data-n="01">Program loudness, not dialogue loudness</h3>
            <p>
              The <strong>-24 LKFS ±2 LU</strong> target is measured over the full program per ITU-R BS.1770-3,
              without dialogue gating. Music cues, effects and silence all count toward the integrated value.
              A mix leveled by dialogue anchor (the Netflix method) will read differently here,
              typically quieter, and can miss the -26 LKFS floor.
            </p>

            <h3 data-n="02">Broadcast headroom on the peaks</h3>
            <p>
              The <strong>-2.0 dBTP</strong> ceiling is a hard requirement measured as oversampled true peak.
              Limiting at -2.3 dBTP in the mastering chain keeps meter tolerance from ever deciding the outcome.
              Sample-peak metering under-reads inter-sample activity and is not sufficient for this check.
            </p>

            <h3 data-n="03">PCM in WAV or MOV</h3>
            <p>
              Delivery is <strong>48 kHz PCM</strong>, packaged as WAV or QuickTime MOV.
              The MOV option is a Prime Video particularity: most broadcast and streaming specs
              take WAV or BWAV only. No lossy codecs, no AC-3 bitstreams in the delivery master.
            </p>

            <h3 data-n="04">One target across mix formats</h3>
            <p>
              Stereo and 5.1 deliveries measure against the same loudness target and peak ceiling.
              If you deliver multiple mix formats for the same title, each file has to pass on its own -
              a passing 5.1 mix does not certify the stereo fold-down.
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
                Check before you deliver
              </div>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-dc-ink mb-3">
                DubCheck verifies every value on this page in one click
              </h2>
              <p className="text-[14.5px] text-dc-ink2 leading-[1.7] mb-6 max-w-[480px]">
                Program loudness, true peak, sample rate and format checked against the exact Prime Video spec.
                Pass/Fail PDF report included. Runs 100% locally, NDA-safe.
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
