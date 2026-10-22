import mediaData from '@/content/media.json'
import pressClippingsData from '@/content/press-clippings.json'

export const MEDIA_TOPICS = [
  'Air Quality & Public Health',
  'Transboundary Haze',
  'Urban Climate & Emissions',
  'Atmospheric Chemistry',
  'Climate Change & Policy',
] as const

export type MediaTopic = (typeof MEDIA_TOPICS)[number]

export const MEDIA_TYPES = ['news', 'interview', 'video', 'report', 'event'] as const
export type MediaType = (typeof MEDIA_TYPES)[number]

export type MediaLanguage = 'en' | 'ms'

export type MediaAttribution =
  | 'quoted'
  | 'interviewed'
  | 'authored'
  | 'presented'
  | 'panel'
  | 'mentioned'
  | 'other'

export interface MediaItem {
  id: string
  title: string
  outlet: string
  /** Full date, ISO `YYYY-MM-DD`. Only set when the exact day is known. */
  publishedOn?: string
  /** Month precision, `YYYY-MM`. Only set when the day is unknown. */
  publishedIn?: string
  /** Year precision, `YYYY`. Only set when the month is unknown. */
  publishedYear?: string
  language: MediaLanguage
  type: MediaType
  topics: MediaTopic[]
  primaryTopic: MediaTopic
  summary: string
  url?: string
  attribution: MediaAttribution
  featured?: boolean
  verified?: boolean
  status?: 'published' | 'draft'
  formatLabel?: string
  linkLabel?: string
  note?: string
}

const MEDIA_LANGUAGES: MediaLanguage[] = ['en', 'ms']
const ATTRIBUTIONS: MediaAttribution[] = [
  'quoted',
  'interviewed',
  'authored',
  'presented',
  'panel',
  'mentioned',
  'other',
]

const DAY_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-GB', {
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

function isValidMonth(value: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
}

function isValidYear(value: string): boolean {
  return /^\d{4}$/.test(value)
}

export function isMediaTopic(value: unknown): value is MediaTopic {
  return typeof value === 'string' && (MEDIA_TOPICS as readonly string[]).includes(value)
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

function parseMediaItem(value: unknown): MediaItem | null {
  if (!isRecord(value)) return null

  const id = asTrimmedString(value.id)
  const title = asTrimmedString(value.title)
  const outlet = asTrimmedString(value.outlet)
  const summary = asTrimmedString(value.summary)
  if (!id || !title || !outlet || !summary) return null

  if (typeof value.type !== 'string' || !(MEDIA_TYPES as readonly string[]).includes(value.type)) {
    return null
  }
  if (typeof value.language !== 'string' || !MEDIA_LANGUAGES.includes(value.language as MediaLanguage)) {
    return null
  }

  const publishedOn =
    typeof value.publishedOn === 'string' && isValidDay(value.publishedOn) ? value.publishedOn : undefined
  const publishedIn =
    typeof value.publishedIn === 'string' && isValidMonth(value.publishedIn) ? value.publishedIn : undefined
  const publishedYear =
    typeof value.publishedYear === 'string' && isValidYear(value.publishedYear) ? value.publishedYear : undefined

  const topics = Array.isArray(value.topics) ? value.topics.filter(isMediaTopic) : []
  const primaryTopic = isMediaTopic(value.primaryTopic) ? value.primaryTopic : topics[0]
  if (!primaryTopic) return null

  const attribution =
    typeof value.attribution === 'string' && ATTRIBUTIONS.includes(value.attribution as MediaAttribution)
      ? (value.attribution as MediaAttribution)
      : undefined
  if (!attribution) return null

  const uniqueTopics = Array.from(new Set<MediaTopic>([primaryTopic, ...topics]))

  return {
    id,
    title,
    outlet,
    publishedOn,
    publishedIn: publishedOn ? undefined : publishedIn,
    publishedYear: publishedOn || publishedIn ? undefined : publishedYear,
    language: value.language as MediaLanguage,
    type: value.type as MediaType,
    topics: uniqueTopics,
    primaryTopic,
    summary,
    url: isSafeExternalUrl(value.url) ? value.url : undefined,
    attribution,
    featured: value.featured === true,
    verified: value.verified === true,
    status: value.status === 'draft' ? 'draft' : 'published',
    formatLabel: asTrimmedString(value.formatLabel),
    linkLabel: asTrimmedString(value.linkLabel),
    note: asTrimmedString(value.note),
  }
}

export function getAllMediaItems(): MediaItem[] {
  if (!Array.isArray(mediaData)) return []
  const items: MediaItem[] = []
  for (const entry of mediaData) {
    const parsed = parseMediaItem(entry)
    if (parsed) items.push(parsed)
  }
  return items.sort(compareByDateDesc)
}

export function getPublishedMediaItems(): MediaItem[] {
  return getAllMediaItems().filter((item) => item.status !== 'draft')
}

function compareByDateDesc(a: MediaItem, b: MediaItem): number {
  const keyA = getMediaSortKey(a)
  const keyB = getMediaSortKey(b)
  if (keyA === keyB) return a.title.localeCompare(b.title)
  if (!keyA) return 1
  if (!keyB) return -1
  return keyB.localeCompare(keyA)
}

export function getMediaSortKey(item: MediaItem): string {
  if (item.publishedOn) return item.publishedOn
  if (item.publishedIn) return `${item.publishedIn}-01`
  if (item.publishedYear) return `${item.publishedYear}-01-01`
  return ''
}

export function getMediaYear(item: MediaItem): string | null {
  if (item.publishedOn) return item.publishedOn.slice(0, 4)
  if (item.publishedIn) return item.publishedIn.slice(0, 4)
  if (item.publishedYear) return item.publishedYear
  return null
}

export function formatMediaDate(item: MediaItem): string {
  if (item.publishedOn) {
    return DAY_FORMATTER.format(new Date(`${item.publishedOn}T00:00:00Z`))
  }
  if (item.publishedIn) {
    return MONTH_FORMATTER.format(new Date(`${item.publishedIn}-15T00:00:00Z`))
  }
  if (item.publishedYear) return item.publishedYear
  return 'Date not confirmed'
}

export function getMediaTypeLabel(item: MediaItem): string {
  if (item.formatLabel) return item.formatLabel
  switch (item.type) {
    case 'news':
      return 'News article'
    case 'interview':
      return 'Interview'
    case 'video':
      return 'Video'
    case 'report':
      return 'Report'
    case 'event':
      return 'Event'
  }
}

export function getMediaLinkLabel(item: MediaItem): string {
  if (item.linkLabel) return item.linkLabel
  switch (item.type) {
    case 'video':
      return 'Watch the recording'
    case 'report':
      return 'Read the report'
    case 'event':
      return 'Event details'
    case 'interview':
      return 'Listen to the interview'
    default:
      return 'Read original article'
  }
}

export const PRESS_CLIPPING_KINDS = ['clipping', 'page', 'photograph'] as const
export type PressClippingKind = (typeof PRESS_CLIPPING_KINDS)[number]

export interface PressClipping {
  id: string
  image: string
  alt: string
  kind: PressClippingKind
  outlet?: string
  headline: string
  description: string
  /** Full date, ISO `YYYY-MM-DD`. Only set when the exact day is known. */
  publishedOn?: string
  /** Month precision, `YYYY-MM`. Only set when the day is unknown. */
  publishedIn?: string
  /** Year precision, `YYYY`. Only set when the month is unknown. */
  publishedYear?: string
  /** External article URL, when the clipping can be read online. */
  url?: string
  relatedMediaId?: string
  note?: string
}

function isValidPressClippingKind(value: unknown): value is PressClippingKind {
  return typeof value === 'string' && (PRESS_CLIPPING_KINDS as readonly string[]).includes(value)
}

function isNewsImagePath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\/news-image\/[A-Za-z0-9._-]+\.(jpe?g|png|webp|avif)$/i.test(value.trim())
  )
}

function parsePressClipping(value: unknown): PressClipping | null {
  if (!isRecord(value)) return null

  const id = asTrimmedString(value.id)
  const headline = asTrimmedString(value.headline)
  const description = asTrimmedString(value.description)
  const alt = asTrimmedString(value.alt)
  if (!id || !headline || !description || !alt || !isNewsImagePath(value.image)) return null
  if (!isValidPressClippingKind(value.kind)) return null

  const publishedOn =
    typeof value.publishedOn === 'string' && isValidDay(value.publishedOn) ? value.publishedOn : undefined
  const publishedIn =
    typeof value.publishedIn === 'string' && isValidMonth(value.publishedIn) ? value.publishedIn : undefined
  const publishedYear =
    typeof value.publishedYear === 'string' && isValidYear(value.publishedYear) ? value.publishedYear : undefined

  return {
    id,
    image: value.image.trim(),
    alt,
    kind: value.kind,
    outlet: asTrimmedString(value.outlet),
    headline,
    description,
    publishedOn,
    publishedIn: publishedOn ? undefined : publishedIn,
    publishedYear: publishedOn || publishedIn ? undefined : publishedYear,
    url: isSafeExternalUrl(value.url) ? value.url : undefined,
    relatedMediaId: asTrimmedString(value.relatedMediaId),
    note: asTrimmedString(value.note),
  }
}

function getPressClippingSortKey(clipping: PressClipping): string {
  if (clipping.publishedOn) return clipping.publishedOn
  if (clipping.publishedIn) return `${clipping.publishedIn}-01`
  if (clipping.publishedYear) return `${clipping.publishedYear}-01-01`
  return ''
}

export function getPressClippings(): PressClipping[] {
  if (!Array.isArray(pressClippingsData)) return []
  const clippings: PressClipping[] = []
  for (const entry of pressClippingsData) {
    const parsed = parsePressClipping(entry)
    if (parsed) clippings.push(parsed)
  }
  return clippings.sort((a, b) => {
    const keyA = getPressClippingSortKey(a)
    const keyB = getPressClippingSortKey(b)
    if (keyA === keyB) return a.headline.localeCompare(b.headline)
    if (!keyA) return 1
    if (!keyB) return -1
    return keyB.localeCompare(keyA)
  })
}

export function formatPressClippingDate(clipping: PressClipping): string {
  if (clipping.publishedOn) {
    return DAY_FORMATTER.format(new Date(`${clipping.publishedOn}T00:00:00Z`))
  }
  if (clipping.publishedIn) {
    return MONTH_FORMATTER.format(new Date(`${clipping.publishedIn}-15T00:00:00Z`))
  }
  if (clipping.publishedYear) return clipping.publishedYear
  return ''
}

export function getPressClippingKindLabel(kind: PressClippingKind): string {
  switch (kind) {
    case 'clipping':
      return 'Article clipping'
    case 'page':
      return 'Newspaper page'
    case 'photograph':
      return 'Archive photograph'
  }
}
