import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Name Generator",
  description: "Generate beautiful baby names instantly.",
  keywords: "",
  alternates: {
    canonical: "/baby-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/baby-name-generator",
    title: "Baby Name Generator",
    description: "Generate beautiful baby names instantly.",
  },
  twitter: {
    card: "summary",
    title: "Baby Name Generator",
    description: "Generate beautiful baby names instantly.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}