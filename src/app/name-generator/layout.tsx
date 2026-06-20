import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Name Generator",
  description: "Generate unique names for any purpose, characters, brands, pets, and more! Choose from endless styles and themes to find the perfect fit.",
  keywords: "",
  alternates: {
    canonical: "/name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/name-generator",
    title: "Name Generator",
    description: "Generate unique names for any purpose, characters, brands, pets, and more! Choose from endless styles and themes to find the perfect fit.",
  },
  twitter: {
    card: "summary",
    title: "Name Generator",
    description: "Generate unique names for any purpose, characters, brands, pets, and more! Choose from endless styles and themes to find the perfect fit.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}