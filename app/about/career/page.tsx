import type { Metadata } from 'next'
import CareerContent from '@/components/about/CareerContent'

const pageTitle = 'Career & Recognition'
const pageDescription =
  'Academic career, leadership roles, awards, research metrics, teaching and professional service of Prof. Dr. Mohd Talib Latif at Universiti Kebangsaan Malaysia.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/about/career',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/about/career',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function AboutCareerPage() {
  return <CareerContent />
}
