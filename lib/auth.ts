import { type NextRequest } from 'next/server'

function normalize(value: string): string {
  return value.trim().replace(/^["']|["']$/g, '')
}

export function getRequestPassword(request: NextRequest, bodyPassword?: string | null): string | null {
  const header = request.headers.get('authorization')
  if (header?.toLowerCase().startsWith('bearer ')) {
    return normalize(header.slice(7))
  }
  const xAdmin = request.headers.get('x-admin-password')
  if (xAdmin) return normalize(xAdmin)
  if (bodyPassword) return normalize(bodyPassword)
  const qs = request.nextUrl.searchParams.get('password')
  return qs ? normalize(qs) : null
}

export function isAuthorized(request: NextRequest, bodyPassword?: string | null): boolean {
  const pw = getRequestPassword(request, bodyPassword)
  const envPw = process.env.ADMIN_PASSWORD ? normalize(process.env.ADMIN_PASSWORD) : ''
  return !!pw && !!envPw && pw === envPw
}
