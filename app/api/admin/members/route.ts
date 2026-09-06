import { type NextRequest, NextResponse } from 'next/server'
import { getMembers, saveMember, updateMember, deleteMember } from '@/lib/members'
import { isAuthorized } from '@/lib/auth'

function parseOrder(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN - set in Cloudflare/Vercel env' }, { status: 500 })
  }
  try {
    const members = await getMembers()
    return NextResponse.json({ members })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to load members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN - set in Cloudflare/Vercel env' }, { status: 500 })
  }
  try {
    const body = await request.json()
    const { password, name, role, status, researchTopic, biography, order, imageUrl } = body

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const trimmedName = typeof name === 'string' ? name.trim() : ''
    const trimmedRole = typeof role === 'string' ? role.trim() : ''
    if (!trimmedName || !trimmedRole || !status) {
      return NextResponse.json({ error: 'Name, role and status are required' }, { status: 400 })
    }

    if (status !== 'member' && status !== 'alumni') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    if (typeof imageUrl === 'string' && imageUrl.length > 0) {
      try { new URL(imageUrl) } catch { /* allow proxy path */ }
    }

    const result = await saveMember({
      name: trimmedName,
      role: trimmedRole,
      status,
      researchTopic: typeof researchTopic === 'string' && researchTopic.trim().length > 0 ? researchTopic.trim() : undefined,
      biography: typeof biography === 'string' && biography.trim().length > 0 ? biography.trim() : undefined,
      order: parseOrder(order),
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to save member:', error)
    return NextResponse.json({ error: 'Failed to save member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Missing BLOB_READ_WRITE_TOKEN' }, { status: 500 })
  }
  try {
    const body = await request.json()
    const { password, _id, name, role, status, researchTopic, biography, order, imageUrl } = body

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const trimmedName = typeof name === 'string' ? name.trim() : ''
    const trimmedRole = typeof role === 'string' ? role.trim() : ''
    if (!_id || !trimmedName || !trimmedRole || !status) {
      return NextResponse.json({ error: 'Name, role and status are required' }, { status: 400 })
    }

    if (status !== 'member' && status !== 'alumni') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await updateMember(_id, {
      name: trimmedName,
      role: trimmedRole,
      status,
      researchTopic: typeof researchTopic === 'string' && researchTopic.trim().length > 0 ? researchTopic.trim() : undefined,
      biography: typeof biography === 'string' && biography.trim().length > 0 ? biography.trim() : undefined,
      order: parseOrder(order),
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update member:', error)
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
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
      return NextResponse.json({ error: 'Missing member id' }, { status: 400 })
    }

    await deleteMember(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete member:', error)
    const message = error instanceof Error ? error.message : 'Failed to delete member'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
