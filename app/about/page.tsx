import type { Metadata } from 'next'
import ProfileContent from '@/components/about/ProfileContent'

const pageTitle = 'About'
const pageDescription =
  'Biography, current roles, fields of expertise and qualifications of Prof. Dr. Mohd Talib Latif, Professor of Atmospheric Chemistry and Air Pollution at Universiti Kebangsaan Malaysia.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/about',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/about',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'profile',
  },
}

export default function AboutPage() {
  return <ProfileContent />
}
