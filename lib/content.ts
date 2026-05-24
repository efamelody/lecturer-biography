import profileFallback from '@/content/profile.json'
import researchFallback from '@/content/research.json'
import awardsFallback from '@/content/awards.json'
import affiliationsFallback from '@/content/affiliations.json'
import contactFallback from '@/content/contact.json'
import selectedPubFallback from '@/content/selected-publications.json'
import membersFallback from '@/content/members.json'

const fallbacks: Record<string, unknown> = {
  profile: profileFallback,
  research: researchFallback,
  awards: awardsFallback,
  affiliations: affiliationsFallback,
  contact: contactFallback,
  'selected-publications': selectedPubFallback,
  members: membersFallback,
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function getContent(section: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/content/${section}`, {
      next: { revalidate: 0 },
    })
    if (res.ok) return res.json()
  } catch {
    // fetch failed — use fallback
  }
  return fallbacks[section] ?? null
}
