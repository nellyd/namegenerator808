import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Band Name Generator",
  description:
    "Generate cool, original band names for rock, metal, indie, punk and more. Find the perfect name for your new band in seconds.",
  keywords: "",
  alternates: {
    canonical: "/band-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/band-name-generator",
    title: "Band Name Generator",
    description: "Generate cool, original band names for rock, metal, indie, punk and more. Find the perfect name for your new band in seconds.",
  },
  twitter: {
    card: "summary",
    title: "Band Name Generator",
    description: "Generate cool, original band names for rock, metal, indie, punk and more. Find the perfect name for your new band in seconds.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}