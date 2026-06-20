import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warhammer Name Generator",
  description: "Generate epic Warhammer names for your characters and armies. Choose fierce and legendary names to build the perfect identity in the Warhammer universe!",
  keywords: "",
  alternates: {
    canonical: "/warhammer-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/warhammer-name-generator",
    title: "Warhammer Name Generator",
    description: "Generate epic Warhammer names for your characters and armies. Choose fierce and legendary names to build the perfect identity in the Warhammer universe!",
  },
  twitter: {
    card: "summary",
    title: "Warhammer Name Generator",
    description: "Generate epic Warhammer names for your characters and armies. Choose fierce and legendary names to build the perfect identity in the Warhammer universe!",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}