import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Rohan Character Name Generator",
  description: "Generate Rohan character names instantly.",
  keywords: "",
  alternates: {
    canonical: "/rohan-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/rohan-name-generator",
    title: "Rohan Character Name Generator",
    description: "Generate Rohan character names instantly.",
  },
  twitter: {
    card: "summary",
    title: "Rohan Character Name Generator",
    description: "Generate Rohan character names instantly.",
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
          name: "Rohan Character Name Generator",
          path: "/rohan-name-generator",
          description: "Generate Rohan character names instantly.",
        })}
      />
    </>
  );
}