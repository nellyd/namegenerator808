import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Name Generator",
  description: "Generate unique game names for any genre. Choose from a variety of styles to create a name that captures the spirit of your game.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}