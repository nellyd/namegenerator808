import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Name Generator",
  description: "Generate distinctive house names for stories, estates, or fantasy worlds. Choose from classic, noble, or mystical options to fit any setting.",
  keywords: "",
  alternates: {
    canonical: "/house-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/house-name-generator",
    title: "House Name Generator",
    description: "Generate distinctive house names for stories, estates, or fantasy worlds. Choose from classic, noble, or mystical options to fit any setting.",
  },
  twitter: {
    card: "summary",
    title: "House Name Generator",
    description: "Generate distinctive house names for stories, estates, or fantasy worlds. Choose from classic, noble, or mystical options to fit any setting.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}