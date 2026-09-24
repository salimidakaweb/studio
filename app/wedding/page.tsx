import type { Metadata } from "next";
import CategoryPage from "@/components/Category/CategoryPage";
import { getCategory } from "@/data/categories";

// Server component: metadata + full page are rendered on the server.
// Content comes from data/categories.ts (same layout as the other category).
const data = getCategory("wedding");

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  keywords: data.seo.keywords,
  alternates: { canonical: data.path },
  openGraph: {
    title: data.seo.title,
    description: data.seo.description,
    type: "website",
    locale: "fa_IR",
    url: data.path,
    siteName: "آتلیه بختیاری",
    images: [data.seo.ogImage],
  },
};

export default function Page() {
  return <CategoryPage data={data} />;
}
