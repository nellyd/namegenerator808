import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Dragon Ball Name Generator",
  description: "Create powerful and unique Dragon Ball-inspired names. Find the ideal name for Saiyans, Namekians, or any character in the Dragon Ball universe!",
  keywords: "",
  alternates: {
    canonical: "/dragon-ball-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/dragon-ball-name-generator",
    title: "Dragon Ball Name Generator",
    description: "Create powerful and unique Dragon Ball-inspired names. Find the ideal name for Saiyans, Namekians, or any character in the Dragon Ball universe!",
  },
  twitter: {
    card: "summary",
    title: "Dragon Ball Name Generator",
    description: "Create powerful and unique Dragon Ball-inspired names. Find the ideal name for Saiyans, Namekians, or any character in the Dragon Ball universe!",
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
          name: "Dragon Ball Name Generator",
          path: "/dragon-ball-name-generator",
          description: "Create powerful and unique Dragon Ball-inspired names. Find the ideal name for Saiyans, Namekians, or any character in the Dragon Ball universe!",
        })}
      />
    </>
  );
}