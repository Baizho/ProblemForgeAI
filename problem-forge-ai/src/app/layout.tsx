import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Competitive Programming Problem Generator",
  description: "Generate problems using codeforces polygon and AI",
  icons: {
    icon: '/logoOlympath Icon.png', // /public/favicon.ico
    // or
    // icon: [
    //   { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    //   { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    // ],
  },
};

import { Libre_Franklin } from 'next/font/google'
import { Rubik } from 'next/font/google'
import Script from "next/script";

const libre = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
})

const rubi = Rubik({
  subsets: ['latin'],
  display: 'swap',
})

import { Raleway } from 'next/font/google';
import { Syne } from "next/font/google";
import Head from "next/head";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'], // Specify the weights you want to use
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} ${libre.className} ${rubi.className} ${syne.className} ${raleway.className} `}>
        {children}
        <Analytics />

      </body>
    </html>
  );
}
