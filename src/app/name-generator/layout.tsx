import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Name Generator",
  description: "Generate unique names for any purpose—characters, brands, pets, and more! Choose from endless styles and themes to find the perfect fit.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}