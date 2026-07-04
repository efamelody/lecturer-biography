import { type NextRequest, NextResponse } from 'next/server'
import { saveGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/gallery'

const validTypes = ['news-interview', 'newspaper', 'conference', 'media-coverage']

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get('password')
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { getGallery } = await import('@/lib/gallery')
  const items = await getGallery()
  return NextResponse.json({ items })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, title, type, outlet, eventDate, externalUrl, description, imageUrl } = body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!title || !type || !outlet || !eventDate || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const result = await saveGalleryItem({
      password,
      title,
      type,
      outlet,
      eventDate,
      externalUrl: typeof externalUrl === 'string' && externalUrl.length > 0 ? externalUrl : undefined,
      description: typeof description === 'string' && description.length > 0 ? description : undefined,
      imageUrl,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, _id, title, type, outlet, eventDate, externalUrl, description, imageUrl } = body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!_id || !title || !type || !outlet || !eventDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    await updateGalleryItem(_id, {
      title,
      type,
      outlet,
      eventDate,
      externalUrl: typeof externalUrl === 'string' && externalUrl.length > 0 ? externalUrl : undefined,
      description: typeof description === 'string' && description.length > 0 ? description : undefined,
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const password = request.nextUrl.searchParams.get('password')
    const id = request.nextUrl.searchParams.get('id')

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    await deleteGalleryItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
  }
}
