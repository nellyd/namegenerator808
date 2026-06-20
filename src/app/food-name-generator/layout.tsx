import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Food Name Generator",
  description: "Create fun and catchy names for dishes, restaurants, or food brands. Explore delicious options perfect for any culinary creation.",
  keywords: "",
  alternates: {
    canonical: "/food-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/food-name-generator",
    title: "Food Name Generator",
    description: "Create fun and catchy names for dishes, restaurants, or food brands. Explore delicious options perfect for any culinary creation.",
  },
  twitter: {
    card: "summary",
    title: "Food Name Generator",
    description: "Create fun and catchy names for dishes, restaurants, or food brands. Explore delicious options perfect for any culinary creation.",
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
          name: "Food Name Generator",
          path: "/food-name-generator",
          description: "Create fun and catchy names for dishes, restaurants, or food brands. Explore delicious options perfect for any culinary creation.",
        })}
      />
    </>
  );
}