import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Title Name Generator",
  description: "Generate captivating titles for books, articles, or projects. Explore various styles to find a title that grabs attention and sets the tone.",
  keywords: "",
  alternates: {
    canonical: "/title-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/title-generator",
    title: "Title Name Generator",
    description: "Generate captivating titles for books, articles, or projects. Explore various styles to find a title that grabs attention and sets the tone.",
  },
  twitter: {
    card: "summary",
    title: "Title Name Generator",
    description: "Generate captivating titles for books, articles, or projects. Explore various styles to find a title that grabs attention and sets the tone.",
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
          name: "Title Name Generator",
          path: "/title-generator",
          description: "Generate captivating titles for books, articles, or projects. Explore various styles to find a title that grabs attention and sets the tone.",
        })}
      />
    </>
  );
}