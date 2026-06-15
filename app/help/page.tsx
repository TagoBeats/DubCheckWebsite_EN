import type { Metadata } from 'next'
import Image from 'next/image'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

const SHOT_DIMS: Record<string, { w: number; h: number }> = {
  '/help/empty-state.png':       { w: 1072, h: 772 },
  '/help/spec-select.png':       { w: 1072, h: 782 },
  '/help/batch-processing.png':  { w: 1072, h: 782 },
  '/help/batch-summary.png':     { w: 1072, h: 782 },
  '/help/file-detail.png':       { w: 1072, h: 782 },
  '/help/license-screen.png':    { w: 1072, h: 909 },
  '/help/pdf-summary.png':       { w: 566,  h: 744 },
  '/help/pdf-timeline.png':      { w: 566,  h: 744 },
  '/help/pdf-histogram.png':     { w: 1819, h: 2573 },
}
const ABOVE_FOLD_SHOTS = new Set(['/help/empty-state.png', '/help/spec-select.png'])

export const metadata: Metadata = {
  title: 'Help & Docs - Setup, reports, spec picking',
  description:
    'Get DubCheck installed, read your first PDF report, pick the right delivery spec, and fix the things that usually trip people up on a first run.',
  alternates: { canonical: '/help' },
  openGraph: {
    url: '/help',
    title: 'DubCheck Help & Documentation',
    description:
      'Setup, reading the PDF report, picking the right delivery spec, troubleshooting and FAQ.',
  },
}

const CARDS = [
  {
    id: 'getting-started',
    label: 'Get started',
    desc: 'Install the app and check your first file in under a minute.',
    icon: '◐',
  },
  {
    id: 'reading-your-report',
    label: 'Read your report',
    desc: 'What every number on the file detail screen actually means.',
    icon: '◇',
  },
  {
    id: 'picking-a-spec',
    label: 'Pick the right spec',
    desc: 'Which delivery spec to choose for Netflix, EBU, ACX, and the rest.',
    icon: '☷',
  },
  {
    id: 'pdf-report',
    label: 'The PDF report',
    desc: 'What you hand to your client or upload to a delivery portal.',
    icon: '▤',
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting',
    desc: 'A check failed, a file won’t open, the loudness number looks wrong.',
    icon: '!',
  },
  {
    id: 'faq',
    label: 'FAQ',
    desc: 'Formats, system requirements, licensing, privacy.',
    icon: '?',
  },
]

export default function HelpPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[1560px] mx-auto px-5 md:px-10">
        <Nav />

        <main className="pt-[60px] pb-[100px]">

          {/* Hero */}
          <div className="max-w-[880px] mx-auto mb-14 text-center">
            <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Help &amp; Docs</div>
            <h1 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.025em] leading-[1.1] mb-5 break-words">
              Everything you need to ship a clean master.
            </h1>
            <p className="text-dc-ink2 text-[16px] md:text-[17px] leading-[1.65]">
              DubCheck reads your file, measures it against a delivery spec, and tells you exactly what to fix. Pick a topic below. Most people only need one.
            </p>
          </div>

          {/* Card hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {CARDS.map(card => (
              <a
                key={card.id}
                href={`#${card.id}`}
                className="group block rounded-[12px] border border-white/[0.06] bg-white/[0.02] hover:border-dc-orange/40 hover:bg-white/[0.035] transition-all duration-150 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-[8px] border border-white/[0.08] flex items-center justify-center text-dc-orange font-mono text-[16px]">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-dc-ink text-[15px] font-semibold mb-1 group-hover:text-white transition-colors">
                      {card.label}
                    </div>
                    <p className="text-dc-ink3 text-[13.5px] leading-[1.55]">{card.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="space-y-24">

            {/* GETTING STARTED */}
            <Section id="getting-started" eyebrow="Setup" title="Get started in 60 seconds">

              <Step n={1} title="Install">
                Download <Code>DubCheck-&lt;version&gt;.dmg</Code> from the release page, drag <Code>DubCheck.app</Code> to <Code>/Applications</Code>, double-click to launch. macOS 12 or newer, Apple Silicon and Intel both work. The app is signed and notarized, so Gatekeeper should not get in the way.
              </Step>

              <Step n={2} title="Drop your audio">
                On the empty screen, drag one or more files in, or click <strong className="text-dc-ink">Browse Files</strong>. WAV, BWF, and FLAC. Mono through 7.1.2. You can drop up to 10 files on Pro, unlimited on Studio Pro.
              </Step>

              <Shot src="/help/empty-state.png" caption="Drag files anywhere on the window or use Browse Files." />

              <Step n={3} title="Pick a spec">
                Choose where the file is going: Netflix, EBU R128, ATSC A/85, ACX, and so on. If you are unsure, the next section walks through which spec belongs to which platform.
              </Step>

              <Shot src="/help/spec-select.png" caption="Specs are grouped by platform. Netflix variants cover Atmos, 5.1, 2.0, dubbed, M&E, and theatrical." />

              <Step n={4} title="Let it run">
                Each file is analysed in turn. Per-check status streams in live, so if a file already fails on one check, you see it before the rest finish.
              </Step>

              <Shot src="/help/batch-processing.png" caption="Live status while the batch runs. The right rail shows completed files." />

              <Step n={5} title="Review the summary">
                Pass / warn / fail counts on the left, every file on the right. Click any row for the detail view.
              </Step>

              <Shot src="/help/batch-summary.png" caption="Mixed batch: three pass, two fail. The big PASS / WARN / FAIL banner mirrors the worst case." />

              <Step n={6} title="Export the PDF">
                <strong className="text-dc-ink">Generate Report</strong> at the bottom-left writes a multi-page PDF with file-by-file detail, plots, methodology, and a signed signoff line. That is what you hand off or upload.
              </Step>
            </Section>

            {/* READING YOUR REPORT */}
            <Section id="reading-your-report" eyebrow="The detail view" title="Read your report">
              <p>Click any file in the batch summary to land here. One panel per check, green for pass, orange for warn, red for fail. The threshold the spec demands is printed next to each check name, so you do not have to remember it.</p>

              <Shot src="/help/file-detail.png" caption="File detail. Spec target is shown in parentheses next to each check title; your measured value is on the right." />

              <SubHead>What each row means</SubHead>

              <Box title="Integrated Loudness (LUFS / LKFS)">
                The single loudness number for the whole programme, measured per ITU-R BS.1770-4. The gating mode depends on the spec: EBU mode for streaming, ungated program loudness for broadcast, dialog-gated for Netflix.
              </Box>

              <Box title="True Peak (dBTP)">
                Inter-sample peaks, found by 4× oversampling the signal. Always worse than sample peak. This is the number your downstream encoder cares about. If it is over the spec limit you risk audible clipping after re-encoding.
              </Box>

              <Box title="Sample Rate, Bit Depth, Channels, Container, Encoding">
                File hygiene. Most specs want 48 kHz / 24-bit PCM in a WAV container. Bit depth has two numbers: what the file header claims and what is actually carried in the lowest bits. A 24-bit container with only 16 bits of real signal is a 16-bit file in disguise.
              </Box>

              <Box title="DC Offset, Clipped Samples, NaN/Inf">
                Recording-chain problems. DC offset eats headroom from your limiter. Clipped samples mean your converter ran out of bits. NaN or Inf samples mean something further upstream is wrong. If you see these, the file is not safe to deliver.
              </Box>

              <Box title="Loudness Range (LRA, LU)">
                EBU Tech 3342. How much dynamic range your programme actually uses. Most streamers tolerate a wide range, broadcast wants it tighter.
              </Box>

              <Box title="Dialog-Gated Loudness (Netflix)">
                For Netflix specs, the loudness number is measured only over speech segments (Silero VAD). If your file has less than 15 % dialog, the engine automatically falls back to program loudness. That is the Netflix rule.
              </Box>

              <Box title="Phase Correlation (Stereo only)">
                Average L/R correlation. Below the threshold means the mix will lose energy or invert when summed to mono. Netflix Section 2.3 cares about this.
              </Box>
            </Section>

            {/* PICKING A SPEC */}
            <Section id="picking-a-spec" eyebrow="Specs" title="Pick the right spec">
              <p>If your delivery target is not on this list, pick the closest one. They all share the same measurement engine.</p>

              <Table
                rows={[
                  ['Netflix, original-language 5.1',          'netflix/5_1_original'],
                  ['Netflix, dubbed / Audio Description',     'netflix/5_1_dubbed, 2_0_dubbed, atmos_dubbed'],
                  ['Netflix, M&E',                            'netflix/5_1_me, atmos_me'],
                  ['Netflix, Atmos',                          'netflix/atmos_original'],
                  ['Netflix, theatrical',                     'netflix/theatrical'],
                  ['European broadcast (TV, radio, streaming)','ebu/r128'],
                  ['European broadcast (ads, promos)',         'ebu/r128_s1_shortform'],
                  ['US broadcast (CALM Act)',                  'atsc/a85'],
                  ['Amazon Prime Video',                            'prime_video/default'],
                  ['YouTube',                                       'youtube/default'],
                  ['Spotify',                                       'spotify/default'],
                  ['Apple Music / Digital Masters',                 'apple_music/default'],
                  ['Audible / ACX audiobook',                       'acx/default'],
                  ['Storytel audiobook',                            'storytel/default'],
                  ['Spotify Audiobooks',                            'spotify_audiobooks/default'],
                  ['Podtrac podcast',                               'podtrac/default'],
                ]}
              />

              <p className="text-dc-ink3 text-[14px]">Want to know exactly what a spec checks before you pick it? In the CLI, <Code>dubcheck specs show &lt;id&gt;</Code> prints every threshold.</p>
            </Section>

            {/* PDF REPORT */}
            <Section id="pdf-report" eyebrow="The PDF" title="The PDF report">
              <p>One PDF per file, plus a batch summary if you ran more than one. Built to be sent to a client or uploaded to a delivery portal as-is.</p>

              <SubHead>Page 1: Summary</SubHead>
              <p>File metadata, spec details, the four headline numbers (integrated loudness, short-term max, true peak, LRA) and the overall PASS / WARN / FAIL.</p>
              <Shot src="/help/pdf-summary.png" caption="Page 1 of the PDF. The summary you can show a client without scrolling." narrow />

              <SubHead>Page 2: Loudness and true-peak timeline</SubHead>
              <p>Where the loudness sits over time, with the spec target overlaid. The red dot marks the worst moment.</p>
              <Shot src="/help/pdf-timeline.png" caption="If a loudness number fails by a small margin, this page shows you exactly where to look." narrow />

              <SubHead>Page 3: Loudness distribution</SubHead>
              <p>Short-term histogram. Tells you whether the mix lives in the right loudness band or drifts.</p>
              <Shot src="/help/pdf-histogram.png" caption="A histogram bunched around the spec target with a long tail to the right is a normal dialog-driven mix." narrow />
            </Section>

            {/* TROUBLESHOOTING */}
            <Section id="troubleshooting" eyebrow="When something is off" title="Troubleshooting">

              <Issue
                problem="A file fails on loudness by a small margin (0.5 to 1 LU)"
                cause="Most often a gating-mode mismatch with your DAW meter, or LFE being weighted in by another tool."
                fix={
                  <>
                    Open the file detail. If the spec is Netflix and the dialog-gated value is what fails, your overall loudness is fine but the dialog itself is too hot or too low. If the spec is EBU R128 and your DAW shows a slightly different number, your DAW may be using ungated mode. R128 uses gated. For 5.1 deliverables, remember DubCheck strips the LFE before measuring loudness as BS.1770 requires. Re-render with the LFE excluded from the loudness sum and the numbers will match.{' '}
                    <strong className="text-dc-ink">ACX narrators:</strong> see the{' '}
                    <a href="/blog/acx-submission-rejected" className="text-dc-cyan underline underline-offset-2 hover:text-dc-ink transition-colors">
                      full ACX rejection guide
                    </a>{' '}
                    if you are missing the -18 to -23 LUFS window on individual chapters.
                  </>
                }
              />

              <Issue
                problem="True peak fails even though my sample peak is at -1 dBFS"
                cause="Inter-sample peaks sit between samples and can be 1 to 3 dB louder than what your DAW shows."
                fix={
                  <>
                    Insert a true-peak limiter on the master with a ceiling at least 1 dB below the spec limit. For a −2 dBTP target, set the limiter to −3 dBTP. Re-render and check again.
                  </>
                }
              />

              <Issue
                problem="My 5.1 file fails on channel order"
                cause="DubCheck expects SMPTE / Netflix order (L R C LFE Ls Rs)."
                fix={
                  <>
                    Pro Tools default order is <Code>L C R Ls Rs LFE</Code>. Re-export with the SMPTE layout, or use a channel-rearrange utility before delivery.
                  </>
                }
              />

              <Issue
                problem='Bit depth says "24-bit container, 16-bit effective"'
                cause="The lowest 8 bits of the file are flat. Something upstream re-quantized to 16 bit without dither."
                fix={
                  <>
                    Find the upstream tool that re-quantized (often an export preset). Re-render in true 24-bit, ideally with TPDF dither if you are reducing from 32-bit float.
                  </>
                }
              />

              <Issue
                problem="DubCheck says my file is not recognized"
                cause="Either the extension is wrong or the WAV contains a non-PCM payload (AAC inside a .wav wrapper, for instance)."
                fix={
                  <>
                    Re-export as PCM WAV or FLAC. Lossy formats are not supported on purpose, because they would lie about loudness.
                  </>
                }
              />

              <Issue
                problem='The dialog-gated number shows "fell back to program loudness"'
                cause="The dialog detector found less than 15 % speech in the file."
                fix={
                  <>
                    Nothing to fix. This is the Netflix rule. The engine measured against BS.1770-3/4 program loudness instead, and the spec’s pass/fail bands still apply.
                  </>
                }
              />

              <Issue
                problem='The CLI says "License required"'
                cause="The CLI is part of the Studio Pro tier only."
                fix={
                  <>
                    Either upgrade your key or use the GUI. Pro covers GUI, PDF, and batch up to 10 files.
                  </>
                }
              />

            </Section>

            {/* FAQ */}
            <Section id="faq" eyebrow="FAQ" title="FAQ">

              <FAQItem q="Which audio files does DubCheck read?">
                WAV, BWF (broadcast WAV with bext / iXML chunks), and FLAC. Mono through 7.1.2. 16-, 24-, and 32-bit (int and float). 44.1, 48, 88.2, 96, 176.4, and 192 kHz.
              </FAQItem>

              <FAQItem q="Why no MP3, AAC, Opus, or M4A?">
                Lossy formats lie. Their decoder output is not deterministic and their headers do not carry what a loudness QC pass needs. DubCheck is for the master, not the upload preview. Decode to WAV first if you really need to check a lossy file.
              </FAQItem>

              <FAQItem q="What macOS versions are supported?">
                macOS 12 (Monterey) and newer. Apple Silicon and Intel both supported via a universal binary.
              </FAQItem>

              <FAQItem q="Is the app code-signed and notarized?">
                Yes. Apple Developer ID signature and Apple notarization. You should never see a Gatekeeper warning on a clean machine.
              </FAQItem>

              <FAQItem q="Does DubCheck talk to the internet?">
                By default it makes one outbound call: the update check. Nothing else. No telemetry, no crash reports, no analytics, no phone-home of file names or measurements. The update check can be disabled in settings.
              </FAQItem>

              <FAQItem q="Where do my files go?">
                Nowhere. Files are read, measured, and reported locally. The PDF is written to the path you pick. Nothing leaves your machine.
              </FAQItem>

              <FAQItem q="What are the tiers?">
                <strong className="text-dc-ink">Free:</strong> single file, EBU R128 only, no PDF, no CLI.
                <br />
                <strong className="text-dc-ink">Pro:</strong> batch up to 10 files, every spec, PDF export.
                <br />
                <strong className="text-dc-ink">Studio Pro:</strong> unlimited batch, PDF, CLI access.
              </FAQItem>

              <FAQItem q="Studios vs Narrators, what is the difference?">
                Two editions of the same engine. <strong className="text-dc-ink">Studios</strong> (orange) is for broadcast, streaming, and dubbing: Netflix, EBU, ATSC, Prime Video. <strong className="text-dc-ink">Narrators</strong> (cyan) is for audiobooks and podcasts: ACX, Audible, Storytel, Spotify Audiobooks, Podtrac. The edition is read from your license key.
              </FAQItem>

              <FAQItem q="How does activation work?">
                Offline. The license is a short signed string. The app verifies the signature against an embedded public key, reads the tier and expiry, and unlocks the matching features. No server call, no per-machine activation count.
              </FAQItem>

              <FAQItem q="Is there a trial?">
                14 days of full Studio Pro from first launch. After that the app drops to Free until you enter a key.
              </FAQItem>

              <FAQItem q="Where is the License screen?">
                Click the small <strong className="text-dc-ink">Pro</strong> / <strong className="text-dc-ink">Studio Pro</strong> / <strong className="text-dc-ink">Trial</strong> badge in the bottom-right corner of the app.
                <Shot src="/help/license-screen.png" caption="The License screen. Your tier, license details, About info, and a Help button that brings you back here." inline />
              </FAQItem>
            </Section>

            {/* CONTACT */}
            <div id="contact" className="max-w-[1100px] mx-auto rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-7 md:p-9 text-center">
              <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">Still stuck?</div>
              <h2 className="text-dc-ink text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] mb-3">Talk to us</h2>
              <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-2">
                If the troubleshooting did not cover it, file a GitHub issue or email us. Include the macOS version, DubCheck version (License screen, then About), the input file if you can share it, and the PDF report.
              </p>
              <p className="text-dc-ink2 text-[15px] leading-[1.7]">
                Email:{' '}
                <a href="mailto:info@audio-dubcheck.com" className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors">
                  info@audio-dubcheck.com
                </a>
              </p>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

/* ---------- atoms ---------- */

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3 text-center">{eyebrow}</div>
        <h2 className="text-dc-ink text-[26px] md:text-[34px] font-semibold tracking-[-0.025em] mb-8 leading-[1.15] text-center">{title}</h2>
        <div className="text-dc-ink2 text-[15px] leading-[1.75] space-y-5">{children}</div>
      </div>
    </section>
  )
}

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="text-dc-ink font-semibold text-[17px] mt-8 mb-2">{children}</h3>
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-7 h-7 rounded-full border border-dc-orange/40 text-dc-orange font-mono text-[12px] flex items-center justify-center mt-[2px]">
        {n}
      </div>
      <div className="min-w-0">
        <div className="text-dc-ink font-semibold text-[15.5px] mb-1">{title}</div>
        <p>{children}</p>
      </div>
    </div>
  )
}

function Shot({ src, caption, narrow = false, inline = false }: { src: string; caption: string; narrow?: boolean; inline?: boolean }) {
  const dims = SHOT_DIMS[src] ?? { w: 1072, h: 782 }
  const priority = ABOVE_FOLD_SHOTS.has(src)
  return (
    <figure className={`${inline ? 'mt-3' : 'my-4'} ${narrow ? 'max-w-[640px] mx-auto' : ''}`}>
      <div className="rounded-[10px] overflow-hidden border border-white/[0.06] bg-white/[0.02]">
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          width={dims.w}
          height={dims.h}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 90vw, 1072px"
          className="w-full h-auto block"
        />
      </div>
      <figcaption className={`text-dc-ink3 text-[12.5px] mt-2 leading-[1.5] ${narrow ? 'text-center' : ''}`}>{caption}</figcaption>
    </figure>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[13px] text-dc-ink bg-white/[0.05] border border-white/[0.07] rounded-[4px] px-[5px] py-[1px]">{children}</code>
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="text-dc-ink font-semibold text-[14.5px] mb-1.5">{title}</div>
      <p className="text-dc-ink2 text-[14px] leading-[1.65]">{children}</p>
    </div>
  )
}

function Issue({ problem, cause, fix }: { problem: string; cause: string; fix: React.ReactNode }) {
  return (
    <details className="group rounded-[10px] border border-white/[0.06] bg-white/[0.02] open:bg-white/[0.035] transition-colors">
      <summary className="cursor-pointer list-none p-4 flex items-start gap-3">
        <span className="shrink-0 mt-[3px] w-4 h-4 rounded-full border border-white/[0.15] flex items-center justify-center text-dc-ink3 text-[12px] group-open:bg-dc-orange group-open:border-dc-orange group-open:text-[#1A0A00]">
          <span className="block group-open:hidden">+</span>
          <span className="hidden group-open:block">·</span>
        </span>
        <span className="text-dc-ink font-semibold text-[14.5px] leading-[1.5]">{problem}</span>
      </summary>
      <div className="px-4 pb-4 pt-1 pl-[40px] space-y-3 text-[14px] text-dc-ink2 leading-[1.65]">
        <div>
          <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-dc-ink3 mr-2">Cause</span>
          {cause}
        </div>
        <div>
          <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-dc-ink3 mr-2">Fix</span>
          {fix}
        </div>
      </div>
    </details>
  )
}

function FAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-[10px] border border-white/[0.06] bg-white/[0.02] open:bg-white/[0.035] transition-colors">
      <summary className="cursor-pointer list-none p-4 flex items-center justify-between gap-3">
        <span className="text-dc-ink font-medium text-[14.5px]">{q}</span>
        <span className="shrink-0 text-dc-ink3 text-[18px] leading-none group-open:rotate-45 transition-transform duration-150">+</span>
      </summary>
      <div className="px-4 pb-4 pt-0 text-[14px] text-dc-ink2 leading-[1.7]">{children}</div>
    </details>
  )
}

function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-white/[0.06]">
      <table className="w-full text-[14px] border-collapse">
        <caption className="sr-only">Delivery target to DubCheck spec ID mapping</caption>
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.03]">
            <th scope="col" className="py-2.5 px-4 text-left font-mono text-[12px] tracking-[0.1em] uppercase text-dc-ink3 w-1/2">Delivery target</th>
            <th scope="col" className="py-2.5 px-4 text-left font-mono text-[12px] tracking-[0.1em] uppercase text-dc-ink3">Spec ID</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={ri > 0 ? 'border-t border-white/[0.05]' : ''}>
              <td className="py-2.5 px-4 text-dc-ink2 align-top w-1/2">{r[0]}</td>
              <td className="py-2.5 px-4 align-top font-mono text-[12.5px] text-dc-ink">{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
