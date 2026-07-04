import 'server-only'
import { put, get, del } from '@vercel/blob'

export interface GalleryItem {
  _id: string
  title: string
  type: 'news-interview' | 'newspaper' | 'conference' | 'media-coverage'
  outlet: string
  eventDate: string
  externalUrl?: string
  description?: string
  imageUrl: string
}

function parseGalleryItem(item: Record<string, unknown>): GalleryItem | null {
  if (
    typeof item._id !== 'string' ||
    typeof item.title !== 'string' ||
    typeof item.type !== 'string' ||
    typeof item.outlet !== 'string' ||
    typeof item.eventDate !== 'string' ||
    typeof item.imageUrl !== 'string'
  ) {
    return null
  }
  return {
    _id: item._id,
    title: item.title,
    type: item.type as GalleryItem['type'],
    outlet: item.outlet,
    eventDate: item.eventDate,
    externalUrl: typeof item.externalUrl === 'string' ? item.externalUrl : undefined,
    description: typeof item.description === 'string' ? item.description : undefined,
    imageUrl: privateBlobUrlToProxy(item.imageUrl),
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const result = await get('gallery.json', { access: 'private' })

    if (!result) return []

    const text = await new Response(result.stream).text()
    const data: unknown = JSON.parse(text)

    if (!Array.isArray(data)) {
      console.error('Gallery blob data is not an array')
      return []
    }

    const items: GalleryItem[] = []
    for (const item of data) {
      if (typeof item === 'object' && item !== null) {
        const parsed = parseGalleryItem(item as Record<string, unknown>)
        if (parsed) {
          items.push(parsed)
        }
      }
    }

    items.sort((a, b) => b.eventDate.localeCompare(a.eventDate))
    return items
  } catch (error) {
    console.error('Failed to fetch gallery:', error)
    return []
  }
}

function privateBlobUrlToProxy(url: string): string {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.replace(/^\//, '')
    return `/api/blob?pathname=${encodeURIComponent(pathname)}`
  } catch {
    return url
  }
}

function extractBlobPathname(imageUrl: string): string | undefined {
  try {
    if (imageUrl.startsWith('/api/blob?pathname=')) {
      const qs = imageUrl.split('?')[1]
      return new URLSearchParams(qs).get('pathname') ?? undefined
    }
    const parsed = new URL(imageUrl)
    return parsed.pathname.replace(/^\//, '')
  } catch {
    return undefined
  }
}

export async function updateGalleryItem(
  id: string,
  data: Omit<GalleryItem, '_id'>,
): Promise<{ success: true }> {
  const existing = await getGallery()

  const updated = existing.map((item) =>
    item._id === id
      ? {
          ...item,
          title: data.title,
          type: data.type,
          outlet: data.outlet,
          eventDate: data.eventDate,
          externalUrl: data.externalUrl || undefined,
          description: data.description || undefined,
          imageUrl: data.imageUrl ? privateBlobUrlToProxy(data.imageUrl) : item.imageUrl,
        }
      : item,
  )

  updated.sort((a, b) => b.eventDate.localeCompare(a.eventDate))

  await put('gallery.json', JSON.stringify(updated, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true }
}

export async function deleteGalleryItem(id: string): Promise<{ success: true }> {
  const existing = await getGallery()

  if (existing.length === 0) {
    throw new Error('No gallery items found — aborting delete to prevent data loss')
  }

  const target = existing.find((item) => item._id === id)
  if (!target) {
    throw new Error(`Gallery item ${id} not found`)
  }

  if (target.imageUrl) {
    try {
      const pathname = extractBlobPathname(target.imageUrl)
      if (pathname) {
        await del(pathname)
        console.log(`[gallery] Deleted blob image: ${pathname}`)
      }
    } catch (err) {
      console.error('[gallery] Failed to delete blob image, continuing:', err)
    }
  }

  const updated = existing.filter((item) => item._id !== id)

  await put('gallery.json', JSON.stringify(updated, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true }
}

export async function saveGalleryItem(
  item: Omit<GalleryItem, '_id'> & { password: string }
): Promise<{ success: true; id: string }> {
  const existing = await getGallery()

  const newItem: GalleryItem = {
    _id: crypto.randomUUID(),
    title: item.title,
    type: item.type,
    outlet: item.outlet,
    eventDate: item.eventDate,
    externalUrl: item.externalUrl,
    description: item.description,
    imageUrl: privateBlobUrlToProxy(item.imageUrl),
  }

  const updated = [...existing, newItem]
  updated.sort((a, b) => b.eventDate.localeCompare(a.eventDate))

  const json = JSON.stringify(updated, null, 2)

  await put('gallery.json', json, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true, id: newItem._id }
}
