import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { isAuthorized, getRequestPassword } from '@/lib/auth'

const MAX_BYTES = 5 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const formPassword = formData.get('password') as string | null
    const file = formData.get('file') as File | null
    const headerPassword = getRequestPassword(request, null)
    const password = formPassword || headerPassword

    if (!isAuthorized(request, formPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    void password

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are accepted' }, { status: 400 })
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `images/${Date.now()}-${safeName}`

    const blob = await put(filename, file, {
      access: 'private',
      addRandomSuffix: true,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
