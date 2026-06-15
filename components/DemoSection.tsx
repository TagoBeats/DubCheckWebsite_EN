'use client'

import { useState } from 'react'
import DubCheckMockup from './DubCheckMockup'

type Accent = 'cyan' | 'orange'

interface Props {
  edition: 'narrators' | 'studios'
  accent: Accent
  sectionLabel?: string
  headline: string
  headlineSize?: 'h2' | 'h3'
  mockupMaxWidth?: number
}

const ACCENT = {
  cyan:   { text: 'text-dc-cyan',   led: 'led',        rgb: '34,211,238' },
  orange: { text: 'text-dc-orange', led: 'led-orange', rgb: '255,122,26' },
} as const

export default function DemoSection({
  edition,
  accent,
  sectionLabel = '§ 02 · Live · 8-second demo · no signup',
  headline,
  headlineSize = 'h2',
  mockupMaxWidth,
}: Props) {
  const [replayKey, setReplayKey] = useState(0)
  const a = ACCENT[accent]

  const HeadlineTag = headlineSize === 'h2' ? 'h2' : 'h3'
  const headlineClass = headlineSize === 'h2'
    ? 'text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.025em] font-semibold max-w-[24ch]'
    : 'text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] leading-[1.2] max-w-[26ch]'

  return (
    <>
      <div className="flex items-center gap-[10px] mb-[14px]">
        <span className={a.led} />
        <span className={`font-mono text-[12px] tracking-[0.14em] uppercase ${a.text}`}>
          {sectionLabel}
        </span>
      </div>

      <HeadlineTag className={`${headlineClass} mb-[36px]`}>{headline}</HeadlineTag>

      <div className="relative" style={mockupMaxWidth ? { maxWidth: mockupMaxWidth, marginInline: 'auto' } : undefined}>
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-[16px] -z-[1] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${a.rgb},0.22) 0%, rgba(${a.rgb},0.06) 35%, transparent 70%)`,
            filter: 'blur(36px)',
          }}
        />
        <div className="overflow-x-auto pb-2 flex justify-center">
          <DubCheckMockup key={replayKey} edition={edition} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase text-dc-ink3">
          <span className={a.led} />
          <span>Auto-running · click Replay to restart</span>
        </div>
        <div className="mt-4 flex justify-center">
          <ReplayButton accent={accent} onClick={() => setReplayKey(k => k + 1)} />
        </div>
      </div>
    </>
  )
}

function ReplayButton({ accent, onClick }: { accent: Accent; onClick: () => void }) {
  const a = ACCENT[accent]
  return (
    <button
      type="button"
      onClick={onClick}
      title="Replay demo from the start"
      className={`group inline-flex items-center gap-2 px-4 py-[10px] rounded-[8px] text-[13px] font-semibold ${a.text} transition-all duration-150`}
      style={{
        border: `1px solid rgba(${a.rgb},0.45)`,
        background: `rgba(${a.rgb},0.06)`,
        boxShadow: `0 0 0 4px rgba(${a.rgb},0.04), 0 8px 22px -10px rgba(${a.rgb},0.5)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `rgba(${a.rgb},0.14)`
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `rgba(${a.rgb},0.06)`
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-[-30deg] transition-transform duration-200">
        <path d="M2 8a6 6 0 1 1 1.76 4.24" />
        <path d="M2 13v-4h4" />
      </svg>
      Replay demo
    </button>
  )
}
