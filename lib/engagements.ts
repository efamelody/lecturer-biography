import 'server-only'
import engagementsData from '@/content/engagements.json'

export interface EngagementItem {
  id: string
  year: number
  date: string
  title: string
  event: string
  location: string
  format: string
  type: string
}

interface EngagementsContent {
  invited: EngagementItem[]
  presentations: EngagementItem[]
}

const engagements = engagementsData as EngagementsContent

export function getInvitedTalks(): EngagementItem[] {
  return [...engagements.invited].sort((a, b) => b.year - a.year)
}

export function getConferencePresentations(): EngagementItem[] {
  return [...engagements.presentations].sort((a, b) => b.year - a.year)
}

export function getEngagementCounts() {
  return {
    invited: engagements.invited.length,
    presentations: engagements.presentations.length,
    total: engagements.invited.length + engagements.presentations.length,
  }
}
