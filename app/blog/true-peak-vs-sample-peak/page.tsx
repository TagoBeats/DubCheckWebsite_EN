import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'True Peak vs Sample Peak: Why Masters Clip on Spotify',
  description:
    'Sample peak and true peak are different measurements. Where inter-sample peaks live, and why masters that look clean in a DAW clip after AAC or MP3 encoding.',
  alternates: { canonical: '/blog/true-peak-vs-sample-peak' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  keywords: [
    'true peak',
    'sample peak',
    'inter-sample peak',
    'dBTP',
    'dBFS',
    'true peak vs sample peak',
    'ISP clipping',
    'oversampling',
    'true peak limiter',
    'BS.1770',
  ],
  openGraph: {
    url: '/blog/true-peak-vs-sample-peak',
    images: ['/og/true-peak-vs-sample-peak'],
    type: 'article',
    title: 'True Peak vs Sample Peak: Why Your -0.1 dBFS Master Clips on Spotify',
    description:
      'Sample peak and true peak are different measurements. The gap is where inter-sample peaks live, and where masters that look clean in a DAW end up clipping after lossy encoding.',
    authors: ['Robin Busse'],
    publishedTime: '2026-05-28',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="Loudness"
      title="True Peak vs Sample Peak: Why Your -0.1 dBFS Master Clips on Spotify"
      date="2026-05-28"
      readingMinutes={7}
      slug="true-peak-vs-sample-peak"
      excerpt="Sample peak and true peak are different measurements. The gap is where inter-sample peaks live, and where masters that look clean in a DAW end up clipping after AAC, MP3 or Ogg encoding."
      tldr={[
        {
          text: (
            <>
              Sample peak is the highest number stored in the file. True peak is the highest level the waveform <strong>actually reaches</strong> between samples after analog reconstruction. They are not the same value.
            </>
          ),
        },
        {
          text: (
            <>
              The gap is typically <strong>0.5 to 1.0 dB</strong> and can exceed 2 dB on dense, transient-rich material. A master peaking at -0.1 dBFS routinely clips at +0.7 dBTP after MP3 or AAC encoding.
            </>
          ),
        },
        {
          text: (
            <>
              Every modern loudness spec (EBU R128, ACX, Apple, Spotify, Netflix) is written in <strong>dBTP, not dBFS</strong>. If your meter does not explicitly say &quot;True Peak&quot;, it is showing sample peak and the number is optimistic.
            </>
          ),
        },
      ]}
    >

      <p>
        You bounce a master, the limiter ceiling reads -0.1 dBFS, the file looks clean in every meter you trust. You upload to Spotify and a listener tells you the loud sections are crackling. You re-check the file. Still -0.1 dBFS. Nothing in the DAW has changed.
      </p>
      <p>
        The clipping is real, and it happened after the file left your DAW. This is what inter-sample peaks are, why every loudness specification this decade is written in dBTP rather than dBFS, and how a master that looks fine becomes a master that distorts.
      </p>

      <h2>Sample Peak: What Your Meter Has Always Shown</h2>
      <p>
        Digital audio is a sequence of samples. At 44.1 kHz, the file stores one amplitude value every 22.7 microseconds. A standard peak meter scans those stored values and reports the largest one. Call it sample peak, peak, or dBFS. Same measurement.
      </p>
      <p>
        The measurement is exact for the values that are stored. The problem is that the signal between samples is not stored. It is reconstructed at playback by the DAC, the codec, or the streaming player. That reconstruction can, and routinely does, produce a waveform that peaks higher than any individual stored sample.
      </p>

      <h2>True Peak: What the Waveform Actually Does</h2>
      <p>
        True peak is the highest instantaneous level the reconstructed analog waveform reaches between sample points. It is measured by running the signal through a reconstruction filter (typically 4x oversampling, sometimes 8x or 16x for accuracy) and reading the peak of the upsampled waveform.
      </p>
      <p>
        The{' '}
        <a href="https://www.itu.int/rec/R-REC-BS.1770" target="_blank" rel="noopener noreferrer">
          ITU-R BS.1770 standard
        </a>
        {' '}defines this measurement explicitly: oversample by at least 4x, apply a true peak detector, report in dBTP. Every loudness specification that points at BS.1770 (EBU R128, ATSC A/85, ACX, Apple, Spotify, Amazon, Netflix) inherits this definition.
      </p>

      <h2>Why the Two Numbers Differ</h2>
      <p>
        Picture two samples sitting at +0.99 and +0.99. Both legal, both under 0 dBFS. The waveform passing between them does not have to stay between them. If the reconstruction filter draws a curve through and around those two points, the peak of that curve can sit at +1.05 or higher. That excursion exists in time but does not exist as a sample. The sample meter never sees it.
      </p>
      <p>
        This is an inter-sample peak. It is not a bug. It is a direct consequence of the sampling theorem. Any time the underlying continuous signal between two samples would naturally rise above either sample value, the inter-sample peak is real and it shows up in the DAC output.
      </p>

      <h2>How Big Is the Gap in Practice?</h2>

      <table>
        <thead>
          <tr>
            <th>Material</th>
            <th>Typical Sample-to-True-Peak Gap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Solo voice, lightly processed</td>
            <td>0.2 to 0.5 dB</td>
          </tr>
          <tr>
            <td>Voice with heavy limiting</td>
            <td>0.5 to 1.0 dB</td>
          </tr>
          <tr>
            <td>Music master at -1 dBFS ceiling</td>
            <td>0.8 to 1.5 dB</td>
          </tr>
          <tr>
            <td>Dense pop master, hard-limited</td>
            <td>1.5 to 2.5 dB</td>
          </tr>
          <tr>
            <td>Pathological transients (kick, snare attack)</td>
            <td>up to 3 dB</td>
          </tr>
        </tbody>
      </table>

      <p>
        The gap grows with how aggressively the signal was limited. A flat-topped waveform, the kind a brickwall limiter produces, has more inter-sample energy than a peaky one with the same numerical maximum, because the reconstruction filter has more high-frequency content to ring on.
      </p>

      <h2>What Lossy Codecs Do to the Gap</h2>
      <p>
        MP3, AAC, Ogg Vorbis and Opus do not store sample values directly. They store frequency-domain coefficients and reconstruct the time-domain waveform at playback. That reconstruction is approximate, and the approximation routinely produces samples 0.5 to 1.0 dB higher than the original file.
      </p>
      <p>
        Stack that on top of an existing inter-sample peak headroom shortage and the result is clipping. A -0.3 dBFS master with 0.6 dB of inter-sample headroom (true peak: +0.3 dBTP) re-encoded to 128 kbps AAC can land at +1.0 dBFS in the decoded buffer. That is the crackle the listener heard.
      </p>

      <h2>What the Specs Actually Require</h2>

      <table>
        <thead>
          <tr>
            <th>Spec</th>
            <th>True Peak Ceiling</th>
            <th>Why That Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EBU R128</td>
            <td>-1 dBTP</td>
            <td>Headroom for broadcast chain + codec</td>
          </tr>
          <tr>
            <td>ATSC A/85</td>
            <td>-2 dBTP</td>
            <td>ATSC encoder headroom requirement</td>
          </tr>
          <tr>
            <td>Spotify</td>
            <td>-1 dBTP</td>
            <td>Ogg Vorbis reconstruction headroom</td>
          </tr>
          <tr>
            <td>Apple Podcasts / Music</td>
            <td>-1 dBTP</td>
            <td>AAC reconstruction headroom</td>
          </tr>
          <tr>
            <td>ACX</td>
            <td>-3 dBTP</td>
            <td>MP3 encoding + downstream processing</td>
          </tr>
          <tr>
            <td>Netflix</td>
            <td>-2 dBTP</td>
            <td>Codec + downstream chain</td>
          </tr>
        </tbody>
      </table>

      <p>
        Every one of these ceilings is set below 0 dBTP for the same reason: the encoder needs room to reconstruct without clipping. The numbers are not arbitrary safety margins. They are the measured headroom requirements of the codecs each platform uses.
      </p>

      <h2>How to Measure True Peak Correctly</h2>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Use a meter that explicitly says &quot;True Peak&quot; or &quot;dBTP&quot;. Fabfilter Pro-L2, iZotope Insight, Waves WLM Plus, the free Youlean Loudness Meter, and the loudness panes built into modern Pro Tools, Logic and Reaper all measure true peak. If your meter only says &quot;Peak&quot; or shows dBFS, it is reading sample peak. The number you need is about 1 dB lower than what it shows.
      </div>

      <p>
        Check the meter&apos;s oversampling factor if it exposes one. 4x is the BS.1770 minimum. 8x or 16x is more accurate on highly transient material. The difference between 4x and 16x measurement is small (under 0.2 dB on typical content) but can matter when the file sits right on the spec boundary.
      </p>

      <h2>How to Hit the Ceiling Without Re-mastering</h2>
      <p>
        Most modern brickwall limiters have a &quot;True Peak&quot; or &quot;ISP&quot; switch. With it on, the limiter oversamples the side-chain detector and limits the inter-sample peaks directly. Set the ceiling to the spec target (-1 dBTP, -2 dBTP, etc.) and the output is correct by construction.
      </p>
      <p>
        With the switch off, the limiter is limiting sample peaks. That means the file can pass the limiter at -0.1 dBFS and still produce inter-sample peaks above 0 dBTP. This is the most common cause of &quot;my master clips on Spotify even though my limiter is on it.&quot;
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Turn on true-peak limiting in your output limiter and set the ceiling to the spec target. Pro-L2: &quot;True Peak Limiting&quot;. Ozone Maximizer: &quot;True Peak&quot;. Reaper ReaLimit: &quot;ISP&quot;. Without this switch, the limiter ceiling number is not the number the spec is testing.
      </div>

      <h2>Why This Gets Hard at Scale</h2>
      <p>
        On a single master, a true peak meter and a true peak limiter solve the problem in two clicks. Across a back catalog, a multi-chapter audiobook, or a podcast network with multiple shows and varying mastering chains, the failure is silent. The sample peak meter passes, the file ships, and the clipping shows up only on the platform&apos;s lossy stream.
      </p>
      <p>
        Running every render through a true-peak check against the target spec, before the file leaves the studio, removes the gap between what the DAW says and what the listener hears.
      </p>

    </BlogPostLayout>
  )
}
