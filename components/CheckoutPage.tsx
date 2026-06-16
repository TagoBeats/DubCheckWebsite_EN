'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Edition = 'audiobook' | 'studios'
type TierSlug = 'solo' | 'pro' | 'team'

// ── Plan data ──────────────────────────────────────────────────────────────
const TIERS = [
  {
    tier:     'solo',
    tag:      'Solo · single workstation',
    name:     'Solo',
    blurb:    'For independent narrators & engineers running QC on their own deliveries.',
    per:      'Lifetime license · 1 seat',
    featured: false,
    prices:   { audiobook: 29, studios: 49 },
    was:      { audiobook: 49, studios: 79 },
    stripe:   { audiobook: 'https://buy.stripe.com/bJe7sMeWr4fj1ad1uu4Vy04', studios: 'https://buy.stripe.com/14AfZibKf5jn6uxgpo4Vy07' },
    items:    [
      { text: 'macOS & Windows app', bold: null },
      { text: ' spec profiles',         bold: 'All 38' },
      { text: 'Signed PDF reports',     bold: null },
      { text: 'Free 1.x updates',       bold: null },
    ],
  },
  {
    tier:     'pro',
    tag:      'Pro · most popular',
    name:     'Pro',
    blurb:    'For working studios that need batch QC, custom profiles and priority support.',
    per:      'Lifetime license · 3 seats',
    featured: true,
    prices:   { audiobook: 64,  studios: 99 },
    was:      { audiobook: 129, studios: 199 },
    stripe:   { audiobook: 'https://buy.stripe.com/eVq14o29F8vz4mp6OO4Vy05', studios: 'https://buy.stripe.com/8x2dRa6pVdPT3il7SS4Vy08' },
    items:    [
      { text: 'Everything in Solo',          bold: null },
      { text: ' · drop entire seasons', bold: 'Batch QC' },
      { text: 'Custom delivery profiles',    bold: null },
      { text: 'Priority Slack support',      bold: null },
      { text: 'All major versions, free',    bold: null },
    ],
  },
  {
    tier:     'team',
    tag:      'Team · whole post house',
    name:     'Team',
    blurb:    'For multi-room facilities. Site-wide install, shared profile library, SSO.',
    per:      'Lifetime license · 10 seats',
    featured: false,
    prices:   { audiobook: 199, studios: 399 },
    was:      { audiobook: 399, studios: 799 },
    stripe:   { audiobook: 'https://buy.stripe.com/cNi9AU4hN3bf3il4GG4Vy06', studios: 'https://buy.stripe.com/dRm28s7tZdPT6uxehg4Vy09' },
    items:    [
      { text: 'Everything in Pro',       bold: null },
      { text: 'SSO + centralised billing', bold: null },
      { text: 'Shared profile library',  bold: null },
      { text: 'Onboarding session',      bold: null },
    ],
  },
]

// ── Confetti hook ──────────────────────────────────────────────────────────
function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let W = 0, H = 0
    const dpr = window.devicePixelRatio || 1
    const colors = ['#22D3EE', '#FF7A1A', '#ECECEE', '#5EEBB3', '#A1A1A8']

    let resizeTimer: ReturnType<typeof setTimeout>
    function resize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!c) return
        W = c.clientWidth; H = c.clientHeight
        c.width = W * dpr; c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }, 100)
    }
    // Initial resize without debounce
    W = c.clientWidth; H = c.clientHeight
    c.width = W * dpr; c.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    window.addEventListener('resize', resize)

    type Particle = {
      x: number; y: number; vx: number; vy: number
      rot: number; vrot: number; w: number; h: number
      color: string; opacity: number; shape: 'circle' | 'rect'
    }
    const parts: Particle[] = []

    function makeParticle(initial: boolean): Particle {
      return {
        x:       Math.random() * W,
        y:       initial ? Math.random() * -H * 0.6 - 20 : -20,
        vx:      (Math.random() - 0.5) * 0.4,
        vy:      0.3 + Math.random() * 0.7,
        rot:     Math.random() * Math.PI * 2,
        vrot:    (Math.random() - 0.5) * 0.05,
        w:       3 + Math.random() * 5,
        h:       6 + Math.random() * 8,
        color:   colors[(Math.random() * colors.length) | 0],
        opacity: 0.5 + Math.random() * 0.5,
        shape:   Math.random() < 0.3 ? 'circle' : 'rect',
      }
    }

    for (let i = 0; i < 70; i++) parts.push(makeParticle(true))

    // Stop spawning new particles after 5s - let existing ones fall off, then stop RAF
    let spawning = true
    const spawnTimer = setTimeout(() => { spawning = false }, 5000)

    let last = performance.now()
    let raf: number

    function tick(now: number) {
      const dt = Math.min(40, now - last); last = now
      ctx.clearRect(0, 0, W, H)

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.vy  += 0.0015 * dt
        p.x   += p.vx * dt * 0.6
        p.y   += p.vy * dt * 0.6
        p.rot += p.vrot * dt * 0.5
        p.vx  += Math.sin((p.y + i) * 0.01) * 0.0008 * dt
        if (p.y > H + 20) { parts.splice(i, 1); continue }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        if (p.shape === 'circle') {
          ctx.beginPath(); ctx.arc(0, 0, p.w * 0.5, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      }

      // Trickle while spawning is active
      if (spawning && parts.length < 30 && Math.random() < 0.06) {
        parts.push(makeParticle(false))
      }

      // Stop RAF entirely once all particles are gone and spawning is done
      if (!spawning && parts.length === 0) {
        ctx.clearRect(0, 0, W, H)
        return
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(spawnTimer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])
}

// ── Icons ──────────────────────────────────────────────────────────────────
function CheckIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke={accent} strokeWidth="2"
      className="w-[14px] h-[14px] flex-shrink-0">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      className="w-[14px] h-[14px] transition-transform duration-200 group-hover:translate-x-[3px]">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const editionParam = searchParams.get('edition')
  const planParam = searchParams.get('plan')

  const initialEdition: Edition = editionParam === 'studios' ? 'studios' : 'audiobook'
  const focusedPlan: TierSlug | null =
    planParam === 'solo' || planParam === 'pro' || planParam === 'team' ? planParam : null

  const [edition, setEdition] = useState<Edition>(initialEdition)
  const [flipping, setFlipping] = useState<string | null>(null)

  // Bust the browser bfcache. When the user goes to Stripe and hits "back",
  // some browsers restore the in-memory DOM snapshot without re-running React,
  // which can show a stale layout. Force a reload in that specific case.
  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) window.location.reload()
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  // Focused view shows all three tiers, but selected goes to the center
  // and the other two are dimmed/disabled. Bare /checkout shows TIERS as-is.
  const visibleTiers = (() => {
    if (!focusedPlan) return TIERS
    const selected = TIERS.find(t => t.tier === focusedPlan)!
    const siblings = TIERS.filter(t => t.tier !== focusedPlan)
    return [siblings[0], selected, siblings[1]]
  })()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useConfetti(canvasRef)

  const isStudios = edition === 'studios'
  const accent     = isStudios ? '#FF7A1A' : '#22D3EE'
  const accentDim  = isStudios ? 'rgba(255,122,26,0.14)' : 'rgba(34,211,238,0.14)'
  const accentGlow = isStudios ? 'rgba(255,122,26,0.55)' : 'rgba(34,211,238,0.55)'
  const accentText = isStudios ? '#FF7A1A' : '#22D3EE'
  const accentOnDark = isStudios ? '#1A0A00' : '#0A1A1E'

  function switchEdition(ed: Edition) {
    if (ed === edition) return
    // trigger flip animation on all price numbers
    setFlipping('flip')
    setTimeout(() => {
      setEdition(ed)
      setFlipping(null)
    }, 180)
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip" style={{ background: '#0E0E10', color: '#ECECEE' }}>

      {/* Grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Accent aura — top center, follows edition */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-[background] duration-500"
        style={{
          top: -120, width: 1200, height: 700,
          background: `radial-gradient(ellipse at center top, ${accentDim} 0%, transparent 60%)`,
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      {/* Brand blob · orange — top-left, slow drift */}
      <div
        className="brand-blob fixed z-0 pointer-events-none"
        style={{
          top: '-180px', left: '-260px', width: '760px', height: '760px',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,122,26,0.16) 0%, rgba(255,122,26,0.05) 38%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
          animation: 'blobDriftA 18s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Brand blob · cyan — bottom-right, slow drift */}
      <div
        className="brand-blob fixed z-0 pointer-events-none"
        style={{
          bottom: '-220px', right: '-300px', width: '820px', height: '820px',
          background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.04) 40%, transparent 72%)',
          filter: 'blur(40px)',
          willChange: 'transform',
          animation: 'blobDriftB 22s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Brand blob · mid accent — drifts in the middle for depth */}
      <div
        className="brand-blob fixed z-0 pointer-events-none"
        style={{
          top: '40%', left: '60%', width: '520px', height: '520px',
          background: `radial-gradient(circle at 50% 50%, ${accentDim} 0%, transparent 65%)`,
          filter: 'blur(50px)',
          willChange: 'transform',
          animation: 'blobDriftC 26s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed left-0 right-0 top-0 z-[1] pointer-events-none"
        style={{
          height: 480,
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-[2] max-w-[1180px] mx-auto px-6 md:px-10 pb-20 pt-9 flex flex-col items-center min-h-[100dvh]">

        {/* Brand mark - no nav */}
        <div className="self-start flex items-center gap-[10px]">
          <img src="/logo.svg" alt="DubCheck" width={22} height={22} className="block" />
          <span className="text-[14px] font-semibold text-[#A1A1A8]">
            <b className="text-[#ECECEE]">DubCheck</b>
          </span>
          <span className="font-mono text-[12px] text-[#6B6B72] border border-white/[0.08] px-[6px] py-[2px] rounded-[3px] tracking-[0.08em] ml-1">
            Early Bird
          </span>
        </div>

        {/* ── Hero ── */}
        <section className="w-full max-w-[880px] text-center pt-[60px] pb-9 flex flex-col items-center gap-[22px] relative">
          <div className="absolute -left-5 top-20 w-[18px] h-[18px] pointer-events-none opacity-40"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />
          <div className="absolute -right-5 top-20 w-[18px] h-[18px] pointer-events-none opacity-40"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />

          {/* Status pill */}
          <div className="inline-flex items-center gap-[9px] px-[14px] py-[7px] rounded-full border"
            style={{
              background: focusedPlan ? 'rgba(34,201,139,0.08)' : `${accentDim}`,
              borderColor: focusedPlan ? 'rgba(34,201,139,0.28)' : accentDim,
              color: focusedPlan ? '#5EEBB3' : accentText,
            }}>
            <span className="w-[7px] h-[7px] rounded-full animate-pulse flex-shrink-0"
              style={{
                background: focusedPlan ? '#22C98B' : accent,
                boxShadow: focusedPlan ? '0 0 8px rgba(34,201,139,0.9)' : `0 0 8px ${accentGlow}`,
              }} />
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase">
              {focusedPlan ? 'Plan selected' : 'Early Bird · up to 50% off'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[54px] md:text-[84px] font-bold leading-[1] tracking-[-0.04em] m-0"
            style={{
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #C8C8CE 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            {focusedPlan ? (
              <>Great call.<br />Let&apos;s lock it in.</>
            ) : (
              <>Pick the license <br />that fits.</>
            )}
            <span className="ml-2 inline-block animate-[tada_1.6s_ease-in-out_0.4s_both]"
              style={{ WebkitTextFillColor: 'initial', color: 'initial' }}>
              {focusedPlan ? '🔒' : '🎯'}
            </span>
          </h1>

          <p className="text-[18px] text-[#A1A1A8] m-0 max-w-[62ch] leading-[1.55]">
            {focusedPlan
              ? 'One click to Stripe — checkout in under 30 seconds. Pay once, own forever. Backed by a 30-day money-back guarantee, no questions asked.'
              : 'Lifetime license, pay once, own forever. Pick your tier, click through to Stripe, and you’re running today.'}
          </p>
        </section>

        {/* ── Edition toggle ── */}
        {!focusedPlan && (
        <div className="mb-9 mt-[60px] flex flex-col items-center gap-[14px]">
          <div className="font-mono text-[12px] text-[#6B6B72] tracking-[0.18em] uppercase">
            Choose your edition
          </div>
          <div
            className="relative flex p-[5px] rounded-full border border-white/[0.08] w-[460px] max-w-full"
            style={{ background: '#17171A', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 50px -30px rgba(0,0,0,0.8)' }}
            role="tablist"
            aria-label="Edition"
          >
            {/* sliding thumb */}
            <div
              className="absolute top-[5px] bottom-[5px] left-[5px] w-[calc(50%-5px)] rounded-full border border-white/[0.08] transition-transform duration-[420ms]"
              style={{
                background: 'linear-gradient(180deg, #1F1F23 0%, #16161A 100%)',
                boxShadow: `0 0 0 1px ${accentDim}, 0 0 24px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                transform: isStudios ? 'translateX(100%)' : 'translateX(0)',
              }}
              aria-hidden="true"
            />
            {(['audiobook', 'studios'] as Edition[]).map(ed => (
              <button
                key={ed}
                role="tab"
                aria-selected={edition === ed}
                onClick={() => switchEdition(ed)}
                className="relative flex-1 flex items-center justify-center gap-[10px] px-4 py-[14px] text-[14px] font-medium z-[1] border-none bg-transparent cursor-pointer transition-colors duration-300"
                style={{ color: edition === ed ? '#ECECEE' : '#6B6B72', fontFamily: 'inherit' }}
              >
                <span
                  className="w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0"
                  style={edition === ed
                    ? { background: accent, boxShadow: `0 0 8px ${accentGlow}` }
                    : { background: '#44444B' }
                  }
                />
                {ed === 'audiobook' ? 'AudioBook Edition' : 'Studios Edition'}
              </button>
            ))}
          </div>
        </div>
        )}

        {/* ── Pricing cards ── */}
        <div
          className={`w-full grid items-center gap-[10px] md:gap-[18px] ${
            focusedPlan
              ? 'max-w-[1080px] grid-cols-3 mt-[40px]'
              : 'max-w-[1080px] grid-cols-1 md:grid-cols-3 items-stretch'
          }`}
          style={{ perspective: 1200 }}>
          {visibleTiers.map(plan => {
            const dimmed = !!focusedPlan && plan.tier !== focusedPlan
            // Per-tier accent for the soft glow on non-featured cards.
            // Pro uses the edition accent (orange/cyan). Solo + Team get cyan / amber tints so each card has its own life.
            const cardAccent =
              plan.tier === 'solo' ? (isStudios ? 'rgba(34,211,238,0.18)' : 'rgba(255,122,26,0.16)')
              : plan.tier === 'team' ? 'rgba(250,182,72,0.16)'
              : accentDim
            const cardGlow =
              plan.tier === 'solo' ? (isStudios ? 'rgba(34,211,238,0.45)' : 'rgba(255,122,26,0.4)')
              : plan.tier === 'team' ? 'rgba(250,182,72,0.38)'
              : accentGlow
            return (
            <article
              key={plan.tier}
              aria-disabled={dimmed || undefined}
              className={`tier-card relative border rounded-[14px] flex flex-col transition-all duration-500 ${
                dimmed
                  ? 'tier-card--dimmed pointer-events-none select-none'
                  : 'hover:-translate-y-[6px]'
              } ${plan.featured && !dimmed ? 'tier-card--featured' : ''}`}
              style={plan.featured ? {
                borderColor: accentDim,
                background: `radial-gradient(ellipse at top, ${accentDim} 0%, transparent 50%), linear-gradient(180deg, #1A1A1E 0%, #131316 100%)`,
                boxShadow: `0 0 0 1px ${accentDim}, 0 30px 80px -30px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                transform: 'translateY(-12px)',
                padding: '40px 28px 28px',
                // expose accent for hover via CSS var
                ['--card-accent' as any]: cardAccent,
                ['--card-glow'   as any]: cardGlow,
              } : {
                borderColor: 'rgba(255,255,255,0.08)',
                background: `radial-gradient(ellipse at top, ${cardAccent} 0%, transparent 55%), linear-gradient(180deg, #17171A 0%, #131316 100%)`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px -30px ${cardGlow}, inset 0 1px 0 rgba(255,255,255,0.03)`,
                padding: '30px 28px 28px',
                ['--card-accent' as any]: cardAccent,
                ['--card-glow'   as any]: cardGlow,
              }}
            >
              {/* Crown badge */}
              {plan.featured && !dimmed && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] font-semibold tracking-[0.16em] uppercase px-[14px] py-[6px] rounded-full transition-all duration-300"
                  style={{
                    background: accent, color: accentOnDark,
                    boxShadow: `0 0 24px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}
                >
                  Recommended
                </span>
              )}

              {/* Tag */}
              <div className="font-mono text-[12px] tracking-[0.14em] uppercase mb-[10px] flex items-center gap-2"
                style={{ color: plan.featured ? accentText : '#6B6B72' }}>
                <span className="w-[6px] h-[6px] rounded-full transition-all duration-300"
                  style={{ background: plan.featured ? accent : '#44444B',
                    boxShadow: plan.featured ? `0 0 8px ${accentGlow}` : 'none' }} />
                {plan.tag}
              </div>

              <h3 className="text-[22px] font-semibold tracking-[-0.015em] mb-[6px]">{plan.name}</h3>
              <p className="text-[13.5px] text-[#A1A1A8] mb-[26px] leading-[1.5]" style={{ minHeight: '2.8em' }}>
                {plan.blurb}
              </p>

              {/* Save chip */}
              <div
                className="inline-flex items-center gap-[6px] mb-[14px] px-[9px] py-[5px] font-mono text-[12px] tracking-[0.12em] uppercase rounded-[4px] border self-start transition-all duration-300"
                style={{ color: accentText, background: accentDim, borderColor: accentDim }}
              >
                <span className="w-[5px] h-[5px] rounded-full transition-all duration-300"
                  style={{ background: accent, boxShadow: `0 0 6px ${accentGlow}` }} />
                Save {Math.round((1 - plan.prices[edition] / plan.was[edition]) * 100)}% · was €{plan.was[edition]}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 leading-none font-mono">
                <span className="text-[28px] text-[#6B6B72] font-normal">€</span>
                <span
                  className={`text-[72px] font-medium tracking-[-0.03em] transition-[opacity,transform] duration-300 ${flipping ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}
                  style={plan.featured ? {
                    backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, ${accent} 130%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    filter: `drop-shadow(0 0 24px ${accentGlow})`,
                  } : {
                    backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #B8B8C0 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  {plan.prices[edition]}
                </span>
              </div>
              <div className="font-mono text-[12px] text-[#6B6B72] mb-6 tracking-[0.04em]">
                {plan.per}
              </div>

              {/* Features */}
              <ul className="list-none p-0 m-0 mb-7 border-t border-white/[0.04] flex-1">
                {plan.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-[10px] py-[11px] border-b border-white/[0.04] text-[13.5px] text-[#A1A1A8]">
                    <CheckIcon accent={accent} />
                    {item.bold
                      ? <><b className="font-medium text-[#ECECEE]">{item.bold}</b>{item.text}</>
                      : item.text
                    }
                  </li>
                ))}
              </ul>

              {/* CTA — hidden on dimmed sibling cards in focused view */}
              {dimmed ? (
                <div className="mt-auto w-full h-[48px] rounded-[9px] border border-white/[0.04] flex items-center justify-center text-[12px] font-mono tracking-[0.14em] uppercase text-[#44444B]">
                  Not selected
                </div>
              ) : focusedPlan ? (
                <a
                  href={plan.stripe[edition]}
                  className="group mt-auto w-full inline-flex items-center justify-center gap-[10px] px-[18px] py-[14px] rounded-[9px] text-[14px] font-semibold tracking-[-0.005em] border transition-all duration-200"
                  style={{
                    background: accent, color: accentOnDark, borderColor: 'transparent',
                    boxShadow: `0 0 0 1px ${accentDim}, 0 18px 40px -18px ${accentGlow}`,
                  }}
                >
                  Pay securely with Stripe
                  <ArrowIcon />
                </a>
              ) : (
                <Link
                  href={`/checkout?edition=${edition}&plan=${plan.tier}`}
                  className="group mt-auto w-full inline-flex items-center justify-center gap-[10px] px-[18px] py-[14px] rounded-[9px] text-[14px] font-semibold tracking-[-0.005em] border transition-all duration-200"
                  style={plan.featured ? {
                    background: accent, color: accentOnDark, borderColor: 'transparent',
                    boxShadow: `0 0 0 1px ${accentDim}, 0 18px 40px -18px ${accentGlow}`,
                  } : {
                    background: 'rgba(255,255,255,0.02)', color: '#ECECEE',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  Proceed to Checkout
                  <ArrowIcon />
                </Link>
              )}
            </article>
          )})}
        </div>

        {/* ── Trust anchor ── */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] w-full max-w-[880px] flex flex-col items-center gap-[14px] text-center">
          <div className="flex items-center gap-[10px] text-[13.5px] text-[#6B6B72] max-w-[64ch]">
            <svg viewBox="0 0 16 16" fill="none" stroke="#A1A1A8" strokeWidth="1.6" className="w-[14px] h-[14px] flex-shrink-0">
              <rect x="3" y="7" width="10" height="7" rx="1.2" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            <span>
              <b className="font-medium text-[#A1A1A8]">100% Risk-Free.</b>{' '}
              30-day money-back guarantee, no questions asked.
            </span>
          </div>

          <div className="flex items-center font-mono text-[12px] text-[#44444B] tracking-[0.14em] uppercase">
            {['SCA / 3DS Secure', 'Stripe · VISA · MC · SEPA', 'Invoiced VAT, EU'].map((item, i) => (
              <span key={item} className={`px-4 ${i > 0 ? 'border-l border-white/[0.04]' : 'pl-0'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer sig */}
        <div className="mt-10 font-mono text-[12px] text-[#44444B] tracking-[0.18em] uppercase">
          DubCheck QC · v1.0 · 2026
        </div>
      </div>

      <style>{`
        @keyframes tada {
          0%   { transform: scale(0) rotate(-30deg); opacity: 0 }
          60%  { transform: scale(1.25) rotate(15deg); opacity: 1 }
          80%  { transform: scale(0.95) rotate(-6deg) }
          100% { transform: scale(1) rotate(0) }
        }
        @keyframes bob {
          0%,100% { transform: translateY(0); opacity: 0.5 }
          50%     { transform: translateY(3px); opacity: 1 }
        }
        @keyframes blobDriftA {
          0%,100% { transform: translate(0,0)        scale(1) }
          50%     { transform: translate(60px,40px)  scale(1.08) }
        }
        @keyframes blobDriftB {
          0%,100% { transform: translate(0,0)         scale(1) }
          50%     { transform: translate(-80px,-50px) scale(1.05) }
        }
        .tier-card { transform-origin: center; }
        .tier-card:not(.tier-card--dimmed):hover {
          border-color: var(--card-accent) !important;
          box-shadow:
            0 0 0 1px var(--card-accent),
            0 40px 90px -30px var(--card-glow),
            inset 0 1px 0 rgba(255,255,255,0.06) !important;
        }
        .tier-card--featured:not(.tier-card--dimmed) { transform: translateY(-12px); }
        .tier-card--featured:not(.tier-card--dimmed):hover { transform: translateY(-18px) !important; }

        /* Dimmed siblings in focused-plan view */
        .tier-card--dimmed {
          transform: scale(0.82);
          opacity: 0.35;
          filter: grayscale(0.85) saturate(0.4);
          box-shadow: none !important;
          cursor: default;
        }
        .tier-card--dimmed * { cursor: default !important; }
        @keyframes blobDriftC {
          0%,100% { transform: translate(0,0)         scale(1)   }
          33%     { transform: translate(40px,-30px)  scale(1.1) }
          66%     { transform: translate(-30px,50px)  scale(0.95) }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-blob { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
