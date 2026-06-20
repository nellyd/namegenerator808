import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fantasy Name Generator",
  description: "Generate magical and unique names for your fantasy worlds, characters, and creatures. Choose from a variety of mystical styles and themes.",
  keywords: "",
  alternates: {
    canonical: "/fantasy-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/fantasy-name-generator",
    title: "Fantasy Name Generator",
    description: "Generate magical and unique names for your fantasy worlds, characters, and creatures. Choose from a variety of mystical styles and themes.",
  },
  twitter: {
    card: "summary",
    title: "Fantasy Name Generator",
    description: "Generate magical and unique names for your fantasy worlds, characters, and creatures. Choose from a variety of mystical styles and themes.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}