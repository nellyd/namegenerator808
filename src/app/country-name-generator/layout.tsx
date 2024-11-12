import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country Name Generator",
  description: "Create realistic country names for fantasy worlds, maps, or games. Explore unique options to build immersive and believable nations.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}