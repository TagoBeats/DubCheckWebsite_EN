/**
 * Single source of truth for the DubCheck pricing model.
 *
 * Two products, nothing else:
 *   Free  — one file per run, every spec, signed PDF. No key, no account, forever.
 *   Batch — unlimited files per run + a batch summary report. One payment, lifetime key.
 */

export const BATCH_PRICE_EUR = 29

/** Stripe payment link for the €29 Batch license. Empty falls back to /contact. */
export const BATCH_PAYMENT_LINK: string = 'https://buy.stripe.com/cNi9AU5lRfY1bOR0qq4Vy0e'

/** What the Batch line item must cost, in cents. The webhook matches on this. */
export const BATCH_PRICE_CENTS = BATCH_PRICE_EUR * 100

export const BATCH_HREF = BATCH_PAYMENT_LINK || '/contact'
export const BATCH_LINK_IS_LIVE = BATCH_PAYMENT_LINK !== ''

export const SPEC_COUNT = 20
export const PLATFORM_COUNT = 11

export const FREE_FEATURES = [
  `All ${SPEC_COUNT} spec profiles across ${PLATFORM_COUNT} platforms`,
  'One file per run',
  'Signed PDF report per file',
  'Runs entirely on your machine, nothing uploaded',
  'No account, no card, no expiry',
]

export const BATCH_FEATURES = [
  'Everything in Free',
  'Unlimited files per run — drop a whole folder',
  'Batch summary report across every file',
  'One payment, key is yours for good',
  'Free updates, including new platform specs',
]
