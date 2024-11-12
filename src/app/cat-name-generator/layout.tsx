import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Name Generator",
  description: "Find the purrfect name for your feline friend! Generate cute, clever, or classic cat names that match your kitty’s personality.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}