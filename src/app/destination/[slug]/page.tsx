import type { Metadata } from "next";
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
 * Generate metadata for each destination page based on slug.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata> {
  const slug = params?.slug ?? "";
  if (!slug) {
    return {
      title: "Destination | Safari Sutra",
      description: "Discover destinations and travel guides at Safari Sutra.",
    };
  }

  const destinations = getDestinationsArray();
  const destination = destinations.find((d) => {
    const candidate = d?.slug ? String(d.slug) : createSlug(String(d?.title ?? ""));
    return candidate === slug;
  });

  if (!destination) {
    return {
      title: "Destination Not Found | Safari Sutra",
      description: "The destination you are looking for could not be found.",
    };
  }

  const id = destination.id ? String(destination.id) : "";
  const details = (tourDetailsMap as any)[String(id)] ?? {};
  const completeData = { ...destination, ...details };

  const title = completeData.title ? `${completeData.title} | Safari Sutra` : "Destination | Safari Sutra";
  const description =
    completeData.metaDescription ||
    completeData.description ||
    completeData.caption ||
    `Explore ${completeData.title} with Safari Sutra — itineraries, highlights, packages and FAQs.`;

  const image = completeData.heroImage || completeData.image || "/logos/logo.svg";
  const url = `https://thesafarisutra.com/destination/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image, alt: completeData.title ?? "Safari Sutra" }] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
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
