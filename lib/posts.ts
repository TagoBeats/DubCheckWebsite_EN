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
