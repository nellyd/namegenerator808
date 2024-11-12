import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Name Generator",
  description: "Generate distinctive house names for stories, estates, or fantasy worlds. Choose from classic, noble, or mystical options to fit any setting.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}