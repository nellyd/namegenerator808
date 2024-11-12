import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '../components/Navbar';
import GeneratorLinks from '../components/GeneratorLinks';
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
  title: "NameGeno",
  description: "Generate perfect names for any purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="-ludGR0bVl1CDppkz_tkLRDETJdVqniSb9fFGpKIZ-Y" />
      <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SSKKQH05XJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SSKKQH05XJ');
</script>

        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    

        <Navbar />
        <main>
          {children}
          <GeneratorLinks />
        </main>
      </body>
    </html>
  );
}
