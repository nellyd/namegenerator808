import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NameGeno",
  description: "NameGeno is a simple yet effective set of tools that will generate the best names for a range of uses.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}