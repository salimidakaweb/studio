import type { Metadata } from "next";
import HomeSlider from "@/components/Home/HomeSlider";
import HomeCategories from "@/components/Home/HomeCategories";
import HomeAboutVideo from "@/components/Home/HomeAboutVideo";
import Blog from "@/components/Blog/Blog";
import { home } from "@/data/home";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/seo";

// Server component on purpose (no "use client"): every heading and paragraph
// of the home page is rendered on the server. Only tiny interactive leaves
// (slider mechanics, click-to-play video, blog slider, scroll-reveal) are
// client components.
//
// The home page is now a landing hub that sends visitors to the two category
// pages: /kids (the old home page) and /wedding.

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  keywords: home.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: SITE_NAME,
    images: [home.seo.ogImage],
  },
};

// Structured data (JSON-LD). The @id values (#website, #business) are also
// referenced by the /kids and /wedding pages (see lib/seo.ts).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fa-IR",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: "Bakhtiari Photography Studio",
      description: home.seo.description,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}${home.seo.ogImage}`,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.city,
        addressCountry: BUSINESS.country,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات آتلیه بختیاری",
        itemListElement: home.categories.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            url: `${SITE_URL}${item.href}`,
          },
        })),
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <HomeSlider data={home.slider} />
        <HomeCategories data={home.categories} />
        <HomeAboutVideo video={home.video} about={home.about} />
        <Blog data={home.blog} />
      </main>
    </>
  );
}
