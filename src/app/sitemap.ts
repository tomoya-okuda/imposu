import { MetadataRoute } from 'next'

const WEB_URL = process.env.NEXT_PUBLIC_BASE_URL
const _lastModified = new Date()

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${WEB_URL}/`, lastModified: _lastModified, priority: 1.0 },
  ]

  return [...staticPages]
}
