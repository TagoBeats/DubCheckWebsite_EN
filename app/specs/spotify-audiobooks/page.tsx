import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-13'

export const metadata: Metadata = {
  title: 'Spotify Audiobooks Requirements: Complete Spec Reference',
  description:
    'Spotify Audiobooks specs in one table: RMS -24 to -14 dB, noise floor under -60 dB, MP3/WAV/FLAC at 44.1 kHz, mono or stereo, max 120 minutes per file.',
  alternates: { canonical: '/specs/spotify-audiobooks' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/spotify-audiobooks',
    images: ['/og/spec-spotify-audiobooks'],
    type: 'article',
    title: 'Spotify Audiobooks Requirements: Complete Spec Reference',
    description:
      'Every Spotify Audiobooks delivery requirement in one table, from the official Spotify for Authors guide.',
  },
}

const REQUIREMENTS = [
  { param: 'RMS level',         value: '-24 to -14 dB',                    note: 'Wider than ACX on both ends; an ACX master passes automatically' },
  { param: 'True peak',         value: 'Not specified',                    note: '-3 dBTP recommended to stay ACX-compatible' },
  { param: 'Noise floor',       value: 'Under -60 dB',                     note: 'No background noise, hiss or excessive mouth noise' },
  { param: 'Head silence',      value: '0.5 – 1 second',                   note: 'Before the audio starts' },
  { param: 'Tail silence',      value: '1 – 5 seconds',                    note: 'After the audio ends' },
  { param: 'File format',       value: 'MP3 preferred, WAV, FLAC',         note: 'MP3 192+ kbps CBR preferred; FLAC compression level 5+' },
  { param: 'Sample rate / depth', value: '44.1 kHz / 16-bit',              note: 'Stated for MP3 and WAV deliveries' },
  { param: 'Channel format',    value: 'Mono or stereo',                   note: 'Either works, but not a combination across files' },
  { param: 'File length',       value: 'Max 120 minutes per file',         note: 'Longer chapters split as "Chapter X, continued"' },
  { param: 'Opening credits',   value: 'Required, separate file',          note: 'Title and author/narrator names only' },
  { param: 'Closing credits',   value: 'Single separate file',             note: 'Must reference the completion of the book' },
  { param: 'Retail sample',     value: 'Max 5 minutes',                    note: 'No music, credits or explicit content; named ISBN_sample.mp3' },
]

const FAQ = [
  {
    question: 'Does Spotify Audiobooks have a LUFS or true peak requirement?',
    answer:
      'No. The official Spotify for Authors guide specifies loudness as RMS between -24 and -14 dB and sets no true peak ceiling at all. If you also deliver to ACX or Findaway, keep true peak at -3 dBTP anyway: it costs nothing on a voice master and keeps one render valid for every platform.',
  },
  {
    question: 'Can I reuse my ACX master for Spotify Audiobooks?',
    answer:
      'Yes. The ACX working range of -23 to -18 dB RMS sits entirely inside Spotify\'s -24 to -14 dB window, the noise floor requirement is the same -60 dB, and the head/tail silence windows are identical. Spotify even prefers the same MP3 format ACX requires. A passing ACX file passes Spotify Audiobooks.',
  },
  {
    question: 'Mono or stereo - which should I deliver?',
    answer:
      'The guide accepts both, with one hard rule: not a combination. Every file in the audiobook must share the same channel format. For single-narrator titles mono is the sensible choice: identical listening result, half the data, no channel-balance risk.',
  },
  {
    question: 'What happens to chapters longer than two hours?',
    answer:
      'No single file may exceed 120 minutes. The guide\'s instruction is to split long chapters and introduce the continuation file as "Chapter X, continued". Books without chapters should be split into segments of 30 to 120 minutes each.',
  },
  {
    question: 'What are the credits and retail sample rules?',
    answer:
      'Opening credits are required as a separate file containing only the title and author/narrator names, in the form "[Title], Written by [Author], Narrated by [Narrator]". Closing credits are a single separate file that must reference the completion of the book. The retail sample is capped at 5 minutes, may not contain music, credits or explicit content, and should be named ISBN_sample.mp3. If you skip it, Spotify auto-generates one from a chapter.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Spotify Audiobooks Requirements', item: `${SITE_URL}/specs/spotify-audiobooks` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Spotify Audiobooks Requirements: Complete Spec Reference',
  description:
    'Every Spotify Audiobooks delivery requirement in one table, from the official Spotify for Authors guide.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/spotify-audiobooks` },
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

export default function SpotifyAudiobooksSpecPage() {
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
              Spec Reference · Spotify Audiobooks
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Spotify Audiobooks Requirements
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              What Spotify for Authors expects from an audiobook delivery: RMS-based levels
              wider than ACX, the same noise floor and silence windows, and MP3 as the
              preferred format. Values verified against the Spotify for Authors
              Metadata &amp; Assets Guide, last updated 11/2024.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 13, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://authors.spotify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Spotify for Authors source
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

            <h2>How Spotify Audiobooks Measures These Values</h2>

            <h3 data-n="01">RMS, wider than ACX</h3>
            <p>
              Loudness is specified as <strong>-24 to -14 dB RMS</strong>, a raw signal power measurement
              like ACX uses, not BS.1770 LUFS. The window is wider than ACX&apos;s -23 to -18 dB on both ends,
              which makes Spotify the most forgiving of the audiobook platforms on level:
              a master leveled for ACX is inside this range before you check anything.
            </p>

            <h3 data-n="02">No true peak ceiling, but keep one anyway</h3>
            <p>
              The guide publishes no true peak or sample peak limit. That does not make peaks irrelevant:
              MP3 encoding raises inter-sample peaks, and a master that slams 0 dBFS will clip audibly
              after transcoding. Keeping <strong>-3 dBTP</strong> costs nothing on spoken word and
              keeps the same file valid for ACX and Findaway, which do enforce a ceiling.
            </p>

            <h3 data-n="03">Consistency is a hard rule</h3>
            <p>
              Two consistency requirements are explicit: every file is <strong>mono or stereo,
              never a combination</strong>, and chapter headings are all-or-nothing - every file
              starts with a verbal chapter indication or none does. Like ACX, the title is
              evaluated as a set, so one deviating file holds up the whole book.
            </p>

            <h3 data-n="04">Structure: credits, chapters, sample</h3>
            <p>
              The delivery is more than chapters. Opening credits are a required standalone file
              (title and names only), closing credits close the book in a single file,
              and the <strong>retail sample</strong> is capped at 5 minutes with no music, credits
              or explicit content. Files longer than <strong>120 minutes</strong> must be split.
              Naming the files <code>{'{ISBN}_{track number}.mp3'}</code> keeps the upload ordering itself.
            </p>

            <h2>What Spotify Checks Beyond the Numbers</h2>
            <p>
              The guide also asks for subjective quality: high clarity, no distracting edits,
              no background hiss, no excessive mouth noise, not harsh or tinny.
              Those are reviewer judgments, not meter readings. The measurable part -
              levels, noise floor, silences, format, consistency - is what you can verify
              completely before upload, and missing it is what delays availability in stores.
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
                RMS, noise floor, silences, format and per-chapter consistency checked against
                the exact Spotify Audiobooks spec. Pass/Fail PDF report included. Runs 100% locally.
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
