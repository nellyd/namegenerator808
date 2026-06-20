import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ship Name Generator",
  description:
    "Create unique ship names for your stories, games or world-building. Choose from various styles to name any vessel.",
  keywords: "",
  alternates: {
    canonical: "/ship-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/ship-name-generator",
    title: "Ship Name Generator",
    description: "Create unique ship names for your stories, games or world-building. Choose from various styles to name any vessel.",
  },
  twitter: {
    card: "summary",
    title: "Ship Name Generator",
    description: "Create unique ship names for your stories, games or world-building. Choose from various styles to name any vessel.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}