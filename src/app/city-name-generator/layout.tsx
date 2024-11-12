import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Name Generator",
  description: "Generate authentic city names for your stories, maps, or world-building. Choose styles that bring your fictional cities to life!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}