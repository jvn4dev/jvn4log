import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum--scale=5"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>jvn4blog</title>
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyle />
      <main className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
      <Analytics />
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
