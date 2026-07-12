import { ImageResponse } from 'next/og'
import { posts } from '@/lib/posts'

export const runtime = 'edge'

const size = { width: 1200, height: 630 }

const SPEC_CARDS: Record<string, { category: string; title: string; sub: string }> = {
  'spec-acx': {
    category: 'Spec Reference · ACX / Audible',
    title: 'ACX Audio Submission Requirements',
    sub: 'RMS, peak, noise floor, format and room tone in one verified table.',
  },
  'spec-ebu-r128': {
    category: 'Spec Reference · EBU R128',
    title: 'EBU R128 Loudness Requirements',
    sub: '-23 LUFS, -1 dBTP, EBU Mode gating and the shortform variant.',
  },
  'spec-netflix': {
    category: 'Spec Reference · Netflix',
    title: 'Netflix Audio Delivery Requirements',
    sub: 'Dialogue-gated -27 LKFS, -2 dBTP and the low-dialogue fallback.',
  },
  'spec-spotify': {
    category: 'Spec Reference · Spotify',
    title: 'Spotify Loudness Normalization',
    sub: '-14 LUFS target, -1 dBTP ceiling and the three playback modes.',
  },
  'spec-apple-digital-masters': {
    category: 'Spec Reference · Apple',
    title: 'Apple Digital Masters Requirements',
    sub: '-16 LUFS Sound Check, -1 dBTP and AAC conversion headroom.',
  },
  'spec-prime-video': {
    category: 'Spec Reference · Prime Video',
    title: 'Prime Video Audio Delivery Requirements',
    sub: '-24 LKFS program loudness, -2 dBTP, 48 kHz PCM delivery.',
  },
  'spec-atsc-a85': {
    category: 'Spec Reference · ATSC A/85',
    title: 'ATSC A/85 (CALM Act) Loudness Requirements',
    sub: '-24 LKFS, -2 dBTP, the legally mandated US broadcast standard.',
  },
  'spec-storytel': {
    category: 'Spec Reference · Storytel',
    title: 'Storytel Audiobook Requirements',
    sub: 'RMS, peak, noise floor and format for Storytel delivery.',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = posts.find(p => p.slug === slug)
  const card = post
    ? { category: `Blog · ${post.category}`, title: post.title, sub: formatDate(post.date) }
    : SPEC_CARDS[slug]

  if (!card) {
    return new Response('Not found', { status: 404 })
  }

  const titleSize = card.title.length > 60 ? 52 : card.title.length > 40 ? 60 : 68

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#0a0e12',
          backgroundImage:
            'radial-gradient(ellipse at 75% 25%, rgba(0,242,255,0.22) 0%, transparent 55%), radial-gradient(ellipse at 25% 80%, rgba(255,122,26,0.18) 0%, transparent 55%)',
          color: '#e6edf3',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg,#00f2ff 0%,#0091a8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: '#0a0e12',
            }}
          >
            D
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>DubCheck</div>
          <div
            style={{
              marginLeft: 16,
              padding: '6px 14px',
              fontSize: 18,
              border: '1px solid rgba(0,242,255,0.4)',
              borderRadius: 999,
              color: '#00f2ff',
            }}
          >
            {card.category}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {card.title}
          </div>
          <div style={{ fontSize: 28, color: '#9aa5b1', maxWidth: 980, lineHeight: 1.3 }}>
            {card.sub}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 20, color: '#7a8794' }}>
          <div>EBU R128 certified engine</div>
          <div>Measured locally</div>
          <div>audio-dubcheck.com</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
