import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "City Name Generator",
  description: "Generate authentic city names for your stories, maps, or world-building. Choose styles that bring your fictional cities to life!",
  keywords: "",
  alternates: {
    canonical: "/city-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/city-name-generator",
    title: "City Name Generator",
    description: "Generate authentic city names for your stories, maps, or world-building. Choose styles that bring your fictional cities to life!",
  },
  twitter: {
    card: "summary",
    title: "City Name Generator",
    description: "Generate authentic city names for your stories, maps, or world-building. Choose styles that bring your fictional cities to life!",
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
          name: "City Name Generator",
          path: "/city-name-generator",
          description: "Generate authentic city names for your stories, maps, or world-building. Choose styles that bring your fictional cities to life!",
        })}
      />
    </>
  );
}