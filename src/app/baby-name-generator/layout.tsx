import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Name Generator",
  description: "Generate beautiful baby names instantly.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}