import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Country Name Generator",
  description: "Create realistic country names for fantasy worlds, maps, or games. Explore unique options to build immersive and believable nations.",
  keywords: "",
  alternates: {
    canonical: "/country-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/country-name-generator",
    title: "Country Name Generator",
    description: "Create realistic country names for fantasy worlds, maps, or games. Explore unique options to build immersive and believable nations.",
  },
  twitter: {
    card: "summary",
    title: "Country Name Generator",
    description: "Create realistic country names for fantasy worlds, maps, or games. Explore unique options to build immersive and believable nations.",
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
          name: "Country Name Generator",
          path: "/country-name-generator",
          description: "Create realistic country names for fantasy worlds, maps, or games. Explore unique options to build immersive and believable nations.",
        })}
      />
    </>
  );
}