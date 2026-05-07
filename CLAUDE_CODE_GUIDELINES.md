# MISSION: DUBCHECK INTERNATIONAL LANDING PAGE (audio-dubcheck.com)

International English landing page targeting two parallel personas:

1. **Narrators (ACX / Audible)** — solo audiobook narrators worldwide. Pain: ACX rejection. Pricing: €39 lifetime / €99 pro.
2. **Localization Studios / Mixers** — international dubbing studios delivering to Netflix, Apple TV+, Disney+, Prime. Pricing: €149/project + studio tier.

The German site (audio-dubcheck.de) lives in a SEPARATE folder and is NOT touched by this project.

Tone: Professional, technical, direct. No buzzwords. No "AI-powered". Concrete spec numbers (RMS, dBTP, LUFS) build trust.

## TECH STACK
- Framework: Next.js 15 (App Router) + React 19 + TypeScript
- Styling: Tailwind 3.4, dark mode only
- Accent colors: Cyan #22D3EE (dc-cyan), Orange #FF7A1A (dc-orange)
- Fonts: Inter (sans) + JetBrains Mono (mono)

## ROUTES
- `/` — persona switcher (two large cards: "I'm a narrator" / "I'm a localization mixer")
- `/narrators` — ACX-focused full landing
- `/studios` — Localization-focused (placeholder until validated)

## TOKEN-SAVING RULES
1. NO YAP. No filler. Output code, not commentary.
2. COMPONENT-ONLY edits when possible. Don't rewrite whole files for small text changes.
3. TEXT STABILITY: never change spec terminology (RMS, dBTP, LUFS, EBU R128) without explicit instruction.

## CORE BUSINESS LOGIC (GROUND TRUTH)
- Service Model: LOCAL / OFFLINE processing. NOT cloud SaaS. Files stay on customer machines.
- Pre-sale-first: landing page sells "early access" before V1 standalone exists.
- Engine: EBU 3341/3342 certified (66/66 tests passed).
- Narrators pricing: €39 lifetime, €99 pro (with batch).
- Studios pricing: €149/project, €499–999/year studio license. NO subscription-only.

## PITCH FRAMING

**Narrators:** "Stop getting ACX-rejected. Drag your chapter in. Get a pass/fail PDF in 10 seconds."

**Studios (CONTROL framing — primary):** "Streamers normalize your mix server-side when specs don't match. You lose control over how your work actually sounds at the viewer's end. DubCheck verifies before you upload."

**Studios (STRICT-QC framing — alternative):** "Apple TV+ and ACX won't normalize your mistakes — they reject the file. DubCheck catches it before you upload."

## DEAL-BREAKERS (avoid in copy)
- "AI-powered", "revolutionary", "next-gen"
- Vague feature claims
- Cloud-upload talk
- Subscription-only pricing for studios
- Wrong spec numbers (e.g. -23 LUFS for Netflix Originals — correct is -27 dialog-gated)
