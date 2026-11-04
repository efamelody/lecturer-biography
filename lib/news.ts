import newsData from '@/content/news.json'

export const NEWS_SOURCES = ['Professor', 'UKM Atmosphere', 'IPI UKM', 'Media'] as const
export type NewsSource = (typeof NEWS_SOURCES)[number]

export const NEWS_CATEGORIES = [
  'Research',
  'Academic',
  'Conference',
  'Award',
  'Media',
  'Student',
  'Collaboration',
  'Announcement',
] as const
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

export const NEWS_PLATFORMS = ['linkedin', 'facebook', 'external', 'website'] as const
export type NewsPlatform = (typeof NEWS_PLATFORMS)[number]

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  /** Full date, ISO `YYYY-MM-DD`. */
  date: string
  source: NewsSource
  category: NewsCategory
  platform: NewsPlatform
  image?: string
  imageAlt?: string
  originalUrl: string
  featured?: boolean
  status?: 'published' | 'draft'
  accountLabel?: string
  linkLabel?: string
}

export interface NewsSocialLink {
  label: string
  description: string
  platform: NewsPlatform
  url: string
}

export const FACEBOOK_PAGE_URL = 'https://www.facebook.com/UKMAtmosphere'

const facebookPluginParams = new URLSearchParams({
  href: FACEBOOK_PAGE_URL,
  tabs: 'timeline',
  width: '500',
  height: '700',
  small_header: 'false',
  adapt_container_width: 'true',
  hide_cover: 'false',
  show_facepile: 'false',
})

export const FACEBOOK_PAGE_PLUGIN_URL = `https://www.facebook.com/plugins/page.php?${facebookPluginParams.toString()}`

export const NEWS_SOCIAL_LINKS: NewsSocialLink[] = [
  {
    label: 'Prof. Latif on LinkedIn',
    description: 'Academic appointments, conferences and public commentary.',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/mohd-talib-latif-18915073/',
  },
  {
    label: 'UKM Atmosphere on Facebook',
    description: 'Research group news, student activities and fieldwork.',
    platform: 'facebook',
    url: FACEBOOK_PAGE_URL,
  },
  {
    label: 'IPI UKM on LinkedIn',
    description: 'Institute of Climate Change announcements and events.',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/company/ipiukm/',
  },
]

const NEWS_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function isValidDay(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  return !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
}

export function isSafeExternalUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function isSafeNewsImage(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return /\.(jpe?g|png|webp|avif)$/i.test(trimmed)
  }
  return isSafeExternalUrl(trimmed)
}

function isNewsSource(value: unknown): value is NewsSource {
  return typeof value === 'string' && (NEWS_SOURCES as readonly string[]).includes(value)
}

function isNewsCategory(value: unknown): value is NewsCategory {
  return typeof value === 'string' && (NEWS_CATEGORIES as readonly string[]).includes(value)
}

function isNewsPlatform(value: unknown): value is NewsPlatform {
  return typeof value === 'string' && (NEWS_PLATFORMS as readonly string[]).includes(value)
}

function parseNewsItem(value: unknown): NewsItem | null {
  if (!isRecord(value)) return null

  const id = asTrimmedString(value.id)
  const title = asTrimmedString(value.title)
  const excerpt = asTrimmedString(value.excerpt)
  const date = asTrimmedString(value.date)
  const originalUrl = asTrimmedString(value.originalUrl)

  if (!id || !title || !excerpt || !date || !originalUrl) return null
  if (!isValidDay(date)) return null
  if (!isNewsSource(value.source) || !isNewsCategory(value.category) || !isNewsPlatform(value.platform)) {
    return null
  }
  if (!isSafeExternalUrl(originalUrl)) return null

  const image = isSafeNewsImage(value.image) ? value.image.trim() : undefined
  const imageAlt = image ? asTrimmedString(value.imageAlt) ?? title : undefined

  return {
    id,
    title,
    excerpt,
    date,
    source: value.source,
    category: value.category,
    platform: value.platform,
    image,
    imageAlt,
    originalUrl,
    featured: value.featured === true,
    status: value.status === 'draft' ? 'draft' : 'published',
    accountLabel: asTrimmedString(value.accountLabel),
    linkLabel: asTrimmedString(value.linkLabel),
  }
}

export function getAllNewsItems(): NewsItem[] {
  if (!Array.isArray(newsData)) return []

  const items: NewsItem[] = []
  for (const entry of newsData) {
    const parsed = parseNewsItem(entry)
    if (parsed) items.push(parsed)
  }

  return items.sort(compareByDateDesc)
}

export function getPublishedNewsItems(): NewsItem[] {
  return getAllNewsItems().filter((item) => item.status !== 'draft')
}

export function getLatestNews(limit = 4): NewsItem[] {
  return getPublishedNewsItems().slice(0, Math.max(0, limit))
}

function compareByDateDesc(a: NewsItem, b: NewsItem): number {
  if (a.date === b.date) return a.title.localeCompare(b.title)
  return b.date.localeCompare(a.date)
}

export function formatNewsDate(item: NewsItem): string {
  return NEWS_DATE_FORMATTER.format(new Date(`${item.date}T00:00:00Z`))
}

export function getNewsPlatformLabel(platform: NewsPlatform): string {
  switch (platform) {
    case 'linkedin':
      return 'LinkedIn'
    case 'facebook':
      return 'Facebook'
    case 'external':
      return 'External media'
    case 'website':
      return 'Website'
  }
}

export function getNewsLinkLabel(item: NewsItem): string {
  if (item.linkLabel) return item.linkLabel
  return item.platform === 'external' ? 'Read original article' : 'Read original post'
}
