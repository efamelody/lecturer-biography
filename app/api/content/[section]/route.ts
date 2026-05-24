import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const runtime = 'nodejs'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${ADMIN_PASSWORD}`
}

const DB_NAME = 'lecturer-biography'
const COLLECTION = 'sections'

const sectionFileMap: Record<string, string> = {
  profile: 'profile.json',
  research: 'research.json',
  awards: 'awards.json',
  affiliations: 'affiliations.json',
  contact: 'contact.json',
  'selected-publications': 'selected-publications.json',
  members: 'members.json',
}

async function getFromJsonFile(section: string) {
  try {
    const fs = await import('fs')
    const path = await import('path')
    const filename = sectionFileMap[section]
    if (!filename) return null
    const filePath = path.join(process.cwd(), 'content', filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const doc = await db.collection(COLLECTION).findOne({ section: params.section })
    if (doc) {
      return NextResponse.json(doc.data)
    }
  } catch {
    // MongoDB unavailable — fall through to JSON file
  }

  const fallback = await getFromJsonFile(params.section)
  if (fallback) {
    return NextResponse.json(fallback)
  }

  return NextResponse.json(null, { status: 404 })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const client = await clientPromise
    const db = client.db(DB_NAME)
    await db.collection(COLLECTION).updateOne(
      { section: params.section },
      { $set: { section: params.section, data, updatedAt: new Date() } },
      { upsert: true }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
