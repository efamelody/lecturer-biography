import { get } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname')

  if (!pathname) {
    return NextResponse.json({ error: 'Missing pathname' }, { status: 400 })
  }

  try {
    const result = await get(pathname, { access: 'private' })

    if (!result) {
      return new NextResponse('Not found', { status: 404 })
    }

    return new NextResponse(result.stream, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': result.blob.contentType,
      },
    })
  } catch (error) {
    console.error(`[blob] Failed to serve blob pathname="${pathname}":`, error)
    const message = error instanceof Error ? error.message : 'Failed to fetch blob'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
