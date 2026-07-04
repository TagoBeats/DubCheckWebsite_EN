import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-04'

export const metadata: Metadata = {
  title: 'Netflix Audio Delivery Requirements: Complete Spec Reference',
  description:
    'Every Netflix audio spec in one table: -27 LKFS dialogue-gated loudness, -2 dBTP true peak, low-dialogue fallback, LRA best practice, 48 kHz PCM formats. Verified against the Netflix partner spec.',
  alternates: { canonical: '/specs/netflix' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/netflix',
    type: 'article',
    title: 'Netflix Audio Delivery Requirements: Complete Spec Reference',
    description:
      'Every Netflix audio delivery requirement in one table, with measurement notes and common failure reasons.',
  },
}

const REQUIREMENTS = [
  { param: 'Dialogue loudness',     value: '-27.0 LKFS ± 2 LU',           note: 'Dialogue-gated per BS.1770-1 - see notes' },
  { param: 'Low-dialogue fallback', value: '-24.0 LKFS ± 2 LU',           note: 'Program loudness when dialogue is under 15%' },
  { param: 'Max true peak',         value: '-2.0 dBTP',                   note: 'Hard spec; best practice is limiting at -2.3 dB' },
  { param: 'Program LRA',           value: '4 – 18 LU',                   note: 'Best practice, not a rejection criterion' },
  { param: 'Dialogue LRA',          value: 'Max 10 LU',                   note: 'Best practice, not a rejection criterion' },
  { param: 'Sample rate',           value: '48 kHz',                      note: 'Required' },
  { param: 'File format',           value: 'WAV / BWAV / RF64, PCM only', note: 'No MP3, AAC or AC-3 deliveries' },
  { param: 'Frame rate',            value: 'Must match picture',          note: '23.976 / 24 / 25 / 29.97 / 30 fps' },
  { param: 'Atmos measurement',     value: 'Via 5.1 re-render',           note: 'Loudness is not measured on the ADM directly' },
]

const FAQ = [
  {
    question: 'Is Netflix -27 LKFS the same as -27 LUFS?',
    answer:
      'No. The Netflix target is dialogue-gated: loudness is measured per ITU-R BS.1770-1 on the dialogue portions of the mix, not on the full program with standard EBU gating. A regular EBU Mode meter reading -27 LUFS integrated does not tell you whether the mix hits -27 LKFS dialogue-gated. You need a meter with dialogue intelligence or a dialogue detector.',
  },
  {
    question: 'What happens if my content has very little dialogue?',
    answer:
      'When the dialogue ratio falls below 15%, the spec switches to program loudness: -24.0 LKFS ± 2 LU measured per BS.1770-3/4 over the full mix. Music-driven content, nature documentaries and M&E stems typically land in this fallback.',
  },
  {
    question: 'Is loudness range (LRA) a rejection reason at Netflix?',
    answer:
      'No. The program LRA window of 4 to 18 LU and the dialogue LRA maximum of 10 LU are best-practice guidance, not hard delivery requirements. Loudness and true peak are the hard specs. That said, mixes far outside the LRA guidance tend to trigger creative QC notes even when they pass technically.',
  },
  {
    question: 'Why do people limit at -2.3 dB when the spec says -2.0 dBTP?',
    answer:
      'The hard limit is -2.0 dBTP. Netflix best practice recommends setting the limiter ceiling at -2.3 dB to leave a safety margin, because downstream processing and measurement differences can nudge true-peak readings by a few tenths of a dB. Limiting exactly at -2.0 leaves no room for that.',
  },
  {
    question: 'Does Netflix reject files with small loudness deviations?',
    answer:
      'Netflix has become more tolerant of small loudness deviations and normalizes playback server-side. The practical risk has shifted: a mix outside spec does not necessarily bounce, but it gets processed on their end, and you lose control over how it sounds at the viewer’s end. Other platforms such as Apple TV+ remain strict, so a spec-accurate master keeps every delivery option open.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Netflix Audio Delivery', item: `${SITE_URL}/specs/netflix` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Netflix Audio Delivery Requirements: Complete Spec Reference',
  description:
    'Every Netflix audio delivery requirement in one table, with measurement notes and common failure reasons.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/netflix` },
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

export default function NetflixSpecPage() {
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
              Spec Reference · Netflix
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Netflix Audio Delivery Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              The technical audio requirements for Netflix original content, near-field mixes
              (original, dubbed and M&amp;E). Theatrical mixes follow different rules -
              always confirm against your project&apos;s partner documentation.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 4, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://partnerhelp.netflixstudios.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Netflix Partner Help
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

            <h2>How Netflix Measures These Values</h2>

            <h3 data-n="01">Dialogue-gated, not EBU-gated</h3>
            <p>
              The <strong>-27.0 LKFS</strong> target is measured on the dialogue portions of the mix,
              per ITU-R BS.1770-1 with dialogue intelligence - not with the standard EBU
              absolute/relative gating. This is the single most common source of confusion:
              an EBU Mode meter can show your mix comfortably at -27 LUFS integrated while the
              dialogue-gated measurement sits outside the ±2 LU window, or vice versa.
              Verifying against this spec requires a dialogue detector.
            </p>

            <h3 data-n="02">The 15% dialogue fallback</h3>
            <p>
              If less than 15% of the program contains dialogue, the measurement switches to
              <strong> program loudness: -24.0 LKFS ± 2 LU</strong> (BS.1770-3/4, full mix).
              This matters for music specials, nature documentaries and M&amp;E stems -
              and it means the same QC pipeline has to detect the dialogue ratio first,
              then apply the right target.
            </p>

            <h3 data-n="03">True peak with a safety margin</h3>
            <p>
              The hard limit is <strong>-2.0 dBTP</strong> (oversampled). Netflix best practice is to set
              the limiter ceiling at -2.3 dB, leaving margin for measurement differences and downstream
              processing. Run the true-peak check on the final delivery file, not the pre-master.
            </p>

            <h3 data-n="04">Format and sync are hard checks too</h3>
            <p>
              Loudness is not the only rejection reason: sample rate must be <strong>48 kHz</strong>,
              containers are limited to <strong>WAV, BWAV or RF64 with PCM audio</strong>, and the
              frame rate embedded in the delivery must match picture (23.976, 24, 25, 29.97 or 30 fps).
              A perfect mix in the wrong container fails before anyone measures a single LU.
            </p>

            <h3 data-n="05">Atmos is measured on the 5.1 re-render</h3>
            <p>
              For Atmos deliveries, loudness is not measured on the ADM master directly -
              the spec applies to the 5.1 re-render. If your QC only looks at the ADM,
              you have not verified the value Netflix will check.
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
                Dialogue-gated loudness with automatic 15% fallback, oversampled true peak, LRA and
                format sanity checked against the exact Netflix spec. Pass/Fail PDF report included.
                Runs 100% locally - your files never leave the machine.
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
