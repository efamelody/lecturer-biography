import 'server-only'
import researchData from '@/content/research.json'

export interface ResearchTheme {
  slug: string
  title: string
  summary: string
  description: string
  keywords: string[]
  image: string
}

export interface ResearchProject {
  id: string
  title: string
  funder: string
  scheme: string
  period: string
  startYear: number
  endYear: number
  scope: 'International' | 'National' | 'Internal'
  role: string
  amount: number
  currency: string
  status: string
  themes: string[]
  summary: string
}

export interface ResearchImpact {
  title: string
  description: string
}

export interface ResearchContent {
  intro: {
    eyebrow: string
    heading: string
    description: string
  }
  themes: ResearchTheme[]
  projects: ResearchProject[]
  impact: ResearchImpact[]
  collaborations: string[]
}

const research = researchData as ResearchContent

export function getResearchContent(): ResearchContent {
  return research
}

export function getResearchTheme(slug: string): ResearchTheme | undefined {
  return research.themes.find((theme) => theme.slug === slug)
}

export function getFeaturedProjects(limit = 3): ResearchProject[] {
  const preferred = [
    'fcdo-forecasting-2023',
    'apn-covid-2021',
    'asean-india-haze-2019',
    'frgs-pops-2024',
    'ted-airboxsense-2021',
  ]

  const featured = preferred
    .map((id) => research.projects.find((project) => project.id === id))
    .filter((project): project is ResearchProject => Boolean(project))

  return featured.slice(0, limit)
}

export function getProjectsByScope(scope: ResearchProject['scope']): ResearchProject[] {
  return research.projects.filter((project) => project.scope === scope)
}

export function formatProjectAmount(project: ResearchProject): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: project.currency,
    maximumFractionDigits: 0,
  }).format(project.amount)
}
