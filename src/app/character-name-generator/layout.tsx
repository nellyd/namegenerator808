import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Name Generator",
  description: "Create unique character names for any story, game, or project. Choose from various styles and themes to bring your characters to life!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}