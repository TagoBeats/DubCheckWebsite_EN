import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'Podcast LUFS Targets 2026: Spotify, Apple, YouTube',
  description:
    'What LUFS should a podcast be? Exact loudness and true peak targets for Spotify, Apple Podcasts, YouTube and Amazon Music, and what happens when you miss them.',
  alternates: { canonical: '/blog/podcast-lufs-targets' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  keywords: [
    'podcast LUFS',
    'Spotify LUFS',
    'Apple Podcasts LUFS',
    'YouTube LUFS',
    'Amazon Music LUFS',
    'loudness normalization',
    'true peak podcast',
    'EBU R128 podcast',
    'integrated loudness',
    'podcast mastering',
  ],
  openGraph: {
    url: '/blog/podcast-lufs-targets',
    images: ['/og/podcast-lufs-targets'],
    type: 'article',
    title: 'Podcast LUFS Targets for 2026: Spotify, Apple, YouTube, Amazon Music',
    description:
      'Exact integrated loudness and true peak targets for every major podcast platform, and what happens to your file when you miss them.',
    authors: ['Robin Busse'],
    publishedTime: '2026-06-27',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="Podcasting"
      title="Podcast LUFS Targets for 2026: Spotify, Apple, YouTube, Amazon Music"
      date="2026-06-27"
      readingMinutes={8}
      slug="podcast-lufs-targets"
      excerpt="What LUFS should a podcast be? Exact integrated loudness and true peak targets for Spotify, Apple Podcasts, YouTube, Amazon Music and Deezer, and the single -16 LUFS master that passes all of them."
      faq={[
        {
          question: 'What LUFS should a podcast be?',
          answer: 'Master your podcast to -16 LUFS integrated with a -1 dBTP true peak ceiling. That single target passes every major podcast platform (Spotify, Apple Podcasts, YouTube, Amazon Music, Deezer) without re-rendering and avoids audible turn-down on Spotify and Apple.',
        },
        {
          question: 'What is the Spotify LUFS target for podcasts?',
          answer: 'Spotify normalizes podcast playback to -14 LUFS integrated with a -1 dBTP true peak ceiling. Quieter files are turned up using Spotify\'s playback limiter; louder files are turned down by the exact dB difference.',
        },
        {
          question: 'What is the Apple Podcasts LUFS target?',
          answer: 'Apple Podcasts normalizes to -16 LUFS integrated with a -1 dBTP true peak ceiling. Apple does not turn quiet files up, so masters under -16 LUFS will play noticeably quieter than the next show in the queue.',
        },
        {
          question: 'Why is -23 LUFS wrong for podcasts?',
          answer: '-23 LUFS is the EBU R128 target for European television broadcast. It was written for long-form linear viewing where listeners adjust volume once. Podcasts are heard in cars, on AirPods and in noisy environments where listeners flip between shows, so every podcast platform settled 7 to 9 dB hotter than R128.',
        },
      ]}
      tldr={[
        {
          text: (
            <>
              Master to <strong>-16 LUFS integrated</strong> with a <strong>-1 dBTP</strong> true peak ceiling. That single target passes every major podcast platform without re-rendering and avoids audible turn-down on Spotify and Apple.
            </>
          ),
        },
        {
          text: (
            <>
              Spotify normalizes to <strong>-14 LUFS</strong>, Apple Podcasts to <strong>-16 LUFS</strong>, Amazon Music to <strong>-14 LUFS</strong>, YouTube to <strong>-14 LUFS</strong>. Louder masters get turned down; quieter masters are <em>not</em> turned up on Apple.
            </>
          ),
        },
        {
          text: (
            <>
              True peak matters more than peak. Inter-sample peaks above <strong>-1 dBTP</strong> clip on lossy playback even when your DAW shows headroom. Encoders add 0.5 to 1 dB on top of what you see.
            </>
          ),
        },
      ]}
    >

      <p>
        Every other week someone posts the same question on a production forum: <em>what LUFS should my podcast be?</em> The answers come back in a mess of numbers. Some people say -16, some say -14, some still quote -23 from a broadcast spec written for television dialog. None of them are wrong on their own platform. They are wrong as universal advice.
      </p>
      <p>
        This guide lists the actual integrated loudness and true peak targets every major podcast platform uses in 2026, what each platform does when a file misses the target, and the single master that satisfies all of them at once.
      </p>

      <h2>The One-Number Answer</h2>

      <div className="callout">
        <p>
          Master your podcast to <strong>-16 LUFS integrated</strong> with a <strong>-1 dBTP</strong> true peak ceiling.
        </p>
        <p>
          This is the only target that passes Spotify, Apple Podcasts, YouTube, Amazon Music, Deezer and Pocket Casts without a re-render, without audible normalization clamp, and with enough true peak headroom to survive lossy encoding.
        </p>
      </div>

      <p>
        Everything below is the explanation of why that number is correct and what happens when you pick a different one.
      </p>

      <h2>Platform Targets in 2026</h2>

      <p>
        Each platform publishes (or implements) a normalization target. When a file lands above it, the platform turns it down by the exact dB difference. When a file lands below it, behavior splits: some platforms turn it up, some leave it alone.
      </p>

      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Integrated Loudness</th>
            <th>True Peak Ceiling</th>
            <th>Turns Quiet Files Up?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spotify</td>
            <td>-14 LUFS</td>
            <td>-1 dBTP</td>
            <td>Yes (with limiter)</td>
          </tr>
          <tr>
            <td>Apple Podcasts</td>
            <td>-16 LUFS</td>
            <td>-1 dBTP</td>
            <td>No</td>
          </tr>
          <tr>
            <td>YouTube</td>
            <td>-14 LUFS</td>
            <td>-1 dBTP</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Amazon Music</td>
            <td>-14 LUFS</td>
            <td>-2 dBTP</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Deezer</td>
            <td>-15 LUFS</td>
            <td>-1 dBTP</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Pocket Casts / Overcast</td>
            <td>Source level</td>
            <td>n/a</td>
            <td>No (no normalization)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Targets sourced from{' '}
        <a href="https://artists.spotify.com/help/article/loudness-normalization" target="_blank" rel="noopener noreferrer">
          Spotify for Artists loudness documentation
        </a>
        ,{' '}
        <a href="https://podcasters.apple.com/support/893-audio-requirements" target="_blank" rel="noopener noreferrer">
          Apple Podcasters audio requirements
        </a>
        , and platform engineering blogs current as of 2026. Apple&apos;s -16 LUFS target is also the value the AES TD1004 podcast loudness recommendation converged on.
      </p>

      <h2>Why -16 LUFS Is the Universal Master</h2>

      <p>
        A -16 LUFS master sits 2 dB below Spotify, YouTube and Amazon&apos;s target. Those platforms turn it up by 2 dB on playback. That is what their normalization is designed to do. As long as your true peak ceiling left enough headroom (this is what -1 dBTP buys you), the 2 dB gain does not clip.
      </p>
      <p>
        The same -16 LUFS master hits Apple Podcasts exactly on target. No turn-up, no turn-down, no clamp. Apple does not lift quiet files, so masters under -16 LUFS will play noticeably quieter than the next show in the queue.
      </p>
      <p>
        Going louder than -16 LUFS to chase -14 and match Spotify costs you on Apple and on any platform without lift. The file plays at the loudness you delivered, minus any platform turn-down, with the dynamic range you already spent. There is no upside to delivering at -14 LUFS for a single master that has to work everywhere.
      </p>

      <h2>What Normalization Actually Does to a Too-Loud File</h2>

      <p>
        If you deliver at -12 LUFS to Spotify (target -14), Spotify subtracts 2 dB from playback. The loudness lands at -14. The peaks land 2 dB lower than your master. The dynamic range is unchanged. From a listener&apos;s perspective: nothing got louder. You spent the headroom for nothing.
      </p>
      <p>
        The case people worry about, that turn-down sounds &quot;dead&quot; or &quot;flat&quot;, is real but indirect. A master pushed to -12 LUFS usually got there by compressing transients hard. Spotify turning it down does not undo that compression. Listeners compare it side-by-side with a -16 LUFS master that did not get squashed, and the -16 LUFS file sounds punchier even after both have been normalized to the same playback loudness.
      </p>
      <p>
        This is the actual reason loudness targets matter for podcasts. The platform makes everyone the same loudness. What is left is whatever transient and tonal headroom you preserved in mastering. Louder masters do not win. Cleaner masters do.
      </p>

      <h2>True Peak, Not Sample Peak</h2>

      <p>
        Every target above specifies true peak in dBTP, not sample peak in dBFS. The difference is the gap between what your DAW meter shows on the rendered file and what the loudness happens to be after the file gets encoded to AAC or Opus for playback.
      </p>
      <p>
        Lossy encoders reconstruct the waveform from frequency-domain data. The reconstruction routinely produces inter-sample peaks 0.5 to 1 dB higher than the original PCM peak. A master that shows -0.3 dBFS in the DAW can clip when Spotify&apos;s Ogg Vorbis encoder rebuilds it.
      </p>
      <p>
        This is why every podcast loudness spec written this decade specifies a true peak ceiling at or below -1 dBTP. The 1 dB headroom is not a safety margin in the engineering sense. It is the room the encoder needs to round-trip without clipping.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Use a limiter or meter that explicitly displays true peak. Fabfilter Pro-L2, iZotope Ozone Maximizer, Waves L2 and the free Youlean Loudness Meter all show it. If your output meter does not say &quot;True Peak&quot; or &quot;dBTP&quot; anywhere, it is showing sample peak and the number is roughly 1 dB optimistic.
      </div>

      <h2>Where the -23 LUFS Number Comes From</h2>

      <p>
        If you have seen -23 LUFS quoted as a podcast target, it came from EBU R128, the European broadcast loudness recommendation for television. R128 was written for long-form linear broadcast where listeners adjust the TV volume once at the start of an evening. The -23 LUFS target sits low enough that a dialog scene followed by a loud explosion does not need any limiting.
        Podcasts have none of that context: people listen in cars, on AirPods, in a noisy kitchen, frequently flipping between shows. -23 LUFS is too quiet for that listening situation, which is why every podcast platform settled 7 to 9 dB hotter.
      </p>

      <h2>Pre-Delivery Checklist</h2>

      <div className="callout">
        <ol className="list-decimal list-inside space-y-[10px]">
          <li>Integrated loudness measured with a BS.1770 / EBU R128 LUFS meter, full file, gated</li>
          <li>Target <strong>-16 LUFS integrated</strong> (acceptable range -15.5 to -16.5 LUFS)</li>
          <li>True peak ceiling at <strong>-1 dBTP or lower</strong>, measured with a true peak meter, not sample peak</li>
          <li>Noise floor below -60 dBFS in any silence inside the file, not just the head</li>
          <li>Export: MP3 192 kbps CBR, or AAC 128-192 kbps, or WAV 16-bit if the host accepts it</li>
        </ol>
      </div>

      <h2>Why This Gets Hard at Scale</h2>

      <p>
        For one episode a week, dialing in -16 LUFS and checking true peak manually is fine. For a publishing schedule of multiple shows, multiple hosts and a back catalog that has to be re-mastered against a moving target, every manual reading is a place a number gets misread or a chapter gets skipped.
      </p>
      <p>
        Running every file through an automated check against the BS.1770 reference, before it leaves the studio, removes that uncertainty. If the check passes, the file plays at the loudness you intended on every platform. If it fails, the report tells you which parameter is off and by how much, before the episode ships and the loudness mismatch becomes the listener&apos;s first impression.
      </p>

    </BlogPostLayout>
  )
}
