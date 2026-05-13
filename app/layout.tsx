export const runtime = 'edge';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prof. Your Name - Academic Profile',
  description: 'Academic personal website showcasing research, publications, and achievements.',
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
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
