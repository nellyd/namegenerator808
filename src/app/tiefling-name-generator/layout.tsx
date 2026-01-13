import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiefling Name Generator – Infernal & Virtue Names for D&D",
  description:
    "Generate authentic Tiefling names inspired by D&D lore. Pick Infernal, Virtue, or Human-raised names with tone and length controls.",
  keywords: [
    "Tiefling name generator",
    "D&D names",
    "Infernal names",
    "Virtue names",
    "DND character names",
  ],
  alternates: {
    canonical: "/tiefling-name-generator",
  },
  openGraph: {
    title: "Tiefling Name Generator – Infernal & Virtue Names for D&D",
    description:
      "Generate authentic Tiefling names inspired by D&D lore. Infernal, Virtue, or Human-raised with tone and length controls.",
    type: "website",
    url: "/tiefling-name-generator",
  },
  twitter: {
    card: "summary",
    title: "Tiefling Name Generator – Infernal & Virtue Names for D&D",
    description:
      "Infernal, Virtue, or Human-raised Tiefling names with tone and length filters.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
