'use client';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import StyledComponentsRegistry from '@/lib/registry';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'jvn4blog',
//   description: "Welcome to Chung Seongjun's blog!",
//   viewport:
//     'width=device-width, initial-scale=1, shrink-to-fit=no, maximum--scale=5',
//   icons: '/favicon.ico',
//   openGraph: {
//     type: 'website',
//     locale: 'ko_KR',
//   },
//   other: {
//     charset: 'utf8',
//   },
// };

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ko-KR">
        <StyledComponentsRegistry>
          <body>
            <main className={inter.className}>
              <Navbar />
              {children}
              <Footer />
              <GlobalStyle />
            </main>
          </body>
        </StyledComponentsRegistry>
      </html>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body, textarea {
    padding: 0;
    margin: 0;
  }

  * {
      box-sizing: border-box;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    transition: .25s;
      color: #000;
  }

  ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
