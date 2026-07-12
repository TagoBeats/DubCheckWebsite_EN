import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: 'Room Tone Matching Across Recording Days: Prevent Re-Records',
  description:
    'Why chapter 3 sounds different from chapter 12, and the recording, editing and measurement workflow that keeps room tone consistent across a long project.',
  alternates: { canonical: '/blog/room-tone-matching-recording-days' },
  authors: [{ name: 'Robin Busse', url: 'https://audio-dubcheck.com/about' }],
  keywords: [
    'room tone matching',
    'noise floor consistency',
    'audiobook recording workflow',
    'narrator workflow',
    'chapter consistency',
    'mic placement',
    'preamp gain',
    'spectral matching',
    'voice recording',
    'ACX noise floor',
  ],
  openGraph: {
    url: '/blog/room-tone-matching-recording-days',
    images: ['/og/room-tone-matching-recording-days'],
    type: 'article',
    title: 'Room Tone Matching Across Recording Days',
    description:
      'Why chapter 3 sounds different from chapter 12 even when nothing in the booth changed, and the workflow that keeps room tone consistent across a long project.',
    authors: ['Robin Busse'],
    publishedTime: '2026-06-04',
  },
}

export default function Post() {
  return (
    <BlogPostLayout
      category="Narrators"
      title="Room Tone Matching Across Recording Days"
      date="2026-06-04"
      readingMinutes={8}
      slug="room-tone-matching-recording-days"
      excerpt="Why chapter 3 sounds different from chapter 12 even when nothing in the booth changed, and the recording, editing and measurement workflow that keeps room tone consistent across days, weeks and months of a project."
      tldr={[
        {
          text: (
            <>
              Room tone drift between sessions is rarely the room. It is <strong>mic position, preamp gain and HVAC state</strong>. Three variables that move 1-3 dB each across days and stack into an audible mismatch.
            </>
          ),
        },
        {
          text: (
            <>
              Capture <strong>30 seconds of clean room tone</strong> at the start of every session. It is the reference your editor needs to match noise floor across days and the fallback your gap-fill needs when a sentence runs short.
            </>
          ),
        },
        {
          text: (
            <>
              The mismatch that gets ACX rejections is not the noise floor level. It is the <strong>spectral shape</strong>. A 200 Hz hum on day 7 that wasn&apos;t there on day 1 will pass a -60 dBFS check and still sound wrong next to it.
            </>
          ),
        },
      ]}
    >

      <p>
        Two weeks into an audiobook project, the editor pulls up chapter 3 and chapter 12 side by side. Same booth, same mic, same narrator. Chapter 3 has a soft hiss that sits a couple dB below the voice. Chapter 12 has a low rumble underneath. The voice sounds the same. The silence does not.
      </p>
      <p>
        This is the most expensive failure mode in long-form narration. It does not show up while recording. It does not show up in any single chapter played alone. It shows up only when chapters are heard back-to-back, and it shows up to listeners as &quot;something feels off,&quot; which is exactly the language ACX and a publisher&apos;s QC use when they reject a delivery.
      </p>
      <p>
        Here is what actually drifts between recording days, and the workflow that catches it before the rejection email.
      </p>

      <h2>What Actually Changes Between Days</h2>

      <p>
        The booth itself is the most stable thing in the chain. Walls do not move. Foam does not change overnight. The variables that drift are the ones you touch at the start of each session, and the ones the building does without telling you.
      </p>

      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Typical Drift per Session</th>
            <th>Audible Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mic position (distance, axis)</td>
            <td>1-3 cm</td>
            <td>1-3 dB level change, proximity tilt</td>
          </tr>
          <tr>
            <td>Preamp gain</td>
            <td>0.5-2 dB</td>
            <td>Noise floor up or down by the same amount</td>
          </tr>
          <tr>
            <td>HVAC / building noise</td>
            <td>Variable (time of day, season)</td>
            <td>Low rumble or mid-frequency hiss appears</td>
          </tr>
          <tr>
            <td>Computer fan state</td>
            <td>2-5 dB at vent ramp</td>
            <td>Broadband hiss rises mid-session</td>
          </tr>
          <tr>
            <td>Narrator distance/posture</td>
            <td>Continuous</td>
            <td>Level and tonal balance shift</td>
          </tr>
          <tr>
            <td>Outside traffic / weather</td>
            <td>Variable</td>
            <td>Low-frequency content under -50 dBFS</td>
          </tr>
        </tbody>
      </table>

      <p>
        None of these individually trigger a rejection. Stack them (a mic 2 cm closer than yesterday, a preamp 1 dB hotter, the HVAC compressor running because it&apos;s warmer outside) and the noise floor moves 3-5 dB and changes shape. That is what the editor hears between chapters.
      </p>

      <h2>The Pre-Session Reference Capture</h2>

      <p>
        Every session, before you record a single line, capture a reference. Three takes, each 30 seconds long, in this order:
      </p>

      <ol className="list-decimal list-inside space-y-[8px]">
        <li><strong>Room tone:</strong> mic open, you sitting silently in normal recording position, breathing normally through your nose.</li>
        <li><strong>Reference phrase:</strong> the same sentence every time. Something short and varied. &quot;The quick brown fox jumped over the lazy dog&quot; works because it covers vowel and consonant range.</li>
        <li><strong>Loud / soft pair:</strong> one sentence at your normal performance level, one at your softest pre-whisper level.</li>
      </ol>

      <p>
        Label the file <code>chapter-N-reference.wav</code> and keep it. Three minutes of work at the start of each session, and you have everything an editor needs to compare days and everything a measurement tool needs to flag drift before it stacks.
      </p>

      <h2>Measuring the Drift, Not Trusting Your Ears</h2>

      <p>
        Day-over-day drift in a quiet booth is below the threshold most people can hear in isolation. You will not catch a 2 dB noise floor rise sitting in the booth at the start of a session. You will catch it three weeks later when a listener says the second half of the book sounds different.
      </p>

      <p>
        Run the reference captures through three measurements every session:
      </p>

      <ul>
        <li><strong>Noise floor (dBFS):</strong> integrated RMS over the 30 seconds of room tone. Should land within ±2 dB of the project baseline.</li>
        <li><strong>Spectral centroid:</strong> the frequency where half the noise energy sits below. A shift of more than 200 Hz between sessions means the shape of the noise changed. Usually a new HVAC component or a fan that wasn&apos;t running before.</li>
        <li><strong>Reference phrase loudness (LUFS):</strong> integrated loudness of the reference sentence. Should land within ±1 LU of baseline. Anything larger and your mic distance or preamp moved.</li>
      </ul>

      <p>
        Three numbers per session. If all three are inside tolerance, start recording. If one is out, find what changed before you commit a chapter to that state.
      </p>

      <h2>What to Do When the Reference Drifted</h2>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Do not adjust the preamp first. Re-check mic position against your reference markers: tape on the desk, a measuring stick, a phone photo from the project setup. 90% of drift is mic distance, not the chain. If position is correct and the noise floor is still off, check the building (HVAC, neighbor noise, time-of-day traffic) before touching gain.
      </div>

      <p>
        Adjusting the preamp to chase a noise floor target hides the real change. If the HVAC ramped up and you compensate by dropping the preamp 2 dB, your voice now sits at a different level too. The chapter passes a noise floor check and fails a loudness check, or worse, passes both individually and sounds quiet against yesterday&apos;s chapter.
      </p>

      <h2>Mic Position: The One Variable You Control Directly</h2>

      <p>
        Most narrators rebuild their setup at the start of each session. Mic on stand, pop filter at distance, mouth at angle. The distance you intend to hit and the distance you actually hit drift by 1-3 cm without you noticing. Three centimeters of mic distance is roughly 1.5 dB of level and a measurable proximity-effect change in the low mids.
      </p>

      <div className="fix-box">
        <span className="fix-box-label">Fix</span>
        Mark the mic position physically. Tape on the boom arm at the exact angle. A measuring stick or knotted string from a fixed point on the desk to the mic capsule. A phone photo of the setup from the same angle every day. The investment is a few minutes once and removes the most common source of day-over-day mismatch.
      </div>

      <h2>The Gap-Fill Problem</h2>

      <p>
        Halfway through editing chapter 8, you find a sentence that runs short and needs 0.6 seconds of silence to fit the rhythm of the surrounding paragraph. You paste in silence from chapter 8 itself, but the only available gap is a breath, and the breath has the wrong shape.
      </p>

      <p>
        This is why the 30-second room tone capture matters. With it, you have a clean source of <em>this day&apos;s</em> room tone to fill any gap that needs filling. Without it, editors paste digital silence (which sounds like a hole in the room tone) or borrow from a different session (which sounds like a different room). Both get caught in QC. Both are avoidable.
      </p>

      <h2>The Project Baseline</h2>

      <p>
        At the start of any project longer than a single session, lock in a baseline from session 1 and treat it as the target for every subsequent day. Save the reference captures, the three numbers (noise floor RMS, spectral centroid, reference phrase LUFS), and a one-line note about any unusual conditions (storm outside, HVAC off for maintenance, etc.).
      </p>

      <p>
        Every following session, the three measurements get compared to the baseline before any chapter is committed. The first session that drifts more than tolerance is where you investigate. Not the tenth, after the drift has been baked into eight chapters.
      </p>

      <h2>Pre-Session Checklist</h2>

      <div className="callout">
        <ol className="list-decimal list-inside space-y-[10px]">
          <li>Mic distance verified against reference (tape, stick, or photo)</li>
          <li>Preamp gain at project baseline (no &quot;temporary&quot; adjustments)</li>
          <li>HVAC and building noise checked: listen for 30 seconds before recording</li>
          <li>30 seconds of room tone captured and saved as <code>chapter-N-reference.wav</code></li>
          <li>Reference phrase recorded</li>
          <li>Three measurements within tolerance (noise floor RMS ±2 dB, spectral centroid ±200 Hz, reference LUFS ±1 LU)</li>
        </ol>
      </div>

      <h2>Why This Gets Hard at Scale</h2>

      <p>
        For a one-day project, none of this matters. The room is the room is the room. For a project that runs 4 to 12 weeks, the building does things, the seasons change, you change, and the accumulated drift between session 1 and session 30 is what listeners hear as &quot;different room.&quot; You will not hear it day-to-day because the change between any two sessions is below your detection threshold. You will only hear it cumulatively, and by then the chapters are committed.
      </p>
      <p>
        Capturing a reference at the start of each session and measuring against the baseline turns a problem you cannot hear into three numbers you can read. The catch happens at minute one of a session, not week three of QC.
      </p>

    </BlogPostLayout>
  )
}
