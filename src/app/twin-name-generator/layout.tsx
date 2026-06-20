import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Twin Name Generator",
  description: "Find perfectly matched names for twins with our Twin Name Generator! Choose complementary styles to create names that pair beautifully.",
  keywords: "",
  alternates: {
    canonical: "/twin-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/twin-name-generator",
    title: "Twin Name Generator",
    description: "Find perfectly matched names for twins with our Twin Name Generator! Choose complementary styles to create names that pair beautifully.",
  },
  twitter: {
    card: "summary",
    title: "Twin Name Generator",
    description: "Find perfectly matched names for twins with our Twin Name Generator! Choose complementary styles to create names that pair beautifully.",
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
          name: "Twin Name Generator",
          path: "/twin-name-generator",
          description: "Find perfectly matched names for twins with our Twin Name Generator! Choose complementary styles to create names that pair beautifully.",
        })}
      />
    </>
  );
}