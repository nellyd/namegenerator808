import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Name Generator",
  description: "Create unique team names for any occasion—sports, work, or fun! Choose from themes and styles to find a name that unites and inspires.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}