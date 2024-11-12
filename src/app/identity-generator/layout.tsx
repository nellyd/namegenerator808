import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "identity Generator",
  description: "Create a unique identity for characters, profiles, or online personas. Generate names, traits, and details to build a complete persona.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}