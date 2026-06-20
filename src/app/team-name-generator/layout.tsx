import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Team Name Generator",
  description: "Create unique team names for any occasion, sports, work, or fun! Choose from themes and styles to find a name that unites and inspires.",
  keywords: "",
  alternates: {
    canonical: "/team-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/team-name-generator",
    title: "Team Name Generator",
    description: "Create unique team names for any occasion, sports, work, or fun! Choose from themes and styles to find a name that unites and inspires.",
  },
  twitter: {
    card: "summary",
    title: "Team Name Generator",
    description: "Create unique team names for any occasion, sports, work, or fun! Choose from themes and styles to find a name that unites and inspires.",
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
          name: "Team Name Generator",
          path: "/team-name-generator",
          description: "Create unique team names for any occasion, sports, work, or fun! Choose from themes and styles to find a name that unites and inspires.",
        })}
      />
    </>
  );
}