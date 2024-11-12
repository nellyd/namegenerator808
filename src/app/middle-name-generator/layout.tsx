import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Middle Name Generator",
  description: "Add the perfect middle name to any first and last name combination. Generate names that add depth and flow to the full name.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}