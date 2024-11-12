import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Street Name Generator",
  description: "Generate authentic street names for maps, stories, or world-building. Choose styles and patterns to create realistic names for any setting!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}