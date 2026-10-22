import type { Metadata } from 'next'
import ResearchTeam from '@/components/ResearchTeam'
import { getTeamPageContent } from '@/lib/team'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const pageTitle = 'Research Team'
const pageDescription =
  'Meet the UKM Atmosphere research team: academic and research staff, postgraduate researchers and alumni working on atmospheric chemistry, air quality, climate processes and environmental sustainability.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
  },
}

export default async function MembersPage() {
  const content = await getTeamPageContent()
  return <ResearchTeam content={content} />
}
