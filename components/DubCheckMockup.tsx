'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

// ── Helpers ────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const n = parseInt(h, 16)
  return [n >> 16 & 255, n >> 8 & 255, n & 255]
}
function rgba(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// ── Inline SVGs ────────────────────────────────────────────────
function UploadIcon({ size = 28, color = '#6B6B72' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4" />
      <path d="M6 10l6-6 6 6" />
      <path d="M4 18v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </svg>
  )
}

function CheckIcon({ size = 14, color = '#22C98B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

function DownloadIcon({ size = 16, color = '#0E0E10' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v12" />
      <path d="M6 14l6 6 6-6" />
      <path d="M4 22h16" />
    </svg>
  )
}

function Spinner({ color }: { color: string }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 12, height: 12,
      border: '2px solid rgba(255,255,255,0.08)',
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'dc-spin 0.95s linear infinite',
    }} />
  )
}

// ── Edition data ───────────────────────────────────────────────
type CheckStatus = 'PASS' | 'FAIL' | 'WARN'
type Check = { label: string; value: string; status: CheckStatus; note?: string }
type Section = { title: string; checks: Check[] }
type EditionData = {
  accent: string
  filename: string
  spec: string
  meta: string
  overall: CheckStatus
  countLabel?: string
  reportFile: string
  summary: [string, string][]
  sections: Section[]
}

const EDITION_DATA: Record<string, EditionData> = {
  narrators: {
    accent: '#22D3EE',
    filename: 'chapter_01_final.wav',
    spec: 'ACX · AudioBook Edition',
    meta: '44.1 kHz · 24-bit · Mono · 4:32',
    overall: 'WARN',
    reportFile: '/narrators_report.pdf',
    summary: [
      ['RMS',        '–20.1 dBFS'],
      ['PEAK',       '–3.8 dBFS'],
      ['NOISE FLOOR','–58.2 dBFS'],
    ],
    sections: [
      {
        title: 'LOUDNESS & DYNAMICS',
        checks: [
          { label: 'RMS LEVEL',   value: '–20.1 dBFS', status: 'PASS', note: 'ACX: –23 to –18 dBFS' },
          { label: 'PEAK LEVEL',  value: '–3.8 dBFS',  status: 'PASS', note: 'max –3.0 dBFS' },
          { label: 'NOISE FLOOR', value: '–58.2 dBFS', status: 'WARN', note: 'min –60.0 dBFS' },
        ],
      },
      {
        title: 'FORMAT & HYGIENE',
        checks: [
          { label: 'SAMPLE RATE', value: '44100 Hz', status: 'PASS', note: 'req: 44.1 kHz' },
          { label: 'CHANNELS',    value: 'Mono',     status: 'PASS', note: 'req: Mono' },
        ],
      },
    ],
  },

  studios: {
    accent: '#FF7A1A',
    filename: 'Detective_Test_File.wav',
    spec: 'Netflix Near-Field 2.0 · v1.6',
    meta: '44.1 kHz · 16-bit · Stereo · 9:20',
    overall: 'FAIL',
    countLabel: '9 / 12 checks passed',
    reportFile: '/detective_report.pdf',
    summary: [
      ['INT. LOUDNESS',  '–25.2 LUFS'],
      ['SHORT-TERM MAX', '–20.3 LUFS'],
      ['TRUE PEAK',      '–5.6 dBTP'],
      ['LRA',            '7.4 LU'],
    ],
    sections: [
      {
        title: 'LOUDNESS & DYNAMICS',
        checks: [
          { label: 'INT. LOUDNESS', value: '–24.7 LUFS', status: 'FAIL', note: 'Netflix: –27.0 ±2.0 LUFS' },
          { label: 'LOUDNESS RANGE', value: '7.4 LU',    status: 'PASS', note: '≥4.0 and ≤18.0 LU' },
          { label: 'DIALOG LRA',    value: '7.4 LU',     status: 'PASS', note: '≤10.0 LU' },
        ],
      },
      {
        title: 'PEAKS',
        checks: [
          { label: 'TRUE PEAK', value: '–5.6 dBTP', status: 'PASS', note: '≤ –2.0 dBTP' },
        ],
      },
      {
        title: 'FORMAT & TECHNISCH',
        checks: [
          { label: 'SAMPLE RATE',      value: '44.1 kHz',    status: 'FAIL', note: 'req: one of [48 kHz]' },
          { label: 'BIT DEPTH',        value: '16 bit',      status: 'FAIL', note: 'req: ≥24 bit' },
          { label: 'CONTAINER FORMAT', value: 'WAV',         status: 'PASS', note: 'WAV / BWAV / RF64' },
          { label: 'ENCODING',         value: 'PCM',         status: 'PASS', note: 'req: PCM' },
          { label: 'CHANNELS',         value: '2 ch (Stereo)', status: 'PASS', note: 'req: 2 ch (stereo)' },
        ],
      },
      {
        title: 'AUDIO-HYGIENE',
        checks: [
          { label: 'DC OFFSET',       value: '–105.9 dBFS', status: 'PASS', note: '≤ –60.0 dBFS' },
          { label: 'CLIPPED SAMPLES', value: '0 samples',   status: 'PASS', note: '≤ 0 samples' },
          { label: 'NaN / Inf',       value: '0 samples',   status: 'PASS', note: '= 0' },
        ],
      },
    ],
  },
}

function allChecks(data: EditionData): Check[] {
  return data.sections.flatMap(s => s.checks)
}

const STATUS_COLORS: Record<CheckStatus, { fg: string; bg: string; bd: string }> = {
  PASS: { fg: '#22C98B', bg: 'rgba(34,201,139,0.12)',  bd: 'rgba(34,201,139,0.2)' },
  FAIL: { fg: '#FF3B47', bg: 'rgba(255,59,71,0.12)',   bd: 'rgba(255,59,71,0.2)' },
  WARN: { fg: '#F5B33D', bg: 'rgba(245,179,61,0.12)',  bd: 'rgba(245,179,61,0.2)' },
}

// ── Waveform ───────────────────────────────────────────────────
const WAVE_BAR_COUNT = 60
function Waveform({ accent }: { accent: string }) {
  const barRefs = useRef<Array<HTMLDivElement | null>>([])
  const heightsRef = useRef<number[]>(
    Array.from({ length: WAVE_BAR_COUNT }, () => 8 + Math.random() * 28)
  )

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null
    const tick = () => {
      const hs = heightsRef.current
      for (let i = 0; i < hs.length; i++) {
        const target = 8 + Math.random() * 28
        hs[i] = hs[i] + (target - hs[i]) * 0.45
        const el = barRefs.current[i]
        if (el) el.style.height = `${hs[i]}px`
      }
    }
    const start = () => { if (!id) id = setInterval(tick, 110) }
    const stop = () => { if (id) { clearInterval(id); id = null } }
    const onVis = () => { document.hidden ? stop() : start() }
    start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40, padding: '0 2px' }}>
      {heightsRef.current.map((h, i) => (
        <div
          key={i}
          ref={el => { barRefs.current[i] = el }}
          style={{
            width: 2,
            height: `${h}px`,
            background: rgba(accent, 0.4),
            borderRadius: 1,
            transition: 'height 110ms linear',
            willChange: 'height',
          }}
        />
      ))}
    </div>
  )
}

// ── Step 0: Drop Zone ──────────────────────────────────────────
function WavFileIcon({ size = 36, accent }: { size?: number; accent: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 36 45" fill="none">
      <path d="M4 2 H24 L32 10 V41 a2 2 0 0 1 -2 2 H4 a2 2 0 0 1 -2 -2 V4 a2 2 0 0 1 2 -2 z"
        fill="#1A1A1E" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <path d="M24 2 V10 H32" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
      <rect x="6" y="26" width="24" height="11" rx="2" fill={rgba(accent, 0.12)} stroke={rgba(accent, 0.4)} strokeWidth="0.8" />
      <text x="18" y="34" textAnchor="middle"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        fontSize="6.5" fontWeight="700" fill={accent} letterSpacing="0.1em">
        .WAV
      </text>
      {/* mini waveform */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.7">
        <line x1="8" y1="18" x2="8" y2="22" />
        <line x1="11" y1="15" x2="11" y2="22" />
        <line x1="14" y1="13" x2="14" y2="22" />
        <line x1="17" y1="16" x2="17" y2="22" />
        <line x1="20" y1="14" x2="20" y2="22" />
        <line x1="23" y1="17" x2="23" y2="22" />
        <line x1="26" y1="15" x2="26" y2="22" />
        <line x1="29" y1="19" x2="29" y2="22" />
      </g>
    </svg>
  )
}

function CursorIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
      <path d="M5 3 L5 19 L9 15 L11.5 21 L14 20 L11.5 14 L17 14 Z"
        fill="#FFFFFF" stroke="#0E0E10" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function StepDropZone({ accent, onAdvance }: { accent: string; onAdvance: () => void }) {
  // Phases: 'dragging' (cursor + tile move toward dropzone) → 'dropped' (pulse) → advance
  const [phase, setPhase] = useState<'dragging' | 'dropped'>('dragging')
  const DRAG_MS = 1100
  const HOLD_MS = 280

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('dropped'), DRAG_MS)
    const t2 = setTimeout(() => onAdvance(), DRAG_MS + HOLD_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onAdvance])

  const isDropped = phase === 'dropped'

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 18, position: 'relative',
    }}>
      <div
        style={{
          width: 380, height: 200,
          border: `1.5px dashed ${isDropped ? rgba(accent, 0.55) : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 8,
          background: isDropped ? rgba(accent, 0.08) : 'rgba(255,255,255,0.015)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 10,
          transition: 'border-color 220ms ease, background 220ms ease',
          animation: isDropped ? 'dc-drop-pulse 280ms ease' : undefined,
          position: 'relative',
        }}
      >
        <UploadIcon size={28} color="#6B6B72" />
        <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 15, color: '#A1A1A8' }}>
          Drop your audio file here
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 11, color: '#6B6B72', letterSpacing: '0.1em',
        }}>
          .wav  ·  .aiff  ·  .flac  ·  .mp3
        </div>

        {/* Animated cursor + dragged file tile */}
        {!isDropped && (
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            marginLeft: -32, marginTop: -22,
            pointerEvents: 'none',
            animation: `dc-drag ${DRAG_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) both`,
            willChange: 'transform, opacity',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 10px 6px 6px',
              background: 'rgba(20,20,24,0.92)',
              border: `1px solid ${rgba(accent, 0.45)}`,
              borderRadius: 8,
              boxShadow: `0 12px 28px -8px rgba(0,0,0,0.6), 0 0 0 4px ${rgba(accent, 0.08)}`,
              backdropFilter: 'blur(4px)',
            }}>
              <WavFileIcon size={28} accent={accent} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 11, color: '#ECECEE', fontWeight: 600,
                }}>chapter_01.wav</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 9, color: '#6B6B72', letterSpacing: '0.06em',
                }}>4.2 MB</span>
              </div>
            </div>
            <div style={{ position: 'absolute', right: -6, bottom: -10 }}>
              <CursorIcon size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 1: Processing ─────────────────────────────────────────
const PROCESS_LABELS = [
  'SAMPLE RATE', 'BIT DEPTH', 'CHANNEL MAP',
  'INTEGRATED LOUDNESS', 'TRUE PEAK', 'LRA', 'DC OFFSET', 'DIALOG GATE',
]

// Timing: first 3 checks appear within 0.8s, remaining 5 follow at 0.4s cadence.
// Each entry = [spinner-start ms, value-reveal ms]. Total = 2750ms (< 3500ms cap).
const CHECK_TIMING: Array<[number, number]> = [
  [0,    250],
  [300,  500],
  [600,  750],
  [1000, 1150],
  [1400, 1550],
  [1800, 1950],
  [2200, 2350],
  [2600, 2750],
]
const TOTAL_DURATION = 2800

function StepProcessing({ accent, data }: { accent: string; data: EditionData }) {
  const [states, setStates] = useState(() => PROCESS_LABELS.map(() => 0))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []
    PROCESS_LABELS.forEach((_, i) => {
      const [startMs, doneMs] = CHECK_TIMING[i]
      timeouts.push(setTimeout(() => {
        setStates(s => { const n = [...s]; n[i] = 1; return n })
      }, startMs))
      timeouts.push(setTimeout(() => {
        setStates(s => { const n = [...s]; n[i] = 2; return n })
      }, doneMs))
    })
    const start = performance.now()
    let raf: number
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / TOTAL_DURATION)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { timeouts.forEach(clearTimeout); cancelAnimationFrame(raf) }
  }, [])

  const valueMap = useMemo<Record<string, string>>(() => ({
    'INTEGRATED LOUDNESS': data.meta.includes('48') ? '–27.0 LUFS' : '–18.2 LUFS',
    'TRUE PEAK':   data.meta.includes('48') ? '–7.4 dBTP' : '–3.8 dBFS',
    'LRA':         '7.4 LU',
    'SAMPLE RATE': data.meta.includes('48') ? '48000 Hz' : '44100 Hz',
    'BIT DEPTH':   '24-bit',
    'DC OFFSET':   '–107.7 dBFS',
    'DIALOG GATE': '–26.9 LUFS',
    'CHANNEL MAP': data.meta.includes('5.1') ? '5.1' : 'Mono',
  }), [data.meta])
  const valueFor = (label: string): string => valueMap[label] ?? '—'

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{
        width: 220, flexShrink: 0,
        background: '#0E0E10',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 11, color: '#6B6B72',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#22C98B',
            boxShadow: '0 0 6px rgba(34,201,139,0.7)',
            animation: 'dc-pulse 1.85s ease-in-out infinite',
          }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.filename}
          </span>
        </div>
        <Waveform accent={accent} />
        <div style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 11, color: '#6B6B72', lineHeight: 1.5,
        }}>
          {data.meta}
        </div>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, background: '#121214',
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontSize: 13, color: '#A1A1A8', marginBottom: 10,
        }}>
          Analyzing<span style={{ animation: 'dc-dots 1.6s steps(4,end) infinite' }}>…</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
          {PROCESS_LABELS.map((label, i) => {
            const s = states[i]
            const isActive = s === 1
            return (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '5px 10px',
                borderLeft: isActive ? `2px solid ${accent}` : '2px solid transparent',
                background: isActive ? rgba(accent, 0.04) : 'transparent',
                transition: 'background 150ms ease, border-color 150ms ease',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 11, color: '#6B6B72', letterSpacing: '0.06em',
                }}>{label}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 11, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {s === 0 && <span style={{ color: '#44444B' }}>--</span>}
                  {s === 1 && <Spinner color={accent} />}
                  {s === 2 && (
                    <>
                      <CheckIcon size={12} color="#22C98B" />
                      <span style={{ color: '#ECECEE' }}>{valueFor(label)}</span>
                    </>
                  )}
                </span>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: 12, width: '100%', height: 4,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress * 100}%`, height: '100%',
            background: accent, transition: 'width 60ms linear',
          }} />
        </div>
      </div>
    </div>
  )
}

// ── Step 2: Results ────────────────────────────────────────────
function StepResults({
  accent, data, onAdvance,
}: { accent: string; data: EditionData; onAdvance: () => void }) {
  const flat = allChecks(data)
  const passCount = flat.filter(c => c.status === 'PASS').length
  const overall = data.overall
  const overallColor = STATUS_COLORS[overall].fg

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{
        width: 220, flexShrink: 0,
        background: '#0E0E10',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontWeight: 700, fontSize: 28,
            color: overallColor, letterSpacing: '0.04em', lineHeight: 1,
          }}>
            {overall === 'WARN' ? 'WARNING' : overall}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 11, color: '#A1A1A8', marginTop: 6,
          }}>
            {data.countLabel ?? `${passCount} / ${flat.length} checks passed`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.summary.map(([label, value], i) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 11, color: '#6B6B72', letterSpacing: '0.08em',
              }}>{label}</span>
              <span style={{
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 13, color: '#ECECEE',
              }}>{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onAdvance}
          style={{
            marginTop: 'auto',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: 12, fontWeight: 600,
            color: '#0E0E10', background: accent,
            border: 'none', padding: '7px 12px',
            borderRadius: 6, cursor: 'pointer',
            boxShadow: `0 0 0 1px ${rgba(accent, 0.4)}, 0 6px 16px -6px ${rgba(accent, 0.5)}`,
          }}
        >
          Export PDF report →
        </button>
      </div>

      {/* Scrollable results */}
      <div
        className="dc-scroll"
        style={{
          flex: 1, background: '#121214',
          padding: '14px 16px',
          overflowY: 'auto',
          maxHeight: 420,
          ['--dc-accent' as string]: accent,
        }}
      >
        <div style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 11, color: '#6B6B72',
          letterSpacing: '0.14em', marginBottom: 10,
        }}>
          CHECK RESULTS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {(() => {
            let runningIdx = 0
            return data.sections.map((section, si) => (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2,
                  animation: 'dc-rowin 420ms ease both',
                  animationDelay: `${si * 90}ms`,
                  opacity: 0,
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                    fontSize: 10, color: '#6B6B72', letterSpacing: '0.18em',
                  }}>{section.title}</span>
                  <span style={{
                    flex: 1, height: 1,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0))',
                  }} />
                  <span style={{
                    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                    fontSize: 10, color: '#44444B',
                  }}>{section.checks.length}</span>
                </div>
                {section.checks.map(c => {
                  const sc = STATUS_COLORS[c.status]
                  const idx = runningIdx++
                  return (
                    <div
                      key={c.label}
                      style={{
                        background: '#17171A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 6,
                        padding: '10px 14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 12,
                        animation: 'dc-rowin 420ms ease both',
                        animationDelay: `${(idx + 1) * 50 + si * 90}ms`,
                        opacity: 0,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: sc.fg,
                          boxShadow: `0 0 6px ${rgba(sc.fg, 0.6)}`,
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                          fontSize: 11, color: '#6B6B72', letterSpacing: '0.06em',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{c.label}</span>
                        {c.note && (
                          <span style={{
                            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                            fontSize: 10, color: '#44444B', whiteSpace: 'nowrap',
                          }}>({c.note})</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <span style={{
                          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                          fontSize: 13, color: '#ECECEE', fontWeight: 500,
                        }}>{c.value}</span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                          fontSize: 10, fontWeight: 600,
                          color: sc.fg, background: sc.bg,
                          border: `1px solid ${sc.bd}`,
                          padding: '3px 7px', borderRadius: 4,
                          letterSpacing: '0.08em',
                        }}>{c.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}

// ── Step 3: Download ───────────────────────────────────────────
function StepDownload({ accent, reportFile, onRestart }: { accent: string; reportFile: string; onRestart: () => void }) {
  const [dlState, setDlState] = useState<'idle' | 'downloading' | 'done'>('idle')
  const hash = useRef('r-' + Math.random().toString(16).slice(2, 9))
  const today = useRef(new Date().toISOString().slice(0, 10))

  const handleClick = () => {
    if (dlState !== 'idle') return
    setDlState('downloading')
    const a = document.createElement('a')
    a.href = reportFile
    a.download = 'DubCheck_Sample_Report.pdf'
    a.click()
    setTimeout(() => setDlState('done'), 1600)
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px 24px', position: 'relative', gap: 14,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'rgba(34,201,139,0.1)',
        border: '1px solid rgba(34,201,139,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 24px -4px rgba(34,201,139,0.4)',
      }}>
        <CheckIcon size={22} color="#22C98B" />
      </div>
      <div style={{
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: 19, fontWeight: 600, color: '#ECECEE',
      }}>
        Report ready.
      </div>
      <div style={{
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: 13, color: '#A1A1A8', textAlign: 'center', maxWidth: 420,
      }}>
        Your PDF includes every measured value with timecode references.
      </div>

      <button
        onClick={handleClick}
        disabled={dlState !== 'idle'}
        style={{
          marginTop: 6,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontWeight: 600, fontSize: 14,
          color: '#0E0E10', background: accent,
          border: 'none', padding: '12px 22px',
          borderRadius: 6, cursor: dlState === 'idle' ? 'pointer' : 'default',
          boxShadow: `0 0 0 1px ${rgba(accent, 0.4)}, 0 10px 30px -10px ${rgba(accent, 0.55)}`,
          transition: 'filter 150ms ease',
        }}
        onMouseEnter={e => dlState === 'idle' && (e.currentTarget.style.filter = 'brightness(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
      >
        {dlState === 'idle'        && <><DownloadIcon size={16} color="#0E0E10" /> Download PDF Report</>}
        {dlState === 'downloading' && <><Spinner color="#0E0E10" /> Downloading…</>}
        {dlState === 'done'        && <><CheckIcon size={16} color="#0E0E10" /> Downloaded</>}
      </button>

      <div style={{
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 11, color: '#6B6B72', letterSpacing: '0.06em', marginTop: 4,
      }}>
        SHA-256 signed  ·  {hash.current}  ·  {today.current}
      </div>

      <button
        onClick={onRestart}
        style={{
          position: 'absolute', right: 16, bottom: 14,
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontSize: 12, color: '#6B6B72', padding: 4,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#A1A1A8')}
        onMouseLeave={e => (e.currentTarget.style.color = '#6B6B72')}
      >
        Restart demo →
      </button>
    </div>
  )
}

// ── Title bar ──────────────────────────────────────────────────
function TitleBar({ filename, spec }: { filename: string; spec: string }) {
  return (
    <div style={{
      height: 40, flexShrink: 0,
      background: 'linear-gradient(180deg, #202024 0%, #1A1A1E 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center',
      padding: '0 14px', position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {(['#FF5F57', '#FEBC2E', '#28C840'] as const).map((c, i) => (
          <span key={i} style={{
            width: 12, height: 12, borderRadius: '50%', background: c,
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.15)',
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 12, color: '#6B6B72',
        }}>
          DubCheck  ·  {filename}
        </span>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 11, color: '#44444B',
        }}>{spec}</span>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
const MOCKUP_W = 960
const MOCKUP_H = 460

export default function DubCheckMockup({ edition = 'narrators' }: { edition?: 'narrators' | 'studios' }) {
  const data = useMemo(() => EDITION_DATA[edition] ?? EDITION_DATA.narrators, [edition])
  const accent = data.accent
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [scale, setScale] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive scale based on available wrapper width
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      setScale(Math.min(1, w / MOCKUP_W))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Start animation only when scrolled into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let t: ReturnType<typeof setTimeout>
    // step 0 advances itself when the cursor "drops" the file (see StepDropZone)
    if (step === 1) t = setTimeout(() => setStep(2), TOTAL_DURATION + 200)
    return () => clearTimeout(t)
  }, [step, visible])

  return (
    <div ref={wrapperRef} style={{
      width: '100%',
      maxWidth: MOCKUP_W,
      height: MOCKUP_H * scale,
      margin: '0 auto',
    }}>
    <div ref={containerRef} style={{
      width: MOCKUP_W, height: MOCKUP_H,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 60px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02)',
      background: 'linear-gradient(180deg, #1A1A1E 0%, #131316 100%)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased',
      color: '#ECECEE',
      position: 'relative',
    }}>
      <TitleBar filename={data.filename} spec={data.spec} />
      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#121214' }}>
        {step === 0 && <StepDropZone accent={accent} onAdvance={() => setStep(1)} />}
        {step === 1 && <StepProcessing accent={accent} data={data} />}
        {step === 2 && <StepResults accent={accent} data={data} onAdvance={() => setStep(3)} />}
        {step === 3 && <StepDownload accent={accent} reportFile={data.reportFile} onRestart={() => setStep(0)} />}
      </div>

      {/* Step indicator */}
      <div style={{
        position: 'absolute', right: 14, top: 48,
        display: 'flex', alignItems: 'center', gap: 10,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={{
              width: 14, height: 2, borderRadius: 1,
              background: i <= step ? accent : 'rgba(255,255,255,0.08)',
              transition: 'background 200ms ease',
            }} />
          ))}
        </div>
        {step > 0 && step < 3 && (
          <button
            onClick={() => setStep(0)}
            style={{
              pointerEvents: 'auto',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: 11, color: '#6B6B72', padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#A1A1A8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B6B72')}
          >
            Restart →
          </button>
        )}
      </div>
    </div>
    </div>
  )
}
