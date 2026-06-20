import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Business Name Generator",
  description:
    "Generate professional, brandable business name ideas for startups, shops and side projects. Find a name that stands out.",
  keywords: "",
  alternates: {
    canonical: "/business-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/business-name-generator",
    title: "Business Name Generator",
    description: "Generate professional, brandable business name ideas for startups, shops and side projects. Find a name that stands out.",
  },
  twitter: {
    card: "summary",
    title: "Business Name Generator",
    description: "Generate professional, brandable business name ideas for startups, shops and side projects. Find a name that stands out.",
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
          name: "Business Name Generator",
          path: "/business-name-generator",
          description: "Generate professional, brandable business name ideas for startups, shops and side projects. Find a name that stands out.",
        })}
      />
    </>
  );
}