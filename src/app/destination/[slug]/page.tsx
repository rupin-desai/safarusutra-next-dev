import React from "react";
import { notFound } from "next/navigation";

import HeroSection from "@/components/UI/HeroSection";
import DestinationDetailsOverview from "@/components/Pages/DestinationDetailsPage/DestinationDetailsOverview";
import DestinationAttractions from "@/components/Pages/DestinationDetailsPage/DestinationAttractions";
import DestinationRelated from "@/components/Pages/DestinationDetailsPage/DestinationRelated";
import DestinationWhy from "@/components/Pages/DestinationDetailsPage/DestinationWhy";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";
import DestinationPackages from "@/components/Pages/DestinationDetailsPage/DestinationPackages";
import DestinationFAQs from "@/components/Pages/DestinationDetailsPage/DestinationFAQs";

import destinationListRaw from "@/data/DestinatonDetails.json";
import tourDetailsMap from "@/data/TourDetails.json";

/* Utility to create consistent simple slugs */
const createSlug = (text: string) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* Normalize the imported JSON to an array (handles both object map and array JSON shapes) */
const getDestinationsArray = (): any[] => {
  const raw: unknown = destinationListRaw;
  if (Array.isArray(raw)) return raw as any[];
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, any>);
  return [];
};

/**
 * generateStaticParams must return only the dynamic params matching the route.
 * Route: /destination/[slug]  => return { slug }
 */
export async function generateStaticParams() {
  const destinations = getDestinationsArray();
  if (!destinations || destinations.length === 0) return [];

  const params = destinations.map((d) => {
    const slug = d?.slug ? String(d.slug) : createSlug(String(d?.title ?? ""));
    return { slug };
  });

  // dedupe slugs
  const seen = new Set<string>();
  return params.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

/**
 * Server page component: finds destination by slug and renders details.
 */
export default function Page({ params }: { params: { slug?: string } }) {
  const slug = params?.slug ?? "";
  if (!slug) return notFound();

  const destinations = getDestinationsArray();

  const destination = destinations.find((d) => {
    const candidate = d?.slug ? String(d.slug) : createSlug(String(d?.title ?? ""));
    return candidate === slug;
  });

  if (!destination) return notFound();

  const id = destination.id ? String(destination.id) : "";
  const details = (tourDetailsMap as any)[String(id)] ?? {};

  const completeData = {
    ...destination,
    ...details,
  };

  return (
    <div>
      <HeroSection
        title={completeData.title}
        backgroundImage={completeData.heroImage || completeData.image}
        overlay={0.4}
        titleSize="text-4xl md:text-6xl"
      />

      <DestinationDetailsOverview tourData={completeData} />

      {completeData.tourWhy && <DestinationWhy tour={completeData} />}

      <DestinationAttractions attractions={completeData.attractions} />

      <DestinationPackages
        destinationName={completeData.title}
        destinationId={id ? Number(id) : undefined}
      />

      <DestinationRelated
        relatedTours={[]}
        currentTourId={id ? Number(id) : undefined}
        allTours={destinations}
      />

      <ContactSection />

      <DestinationFAQs faq={completeData.faq} destinationTitle={completeData.title} />
    </div>
  );
}
