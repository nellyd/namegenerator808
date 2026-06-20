// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '../components/Navbar';
import GeneratorLinks from '../components/GeneratorLinks';
import JsonLd from '../components/JsonLd';
import { siteSchema } from '../lib/structuredData';
import Script from 'next/script';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://namegeno.com"),
  title: {
    default: "NameGeno: Free Name Generators for Every Purpose",
    template: "%s | NameGeno",
  },
  description:
    "Free name generators for babies, pets, characters, businesses, gamers and more. Generate unique, creative names instantly with NameGeno.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/",
    title: "NameGeno: Free Name Generators for Every Purpose",
    description:
      "Free name generators for babies, pets, characters, businesses, gamers and more. Generate unique, creative names instantly.",
  },
  twitter: {
    card: "summary",
    title: "NameGeno: Free Name Generators for Every Purpose",
    description:
      "Free name generators for babies, pets, characters, businesses, gamers and more.",
  },
  verification: {
    google: "-ludGR0bVl1CDppkz_tkLRDETJdVqniSb9fFGpKIZ-Y",
  },
  other: {
    'google-adsense-account': 'ca-pub-2870942440693656',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={siteSchema()} />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSKKQH05XJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSKKQH05XJ');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2870942440693656"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Navbar />
        <main>
          {children}
          <GeneratorLinks />
        </main>
      </body>
    </html>
  );
}