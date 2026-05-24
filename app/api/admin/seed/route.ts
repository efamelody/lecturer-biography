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

const sectionFiles: Record<string, string> = {
  profile: 'profile.json',
  research: 'research.json',
  awards: 'awards.json',
  affiliations: 'affiliations.json',
  contact: 'contact.json',
  'selected-publications': 'selected-publications.json',
  members: 'members.json',
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const fs = await import('fs')
    const path = await import('path')
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const results: Record<string, string> = {}

    for (const [section, filename] of Object.entries(sectionFiles)) {
      try {
        const filePath = path.join(process.cwd(), 'content', filename)
        const raw = fs.readFileSync(filePath, 'utf-8')
        const data = JSON.parse(raw)
        await db.collection(COLLECTION).updateOne(
          { section },
          { $set: { section, data, updatedAt: new Date() } },
          { upsert: true }
        )
        results[section] = 'ok'
      } catch (e) {
        results[section] = `error: ${(e as Error).message}`
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Error seeding data:', error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}
