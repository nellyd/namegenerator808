import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Girl Name Generator",
  description: "Discover beautiful and unique girl names for characters, babies, or profiles. Explore various styles to find the perfect name.",
  keywords: "",
  alternates: {
    canonical: "/girl-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/girl-name-generator",
    title: "Girl Name Generator",
    description: "Discover beautiful and unique girl names for characters, babies, or profiles. Explore various styles to find the perfect name.",
  },
  twitter: {
    card: "summary",
    title: "Girl Name Generator",
    description: "Discover beautiful and unique girl names for characters, babies, or profiles. Explore various styles to find the perfect name.",
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
          name: "Girl Name Generator",
          path: "/girl-name-generator",
          description: "Discover beautiful and unique girl names for characters, babies, or profiles. Explore various styles to find the perfect name.",
        })}
      />
    </>
  );
}