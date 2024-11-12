import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superhero Name Generator",
  description: "Find the perfect superhero name for your character! Choose from powerful styles and themes to create a name that captures their unique abilities.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}