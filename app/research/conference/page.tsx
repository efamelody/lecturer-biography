import type { Metadata } from 'next'
import ConferenceTalks from '@/components/ConferenceTalks'

const pageTitle = 'Conference Presentations'
const pageDescription =
  'Plenary, invited speaker and conference presentations by Prof. Dr. Mohd Talib Latif.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/research/conference',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: '/research/conference',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function ConferenceTalksPage() {
  return <ConferenceTalks />
}
