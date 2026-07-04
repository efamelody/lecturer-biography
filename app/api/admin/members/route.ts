import { type NextRequest, NextResponse } from 'next/server'
import { getMembers, saveMember, updateMember, deleteMember } from '@/lib/members'

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get('password')
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const members = await getMembers()
  return NextResponse.json({ members })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, name, role, status, researchTopic, biography, order, imageUrl } = body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!name || !role || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (status !== 'member' && status !== 'alumni') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const result = await saveMember({
      name,
      role,
      status,
      researchTopic: typeof researchTopic === 'string' && researchTopic.length > 0 ? researchTopic : undefined,
      biography: typeof biography === 'string' && biography.length > 0 ? biography : undefined,
      order: typeof order === 'number' ? order : undefined,
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to save member:', error)
    return NextResponse.json({ error: 'Failed to save member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, _id, name, role, status, researchTopic, biography, order, imageUrl } = body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!_id || !name || !role || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (status !== 'member' && status !== 'alumni') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await updateMember(_id, {
      name,
      role,
      status,
      researchTopic: typeof researchTopic === 'string' && researchTopic.length > 0 ? researchTopic : undefined,
      biography: typeof biography === 'string' && biography.length > 0 ? biography : undefined,
      order: typeof order === 'number' ? order : undefined,
      imageUrl: typeof imageUrl === 'string' && imageUrl.length > 0 ? imageUrl : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update member:', error)
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
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
      return NextResponse.json({ error: 'Missing member id' }, { status: 400 })
    }

    await deleteMember(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete member:', error)
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 })
  }
}
