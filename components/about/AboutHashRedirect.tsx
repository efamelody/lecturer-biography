'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CAREER_ANCHORS = new Set([
  'career',
  'leadership',
  'awards',
  'reputation',
  'teaching',
  'service',
  'download',
])

export default function AboutHashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && CAREER_ANCHORS.has(hash)) {
      router.replace(`/about/career#${hash}`)
    }
  }, [router])

  return null
}
