import type { Metadata } from 'next'
import CareerContent from '@/components/about/CareerContent'

const pageTitle = 'Career & Recognition'
const pageDescription =
  'Academic career, administrative and management roles, other appointments, professional service, editorial boards and awards of Prof. Dr. Mohd Talib Latif at Universiti Kebangsaan Malaysia.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/about/career',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: '/about/career',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function AboutCareerPage() {
  return <CareerContent />
}
