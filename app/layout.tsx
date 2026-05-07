import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DubCheck — Audio QC for ACX, Netflix, Apple TV+ and more',
  description:
    'Verify your audiobook chapters and final mixes against ACX, Netflix NOLS, Apple TV+, Disney+ and Prime delivery specs. Local processing, EBU R128 certified engine, auditable PDF report.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-dc-bg text-dc-ink antialiased overflow-x-hidden`}>
        <div className="relative min-h-screen">
          {/* Ambient background accents — scroll with document */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* × blueprint grid — full document height */}
          <div
            className="absolute inset-0 w-full h-full opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 18l4 4M22 18l-4 4' stroke='%2300f2ff' stroke-width='0.6' stroke-linecap='round' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.4) 85%, transparent 100%)',
            }}
          />
          {/* Top-right — large, soft */}
          <div
            className="absolute top-[8%] -right-[8%] w-[900px] h-[700px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,242,255,0.077) 0%, transparent 70%)' }}
          />
          {/* Upper-left — medium */}
          <div
            className="absolute top-[30%] -left-[6%] w-[600px] h-[500px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 120% 100% at center, rgba(0,242,255,0.055) 0%, transparent 65%)' }}
          />
          {/* Mid-right — elongated */}
          <div
            className="absolute top-[55%] -right-[5%] w-[800px] h-[450px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 140% 80% at center, rgba(0,242,255,0.066) 0%, transparent 68%)' }}
          />
          {/* Lower-left — small, faint */}
          <div
            className="absolute top-[80%] left-[10%] w-[400px] h-[350px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,242,255,0.039) 0%, transparent 60%)' }}
          />
          {/* Center-right — tall, narrow */}
          <div
            className="absolute top-[18%] right-[15%] w-[350px] h-[650px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 80% 140% at center, rgba(0,242,255,0.044) 0%, transparent 65%)' }}
          />
          {/* Mid-left — wide, subtle */}
          <div
            className="absolute top-[44%] -left-[3%] w-[750px] h-[400px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 130% 90% at center, rgba(0,242,255,0.05) 0%, transparent 60%)' }}
          />
          {/* Lower-right — large, soft */}
          <div
            className="absolute top-[68%] -right-[10%] w-[850px] h-[550px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,242,255,0.055) 0%, transparent 68%)' }}
          />
          {/* Deep-left — medium */}
          <div
            className="absolute top-[90%] left-[5%] w-[550px] h-[450px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 110% 100% at center, rgba(0,242,255,0.044) 0%, transparent 62%)' }}
          />
          {/* Bottom-center — wide, faint */}
          <div
            className="absolute top-[96%] left-[30%] w-[700px] h-[380px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 150% 80% at center, rgba(0,242,255,0.039) 0%, transparent 58%)' }}
          />

          {/* ── Orange ambient blobs ─────────────────────────────── */}
          {/* Orange 1 — near Platforms section, offset right */}
          <div
            className="absolute top-[38%] -right-[2%] w-[600px] h-[500px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,122,26,0.055) 0%, transparent 65%)' }}
          />
          {/* Orange 2 — near Engine section, offset left */}
          <div
            className="absolute top-[63%] -left-[-29%] w-[650px] h-[450px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse 120% 90% at center, rgba(255,122,26,0.05) 0%, transparent 62%)' }}
          />
          {/* Orange 3 — behind center Pricing card */}
          <div
            className="absolute top-[73%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,122,26,0.06) 0%, transparent 60%)' }}
          />
        </div>

          {children}
        </div>
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
