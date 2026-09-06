import { NextResponse } from 'next/server'
import { getGallery } from '@/lib/gallery'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await getGallery()
    return NextResponse.json({ items })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to load gallery' }, { status: 500 })
  }
}
