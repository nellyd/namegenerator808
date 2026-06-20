import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boy Name Generator",
  description:
    "Discover strong, unique boy names for babies, characters or stories. Generate boy name ideas with meanings in one click.",
  keywords: "",
  alternates: {
    canonical: "/boy-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/boy-name-generator",
    title: "Boy Name Generator",
    description: "Discover strong, unique boy names for babies, characters or stories. Generate boy name ideas with meanings in one click.",
  },
  twitter: {
    card: "summary",
    title: "Boy Name Generator",
    description: "Discover strong, unique boy names for babies, characters or stories. Generate boy name ideas with meanings in one click.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}