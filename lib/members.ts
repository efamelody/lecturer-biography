import 'server-only'
import { put, get, del } from '@vercel/blob'
import { privateBlobUrlToProxy, extractBlobPathname, isValidOrder } from '@/lib/blob'

export interface Member {
  _id: string
  name: string
  role: string
  status: 'member' | 'alumni'
  researchTopic?: string
  biography?: string
  order?: number
  imageUrl?: string
}

function parseMember(item: Record<string, unknown>): Member | null {
  if (
    typeof item._id !== 'string' ||
    typeof item.name !== 'string' ||
    typeof item.role !== 'string'
  ) {
    return null
  }
  const status = item.status
  if (status !== 'member' && status !== 'alumni') return null

  return {
    _id: item._id,
    name: item.name,
    role: item.role,
    status,
    researchTopic: typeof item.researchTopic === 'string' ? item.researchTopic : undefined,
    biography: typeof item.biography === 'string' ? item.biography : undefined,
    order: isValidOrder(item.order) ? item.order : undefined,
    imageUrl: typeof item.imageUrl === 'string' ? privateBlobUrlToProxy(item.imageUrl) : undefined,
  }
}

export async function getMembers(): Promise<Member[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[members] Missing BLOB_READ_WRITE_TOKEN - returning empty members. Set this env var in Cloudflare/Vercel dashboard.')
    return []
  }
  try {
    const result = await get('members.json', { access: 'private' })
    if (!result) return []

    const text = await new Response(result.stream).text()
    const data: unknown = JSON.parse(text)

    if (!Array.isArray(data)) {
      console.error('Members blob data is not an array')
      return []
    }

    const items: Member[] = []
    for (const item of data) {
      if (typeof item === 'object' && item !== null) {
        const parsed = parseMember(item as Record<string, unknown>)
        if (parsed) items.push(parsed)
      }
    }

    items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name))

    const memberCount = items.filter((m) => m.status === 'member').length
    const alumniCount = items.filter((m) => m.status === 'alumni').length
    console.log(`[members] getMembers: ${items.length} total (${memberCount} members, ${alumniCount} alumni)`)

    return items
  } catch (error) {
    console.error('[members] Failed to fetch members:', error)
    throw error
  }
}

export async function saveMember(
  member: Omit<Member, '_id'>,
): Promise<{ success: true; id: string }> {
  const existing = await getMembers()

  const newItem: Member = {
    _id: crypto.randomUUID(),
    name: member.name,
    role: member.role,
    status: member.status,
    researchTopic: member.researchTopic || undefined,
    biography: member.biography || undefined,
    order: isValidOrder(member.order) ? member.order : undefined,
    imageUrl: member.imageUrl ? privateBlobUrlToProxy(member.imageUrl) : undefined,
  }

  const updated = [...existing, newItem]
  updated.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name))

  await put('members.json', JSON.stringify(updated, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true, id: newItem._id }
}

export async function updateMember(
  id: string,
  data: Omit<Member, '_id'>,
): Promise<{ success: true }> {
  const existing = await getMembers()

  const updated = existing.map((m) =>
    m._id === id
      ? {
          ...m,
          name: data.name,
          role: data.role,
          status: data.status,
          researchTopic: data.researchTopic || undefined,
          biography: data.biography || undefined,
          order: isValidOrder(data.order) ? data.order : undefined,
          imageUrl: data.imageUrl ? privateBlobUrlToProxy(data.imageUrl) : m.imageUrl,
        }
      : m,
  )

  updated.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name))

  await put('members.json', JSON.stringify(updated, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true }
}

export async function deleteMember(id: string): Promise<{ success: true }> {
  const existing = await getMembers()

  if (existing.length === 0) {
    throw new Error('No members found — aborting delete to prevent data loss')
  }

  const target = existing.find((m) => m._id === id)
  if (!target) {
    throw new Error(`Member ${id} not found`)
  }

  if (target.imageUrl) {
    try {
      const pathname = extractBlobPathname(target.imageUrl)
      if (pathname) {
        await del(pathname)
        console.log(`[members] Deleted blob image: ${pathname}`)
      }
    } catch (err) {
      console.error('[members] Failed to delete blob image, continuing:', err)
    }
  }

  const updated = existing.filter((m) => m._id !== id)

  await put('members.json', JSON.stringify(updated, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { success: true }
}
