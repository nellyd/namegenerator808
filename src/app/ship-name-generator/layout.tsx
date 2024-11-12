import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ship Name GeneratorCreate unique ship names for your stories, games, or world-building. Choose from various styles to find the perfect name for any vessel!",
  description: "",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}