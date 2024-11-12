import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villain Name Generator",
  description: "Craft the ultimate villain name for your stories or games. Choose from dark, mysterious, or powerful styles to bring your antagonist to life!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}