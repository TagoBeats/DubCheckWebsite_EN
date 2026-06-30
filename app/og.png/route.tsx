import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const size = { width: 1200, height: 630 }

export async function GET() {
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
            EBU R128 certified
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            The ultimate final check for your audio.
          </div>
          <div style={{ fontSize: 30, color: '#9aa5b1', maxWidth: 980, lineHeight: 1.3 }}>
            Verify ACX, Netflix NOLS, Apple TV+, Disney+, Spotify and EBU R128 — local, offline, with a signed PDF.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 20, color: '#7a8794' }}>
          <div>66 / 66 conformance tests</div>
          <div>32-bit float internal</div>
          <div>audio-dubcheck.com</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
