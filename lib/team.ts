import 'server-only'
import teamData from '@/content/team.json'
import { getMembers } from '@/lib/members'
import type { Member } from '@/lib/members'
import { getContent } from '@/lib/content'
import type { TeamMember, TeamPageContent } from '@/lib/team-types'

const data = teamData as Omit<TeamPageContent, 'contact'> & {
  contact: Pick<TeamPageContent['contact'], 'heading' | 'description' | 'note'>
}

function normaliseName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function memberToTeamMember(member: Member): TeamMember {
  return {
    id: member._id,
    name: member.name,
    role: member.role,
    description: member.biography,
    researchTitle: member.researchTopic,
    interests: [],
    image: member.imageUrl,
  }
}

function appendDynamicMembers(
  curated: TeamMember[],
  dynamic: TeamMember[],
): TeamMember[] {
  const known = new Set(curated.map((member) => normaliseName(member.name)))
  const additions = dynamic.filter(
    (member) => !known.has(normaliseName(member.name)),
  )
  return [...curated, ...additions]
}

export async function getTeamPageContent(): Promise<TeamPageContent> {
  const contactData = await getContent('contact')

  let dynamicMembers: Member[] = []
  try {
    dynamicMembers = await getMembers()
  } catch (error) {
    console.error('[team] Could not load member records from the content store:', error)
  }

  const currentMembers = dynamicMembers
    .filter((member) => member.status === 'member')
    .map(memberToTeamMember)
  const alumniMembers = dynamicMembers
    .filter((member) => member.status === 'alumni')
    .map(memberToTeamMember)

  const address = contactData?.address ?? {}
  const addressLines = [
    address.line1,
    address.line2,
    address.line3,
    address.line4,
    address.line5,
  ].filter((line): line is string => typeof line === 'string' && line.length > 0)

  return {
    intro: data.intro,
    leader: data.leader,
    staff: data.staff,
    postgraduates: appendDynamicMembers(data.postgraduates, currentMembers),
    alumni: appendDynamicMembers(data.alumni, alumniMembers),
    contact: {
      ...data.contact,
      email: contactData?.email ?? '',
      addressLines,
    },
  }
}
