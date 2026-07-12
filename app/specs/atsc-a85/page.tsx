import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-12'

export const metadata: Metadata = {
  title: 'ATSC A/85 Loudness Requirements: CALM Act Spec Reference',
  description:
    'ATSC A/85 in one table: -24 LKFS ±2 LU program loudness, -2 dBTP true peak, 48 kHz. The legally mandated loudness standard for US broadcast television.',
  alternates: { canonical: '/specs/atsc-a85' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/atsc-a85',
    images: ['/og/spec-atsc-a85'],
    type: 'article',
    title: 'ATSC A/85 Loudness Requirements: CALM Act Spec Reference',
    description:
      'Every ATSC A/85 requirement in one table, with measurement notes and the legal background.',
  },
}

const REQUIREMENTS = [
  { param: 'Program loudness',  value: '-24 LKFS ± 2 LU',      note: 'Pass range -26 to -22 LKFS, measured per ITU-R BS.1770-4' },
  { param: 'Gating',            value: 'Program (ungated)',    note: 'Full program measurement, no dialogue gating' },
  { param: 'Max true peak',     value: '-2.0 dBTP',            note: 'Best practice: limit at -2.3 dBTP' },
  { param: 'Sample rate',       value: '48 kHz',               note: 'Broadcast standard, required' },
  { param: 'Dialnorm metadata', value: 'Required in AC-3/E-AC-3', note: 'Must match measured loudness in the encoded stream' },
  { param: 'Legal status',      value: 'Mandatory (CALM Act)', note: 'US broadcasters since December 13, 2012' },
]

const FAQ = [
  {
    question: 'Is ATSC A/85 actually the law?',
    answer:
      'The CALM Act (Commercial Advertisement Loudness Mitigation Act, 2010) made compliance with ATSC A/85 legally binding for US broadcast television as of December 13, 2012. The FCC enforces it. Commercials and programs are held to the same -24 LKFS reference so ad breaks stop jumping out.',
  },
  {
    question: 'What is the difference between ATSC A/85 and EBU R128?',
    answer:
      'Both build on ITU-R BS.1770, but they set different targets and ceilings: ATSC A/85 specifies -24 LKFS with a -2 dBTP maximum, EBU R128 specifies -23 LUFS with -1 dBTP. A US broadcast master is 1 LU quieter and keeps 1 dB more peak headroom than a European one. The measurement algorithm underneath is the same.',
  },
  {
    question: 'What is dialnorm and does a PCM QC check cover it?',
    answer:
      'Dialnorm is a metadata field in the AC-3/E-AC-3 stream that tells the decoder the program loudness so playback can be normalized. A/85 compliance requires dialnorm to match the actual measured loudness. A PCM-level QC check verifies the measured loudness and true peak of the delivery master; the dialnorm value is set at encoding and has to be verified in the encoded stream.',
  },
  {
    question: 'Does A/85 use dialogue gating like Netflix?',
    answer:
      'No. A/85 measures full program loudness per BS.1770 without dialogue gating. The confusion comes from history: early A/85 practice anchored on dialogue, but the current standard measures the whole program. Netflix\'s -27 LKFS dialogue-gated spec is a different measurement and a different number.',
  },
  {
    question: 'Why is the true peak ceiling stricter than music streaming?',
    answer:
      'Broadcast transmission chains, set-top boxes and legacy consumer hardware clip harder and earlier than streaming playback stacks. The -2.0 dBTP ceiling keeps the signal clean through transmitter processing and downstream re-encodes. Limiting at -2.3 dBTP leaves tolerance for meter differences.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'ATSC A/85 Loudness Requirements', item: `${SITE_URL}/specs/atsc-a85` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'ATSC A/85 Loudness Requirements: CALM Act Spec Reference',
  description:
    'Every ATSC A/85 requirement in one table, with measurement notes and the legal background.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/atsc-a85` },
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

export default function AtscA85SpecPage() {
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
              Spec Reference · ATSC A/85
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              ATSC A/85 Loudness Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              The loudness standard behind US broadcast television, made legally binding by the CALM Act.
              One target for programs and commercials alike, enforced by the FCC.
              Values verified against ATSC A/85:2013 (Revision B).
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 12, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://www.atsc.org/atsc-documents/a85-techniques-for-establishing-and-maintaining-audio-loudness/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official ATSC source
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

            <h2>How A/85 Compliance Is Measured</h2>

            <h3 data-n="01">One number for everything on air</h3>
            <p>
              The core of A/85 is a single reference: <strong>-24 LKFS ±2 LU</strong> program loudness,
              measured over the full content per ITU-R BS.1770-4 without dialogue gating.
              Programs, promos and commercials all measure against the same target,
              which is exactly what the CALM Act was written to enforce.
            </p>

            <h3 data-n="02">True peak with transmission headroom</h3>
            <p>
              The <strong>-2.0 dBTP</strong> ceiling is measured as oversampled true peak.
              Broadcast chains add processing after your delivery: transmitter limiting, re-encodes,
              set-top box DACs. Limiting the master at <strong>-2.3 dBTP</strong> keeps meter tolerance
              from ever deciding a compliance check.
            </p>

            <h3 data-n="03">The measurement and the metadata must agree</h3>
            <p>
              A/85 compliance lives in two places: the measured loudness of the audio itself,
              and the <strong>dialnorm</strong> value carried in the AC-3/E-AC-3 metadata,
              which tells consumer decoders how loud the program is. When the two disagree,
              playback normalization is wrong even though the audio measured clean.
              Verify the PCM master first, then confirm dialnorm at the encoding stage.
            </p>

            <h3 data-n="04">Same numbers as Prime Video, different reason</h3>
            <p>
              Amazon adapted A/85 for Prime Video OTT delivery, so both specs read
              <strong> -24 LKFS ±2 LU / -2 dBTP / 48 kHz</strong>. The difference is enforcement:
              A/85 is federal law for broadcasters, the Prime Video spec is a delivery contract.
              A master that passes one passes the loudness portion of the other.
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
                Program loudness, true peak and sample rate checked against the exact A/85 spec.
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
