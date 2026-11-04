import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://talib-latif.com'
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'yearly', priority: 0.9 },
    { url: `${baseUrl}/about/career`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/about/career`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/research/projects`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/research/group`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/research/supervision`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/publications`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/activities`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/media`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/cv`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
  ]
}
