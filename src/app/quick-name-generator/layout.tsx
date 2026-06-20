import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Name Generator",
  description:
    "Generate random names fast. A quick, no-fuss name generator for instant ideas whenever you need a name on the spot.",
  keywords: "",
  alternates: {
    canonical: "/quick-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/quick-name-generator",
    title: "Quick Name Generator",
    description: "Generate random names fast. A quick, no-fuss name generator for instant ideas whenever you need a name on the spot.",
  },
  twitter: {
    card: "summary",
    title: "Quick Name Generator",
    description: "Generate random names fast. A quick, no-fuss name generator for instant ideas whenever you need a name on the spot.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}