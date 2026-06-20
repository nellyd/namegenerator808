import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Cat Name Generator",
  description: "Find the purrfect name for your feline friend! Generate cute, clever, or classic cat names that match your kitty’s personality.",
  keywords: "",
  alternates: {
    canonical: "/cat-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/cat-name-generator",
    title: "Cat Name Generator",
    description: "Find the purrfect name for your feline friend! Generate cute, clever, or classic cat names that match your kitty’s personality.",
  },
  twitter: {
    card: "summary",
    title: "Cat Name Generator",
    description: "Find the purrfect name for your feline friend! Generate cute, clever, or classic cat names that match your kitty’s personality.",
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
          name: "Cat Name Generator",
          path: "/cat-name-generator",
          description: "Find the purrfect name for your feline friend! Generate cute, clever, or classic cat names that match your kitty’s personality.",
        })}
      />
    </>
  );
}