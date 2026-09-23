import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/Services/ServicePage/ServicePage";
import { services } from "@/data/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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