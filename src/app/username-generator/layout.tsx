import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Username Generator",
  description: "Create unique and memorable usernames for social media, gaming, or online profiles. Choose from various themes to stand out online!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}