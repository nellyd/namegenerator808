import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Street Name Generator",
  description: "Generate authentic street names for maps, stories, or world-building. Choose styles and patterns to create realistic names for any setting!",
  keywords: "",
  alternates: {
    canonical: "/street-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/street-name-generator",
    title: "Street Name Generator",
    description: "Generate authentic street names for maps, stories, or world-building. Choose styles and patterns to create realistic names for any setting!",
  },
  twitter: {
    card: "summary",
    title: "Street Name Generator",
    description: "Generate authentic street names for maps, stories, or world-building. Choose styles and patterns to create realistic names for any setting!",
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
          name: "Street Name Generator",
          path: "/street-name-generator",
          description: "Generate authentic street names for maps, stories, or world-building. Choose styles and patterns to create realistic names for any setting!",
        })}
      />
    </>
  );
}