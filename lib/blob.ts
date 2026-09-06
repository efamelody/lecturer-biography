export function privateBlobUrlToProxy(url: string): string {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.replace(/^\//, '')
    return `/api/blob?pathname=${encodeURIComponent(pathname)}`
  } catch {
    return url
  }
}

export function extractBlobPathname(imageUrl: string): string | undefined {
  try {
    if (imageUrl.startsWith('/api/blob?pathname=')) {
      const qs = imageUrl.split('?')[1]
      return new URLSearchParams(qs).get('pathname') ?? undefined
    }
    const parsed = new URL(imageUrl)
    return parsed.pathname.replace(/^\//, '')
  } catch {
    return undefined
  }
}

export function isValidOrder(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}
