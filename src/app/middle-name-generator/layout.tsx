import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Middle Name Generator",
  description: "Add the perfect middle name to any first and last name combination. Generate names that add depth and flow to the full name.",
  keywords: "",
  alternates: {
    canonical: "/middle-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/middle-name-generator",
    title: "Middle Name Generator",
    description: "Add the perfect middle name to any first and last name combination. Generate names that add depth and flow to the full name.",
  },
  twitter: {
    card: "summary",
    title: "Middle Name Generator",
    description: "Add the perfect middle name to any first and last name combination. Generate names that add depth and flow to the full name.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}