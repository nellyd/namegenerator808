import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Name Generator",
  description: "Discover the perfect first name for characters, babies, or profiles. Generate names across cultures and styles to find the ideal match.",
  keywords: "",
  alternates: {
    canonical: "/first-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/first-name-generator",
    title: "First Name Generator",
    description: "Discover the perfect first name for characters, babies, or profiles. Generate names across cultures and styles to find the ideal match.",
  },
  twitter: {
    card: "summary",
    title: "First Name Generator",
    description: "Discover the perfect first name for characters, babies, or profiles. Generate names across cultures and styles to find the ideal match.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}