import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nickname Generator",
  description: "Create unique and fun nicknames with our Nickname Generator! Perfect for friends, gaming, social media, or personal use, this tool helps you find the ideal nickname with just the right vibe. Choose from different styles and options to make it truly your own!",
  keywords: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}