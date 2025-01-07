import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T'au Empire Name Generator | Create Warhammer 40k T'au Names",
  description: "Generate authentic T'au Empire character names for Warhammer 40,000. Create names for Fire Warriors, Ethereals, and more with proper caste and rank conventions.",
  keywords: "tau names, warhammer 40k, tau empire, name generator, fire caste, ethereal caste, water caste, earth caste, air caste",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}