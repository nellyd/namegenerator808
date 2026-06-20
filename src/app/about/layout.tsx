import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NameGeno",
  description: "NameGeno is a simple yet effective set of tools that will generate the best names for a range of uses.",
  keywords: "",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/about",
    title: "About NameGeno",
    description: "NameGeno is a simple yet effective set of tools that will generate the best names for a range of uses.",
  },
  twitter: {
    card: "summary",
    title: "About NameGeno",
    description: "NameGeno is a simple yet effective set of tools that will generate the best names for a range of uses.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}