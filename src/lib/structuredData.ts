// Schema.org JSON-LD builders for NameGeno.
const SITE = "https://namegeno.com";

// WebSite + Organization — rendered once, sitewide, from the root layout.
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "NameGeno",
        description: "Free name generators for every purpose.",
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "NameGeno",
        url: `${SITE}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/icon.svg`,
        },
      },
    ],
  };
}

// WebApplication + BreadcrumbList for an individual generator page.
export function generatorSchema({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name,
        url,
        description,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        isPartOf: { "@id": `${SITE}/#website` },
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };
}
