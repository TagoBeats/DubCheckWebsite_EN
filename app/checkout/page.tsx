import { redirect } from 'next/navigation'

// The old checkout carried three tiers across two editions. The model is now
// Free plus a single one-time Batch license, so every /checkout link lands on
// the pricing page instead. Kept as a route so old links do not 404.
export default function Page() {
  redirect('/pricing')
}
