import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { generatorSchema } from "../../lib/structuredData";

export const metadata: Metadata = {
  title: "Blog Name Generator",
  description:
    "Find a catchy, memorable blog name for any niche. Generate creative blog name ideas instantly to launch your website or newsletter.",
  keywords: "",
  alternates: {
    canonical: "/blog-name-generator",
  },
  openGraph: {
    type: "website",
    siteName: "NameGeno",
    url: "/blog-name-generator",
    title: "Blog Name Generator",
    description: "Find a catchy, memorable blog name for any niche. Generate creative blog name ideas instantly to launch your website or newsletter.",
  },
  twitter: {
    card: "summary",
    title: "Blog Name Generator",
    description: "Find a catchy, memorable blog name for any niche. Generate creative blog name ideas instantly to launch your website or newsletter.",
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
          name: "Blog Name Generator",
          path: "/blog-name-generator",
          description: "Find a catchy, memorable blog name for any niche. Generate creative blog name ideas instantly to launch your website or newsletter.",
        })}
      />
    </>
  );
}