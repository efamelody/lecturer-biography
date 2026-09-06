import { NextResponse } from 'next/server'
import { getMembers } from '@/lib/members'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const members = await getMembers()
    return NextResponse.json({ members })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to load members' }, { status: 500 })
  }
}
