import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Rapper Name Generator",
  description:
    "Create a standout rapper name for your hip hop persona, stage act or gaming profile. Generate cool rap names in one click.",
  keywords: "",
  alternates: {
    canonical: "/rap-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/rap-name-generator",
    title: "Rapper Name Generator",
    description: "Create a standout rapper name for your hip hop persona, stage act or gaming profile. Generate cool rap names in one click.",
  },
  twitter: {
    card: "summary",
    title: "Rapper Name Generator",
    description: "Create a standout rapper name for your hip hop persona, stage act or gaming profile. Generate cool rap names in one click.",
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
          name: "Rapper Name Generator",
          path: "/rap-name-generator",
          description: "Create a standout rapper name for your hip hop persona, stage act or gaming profile. Generate cool rap names in one click.",
        })}
      />
    </>
  );
}