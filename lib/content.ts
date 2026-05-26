import 'server-only'
import { getMembers } from '@/sanity/lib'
import profileData from '@/content/profile.json'
import awardsData from '@/content/awards.json'
import affiliationsData from '@/content/affiliations.json'
import contactData from '@/content/contact.json'

export interface Member {
  _id: string
  name: string
  role: string
  status: 'member' | 'alumni'
  researchTopic?: string
  biography?: string
  order?: number
}

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
