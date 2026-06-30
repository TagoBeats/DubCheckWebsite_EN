import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

const SITE_URL = 'https://audio-dubcheck.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/narrators`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/studios`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/pricing`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/help`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/about`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE_URL}/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE_URL}/imprint`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/privacy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
