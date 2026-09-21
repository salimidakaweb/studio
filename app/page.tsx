import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Plans from "@/components/Plans/Plans";
import Booking from "@/components/Booking/Booking";
import Blog from "@/components/Blog/Blog";

// Server component on purpose (no "use client"): every heading and paragraph
// of the home page is rendered on the server. Only tiny interactive leaves
// (camera, sliders, form, scroll-reveal) are client components.

// TODO: put the real production domain here (or set NEXT_PUBLIC_SITE_URL).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelier-bakhtiari.ir";

export const metadata: Metadata = {
  title: "آتلیه بختیاری | عکاسی کودک، عروسی و پرتره در تهران",
  description:
    "آتلیه بختیاری؛ عکاسی تخصصی کودک و نوزاد، عروسی، عقد، پرتره و فرمالیته با نور استودیویی و فضایی آرام. مشاهده نمونه‌کارها، پکیج‌ها و رزرو نوبت عکاسی.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "آتلیه بختیاری | عکاسی کودک، عروسی و پرتره در تهران",
    description:
      "عکاسی تخصصی کودک، عروسی، عقد، پرتره و فرمالیته با نور استودیویی. نمونه‌کارها و رزرو نوبت.",
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "آتلیه بختیاری",
    images: ["/images/slides/sample-1.jpg"],
  },
};

// Structured data (JSON-LD). Contact details mirror what is shown on the page —
// replace the placeholder phone / address with the real ones.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "آتلیه بختیاری",
      inLanguage: "fa-IR",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "آتلیه بختیاری",
      alternateName: "Bakhtiari Photography Studio",
      description:
        "آتلیه تخصصی عکاسی کودک، عروسی، عقد، پرتره و فرمالیته با نور استودیویی.",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/slides/sample-1.jpg`,
      telephone: "+989121234567",
      email: "hello@atelier-bakhtiari.ir",
      address: {
        "@type": "PostalAddress",
        addressLocality: "تهران",
        addressCountry: "IR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات آتلیه بختیاری",
        itemListElement: [
          "عکاسی عروسی",
          "فیلم‌برداری",
          "عکاسی کودک",
          "عکاسی پرتره",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
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
        <Hero />
        <Categories />
        <Services />
        <About />
        <Portfolio />
        <Plans />
        <Booking />
        <Blog />
      </main>
    </>
  );
}
