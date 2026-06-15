import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'Why Your ACX Submission Keeps Getting Rejected',
  description:
    'ACX rejections waste hours. Every technical reason files get bounced - noise floor, true peak, per-chapter LUFS, format - and how to fix each one before upload.',
  alternates: { canonical: '/blog/acx-submission-rejected' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  openGraph: {
    url: '/blog/acx-submission-rejected',
    type: 'article',
    title: 'Why Your ACX Submission Keeps Getting Rejected',
    description:
      'Every technical reason ACX rejects files - and how to fix each one before upload.',
    authors: ['Robin Busse'],
    publishedTime: '2026-05-09',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="ACX"
      title="Why Your ACX Submission Keeps Getting Rejected"
      date="2026-05-09"
      readingMinutes={7}
      tldr={[
        {
          text: (
            <>
              ACX measures your noise floor <strong>throughout the entire file</strong>, not just at the start. That pause between two sentences needs to hold at -60 dBFS too.
            </>
          ),
        },
        {
          text: (
            <>
              Your DAW&apos;s peak meter and True Peak are two different things. If you&apos;re not using a <strong>True Peak meter</strong>, you might be failing without knowing it.
            </>
          ),
        },
        {
          text: (
            <>
              ACX checks each chapter individually. One quiet chapter can drag you out of the -18 to -23 LUFS range even if your overall average looks fine.
            </>
          ),
        },
      ]}
    >

      <p>
        You did everything right. Hours of recording, careful editing, a limiter on the master, clean exports. You uploaded to ACX and hit submit. Then the email came back: rejected.
      </p>
      <p>
        The frustrating part is that ACX&apos;s rejection messages are often vague. &quot;Audio quality does not meet requirements&quot; could mean about six different things. This guide breaks down every technical reason submissions fail, explains exactly what ACX is actually measuring, and tells you how to fix each one before it costs you another round of edits.
      </p>

      <h2>What ACX Actually Checks</h2>
      <p>
        Every file you submit gets run through an automated QC process that measures four things. The values below come straight from the{' '}
        <a href="https://www.acx.com/help/narrators/200484550" target="_blank" rel="noopener noreferrer">
          official ACX audio submission requirements
        </a>:
      </p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>ACX Requirement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Integrated Loudness</td>
            <td>-18 to -23 LUFS</td>
          </tr>
          <tr>
            <td>True Peak</td>
            <td>-3 dBTP maximum</td>
          </tr>
          <tr>
            <td>Noise Floor</td>
            <td>-60 dBFS or lower</td>
          </tr>
          <tr>
            <td>File Format</td>
            <td>MP3 192 kbps CBR, or WAV 44.1 kHz / 16-bit</td>
          </tr>
        </tbody>
      </table>

      <p>
        Four numbers. But the way they&apos;re measured is where most people get tripped up.
      </p>

      <h2>The 6 Reasons Your File Is Getting Rejected</h2>

      <h3 data-n="01">Noise Floor Measured in the Wrong Place</h3>
      <p>
        This is the most common one, and it catches a lot of experienced narrators off guard. Most people check the noise floor at the very start of the file, see a nice clean -65 dBFS reading, and move on. Then ACX rejects it anyway.
      </p>
      <p>
        Here&apos;s why: ACX measures noise floor in any silence segment throughout the entire file. That includes the half-second gap between sentences, the breath pause before a new paragraph, and the room tone at the end. If your air conditioning kicks in mid-session, or your mic self-noise creeps up over a long recording day, those mid-file silences will fail even if your intro sounds perfect.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        After editing, take a 1-second silence measurement from somewhere in the <strong>middle</strong> of the chapter, not just the top. A pause between two sentences works perfectly. That&apos;s the reading ACX is actually using.
      </div>

      <h3 data-n="02">Confusing True Peak with Peak</h3>
      <p>
        Your DAW&apos;s standard peak meter shows one number. ACX requires -3 dBTP, which stands for <em>True Peak</em>. These are not the same measurement, and the difference matters.
      </p>
      <p>
        True Peak catches inter-sample peaks, which are clipping events that happen during digital-to-analog conversion. A file that shows -3.2 dB on your regular peak meter can easily exceed -3 dBTP once it&apos;s been processed by ACX&apos;s system. You&apos;re submitting something you think is clean, and it&apos;s failing a check you didn&apos;t know existed.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Use a limiter or meter that explicitly displays True Peak. In Reaper, ReaLimit shows it. In Audacity, install the ACX Check plugin. Fabfilter Pro-L2, iZotope Ozone, and Waves L2 all show True Peak on their output meters. If your current plugin doesn&apos;t mention &quot;True Peak&quot; anywhere, it&apos;s not measuring it.
      </div>

      <h3 data-n="03">Measuring Loudness Across the Whole Book Instead of Per Chapter</h3>
      <p>
        When you submit an audiobook, ACX checks each chapter file independently. If you measure your loudness across a full batch export of all chapters combined, you might hit -20 LUFS overall while individual chapters vary anywhere between -17 and -24 LUFS.
      </p>
      <p>
        A quiet prologue, a slow chapter without much action, or a session recorded on a different day with slightly different gain settings: any of these can push an individual chapter out of range even when the average looks fine.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Check every chapter separately before you submit. Tedious for a 25-chapter book, yes, but one bad chapter means a full rejection and another round of uploads.
      </div>

      <h3 data-n="04">Still Using RMS Instead of LUFS</h3>
      <p>
        A lot of older tutorials, forum posts, and some plugins still talk about RMS levels. ACX officially measures integrated loudness in LUFS, based on the{' '}
        <a href="https://www.itu.int/rec/R-REC-BS.1770" target="_blank" rel="noopener noreferrer">
          ITU-R BS.1770 standard
        </a>. The numbers look similar, but they&apos;re calculated differently: LUFS applies frequency weighting that reflects how human hearing actually works, while RMS is a straight mathematical average.
      </p>
      <p>
        If you&apos;re targeting -18 to -23 RMS and verifying with an RMS meter, you might be passing or failing by a margin that&apos;s invisible in your workflow.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Switch to a LUFS meter. Most modern DAWs have one built in. If yours doesn&apos;t, Youlean Loudness Meter is free and accurate. Look for &quot;integrated loudness&quot; or &quot;I LUFS&quot; in the readout.
      </div>

      <h3 data-n="05">Edit Points Causing Micro-Distortion</h3>
      <p>
        This one shows up less often, but it&apos;s particularly sneaky because it sounds completely fine in your DAW. Hard cuts between takes can create tiny clicks or transient spikes when the waveform isn&apos;t at a zero crossing at the edit point. ACX&apos;s automated QC sometimes flags these as distortion.
      </p>
      <p>
        Heavily edited chapters with a lot of punch-ins and comped takes are most vulnerable to this.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Apply a very short crossfade (2 to 5 ms) to every edit point. It&apos;s completely inaudible and eliminates the discontinuity. Most DAWs let you set a default crossfade length that applies automatically to all new edits.
      </div>

      <h3 data-n="06">Wrong File Format or Export Settings</h3>
      <p>
        ACX accepts two formats: MP3 at 192 kbps CBR (Constant Bit Rate), or WAV at 44.1 kHz and 16-bit depth. Submitting 24-bit WAV, variable bit rate MP3, or 48 kHz audio fails the technical check regardless of how good your loudness values are.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Double-check your export settings before every batch. Specifically: confirm MP3 is set to CBR and not VBR, and confirm WAV exports are 16-bit, not 24-bit or 32-bit float. These settings can silently reset in some DAWs after updates.
      </div>

      <h2>A Pre-Submission Checklist Worth Bookmarking</h2>

      <div className="callout">
        <ol className="list-decimal list-inside space-y-[10px]">
          <li>Measure integrated LUFS on <strong>each chapter individually</strong></li>
          <li>Check True Peak with a meter that explicitly says &quot;True Peak&quot;</li>
          <li>Measure noise floor mid-file in a silence between sentences, not just the start</li>
          <li>Confirm export format: MP3 192 kbps CBR or WAV 44.1 kHz / 16-bit</li>
          <li>Check for 0.5 to 1 second of silence at the head and 1 to 5 seconds at the tail</li>
        </ol>
      </div>

      <h2>Why This Gets Hard at Scale</h2>
      <p>
        For a single short chapter, running these checks manually is fine. For a 20-chapter audiobook, it takes a while, and the more you do manually, the more likely a missed step or a misread number becomes. Checking chapter 18 after four hours of editing is not the same as checking chapter 1 fresh.
      </p>
      <p>
        The other issue is that ACX&apos;s automated system doesn&apos;t always behave exactly the way things look in your DAW. Subtle inter-sample peaks, noise sitting right on the -60 dBFS boundary, or a single outlier chapter in a long book can mean a full rejection after days of work.
      </p>
      <p>
        Running an automated check against the exact ACX spec before you upload removes that uncertainty. If it says pass, you submit with confidence. If it finds a failure, you know exactly which chapter and which parameter to fix before ACX ever sees the file.
      </p>

    </BlogPostLayout>
  )
}
