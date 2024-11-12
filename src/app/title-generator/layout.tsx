import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title Name Generator",
  description: "Generate captivating titles for books, articles, or projects. Explore various styles to find a title that grabs attention and sets the tone.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}