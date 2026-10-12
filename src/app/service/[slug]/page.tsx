import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import { getAllServices, getServiceBySlug } from "@/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allServices = getAllServices();
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found - Greenly",
    };
  }

  return {
    title: `${service.title} - Greenly Gardening Service`,
    description: service.subtitle || service.description,
    openGraph: {
      title: `${service.title} - Greenly Gardening Service`,
      description: service.subtitle || service.description,
      images: [
        {
          url: service.heroImage,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
