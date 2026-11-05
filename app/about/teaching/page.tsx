import type { Metadata } from 'next'
import TeachingContent from '@/components/about/TeachingContent'

const pageTitle = 'Teaching & Education'
const pageDescription =
  'Courses taught and postgraduate supervision record of Prof. Dr. Mohd Talib Latif at Universiti Kebangsaan Malaysia, including PhD theses completed and in progress.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/about/teaching',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: '/about/teaching',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function AboutTeachingPage() {
  return <TeachingContent />
}
