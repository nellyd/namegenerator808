import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rohan Character Name Generator",
  description: "Generate Rohan character names instantly.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}