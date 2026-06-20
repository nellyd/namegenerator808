import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Pen Name Generator",
  description:
    "Create the perfect pen name for authors and writers. Generate believable, professional pseudonyms to publish under in any genre.",
  keywords: "",
  alternates: {
    canonical: "/pen-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/pen-name-generator",
    title: "Pen Name Generator",
    description: "Create the perfect pen name for authors and writers. Generate believable, professional pseudonyms to publish under in any genre.",
  },
  twitter: {
    card: "summary",
    title: "Pen Name Generator",
    description: "Create the perfect pen name for authors and writers. Generate believable, professional pseudonyms to publish under in any genre.",
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
          name: "Pen Name Generator",
          path: "/pen-name-generator",
          description: "Create the perfect pen name for authors and writers. Generate believable, professional pseudonyms to publish under in any genre.",
        })}
      />
    </>
  );
}