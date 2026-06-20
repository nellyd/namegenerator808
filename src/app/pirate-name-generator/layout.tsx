import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Pirate Name Generator",
  description:
    "Generate authentic pirate names for your characters, games or crew. Find a fearsome pirate name fit for the high seas.",
  keywords: "",
  alternates: {
    canonical: "/pirate-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/pirate-name-generator",
    title: "Pirate Name Generator",
    description: "Generate authentic pirate names for your characters, games or crew. Find a fearsome pirate name fit for the high seas.",
  },
  twitter: {
    card: "summary",
    title: "Pirate Name Generator",
    description: "Generate authentic pirate names for your characters, games or crew. Find a fearsome pirate name fit for the high seas.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <JsonLd
        data={generatorSchema({
          name: "Pirate Name Generator",
          path: "/pirate-name-generator",
          description: "Generate authentic pirate names for your characters, games or crew. Find a fearsome pirate name fit for the high seas.",
        })}
      />
    </>
  );
}