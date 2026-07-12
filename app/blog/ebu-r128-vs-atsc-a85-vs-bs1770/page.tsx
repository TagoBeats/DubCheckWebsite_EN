import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'EBU R128 vs ATSC A/85 vs ITU BS.1770: What Actually Differs',
  description:
    'What BS.1770, EBU R128 and ATSC A/85 each specify, where they agree, where they disagree, and which standard applies to your delivery.',
  alternates: { canonical: '/blog/ebu-r128-vs-atsc-a85-vs-bs1770' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  keywords: [
    'EBU R128',
    'ATSC A/85',
    'ITU BS.1770',
    'LUFS vs LKFS',
    'loudness standards',
    'broadcast loudness',
    'integrated loudness',
    'dialog gating',
    'loudness range',
    'true peak',
  ],
  openGraph: {
    url: '/blog/ebu-r128-vs-atsc-a85-vs-bs1770',
    images: ['/og/ebu-r128-vs-atsc-a85-vs-bs1770'],
    type: 'article',
    title: 'EBU R128 vs ATSC A/85 vs ITU BS.1770: What Actually Differs',
    description:
      'Three loudness standards, one measurement algorithm, three different targets. Where they agree, where they disagree, and which one applies to your delivery.',
    authors: ['Robin Busse'],
    publishedTime: '2026-06-12',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="Standards"
      title="EBU R128 vs ATSC A/85 vs ITU BS.1770: What Actually Differs"
      date="2026-06-12"
      readingMinutes={9}
      slug="ebu-r128-vs-atsc-a85-vs-bs1770"
      excerpt="Three loudness standards, one measurement algorithm, three different target levels. What BS.1770, EBU R128 and ATSC A/85 each specify, where they agree, where they disagree, and which one applies to your delivery."
      faq={[
        {
          question: 'What is the difference between EBU R128 and ATSC A/85?',
          answer: 'Both use ITU BS.1770 as their measurement algorithm. EBU R128 targets -23 LUFS with a -1 dBTP ceiling and applies the BS.1770 relative gate to the whole program. ATSC A/85 targets -24 LKFS with a -2 dBTP ceiling and uses dialog gating when dialog is the anchor element. R128 is European broadcast policy; A/85 is North American.',
        },
        {
          question: 'Is LUFS the same as LKFS?',
          answer: 'Yes. LUFS (Loudness Units, Full Scale) and LKFS (Loudness, K-weighted, relative to Full Scale) are mathematically identical units. The two names came from different revisions of the same underlying ITU document. A reading of -23 LUFS and -23 LKFS on the same file is the same value.',
        },
        {
          question: 'What does BS.1770 actually specify?',
          answer: 'ITU-R BS.1770 specifies the loudness measurement algorithm itself: K-weighting filters, channel weighting, the 400 ms momentary and 3-second short-term windows, absolute and relative gates, and true peak detection via 4x oversampling minimum. It does not specify what target level your program should hit. EBU R128 and ATSC A/85 add delivery policy on top.',
        },
        {
          question: 'What is dialog gating?',
          answer: 'Dialog gating is the ATSC A/85 method of measuring integrated loudness only over segments where dialog is the anchor element. A dialog detector identifies speech sections and excludes music beds, effects and ambience from the integrated number. EBU R128 does not use dialog gating; it applies the BS.1770 relative gate to the whole program.',
        },
      ]}
      tldr={[
        {
          text: (
            <>
              <strong>BS.1770</strong> is the measurement algorithm. <strong>EBU R128</strong> and <strong>ATSC A/85</strong> are delivery specifications that <em>use</em> BS.1770. They are not three competing methods. They are one method and two policies.
            </>
          ),
        },
        {
          text: (
            <>
              Target levels differ: EBU R128 = <strong>-23 LUFS</strong>, ATSC A/85 = <strong>-24 LKFS</strong>. A 1 dB gap. Same measurement, different convention. LUFS and LKFS are the same unit.
            </>
          ),
        },
        {
          text: (
            <>
              ATSC A/85 measures <strong>dialog-gated</strong> when dialog is present. EBU R128 uses a relative gate on the whole program. This is where most cross-platform deliveries actually fail.
            </>
          ),
        },
      ]}
    >

      <p>
        If you have ever delivered audio to both a European broadcaster and a US one, you have seen this: same file, two different loudness numbers, two different opinions about whether it passes spec. The reason is not that one of the measurements is wrong. It is that BS.1770, EBU R128 and ATSC A/85 are three different documents that solve three different problems, and using them interchangeably gets files rejected.
      </p>
      <p>
        This guide separates what each standard actually specifies, where they agree, where they disagree, and which one to point your meter at for which delivery.
      </p>

      <h2>BS.1770 Is the Algorithm</h2>
      <p>
        <a href="https://www.itu.int/rec/R-REC-BS.1770" target="_blank" rel="noopener noreferrer">ITU-R BS.1770</a> is published by the International Telecommunication Union. It defines how to measure loudness: the math, the filters, the gating, the true peak detector. It does not say what target level your program should hit. It does not say what dialog gating to apply. It is a measurement recipe.
      </p>
      <p>
        Specifically, BS.1770 specifies:
      </p>
      <ul>
        <li>A K-weighting filter (pre-filter + RLB shelving) applied to each channel before measurement</li>
        <li>Channel weighting coefficients for stereo, 5.1 and 7.1</li>
        <li>A 400 ms sliding measurement window for momentary loudness</li>
        <li>A 3-second sliding window for short-term loudness</li>
        <li>An absolute gate at -70 LUFS and a relative gate at -10 LU below the ungated integrated level</li>
        <li>True peak measurement via 4x oversampling minimum</li>
      </ul>
      <p>
        Every modern loudness spec (EBU, ATSC, Apple, Spotify, Netflix, ACX) calls BS.1770 as its measurement primitive. When a meter says &quot;BS.1770-4 compliant,&quot; it means the meter implements this exact algorithm.
      </p>

      <h2>EBU R128 Is the European Broadcast Policy</h2>
      <p>
        <a href="https://tech.ebu.ch/publications/r128" target="_blank" rel="noopener noreferrer">EBU R128</a> is published by the European Broadcasting Union. It uses BS.1770 as its measurement engine and adds a delivery policy on top:
      </p>

      <table>
        <thead>
          <tr>
            <th>EBU R128 Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Program Loudness Target</td>
            <td>-23 LUFS (±0.5 LU for live, ±1 LU for file-based)</td>
          </tr>
          <tr>
            <td>Maximum True Peak</td>
            <td>-1 dBTP</td>
          </tr>
          <tr>
            <td>Loudness Range</td>
            <td>No fixed limit (recommendations exist by genre)</td>
          </tr>
          <tr>
            <td>Measurement Gating</td>
            <td>Relative gate per BS.1770 (whole program)</td>
          </tr>
        </tbody>
      </table>

      <p>
        R128 is supported by companion documents. EBU Tech 3341 specifies meters, 3342 specifies loudness range (LRA), 3343 specifies practical production guidelines, 3344 covers distribution. When a manufacturer claims &quot;EBU R128 certified,&quot; they are claiming compliance with Tech 3341 and 3342, which both build on BS.1770.
      </p>
      <p>
        Important: R128 measures the entire program with the BS.1770 relative gate. It does <strong>not</strong> try to detect dialog vs. music vs. effects. The gating is purely energy-based.
      </p>

      <h2>ATSC A/85 Is the US Broadcast Policy</h2>
      <p>
        <a href="https://www.atsc.org/atsc-documents/a85-techniques-establishing-maintaining-audio-loudness/" target="_blank" rel="noopener noreferrer">ATSC A/85</a> (the &quot;CALM Act&quot; document in US broadcast) is the equivalent policy for North American television. It also uses BS.1770 as its measurement engine, but it makes two policy choices that differ from R128:
      </p>

      <table>
        <thead>
          <tr>
            <th>ATSC A/85 Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Program Loudness Target</td>
            <td>-24 LKFS (±2 LU)</td>
          </tr>
          <tr>
            <td>Maximum True Peak</td>
            <td>-2 dBTP</td>
          </tr>
          <tr>
            <td>Measurement Gating</td>
            <td>Dialog gating when dialog is present (anchor element)</td>
          </tr>
        </tbody>
      </table>

      <p>
        A/85 uses the term LKFS, &quot;Loudness, K-weighted, relative to Full Scale.&quot; EBU uses LUFS, &quot;Loudness Units, Full Scale.&quot; The two units are mathematically identical. The choice was political (LKFS came from the original ITU document; LUFS was the EBU revision) not technical.
      </p>

      <h2>The Three Differences That Actually Matter</h2>

      <h3 data-n="01">Target Level: -23 vs -24</h3>
      <p>
        EBU R128 targets -23 LUFS. ATSC A/85 targets -24 LKFS. Same scale, 1 dB apart. A program that hits -23 LUFS on a European meter is at -23 LKFS on an American meter. It passes EBU on target and ATSC by 1 dB inside the tolerance window. A program at -24 LKFS that ships to Europe is 1 dB low against the EBU target, which is inside R128&apos;s file-based ±1 LU window but on the edge.
      </p>
      <p>
        In practice, most international post houses master to -23 LUFS / LKFS and live within both tolerances.
      </p>

      <h3 data-n="02">Dialog Gating</h3>
      <p>
        This is the difference that gets files rejected. ATSC A/85 specifies that when dialog is the anchor element of a program, loudness should be measured using a dialog-gated method. The encoder uses a dialog detector to identify dialog segments and computes integrated loudness only over those segments. Non-dialog passages (music beds, effects, ambience) are excluded from the integrated measurement.
      </p>
      <p>
        EBU R128 has no dialog detection. It applies the BS.1770 relative gate to the whole program. Music passages, dialog, and effects all contribute to the integrated number.
      </p>
      <p>
        The result: a program with a quiet opening title sequence, a dialog-heavy middle and a loud music sting at the end will measure differently under R128 (whole program) than under A/85 (dialog only). The same file can read -23 LUFS on an R128 meter and -22 LKFS on a dialog-gated A/85 meter, because the dialog sections were 1 dB louder than the program average.
      </p>

      <h3 data-n="03">True Peak Ceiling</h3>
      <p>
        EBU R128: -1 dBTP. ATSC A/85: -2 dBTP. The 1 dB difference is policy. ATSC was written when downstream STB processing routinely added overshoot, so the headroom requirement is more conservative. A master at -1 dBTP passes R128 cleanly and fails A/85.
      </p>

      <h2>Side-by-Side</h2>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>BS.1770</th>
            <th>EBU R128</th>
            <th>ATSC A/85</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Document type</td>
            <td>Measurement algorithm</td>
            <td>Delivery policy</td>
            <td>Delivery policy</td>
          </tr>
          <tr>
            <td>Target loudness</td>
            <td>None (measurement only)</td>
            <td>-23 LUFS</td>
            <td>-24 LKFS</td>
          </tr>
          <tr>
            <td>Tolerance</td>
            <td>n/a</td>
            <td>±0.5 LU live, ±1 LU file</td>
            <td>±2 LU</td>
          </tr>
          <tr>
            <td>True peak ceiling</td>
            <td>None (measurement only)</td>
            <td>-1 dBTP</td>
            <td>-2 dBTP</td>
          </tr>
          <tr>
            <td>Gating</td>
            <td>Absolute + relative</td>
            <td>Relative, whole program</td>
            <td>Dialog gating when dialog is anchor</td>
          </tr>
          <tr>
            <td>Loudness unit</td>
            <td>LU / LUFS / LKFS</td>
            <td>LUFS</td>
            <td>LKFS</td>
          </tr>
          <tr>
            <td>Region of authority</td>
            <td>International (ITU)</td>
            <td>Europe (EBU)</td>
            <td>North America (ATSC)</td>
          </tr>
        </tbody>
      </table>

      <h2>Which One Applies to Your Delivery</h2>

      <ul>
        <li><strong>European TV broadcaster:</strong> R128. Target -23 LUFS, ceiling -1 dBTP, whole-program gating.</li>
        <li><strong>US TV broadcaster:</strong> A/85. Target -24 LKFS, ceiling -2 dBTP, dialog-gated when dialog is the anchor.</li>
        <li><strong>Netflix, Amazon Prime Video, Apple TV+:</strong> Each publishes its own spec that points at BS.1770 + dialog gating. Not R128, not A/85. Netflix targets -27 LKFS dialog-gated. Read the platform&apos;s delivery doc.</li>
        <li><strong>Spotify, Apple Music, podcasts, audiobooks:</strong> Platform-specific targets in the -14 to -18 LUFS range. They use BS.1770 measurement but not R128 / A/85 targets. See our{' '}
          <a href="/blog/podcast-lufs-targets">podcast LUFS guide</a>.
        </li>
        <li><strong>ACX audiobooks:</strong> Its own spec (-18 to -23 LUFS, -3 dBTP). Not R128, not A/85. See{' '}
          <a href="/blog/acx-submission-rejected">ACX rejection guide</a>.
        </li>
      </ul>

      <h2>Common Confusion to Avoid</h2>
      <p>
        <strong>&quot;LUFS and LKFS measure different things.&quot;</strong> They do not. Same scale, same math, different label. A reading of -23 LUFS and -23 LKFS on the same file is identical.
      </p>
      <p>
        <strong>&quot;My meter is BS.1770 compliant so it&apos;s R128 compliant.&quot;</strong> Not necessarily. BS.1770 is the measurement; R128 also specifies loudness range (LRA) per EBU Tech 3342 and meter behavior per Tech 3341. A bare BS.1770 meter may not display LRA or implement the EBU meter timing.
      </p>
      <p>
        <strong>&quot;Dialog gating is just a fancier relative gate.&quot;</strong> No. Dialog gating uses content detection to choose which sections to measure. The BS.1770 relative gate is an energy threshold. They can produce different integrated numbers on the same file by 1-3 dB on dialog-light material.
      </p>
      <p>
        <strong>&quot;-23 LUFS works for everything.&quot;</strong> It works for European broadcast. It is 9 dB too quiet for Spotify, 7 dB too quiet for Apple Podcasts, and 4 dB too quiet for Netflix. Broadcast targets and streaming targets are different problems with different answers.
      </p>

      <h2>Why This Gets Hard at Scale</h2>
      <p>
        For a single delivery, picking the right spec and dialing the master to it is a fifteen-minute job. For a mixed delivery slate where one master goes to European TV, US TV, Netflix and a podcast version, the same source material has to read four different numbers under four different measurement policies. Doing that by eye, file by file, is where deliveries get rejected.
      </p>
      <p>
        Running each delivery through an automated check against the exact spec it ships under (the right gating, the right ceiling, the right tolerance) removes the failure mode where a file passes one meter and fails the platform&apos;s.
      </p>

    </BlogPostLayout>
  )
}
