import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';

import './globals.css';

export const metadata: Metadata = {
  title: 'jvn4blog',
  description: 'Welcome to Next.js',
  openGraph: {
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <main className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </main>
      {/* FIXME: add Analytics for app Router */}
      {/*<Analytics />*/}
    </html>
  );
}
