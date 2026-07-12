import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://audio-dubcheck.com'
const LAST_VERIFIED = '2026-07-12'

export const metadata: Metadata = {
  title: 'Spotify Loudness Normalization: Complete Spec Reference',
  description:
    'Spotify normalizes to -14 LUFS integrated with a -1 dBTP ceiling. The exact numbers, the Loud/Normal/Quiet playback modes, and headroom for lossy encoding.',
  alternates: { canonical: '/specs/spotify' },
  authors: [{ name: 'Robin Busse', url: `${SITE_URL}/about` }],
  openGraph: {
    url: '/specs/spotify',
    images: ['/og/spec-spotify'],
    type: 'article',
    title: 'Spotify Loudness Normalization: Complete Spec Reference',
    description:
      'The -14 LUFS target, the -1 dBTP ceiling and the three playback modes, with measurement notes.',
  },
}

const REQUIREMENTS = [
  { param: 'Integrated loudness', value: '-14 LUFS (recommended)',      note: 'EBU-gated per ITU-R BS.1770-4, recommended range -15 to -13 LUFS' },
  { param: 'Max true peak',       value: '-1.0 dBTP',                   note: 'Oversampled; headroom for OGG Vorbis / AAC encoding' },
  { param: 'Hard rejection',      value: 'None',                        note: 'Spotify normalizes on playback instead of rejecting uploads' },
  { param: 'File format',         value: 'WAV, FLAC, MP3, OGG accepted', note: 'Spotify transcodes every upload anyway' },
  { param: 'Playback: Loud',      value: '-11 LUFS',                    note: 'Positive gain uses a playback limiter' },
  { param: 'Playback: Normal',    value: '-14 LUFS',                    note: 'Default for most listeners' },
  { param: 'Playback: Quiet',     value: '-23 LUFS',                    note: 'No limiting needed, pure attenuation' },
]

const FAQ = [
  {
    question: 'Does Spotify reject masters that are too loud?',
    answer:
      'No. Spotify has no hard rejection mechanism for loudness. A master at -8 LUFS is accepted and then turned down by 6 dB on playback so it lands at the -14 LUFS reference. You lose nothing in delivery, but you gave up dynamic range in mastering that the normalization does not give back.',
  },
  {
    question: 'What happens to masters quieter than -14 LUFS?',
    answer:
      'In the default Normal mode Spotify can apply positive gain, and in Loud mode it applies a playback limiter to create the missing headroom. That limiter is not your limiter: it processes your master with settings you do not control. Delivering close to -14 LUFS integrated keeps your own processing in charge.',
  },
  {
    question: 'Why -1 dBTP when Spotify accepts anything up to 0 dBFS?',
    answer:
      'Spotify transcodes uploads to OGG Vorbis and AAC. Lossy encoding reconstructs the waveform and can raise inter-sample peaks by several dB. A master that sample-peaks at -0.1 dBFS can clip audibly after encoding. -1 dBTP measured as oversampled true peak keeps the encoded stream clean; for very loud, dense masters Spotify itself suggests -2 dBTP.',
  },
  {
    question: 'Is the -14 LUFS target measured with dialogue gating?',
    answer:
      'No. Spotify measures integrated loudness with standard EBU gating per ITU-R BS.1770-4, the same measurement DubCheck runs. Dialogue-gated measurements (like Netflix uses) will not match what Spotify computes for music or podcasts.',
  },
  {
    question: 'Can listeners turn normalization off?',
    answer:
      'Yes. Premium listeners can disable loudness normalization entirely, and then your file plays back exactly as mastered. This is another reason to keep the master itself clean rather than relying on playback processing: a meaningful share of playback happens un-normalized.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'DubCheck', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Spec References', item: `${SITE_URL}/specs` },
    { '@type': 'ListItem', position: 3, name: 'Spotify Loudness Normalization', item: `${SITE_URL}/specs/spotify` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Spotify Loudness Normalization: Complete Spec Reference',
  description:
    'The -14 LUFS target, the -1 dBTP ceiling and the three playback modes, with measurement notes.',
  datePublished: LAST_VERIFIED,
  dateModified: LAST_VERIFIED,
  author: [{ '@type': 'Person', name: 'Robin Busse', url: `${SITE_URL}/about` }],
  publisher: {
    '@type': 'Organization',
    name: 'DubCheck',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/specs/spotify` },
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

export default function SpotifySpecPage() {
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
              Spec Reference · Spotify
            </div>
            <h1 className="text-[28px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] text-dc-ink mb-5">
              Spotify Loudness Normalization
            </h1>
            <p className="text-[15px] text-dc-ink2 leading-[1.7] max-w-[62ch]">
              Spotify does not reject loud or quiet uploads. It normalizes every stream on playback,
              and how far your master sits from the reference decides what that processing does to it.
              Values verified against the official Spotify loudness documentation.
            </p>
            <div className="flex items-center gap-3 text-[13px] text-dc-ink3 flex-wrap mt-5">
              <span>
                Last verified <time dateTime={LAST_VERIFIED}>July 12, 2026</time>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-dc-ink4" />
              <a
                href="https://artists.spotify.com/en/help/article/loudness-normalization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink2 hover:text-dc-ink underline underline-offset-2"
              >
                Official Spotify source
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

            <h2>How Spotify Handles Your Master</h2>

            <h3 data-n="01">Normalization instead of rejection</h3>
            <p>
              Unlike delivery platforms with automated QC, Spotify accepts any loudness and corrects it on playback.
              A master above <strong>-14 LUFS integrated</strong> is attenuated by the exact difference.
              The catch: the compression and limiting you used to get loud stays baked in,
              while the loudness advantage disappears. Next to a well-balanced -14 LUFS master,
              a squashed one plays at the same level and sounds flatter.
            </p>

            <h3 data-n="02">Quiet masters meet Spotify&apos;s limiter</h3>
            <p>
              When a master sits below the playback reference and the mode calls for positive gain,
              Spotify applies its own playback limiter to create headroom. That processing is outside your control.
              Delivering at <strong>-14 LUFS with -1 dBTP</strong> means neither direction of correction has work to do.
            </p>

            <h3 data-n="03">True peak headroom for lossy encoding</h3>
            <p>
              Every upload is transcoded to OGG Vorbis and AAC. Lossy codecs can raise inter-sample peaks
              by up to 3 dB, which is why the ceiling is specified as <strong>-1.0 dBTP oversampled true peak</strong>,
              not sample peak. Measure the master with a true-peak meter (BS.1770-4 Annex 2, 4x oversampling),
              because a sample-peak reading of -1.0 dBFS does not guarantee a pass.
            </p>

            <h3 data-n="04">Three playback modes, three references</h3>
            <p>
              Listeners choose between Loud (<strong>-11 LUFS</strong>), Normal (<strong>-14 LUFS</strong>, default)
              and Quiet (<strong>-23 LUFS</strong>). Your master cannot target all three,
              which is the point of mastering to the middle one: Normal plays it untouched,
              Quiet is pure attenuation, and Loud is the only mode that adds processing.
            </p>

            <h2>What This Means for Delivery QC</h2>
            <p>
              Because Spotify never rejects a file, every check on this page is advisory rather than pass/fail.
              DubCheck reports deviations from the -14 LUFS target and the -1 dBTP ceiling as warnings:
              the file will go live either way, but the numbers tell you exactly what Spotify&apos;s
              playback chain will do to it.
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
                Integrated loudness, true peak and audio hygiene measured against the exact Spotify target.
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
