import 'server-only'
import { getMembers } from '@/lib/members'
import type { Member } from '@/lib/members'
import profileData from '@/content/profile.json'
import awardsData from '@/content/awards.json'
import affiliationsData from '@/content/affiliations.json'
import contactData from '@/content/contact.json'

const contentStore: Record<string, any> = {
  profile: profileData,
  awards: awardsData,
  affiliations: affiliationsData,
  contact: contactData,
}

export async function getContent(key: string) {
  return contentStore[key]
}

export async function getGroupMembers(): Promise<Member[]> {
  return getMembers()
}
