import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fantasy Name Generator",
  description: "Generate magical and unique names for your fantasy worlds, characters, and creatures. Choose from a variety of mystical styles and themes.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}