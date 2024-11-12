import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Name Generator",
  description: "Create fun and catchy names for dishes, restaurants, or food brands. Explore delicious options perfect for any culinary creation.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}