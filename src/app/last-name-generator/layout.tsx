import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Last Name Generator",
  description: "Discover unique last names for characters, profiles, or personas. Choose from various styles to find a last name that completes the identity.",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}