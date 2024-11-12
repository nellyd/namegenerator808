import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Non-Binary Name Generator",
  description: "Find Your Identity with Names That Fit You",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}