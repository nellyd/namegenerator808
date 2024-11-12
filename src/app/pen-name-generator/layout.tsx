import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pen Name Generator",
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