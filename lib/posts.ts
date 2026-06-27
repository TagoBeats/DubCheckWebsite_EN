export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  readingMinutes: number
}

export const posts: Post[] = [
  {
    slug: 'podcast-lufs-targets',
    title: 'Podcast LUFS Targets for 2026: Spotify, Apple, YouTube, Amazon Music',
    date: '2026-06-27',
    excerpt:
      'Exact integrated loudness and true peak targets for Spotify, Apple Podcasts, YouTube, Amazon Music and Deezer - and the single master that passes all of them without re-rendering.',
    category: 'Podcasting',
    tags: ['Podcast', 'LUFS', 'Spotify', 'Apple Podcasts', 'Loudness Normalization'],
    readingMinutes: 8,
  },
  {
    slug: 'audible-acx-vs-findaway-vs-spotify-audiobooks',
    title: 'Audible ACX vs Findaway Voices vs Spotify Audiobooks: Three Specs, One Master',
    date: '2026-06-19',
    excerpt:
      'Three audiobook platforms, three different delivery specs, three different rejection reasons. The single master that passes ACX, Findaway and Spotify Audiobooks without re-rendering.',
    category: 'Audiobooks',
    tags: ['ACX', 'Findaway Voices', 'Spotify Audiobooks', 'Audiobook Delivery', 'Narrators'],
    readingMinutes: 9,
  },
  {
    slug: 'ebu-r128-vs-atsc-a85-vs-bs1770',
    title: 'EBU R128 vs ATSC A/85 vs ITU BS.1770: What Actually Differs',
    date: '2026-06-12',
    excerpt:
      'Three loudness standards, one measurement algorithm, three different target levels. What each one specifies, where they disagree, and which one applies to your delivery.',
    category: 'Standards',
    tags: ['EBU R128', 'ATSC A/85', 'BS.1770', 'LUFS', 'Broadcast'],
    readingMinutes: 9,
  },
  {
    slug: 'room-tone-matching-recording-days',
    title: 'Room Tone Matching Across Recording Days',
    date: '2026-06-04',
    excerpt:
      'Why chapter 3 sounds different from chapter 12 even when nothing in the booth changed - and the recording, editing and measurement workflow that keeps room tone consistent across days, weeks and months of a project.',
    category: 'Narrators',
    tags: ['Room Tone', 'Noise Floor', 'Narrators', 'Workflow', 'Recording'],
    readingMinutes: 8,
  },
  {
    slug: 'true-peak-vs-sample-peak',
    title: 'True Peak vs Sample Peak: Why Your -0.1 dBFS Master Clips on Spotify',
    date: '2026-05-28',
    excerpt:
      'Sample peak and true peak are different measurements. The gap is where inter-sample peaks live - and where masters that look clean in a DAW end up clipping after lossy encoding.',
    category: 'Loudness',
    tags: ['True Peak', 'Inter-Sample Peak', 'dBTP', 'Limiter', 'Encoding'],
    readingMinutes: 7,
  },
  {
    slug: 'acx-submission-rejected',
    title: 'Why Your ACX Submission Keeps Getting Rejected (And How to Fix Every Reason)',
    date: '2026-05-09',
    excerpt:
      'ACX rejections waste hours of re-editing. This guide covers every technical reason files get rejected and shows exactly how to fix each one before you upload.',
    category: 'ACX',
    tags: ['ACX', 'Loudness', 'Narrators', 'Rejection'],
    readingMinutes: 7,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}
