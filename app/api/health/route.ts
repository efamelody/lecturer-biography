import { NextResponse } from 'next/server'
import { get } from '@vercel/blob'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, unknown> = {
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    hasBlobStoreId: !!process.env.BLOB_STORE_ID,
    nodeEnv: process.env.NODE_ENV,
  }

  let blobCheck: Record<string, unknown> = { status: 'skipped', reason: 'no token' }
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const gallery = await get('gallery.json', { access: 'private' })
      const members = await get('members.json', { access: 'private' })
      let galleryCount: number | string = 'no file'
      let membersCount: number | string = 'no file'
      if (gallery) {
        const text = await new Response(gallery.stream).text()
        const data = JSON.parse(text)
        galleryCount = Array.isArray(data) ? data.length : 'invalid'
      }
      if (members) {
        const text = await new Response(members.stream).text()
        const data = JSON.parse(text)
        membersCount = Array.isArray(data) ? data.length : 'invalid'
      }
      blobCheck = { status: 'ok', galleryCount, membersCount }
    } catch (e) {
      blobCheck = { status: 'error', error: e instanceof Error ? e.message : String(e) }
    }
  }

  return NextResponse.json({ ...checks, blob: blobCheck, timestamp: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store' } })
}
