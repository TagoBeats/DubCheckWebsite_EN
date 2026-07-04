import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-04'

export const metadata: Metadata = {
  title: 'EBU R128 Loudness Requirements: Complete Spec Reference',
  description:
    'Every EBU R128 requirement in one table: -23 LUFS programme loudness, -1 dBTP true peak, EBU Mode gating, LRA, shortform variant. Verified against EBU R128 v5.0.',
  alternates: { canonical: '/specs/ebu-r128' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/ebu-r128',
    type: 'article',
    title: 'EBU R128 Loudness Requirements: Complete Spec Reference',
    description:
      'Every EBU R128 requirement in one table, with measurement notes and common failure reasons.',
  },
}

const REQUIREMENTS = [
  { param: 'Programme loudness', value: '-23.0 LUFS ± 0.5 LU',            note: 'Integrated, measured in EBU Mode (BS.1770-4)' },
  { param: 'Max true peak',      value: '-1.0 dBTP',                       note: 'Oversampled true peak, not sample peak' },
  { param: 'Gating',             value: 'EBU Mode',                        note: 'Absolute gate -70 LUFS, relative gate -10 LU' },
  { param: 'Loudness range',     value: 'Descriptor only',                 note: 'LRA is reported, R128 sets no limit - see notes' },
  { param: 'Live tolerance',     value: '± 1.0 LU',                        note: 'Informative for live programmes, not enforced' },
  { param: 'Channel formats',    value: 'Mono to 5.1',                     note: 'Format-agnostic - same target for all' },
  { param: 'Shortform variant',  value: 'R128 s1',                         note: 'Ads/promos: same loudness and TP, no LRA check' },
  { param: 'Current version',    value: 'v5.0 (Nov 2023)',                 note: '' },
]

const FAQ = [
  {
    question: 'Is -23 LUFS a hard limit in EBU R128?',
    answer:
      'The target is -23.0 LUFS integrated with a tolerance of ±0.5 LU for produced content. For live programmes, a wider ±1.0 LU deviation is considered acceptable, but that value is informative, not a separate limit. Individual broadcasters can and do enforce the ±0.5 LU window strictly at ingest.',
  },
  {
    question: 'What is EBU Mode gating?',
    answer:
      'EBU Mode is the measurement configuration defined in EBU Tech 3341, built on ITU-R BS.1770-4. It uses a two-stage gate: an absolute gate at -70 LUFS removes silence, then a relative gate 10 LU below the ungated level removes quiet passages. A meter without this gating will read differently on material with pauses or quiet scenes.',
  },
  {
    question: 'Does EBU R128 limit loudness range (LRA)?',
    answer:
      'No. LRA (defined in EBU Tech 3342) is a descriptor: it must be measured and reported, but R128 itself sets no maximum. Individual broadcasters often add their own LRA limits in their delivery specs, so check the specific broadcaster requirements on top of R128.',
  },
  {
    question: 'What is the difference between EBU R128 and ATSC A/85?',
    answer:
      'Both are based on ITU-R BS.1770, but the targets differ: R128 requires -23 LUFS with EBU Mode gating and -1 dBTP true peak; ATSC A/85 (US broadcast, CALM Act) targets -24 LKFS with a ±2 LU tolerance and -2 dBTP. A master that passes one does not automatically pass the other.',
  },
  {
    question: 'What is EBU R128 s1?',
    answer:
      'R128 s1 is the shortform supplement for commercials, promos and trailers. Loudness target and true peak limit are identical to the main recommendation, but the LRA descriptor is not applied because it is not meaningful on very short material.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'EBU R128', item: `${SITE_URL}/specs/ebu-r128` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'EBU R128 Loudness Requirements: Complete Spec Reference',
  description:
    'Every EBU R128 requirement in one table, with measurement notes and common failure reasons.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/ebu-r128` },
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

export default function EbuR128SpecPage() {
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
              Spec Reference · EBU R128
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              EBU R128 Loudness Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              Every requirement of the European broadcast loudness standard, in one place.
              Values verified against EBU R128 v5.0 and the EBU Tech 3341/3342 measurement specs.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 4, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://tech.ebu.ch/publications/r128"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official EBU source
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

            <h2>How R128 Measures These Values</h2>

            <h3 data-n="01">EBU Mode gating changes the reading</h3>
            <p>
              The <strong>-23.0 LUFS</strong> target is measured in EBU Mode: an absolute gate at -70 LUFS
              removes silence, then a relative gate 10 LU below the ungated level removes quiet passages.
              On material with long pauses or quiet scenes, a meter without this gating reads noticeably
              different from the ingest server on the other side. If your meter does not say
              &quot;EBU Mode&quot; or &quot;BS.1770-4&quot;, verify with one that does.
            </p>

            <h3 data-n="02">True peak, not sample peak</h3>
            <p>
              The <strong>-1.0 dBTP</strong> limit is an oversampled true-peak measurement.
              A master that shows -1.0 dB on a sample-peak meter can carry inter-sample peaks well above
              the limit. R128 has the tightest true-peak ceiling of the major broadcast specs -
              tighter than Netflix or ATSC at -2.0 dBTP - so this is where borderline masters fail first.
            </p>

            <h3 data-n="03">LRA is reported, not limited</h3>
            <p>
              Loudness range per EBU Tech 3342 is a <strong>descriptor</strong>: R128 requires it to be
              measured, but sets no pass/fail threshold. In practice, individual broadcasters bolt their
              own LRA limits onto their delivery specs. Passing R128 does not mean passing a specific
              broadcaster&apos;s ingest - always check the channel-specific requirements on top.
            </p>

            <h3 data-n="04">Shortform is its own variant</h3>
            <p>
              Commercials, promos and trailers fall under the <strong>R128 s1</strong> supplement:
              identical loudness target and true-peak limit, but no LRA descriptor.
              If you deliver both longform and shortform, the checks differ - do not run
              a shortform spot through a longform profile.
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
                Integrated loudness in EBU Mode, oversampled true peak and LRA checked against the exact
                R128 spec, longform or shortform. Pass/Fail PDF report included. Runs 100% locally on your machine.
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
