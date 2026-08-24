import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const metadata: Metadata = {
  title: 'Bayu Setiaji — Graphic Designer & Software Engineer',
  description: 'Portfolio of Bayu Setiaji: Graphic Designer at Mercure Karawang (Accor Group) & Content Producer at Cue Corner Billiard Distributor.',
  keywords: [
    'Bayu Setiaji',
    'Graphic Designer Karawang',
    'Mercure Karawang',
    'Cue Corner',
    'Distributor Billiard',
    'Video Editing',
    'Scriptwriting',
    'Laravel',
    'Software Engineer'
  ],
  authors: [{ name: 'Bayu Setiaji' }],
  openGraph: {
    title: 'Bayu Setiaji — Graphic Designer & Content Producer',
    description: 'Graphic Designer focused on modern, clean, and impactful visual identity.',
    url: 'http://portofolioibay.free.nf',
    siteName: 'Bayu Setiaji Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-black text-white selection:bg-white selection:text-black">
        <PortfolioProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </PortfolioProvider>
      </body>
    </html>
  );
}
