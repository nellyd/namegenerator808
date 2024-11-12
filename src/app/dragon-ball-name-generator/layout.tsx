import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dragon Ball Name Generator",
  description: "Create powerful and unique Dragon Ball-inspired names. Find the ideal name for Saiyans, Namekians, or any character in the Dragon Ball universe!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}