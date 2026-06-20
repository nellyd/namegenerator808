import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Last Name Generator",
  description: "Discover unique last names for characters, profiles, or personas. Choose from various styles to find a last name that completes the identity.",
  keywords: "",
  alternates: {
    canonical: "/last-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/last-name-generator",
    title: "Last Name Generator",
    description: "Discover unique last names for characters, profiles, or personas. Choose from various styles to find a last name that completes the identity.",
  },
  twitter: {
    card: "summary",
    title: "Last Name Generator",
    description: "Discover unique last names for characters, profiles, or personas. Choose from various styles to find a last name that completes the identity.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}