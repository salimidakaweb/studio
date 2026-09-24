import type { CategoryData } from "@/data/categories";

// TODO: put the real production domain here (or set NEXT_PUBLIC_SITE_URL).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelier-bakhtiari.ir";

export const SITE_NAME = "آتلیه بختیاری";

// Placeholder contact details — mirror what is shown on the page and replace
// with the real ones.
export const BUSINESS = {
  phone: "+989121234567",
  email: "hello@atelier-bakhtiari.ir",
  city: "تهران",
  country: "IR",
};

/** Absolute URL from a root-relative path. */
export function abs(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Structured data for a category page (kids / wedding).
 * Built from the same data that is rendered, so markup and visible text can
 * never disagree.
 */
export function categoryJsonLd(data: CategoryData) {
  const pageUrl = abs(data.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: data.seo.title,
        description: data.seo.description,
        inLanguage: "fa-IR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: abs(data.seo.ogImage),
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: data.name, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: data.name,
        serviceType: data.jsonLd.serviceType,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "City", name: BUSINESS.city },
        url: pageUrl,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: data.name,
          itemListElement: data.services.items.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              url: abs(item.href),
            },
          })),
        },
      },
    ],
  };
}
