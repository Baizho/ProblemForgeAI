import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Competitive Programming Problem Generator",
  description: "Generate problems using codeforces polygon and AI",
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
      <body className={`${inter.className} ${libre.className} ${rubi.className} ${syne.className} ${raleway.className} `}>
        {children}

      </body>
    </html>
  );
}
