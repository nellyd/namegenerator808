import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Generator",
  description: "Find the perfect Instagram username to stand out! Generate creative, catchy, or stylish usernames to suit any vibe or niche.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}