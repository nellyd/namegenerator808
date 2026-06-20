import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Instagram Name Generator",
  description:
    "Find the perfect Instagram username to stand out. Generate creative, catchy or stylish usernames to suit any vibe or niche.",
  keywords: "",
  alternates: {
    canonical: "/instagram-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/instagram-name-generator",
    title: "Instagram Name Generator",
    description: "Find the perfect Instagram username to stand out. Generate creative, catchy or stylish usernames to suit any vibe or niche.",
  },
  twitter: {
    card: "summary",
    title: "Instagram Name Generator",
    description: "Find the perfect Instagram username to stand out. Generate creative, catchy or stylish usernames to suit any vibe or niche.",
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
          name: "Instagram Name Generator",
          path: "/instagram-name-generator",
          description: "Find the perfect Instagram username to stand out. Generate creative, catchy or stylish usernames to suit any vibe or niche.",
        })}
      />
    </>
  );
}