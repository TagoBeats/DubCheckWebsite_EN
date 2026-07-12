import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-04'

export const metadata: Metadata = {
  title: 'ACX Audio Submission Requirements: Complete Spec Reference',
  description:
    'Every ACX requirement in one table: RMS -23 to -18 dB, peak -3 dB, noise floor -60 dB RMS, MP3 192 kbps CBR, room tone. Verified against the official spec.',
  alternates: { canonical: '/specs/acx' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/acx',
    images: ['/og/spec-acx'],
    type: 'article',
    title: 'ACX Audio Submission Requirements: Complete Spec Reference',
    description:
      'Every ACX technical requirement in one table, with measurement notes and common failure reasons.',
  },
}

const REQUIREMENTS = [
  { param: 'RMS level',        value: '-23 dB to -18 dB',                note: 'Measured per file, must be consistent across all files' },
  { param: 'Peak level',       value: '-3 dB maximum',                   note: 'Leave true-peak headroom below this - see notes' },
  { param: 'Noise floor',      value: '-60 dB RMS or lower',             note: 'Measured in silences throughout the entire file' },
  { param: 'File format',      value: 'MP3, 192 kbps or higher, CBR',    note: 'Constant bit rate only - no VBR' },
  { param: 'Sample rate',      value: '44.1 kHz',                        note: '' },
  { param: 'Channel format',   value: 'All mono or all stereo',          note: 'Consistent across every file in the audiobook' },
  { param: 'File length',      value: 'Max 120 minutes per file',        note: 'One chapter or section per file' },
  { param: 'Room tone (head)', value: '0.5 – 1 second',                  note: 'Before the audio starts' },
  { param: 'Room tone (tail)', value: '1 – 5 seconds',                   note: 'After the audio ends' },
  { param: 'Credits',          value: 'Opening + closing credits',       note: 'Separate files, same technical specs' },
  { param: 'Retail sample',    value: '1 – 5 minutes',                   note: 'Required, must not contain explicit material' },
]

const FAQ = [
  {
    question: 'Does ACX measure RMS or LUFS?',
    answer:
      'ACX specifies its loudness target in RMS: files must measure between -23 dB and -18 dB RMS. This is not the same as LUFS. RMS is a raw signal power measurement, while LUFS applies K-weighting and gating per ITU-R BS.1770. For typical spoken-word material the two land close together, but they are not interchangeable - a file that reads -19 LUFS can still fail the RMS check. Measure RMS for ACX.',
  },
  {
    question: 'Can I upload WAV files to ACX?',
    answer:
      'No. ACX only accepts MP3 uploads at 192 kbps or higher with constant bit rate (CBR). Record and edit in WAV, then encode to MP3 as the final step. Always run your QC check on the encoded MP3, not the WAV master, because MP3 encoding can push peaks higher.',
  },
  {
    question: 'Why does my file fail the noise floor check when the start sounds clean?',
    answer:
      'ACX measures the noise floor in silences throughout the entire file, not just at the head. Pauses between sentences, breath gaps and the room tone at the tail all count. If your noise floor creeps up mid-session - air conditioning, mic self-noise, gain rides - a file with a clean intro can still fail.',
  },
  {
    question: 'Is the -3 dB peak limit sample peak or true peak?',
    answer:
      'The ACX spec states -3 dB peak without specifying the measurement method. Sample-peak meters can under-read by 1 dB or more compared to true peak, and MP3 encoding raises inter-sample peaks further. The safe practice is to keep true peak (dBTP, oversampled) at or below -3 dB, so the file passes regardless of how the check is run.',
  },
  {
    question: 'Do all files in an audiobook need the same settings?',
    answer:
      'Yes. ACX requires every file in a submission to share the same channel format (all mono or all stereo), the same sample rate and bit rate, and a consistent RMS level. A single chapter that deviates can hold up the whole title.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'ACX Submission Requirements', item: `${SITE_URL}/specs/acx` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'ACX Audio Submission Requirements: Complete Spec Reference',
  description:
    'Every ACX technical requirement in one table, with measurement notes and common failure reasons.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/acx` },
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

export default function AcxSpecPage() {
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
              Spec Reference · ACX / Audible
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              ACX Audio Submission Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              Every technical requirement ACX checks before accepting an audiobook file, in one place.
              Values verified against the official ACX audio submission requirements.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 4, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://www.acx.com/help/narrators/200484550"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official ACX source
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

            <h2>How ACX Measures These Values</h2>

            <h3 data-n="01">RMS, not LUFS</h3>
            <p>
              The loudness target of <strong>-23 to -18 dB RMS</strong> is a raw signal power measurement.
              It is not the K-weighted, gated LUFS value your streaming-oriented loudness meter shows.
              For dense spoken word the two often sit within a decibel of each other, but ACX checks RMS -
              measure the right one, and measure it on the encoded MP3, not your WAV master.
            </p>

            <h3 data-n="02">Peak with headroom for encoding</h3>
            <p>
              The spec says <strong>-3 dB peak maximum</strong>. MP3 encoding raises inter-sample peaks,
              so a WAV that peaks at exactly -3.0 dB can exceed the limit after encoding.
              Keep the true peak (oversampled dBTP) of the final MP3 at or below -3 dB and this check never surprises you.
            </p>

            <h3 data-n="03">Noise floor across the whole file</h3>
            <p>
              The <strong>-60 dB RMS noise floor</strong> is measured in any silence throughout the file:
              pauses between sentences, breath gaps, head and tail room tone. A clean intro does not pass the file -
              the quietest moments anywhere in the chapter have to hold the spec.
            </p>

            <h3 data-n="04">Consistency across files</h3>
            <p>
              ACX evaluates the audiobook as a set. Every file must share the same channel format
              (all mono or all stereo), sample rate, bit rate and a consistent RMS level.
              One chapter recorded on a different day with different gain staging is a classic rejection reason.
            </p>

            <h2>What ACX Does Not Check Automatically</h2>
            <p>
              The automated QC covers the numbers above. Human review can still flag mouth noise, audible edits,
              mispronunciations, missing sections and mismatched room tone between chapters.
              Passing the technical spec is the entry ticket, not the whole game - but it is the part
              you can verify completely before you upload.
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
                RMS, peak, noise floor, format and per-chapter consistency checked against the exact ACX spec.
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
