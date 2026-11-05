import type { Metadata } from 'next'
import ResearchGrants from '@/components/ResearchGrants'

const pageTitle = 'Research Grants'
const pageDescription =
  'International, national and university research grants led by Prof. Dr. Mohd Talib Latif.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/research/grants',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: '/research/grants',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function ResearchGrantsPage() {
  return <ResearchGrants />
}
