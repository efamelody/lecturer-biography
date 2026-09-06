import { NextResponse } from 'next/server'
import { getGallery } from '@/lib/gallery'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await getGallery()
    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to load gallery' }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
