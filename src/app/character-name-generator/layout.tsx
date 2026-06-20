import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Character Name Generator",
  description: "Create unique character names for any story, game, or project. Choose from various styles and themes to bring your characters to life!",
  keywords: "",
  alternates: {
    canonical: "/character-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/character-name-generator",
    title: "Character Name Generator",
    description: "Create unique character names for any story, game, or project. Choose from various styles and themes to bring your characters to life!",
  },
  twitter: {
    card: "summary",
    title: "Character Name Generator",
    description: "Create unique character names for any story, game, or project. Choose from various styles and themes to bring your characters to life!",
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
          name: "Character Name Generator",
          path: "/character-name-generator",
          description: "Create unique character names for any story, game, or project. Choose from various styles and themes to bring your characters to life!",
        })}
      />
    </>
  );
}