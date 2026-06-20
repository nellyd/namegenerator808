import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Username Generator",
  description: "Create unique and memorable usernames for social media, gaming, or online profiles. Choose from various themes to stand out online!",
  keywords: "",
  alternates: {
    canonical: "/username-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/username-generator",
    title: "Username Generator",
    description: "Create unique and memorable usernames for social media, gaming, or online profiles. Choose from various themes to stand out online!",
  },
  twitter: {
    card: "summary",
    title: "Username Generator",
    description: "Create unique and memorable usernames for social media, gaming, or online profiles. Choose from various themes to stand out online!",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}