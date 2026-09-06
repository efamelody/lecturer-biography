import { type NextRequest, NextResponse } from 'next/server'
import { saveGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/gallery'
import { isAuthorized } from '@/lib/auth'

const validTypes = ['news-interview', 'newspaper', 'conference', 'media-coverage'] as const

function isValidUrl(value: string): boolean {
  try { new URL(value); return true } catch { return false }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN - set in Cloudflare/Vercel env' }, { status: 500 })
  }
  try {
    const { getGallery } = await import('@/lib/gallery')
    const items = await getGallery()
    return NextResponse.json({ items })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to load gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN - set in Cloudflare/Vercel env' }, { status: 500 })
  }
  try {
    const body = await request.json()
    const { password, title, type, outlet, eventDate, externalUrl, description, imageUrl } = body

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const t = typeof title === 'string' ? title.trim() : ''
    const o = typeof outlet === 'string' ? outlet.trim() : ''
    if (!t || !type || !o || !eventDate || !imageUrl) {
      return NextResponse.json({ error: 'Title, category, source, date and photo are required' }, { status: 400 })
    }

    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    if (externalUrl && typeof externalUrl === 'string' && externalUrl.length > 0 && !isValidUrl(externalUrl)) {
      return NextResponse.json({ error: 'Reference URL must be a valid URL' }, { status: 400 })
    }

    const result = await saveGalleryItem({
      title: t,
      type,
      outlet: o,
      eventDate,
      externalUrl: typeof externalUrl === 'string' && externalUrl.length > 0 ? externalUrl : undefined,
      description: typeof description === 'string' && description.length > 0 ? description.trim() : undefined,
      imageUrl,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN' }, { status: 500 })
  }
  try {
    const body = await request.json()
    const { password, _id, title, type, outlet, eventDate, externalUrl, description, imageUrl } = body

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const t = typeof title === 'string' ? title.trim() : ''
    const o = typeof outlet === 'string' ? outlet.trim() : ''
    if (!_id || !t || !type || !o || !eventDate) {
      return NextResponse.json({ error: 'Title, category, source and date are required' }, { status: 400 })
    }

    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    if (externalUrl && typeof externalUrl === 'string' && externalUrl.length > 0 && !isValidUrl(externalUrl)) {
      return NextResponse.json({ error: 'Reference URL must be a valid URL' }, { status: 400 })
    }

    await updateGalleryItem(_id, {
      title: t,
      type,
      outlet: o,
      eventDate,
      externalUrl: typeof externalUrl === 'string' && externalUrl.length > 0 ? externalUrl : undefined,
      description: typeof description === 'string' && description.length > 0 ? description.trim() : undefined,
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN' }, { status: 500 })
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const id = request.nextUrl.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    await deleteGalleryItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    const message = error instanceof Error ? error.message : 'Failed to delete entry'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
