import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Name Generator",
  description: "Find the perfect name for your dog! Generate unique, fun, or classic names that suit any breed or personality.",
  keywords: "",
  alternates: {
    canonical: "/dog-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/dog-name-generator",
    title: "Dog Name Generator",
    description: "Find the perfect name for your dog! Generate unique, fun, or classic names that suit any breed or personality.",
  },
  twitter: {
    card: "summary",
    title: "Dog Name Generator",
    description: "Find the perfect name for your dog! Generate unique, fun, or classic names that suit any breed or personality.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}