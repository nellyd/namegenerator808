import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Non-Binary Name Generator",
  description: "Find Your Identity with Names That Fit You",
  keywords: "",
  alternates: {
    canonical: "/non-binary-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/non-binary-name-generator",
    title: "Non-Binary Name Generator",
    description: "Find Your Identity with Names That Fit You",
  },
  twitter: {
    card: "summary",
    title: "Non-Binary Name Generator",
    description: "Find Your Identity with Names That Fit You",
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
          name: "Non-Binary Name Generator",
          path: "/non-binary-name-generator",
          description: "Find Your Identity with Names That Fit You",
        })}
      />
    </>
  );
}