/**
 * Seed license keys into Upstash lists.
 *
 * Reads a CSV with columns: key, tier, edition, used, email, date
 * Pushes unused keys into `keys:{edition}:{tier}` lists (lowercased).
 * Idempotent: uses a `keys:seen` SET to skip already-loaded keys across runs.
 *
 * Usage:
 *   npx tsx scripts/seed_keys.ts path/to/keys_batch.csv
 *   npx tsx scripts/seed_keys.ts path/to/keys_batch.csv --dry-run
 */

import { Redis } from '@upstash/redis'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type Row = { key: string; tier: string; edition: string; used: string }

function parseCsv(text: string): Row[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
  const header = lines.shift()
  if (!header) throw new Error('CSV empty')
  const cols = header.split(',').map(s => s.trim().toLowerCase())
  const idx = {
    key: cols.indexOf('key'),
    tier: cols.indexOf('tier'),
    edition: cols.indexOf('edition'),
    used: cols.indexOf('used'),
  }
  if (idx.key < 0 || idx.tier < 0 || idx.edition < 0 || idx.used < 0) {
    throw new Error(`CSV missing required columns. Got: ${cols.join(',')}`)
  }
  return lines.map(line => {
    const parts = line.split(',')
    return {
      key: parts[idx.key],
      tier: parts[idx.tier],
      edition: parts[idx.edition],
      used: parts[idx.used],
    }
  })
}

function listName(edition: string, tier: string): string {
  return `keys:${edition.toLowerCase()}:${tier.toLowerCase()}`
}

async function main() {
  const args = process.argv.slice(2)
  const csvPath = args.find(a => !a.startsWith('--'))
  const dryRun = args.includes('--dry-run')

  if (!csvPath) {
    console.error('Usage: tsx scripts/seed_keys.ts <csv> [--dry-run]')
    process.exit(1)
  }

  const hasUrl = !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)
  const hasToken = !!(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)
  if (!hasUrl || !hasToken) {
    console.error('Missing Upstash/KV REST URL or TOKEN in env.')
    process.exit(1)
  }

  const redis = Redis.fromEnv()
  const csv = readFileSync(resolve(csvPath), 'utf8')
  const rows = parseCsv(csv)

  const buckets = new Map<string, string[]>()
  let skippedUsed = 0
  let skippedDup = 0

  for (const row of rows) {
    if (String(row.used).toUpperCase() === 'TRUE') {
      skippedUsed++
      continue
    }
    if (dryRun) {
      const list = listName(row.edition, row.tier)
      buckets.set(list, [...(buckets.get(list) ?? []), row.key])
      continue
    }
    const added = await redis.sadd('keys:seen', row.key)
    if (!added) {
      skippedDup++
      continue
    }
    const list = listName(row.edition, row.tier)
    await redis.lpush(list, row.key)
    buckets.set(list, [...(buckets.get(list) ?? []), row.key])
  }

  console.log('Seed summary:')
  for (const [list, keys] of buckets) {
    console.log(`  ${list}: +${keys.length}`)
  }
  console.log(`  skipped (used=TRUE): ${skippedUsed}`)
  console.log(`  skipped (already seeded): ${skippedDup}`)
  if (dryRun) console.log('(dry run, nothing written)')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
