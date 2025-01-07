import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nickname Generator | Create Cool Unique Nicknames",
  description: "Generate unique and creative nicknames for gaming, social media, or any online presence. Customize your perfect nickname with our easy-to-use generator.",
  keywords: "nickname generator, username generator, gaming names, social media names, cool nicknames",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}