import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Name Generator",
  description: "Find the perfect name for your dog! Generate unique, fun, or classic names that suit any breed or personality.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}