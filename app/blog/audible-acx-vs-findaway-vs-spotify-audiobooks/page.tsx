import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'ACX vs Findaway vs Spotify Audiobooks: One Master',
  description:
    'The exact delivery specs for ACX, Findaway Voices and Spotify Audiobooks side by side, and the single master that passes all three without re-rendering.',
  alternates: { canonical: '/blog/audible-acx-vs-findaway-vs-spotify-audiobooks' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  keywords: [
    'ACX vs Findaway',
    'Spotify Audiobooks spec',
    'Findaway Voices requirements',
    'audiobook delivery spec',
    'audiobook LUFS',
    'audiobook mastering',
    'narrator delivery',
    'wide distribution audiobook',
    'audiobook QC',
    'audiobook noise floor',
  ],
  openGraph: {
    url: '/blog/audible-acx-vs-findaway-vs-spotify-audiobooks',
    images: ['/og/audible-acx-vs-findaway-vs-spotify-audiobooks'],
    type: 'article',
    title: 'Audible ACX vs Findaway Voices vs Spotify Audiobooks: Three Specs, One Master',
    description:
      'Three audiobook platforms, three different specs, three different rejection reasons. The single master that passes all of them.',
    authors: ['Robin Busse'],
    publishedTime: '2026-06-19',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="Audiobooks"
      title="Audible ACX vs Findaway Voices vs Spotify Audiobooks: Three Specs, One Master"
      date="2026-06-19"
      readingMinutes={9}
      slug="audible-acx-vs-findaway-vs-spotify-audiobooks"
      excerpt="Three audiobook platforms, three different delivery specs, three different rejection reasons. The single master that passes ACX, Findaway and Spotify Audiobooks without re-rendering."
      faq={[
        {
          question: 'What master passes ACX, Findaway and Spotify Audiobooks at the same time?',
          answer: 'Master to -20 LUFS integrated, -3 dBTP true peak, -60 dBFS noise floor, 44.1 kHz / 16-bit WAV, one file per chapter. That single render passes ACX, Findaway Voices and Spotify Audiobooks without re-export.',
        },
        {
          question: 'What is the difference between ACX and Findaway Voices?',
          answer: 'ACX is Amazon\'s audiobook portal with automated QC and exclusive or non-exclusive distribution. Findaway Voices is Spotify-owned wide-distribution that ships to 40+ retailers including Apple Books, Google Play, Storytel and libraries, using human QC. Most independent narrators ship to both.',
        },
        {
          question: 'Should I master audiobooks in MP3 or WAV?',
          answer: 'Always master to 44.1 kHz / 16-bit WAV. ACX accepts WAV natively, Findaway strongly prefers WAV because they re-encode downstream for retailers, and Spotify Audiobooks requires WAV or FLAC. MP3 should only be a downstream conversion, never the master.',
        },
        {
          question: 'What true peak ceiling do audiobook platforms require?',
          answer: 'ACX and Findaway require -3 dBTP. Spotify Audiobooks requires -1 dBTP. Mastering to -3 dBTP is the conservative choice that passes all three platforms.',
        },
      ]}
      tldr={[
        {
          text: (
            <>
              All three platforms accept a master at <strong>-20 LUFS integrated, -3 dBTP true peak, -60 dBFS noise floor, 44.1 kHz / 16-bit WAV</strong>. That single render passes ACX, Findaway and Spotify Audiobooks without re-export.
            </>
          ),
        },
        {
          text: (
            <>
              The specs disagree most on <strong>file format and chapter structure</strong>, not loudness. ACX accepts MP3 192 CBR or WAV. Findaway prefers WAV. Spotify accepts WAV and FLAC. Master to WAV and the conversion is downstream.
            </>
          ),
        },
        {
          text: (
            <>
              Rejection reasons differ by platform. ACX = automated QC on loudness, noise floor, true peak. Findaway = human QC, broader tolerance, stricter on metadata. Spotify = automated QC similar to ACX with different loudness target.
            </>
          ),
        },
      ]}
    >

      <p>
        Five years ago, &quot;publish an audiobook&quot; meant ACX. Now it means three platforms minimum if you want full coverage, and each one publishes a different spec sheet with different numbers. The natural assumption is that you need three different masters. You do not. The platforms disagree on policy, not on what a clean audiobook master looks like.
      </p>
      <p>
        Here is exactly what each platform requires in 2026, where the specs differ, and the single master that satisfies all of them.
      </p>

      <h2>The Three Platforms in 2026</h2>

      <ul>
        <li><strong>Audible / ACX:</strong> The original platform. Exclusive or non-exclusive distribution through Amazon&apos;s ACX portal. Automated QC. Royalty share or per-finished-hour models.</li>
        <li><strong>Findaway Voices (Spotify):</strong> Spotify-owned wide-distribution platform. Distributes to 40+ retailers including Apple Books, Google Play, libraries, Storytel. Human QC. Per-unit royalty.</li>
        <li><strong>Spotify Audiobooks:</strong> Direct distribution to Spotify&apos;s in-app audiobook catalog. Accessed either via Findaway Voices distribution or directly by qualifying publishers. Automated QC similar to ACX.</li>
      </ul>

      <p>
        Most independent narrators and small publishers ship to all three, either directly or via Findaway&apos;s downstream distribution. The question is what master to make.
      </p>

      <h2>Side-by-Side: The Numbers</h2>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>ACX</th>
            <th>Findaway Voices</th>
            <th>Spotify Audiobooks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Integrated Loudness</td>
            <td>-18 to -23 LUFS</td>
            <td>-18 to -23 LUFS (recommended)</td>
            <td>-14 to -20 LUFS (target -18)</td>
          </tr>
          <tr>
            <td>True Peak Ceiling</td>
            <td>-3 dBTP</td>
            <td>-3 dBTP</td>
            <td>-1 dBTP</td>
          </tr>
          <tr>
            <td>Noise Floor</td>
            <td>-60 dBFS or lower</td>
            <td>-60 dBFS or lower</td>
            <td>-60 dBFS or lower (recommended)</td>
          </tr>
          <tr>
            <td>Sample Rate</td>
            <td>44.1 kHz</td>
            <td>44.1 kHz</td>
            <td>44.1 or 48 kHz</td>
          </tr>
          <tr>
            <td>Bit Depth</td>
            <td>16-bit</td>
            <td>16 or 24-bit</td>
            <td>16 or 24-bit</td>
          </tr>
          <tr>
            <td>File Format</td>
            <td>MP3 192 CBR or WAV</td>
            <td>WAV preferred, MP3 accepted</td>
            <td>WAV or FLAC</td>
          </tr>
          <tr>
            <td>Channels</td>
            <td>Mono or stereo</td>
            <td>Stereo preferred</td>
            <td>Stereo</td>
          </tr>
          <tr>
            <td>Head Silence</td>
            <td>0.5 to 1 sec</td>
            <td>1 sec recommended</td>
            <td>1 sec recommended</td>
          </tr>
          <tr>
            <td>Tail Silence</td>
            <td>1 to 5 sec</td>
            <td>2 to 5 sec recommended</td>
            <td>2 to 5 sec recommended</td>
          </tr>
          <tr>
            <td>Chapter Structure</td>
            <td>One file per chapter, max 120 min</td>
            <td>One file per chapter</td>
            <td>One file per chapter</td>
          </tr>
          <tr>
            <td>QC Type</td>
            <td>Automated</td>
            <td>Human</td>
            <td>Automated</td>
          </tr>
        </tbody>
      </table>

      <p>
        Specs sourced from{' '}
        <a href="https://www.acx.com/help/narrators/200484550" target="_blank" rel="noopener noreferrer">ACX audio submission requirements</a>
        , Findaway Voices delivery documentation, and Spotify Audiobooks publisher specs current as of 2026.
      </p>

      <h2>Where the Specs Actually Differ</h2>

      <h3 data-n="01">Loudness Target Window</h3>
      <p>
        ACX and Findaway publish the same -18 to -23 LUFS window. Spotify Audiobooks targets a hotter range, centered around -18 LUFS, with normalization that lifts quieter material on playback. A master at -20 LUFS passes all three: comfortably inside the ACX/Findaway window, comfortably inside Spotify&apos;s lift range.
      </p>

      <h3 data-n="02">True Peak Ceiling</h3>
      <p>
        ACX and Findaway require -3 dBTP. Spotify requires -1 dBTP. The conservative choice is to master to <strong>-3 dBTP</strong>. It passes all three. Mastering to -1 dBTP saves 2 dB of headroom but fails ACX and Findaway. There is no upside to that on a voice-only master.
      </p>

      <h3 data-n="03">File Format and Bit Depth</h3>
      <p>
        ACX is the outlier: it accepts MP3 192 CBR as a primary delivery format, while the other two strongly prefer WAV. The cleanest workflow is to master and deliver in <strong>44.1 kHz / 16-bit WAV</strong> for all three. ACX accepts this natively. Findaway prefers it. Spotify accepts it. The MP3 encoding for ACX happens downstream of you or in their pipeline. Do not master to MP3.
      </p>

      <h3 data-n="04">QC Type</h3>
      <p>
        ACX and Spotify run automated checks. A file that misses the numbers gets bounced by a machine inside 24 hours. Findaway uses human QC, which means broader tolerance on numbers but stricter checking on perceptual things: mouth clicks, breath consistency, room tone matching across chapters, performance issues. A file that scrapes through ACX&apos;s loudness check by 0.5 dB will likely also pass Findaway, but Findaway is the platform most likely to flag a chapter that sounds inconsistent with the rest of the book.
      </p>

      <h2>The Single Master That Passes All Three</h2>

      <div className="callout">
        <p><strong>Master to this:</strong></p>
        <ul>
          <li>Integrated loudness: <strong>-20 LUFS</strong> (±0.5 LU)</li>
          <li>True peak ceiling: <strong>-3 dBTP</strong></li>
          <li>Noise floor: <strong>-60 dBFS or lower</strong> at every silence inside the file, not just the head</li>
          <li>Sample rate / depth: <strong>44.1 kHz / 16-bit WAV</strong></li>
          <li>Channels: stereo (dual mono is fine if you record mono; duplicate the channel)</li>
          <li>Head silence: 0.75 seconds</li>
          <li>Tail silence: 3 seconds</li>
          <li>One WAV file per chapter</li>
        </ul>
      </div>

      <p>
        That render goes to all three platforms as-is. No re-export, no re-encode, no per-platform variant. The conversions each platform needs (ACX&apos;s MP3, Spotify&apos;s streaming codec, Findaway&apos;s retailer-specific formats) happen on their side.
      </p>

      <h2>Common Rejection Patterns by Platform</h2>

      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Most Common Rejection</th>
            <th>What It Means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ACX</td>
            <td>Noise floor above -60 dBFS mid-file</td>
            <td>HVAC or breath in a silence segment. See our <a href="/blog/acx-submission-rejected">ACX guide</a></td>
          </tr>
          <tr>
            <td>ACX</td>
            <td>True peak above -3 dBTP</td>
            <td>Limiter not in true-peak mode. See <a href="/blog/true-peak-vs-sample-peak">true peak guide</a></td>
          </tr>
          <tr>
            <td>ACX</td>
            <td>Loudness outside -18 to -23 LUFS</td>
            <td>Single chapter out of range, not the average</td>
          </tr>
          <tr>
            <td>Findaway</td>
            <td>Chapter-to-chapter inconsistency</td>
            <td>Room tone or level drift across recording days</td>
          </tr>
          <tr>
            <td>Findaway</td>
            <td>Mouth noise / clicks</td>
            <td>Editing pass missed transients human QC catches</td>
          </tr>
          <tr>
            <td>Findaway</td>
            <td>Metadata mismatch</td>
            <td>Chapter titles, track numbers, ISBN inconsistencies</td>
          </tr>
          <tr>
            <td>Spotify Audiobooks</td>
            <td>True peak above -1 dBTP</td>
            <td>If delivering directly to Spotify, this is stricter than ACX</td>
          </tr>
          <tr>
            <td>Spotify Audiobooks</td>
            <td>Format mismatch</td>
            <td>MP3 delivered instead of WAV or FLAC</td>
          </tr>
        </tbody>
      </table>

      <h2>The Findaway Wide-Distribution Question</h2>

      <p>
        Findaway Voices distributes to retailers (Apple Books, Google Play, Kobo, Storytel) and library systems (OverDrive, hoopla) with their own internal specs. Findaway&apos;s job is to take your master and conform it to each retailer&apos;s requirements, which is why their preferred input is 44.1 kHz / 16-bit (or higher) WAV. They re-encode downstream. If you deliver MP3, they cannot recover the quality before sending to retailers who expect lossless input.
      </p>

      <p>
        This is the main reason every modern audiobook workflow should master to WAV regardless of which platform is the primary destination. Even if ACX is the only platform you ship to today, a WAV master is the input every other platform will eventually ask for.
      </p>

      <h2>One Master, Two Common Variants</h2>

      <p>
        There are two reasons to deviate from the universal master:
      </p>

      <ol className="list-decimal list-inside space-y-[8px]">
        <li><strong>Spotify-direct delivery at hotter loudness.</strong> If you publish directly to Spotify Audiobooks (not via Findaway), you can master to -18 LUFS / -1 dBTP and gain a small competitive loudness advantage in the catalog. Costs you the ACX-compatible master. You have to render twice.</li>
        <li><strong>High-end retail (Apple Books premium).</strong> If you are delivering to a premium retail program that accepts 24-bit / 48 kHz, render a higher-res master alongside the universal one. The universal master still goes to ACX, Findaway and standard Spotify.</li>
      </ol>

      <p>
        For everyone else: one master, three platforms, no re-render.
      </p>

      <h2>Pre-Delivery Checklist</h2>

      <div className="callout">
        <ol className="list-decimal list-inside space-y-[10px]">
          <li>Every chapter measured individually: -20 LUFS ±0.5 LU</li>
          <li>True peak verified per chapter at -3 dBTP or lower</li>
          <li>Noise floor checked at multiple points inside each file, not just the head</li>
          <li>44.1 kHz / 16-bit WAV confirmed in export dialog (CBR/VBR does not apply to WAV)</li>
          <li>Head silence 0.5-1 sec, tail silence 1-5 sec, consistent across all chapters</li>
          <li>Room tone consistent between chapters (see our <a href="/blog/room-tone-matching-recording-days">room tone guide</a>)</li>
          <li>One file per chapter, named consistently, under 120 minutes each</li>
          <li>Metadata complete and consistent (chapter title, track number, ISBN)</li>
        </ol>
      </div>

      <h2>Why This Gets Hard at Scale</h2>

      <p>
        For a single book on a single platform, dialing in the spec and running manual checks is fine. For a catalog going to all three platforms, every chapter has to pass three different QC processes (two automated, one human) and a miss on any of them means a redelivery weeks after you thought the project was done.
      </p>
      <p>
        Running every chapter through an automated check against the universal master spec, before any of the three platforms see it, removes the platform-specific failure modes. If the report says pass, the file goes to all three without modification. If it finds an issue, you fix one chapter against one spec instead of three.
      </p>

    </BlogPostLayout>
  )
}
