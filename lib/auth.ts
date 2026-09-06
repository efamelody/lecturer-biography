import { type NextRequest } from 'next/server'

export function getRequestPassword(request: NextRequest, bodyPassword?: string | null): string | null {
  const header = request.headers.get('authorization')
  if (header?.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim()
  }
  const xAdmin = request.headers.get('x-admin-password')
  if (xAdmin) return xAdmin
  if (bodyPassword) return bodyPassword
  return request.nextUrl.searchParams.get('password')
}

export function isAuthorized(request: NextRequest, bodyPassword?: string | null): boolean {
  const pw = getRequestPassword(request, bodyPassword)
  return !!pw && !!process.env.ADMIN_PASSWORD && pw === process.env.ADMIN_PASSWORD
}
