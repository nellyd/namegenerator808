import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Villain Name Generator",
  description: "Craft the ultimate villain name for your stories or games. Choose from dark, mysterious, or powerful styles to bring your antagonist to life!",
  keywords: "",
  alternates: {
    canonical: "/villain-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/villain-name-generator",
    title: "Villain Name Generator",
    description: "Craft the ultimate villain name for your stories or games. Choose from dark, mysterious, or powerful styles to bring your antagonist to life!",
  },
  twitter: {
    card: "summary",
    title: "Villain Name Generator",
    description: "Craft the ultimate villain name for your stories or games. Choose from dark, mysterious, or powerful styles to bring your antagonist to life!",
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
          name: "Villain Name Generator",
          path: "/villain-name-generator",
          description: "Craft the ultimate villain name for your stories or games. Choose from dark, mysterious, or powerful styles to bring your antagonist to life!",
        })}
      />
    </>
  );
}