import type { MetadataRoute } from 'next'

const SITE_URL = 'https://audio-dubcheck.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/checkout', '/thank-you', '/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
