import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Identity Generator",
  description:
    "Create a unique identity for characters, profiles or online personas. Generate names, traits and details to build a complete persona.",
  keywords: "",
  alternates: {
    canonical: "/identity-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/identity-generator",
    title: "Identity Generator",
    description: "Create a unique identity for characters, profiles or online personas. Generate names, traits and details to build a complete persona.",
  },
  twitter: {
    card: "summary",
    title: "Identity Generator",
    description: "Create a unique identity for characters, profiles or online personas. Generate names, traits and details to build a complete persona.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}