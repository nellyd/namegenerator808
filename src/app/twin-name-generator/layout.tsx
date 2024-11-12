import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twin Name Generator",
  description: "Find perfectly matched names for twins with our Twin Name Generator! Choose complementary styles to create names that pair beautifully.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}