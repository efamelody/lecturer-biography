import type { Metadata } from 'next'
import SelectedPublications from '@/components/SelectedPublicationsComponent'

const pageTitle = 'Publications'
const pageDescription =
  'Journal articles, conference proceedings and books by Prof. Dr. Mohd Talib Latif. Journal records are verified against Scopus and ORCID; proceedings and books are transcribed from the CV.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://talib-latif.com/publications',
  },
  openGraph: {
    title: `${pageTitle} | Prof. Dr. Mohd Talib Latif`,
    description: pageDescription,
    url: 'https://talib-latif.com/publications',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    type: 'website',
  },
}

export default function PublicationsPage() {
  return <SelectedPublications />
}
