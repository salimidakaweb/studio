import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Category/Categories";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Plans from "@/components/Plans/Plans";
import Booking from "@/components/Booking/Booking";
import Blog from "@/components/Blog/Blog";
import type { CategoryData } from "@/data/categories";
import { categoryJsonLd } from "@/lib/seo";

// Shared layout for /kids and /wedding.
//
// Server component on purpose (no "use client"): every heading and paragraph is
// rendered on the server. The two pages use EXACTLY these components; only the
// `data` prop differs. Sections that are identical on both pages could simply
// ignore `data` — here every section is data-driven (Plans MUST differ).
// Only tiny interactive leaves (camera, sliders, form, scroll-reveal) are
// client components.

export default function CategoryPage({ data }: { data: CategoryData }) {
  const jsonLd = categoryJsonLd(data);

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
        <Hero data={data.hero} />
        <Categories data={data.services} />
        <Services data={data.services} />
        <About data={data.about} />
        <Portfolio data={data.portfolio} />
        <Plans data={data.plans} />
        <Booking data={data.booking} />
        <Blog data={data.blog} />
      </main>
    </>
  );
}
