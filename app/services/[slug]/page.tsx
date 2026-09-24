import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/Services/ServicePage/ServicePage";
import { services } from "@/data/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Pre-render every service at build time (static HTML = best for SEO/speed).
export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = services[slug];

  if (!service) {
    return {};
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      type: "website",
      locale: "fa_IR",
      url: `/services/${service.slug}`,
      images: [service.hero.image],
    },
  };
}

export default async function Page({ params }: ServicePageProps) {
  const { slug } = await params;

  const service = services[slug];

  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}
