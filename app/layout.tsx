export const runtime = 'edge';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
  title: 'Prof. Dr. Mohd Talib Latif - Atmospheric Chemistry & Air Pollution Research',
  description:
    'Academic profile of Prof. Dr. Mohd Talib Latif, Professor of Atmospheric Chemistry at Universiti Kebangsaan Malaysia (UKM). Research in atmospheric aerosols, air quality, and environmental chemistry.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#f8fafc] text-[#334155] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
