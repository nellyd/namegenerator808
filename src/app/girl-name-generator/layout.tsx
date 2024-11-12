import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Girl Name Generator",
  description: "Discover beautiful and unique girl names for characters, babies, or profiles. Explore various styles to find the perfect name.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}