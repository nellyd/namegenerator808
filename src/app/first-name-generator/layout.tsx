import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Name Generator",
  description: "Discover the perfect first name for characters, babies, or profiles. Generate names across cultures and styles to find the ideal match.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}