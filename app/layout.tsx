export const runtime = 'edge';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://talib-latif.com'),
  title: {
    default: 'Prof. Dr. Mohd Talib Latif - Atmospheric Chemistry & Air Pollution Research',
    template: '%s | Prof. Dr. Mohd Talib Latif',
  },
  description:
    'Academic profile of Prof. Dr. Mohd Talib Latif, Professor of Atmospheric Chemistry and Air Pollution at Universiti Kebangsaan Malaysia (UKM), Director of the Institute of Climate Change, and President of MAAQR. Research in atmospheric aerosols, surface ozone, air quality, haze and climate.',
  authors: [{ name: 'Prof. Dr. Mohd Talib Latif' }],
  keywords: [
    'Mohd Talib Latif',
    'atmospheric chemistry',
    'air quality',
    'atmospheric aerosols',
    'surface ozone',
    'VOCs',
    'transboundary haze',
    'Universiti Kebangsaan Malaysia',
    'UKM',
    'climate change',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'profile',
    siteName: 'Prof. Dr. Mohd Talib Latif',
    title: 'Prof. Dr. Mohd Talib Latif - Atmospheric Chemistry & Air Pollution Research',
    description:
      'Professor of Atmospheric Chemistry and Air Pollution at Universiti Kebangsaan Malaysia. Research on atmospheric aerosols, air quality, haze and climate.',
    url: 'https://talib-latif.com',
    images: [{ url: '/profile.jpg', width: 768, height: 820, alt: 'Prof. Dr. Mohd Talib Latif' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prof. Dr. Mohd Talib Latif',
    description:
      'Professor of Atmospheric Chemistry and Air Pollution at Universiti Kebangsaan Malaysia.',
    images: ['/profile.jpg'],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#f8fafc] text-[#334155] antialiased font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Prof. Dr. Mohd Talib Latif',
              jobTitle: 'Professor of Atmospheric Chemistry and Air Pollution',
              affiliation: {
                '@type': 'Organization',
                name: 'Universiti Kebangsaan Malaysia',
                url: 'https://www.ukm.my',
              },
              email: 'mailto:talib@ukm.edu.my',
              url: 'https://talib-latif.com',
              sameAs: [
                'https://orcid.org/0000-0003-2339-3321',
                'https://www.scopus.com/authid/detail.uri?authorId=57218373467',
                'https://scholar.google.com/citations?user=dfDhReYAAAAJ&hl=en',
                'https://www.researchgate.net/profile/Mohd-Talib-Latif',
                'https://www.linkedin.com/in/mohd-talib-latif-18915073/',
                'https://ukm-atmosphere.com/',
              ],
              knowsAbout: [
                'Atmospheric chemistry',
                'Air quality',
                'Atmospheric aerosols',
                'Surface ozone',
                'Volatile organic compounds',
                'Transboundary haze',
                'Climate change',
              ],
            }),
          }}
        />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
