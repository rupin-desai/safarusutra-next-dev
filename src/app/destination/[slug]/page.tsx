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
// details mapping for destinations -> tour details
import tourDetailsMap from "@/data/TourDetails.json";

export async function generateStaticParams() {
  const raw: unknown = destinationListRaw;
  let items: unknown[] = [];

  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object") {
    items = Object.values(raw as Record<string, unknown>);
  }

  const params = items
    .map((d) => {
      const obj = d && typeof d === "object" ? (d as Record<string, unknown>) : {};
      const slugFromField = typeof obj.slug === "string" && obj.slug.trim().length > 0 ? obj.slug.trim() : undefined;
      const title = typeof obj.title === "string" ? obj.title.trim() : "";
      const slugFallback = title
        ? title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        : obj.id
        ? String(obj.id)
        : undefined;
      const slug = slugFromField ?? slugFallback;
      return slug ? { slug } : null;
    })
    .filter(Boolean) as { slug: string }[];

  const seen = new Set<string>();
  return params.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

/* Narrow runtime-friendly type for destination items */
type Destination = {
  id?: string | number;
  title?: string;
  slug?: string;
  heroImage?: string;
  image?: string;
  metaDescription?: string;
  description?: string;
  caption?: string;
  location?: string;
  attractions?: unknown[];
  faq?: unknown;
  tourWhy?: unknown;
} & Record<string, unknown>;

/* Utility to create consistent simple slugs */
const createSlug = (text: string) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* Normalize the imported JSON to an array (handles both object map and array JSON shapes) */
const getDestinationsArray = (): Destination[] => {
  const raw: unknown = destinationListRaw;
  if (Array.isArray(raw)) return raw as Destination[];
  if (raw && typeof raw === "object") {
    return Object.values(raw as Record<string, Destination>);
  }
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
  // Resolve tour details safely — TourDetails.json can be either an object map or an array
  const rawTourDetails: unknown = tourDetailsMap;
  let details: Record<string, unknown> = {};

  if (Array.isArray(rawTourDetails)) {
    // If it's an array, find the entry whose id matches our id (loose matching)
    const found = (rawTourDetails as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      const candidateId = e.id ?? e["Id"] ?? e["ID"] ?? e["packageId"] ?? e["package_id"];
      return String(candidateId ?? "") === String(id);
    });
    details = (found && typeof found === "object" ? (found as Record<string, unknown>) : {}) ?? {};
  } else if (rawTourDetails && typeof rawTourDetails === "object") {
    // If it's an object map keyed by id
    details = ((rawTourDetails as Record<string, unknown>)[String(id)] as Record<string, unknown>) ?? {};
  } else {
    details = {};
  }

  const completeData = { ...destination, ...details };

  const title = completeData.title ? `${String(completeData.title)} | Safari Sutra` : "Destination | Safari Sutra";
  const description =
    String(completeData.metaDescription || completeData.description || completeData.caption) ||
    `Explore ${String(completeData.title)} with Safari Sutra — itineraries, highlights, packages and FAQs.`;

  const image = String(completeData.heroImage || completeData.image || "/logos/logo.svg");
  const url = `https://thesafarisutra.com/destination/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image, alt: String(completeData.title) || "Safari Sutra" }] : undefined,
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
  // Resolve tour details safely — TourDetails.json can be either an object map or an array
  const rawTourDetails: unknown = tourDetailsMap;
  let details: Record<string, unknown> = {};

  if (Array.isArray(rawTourDetails)) {
    // If it's an array, find the entry whose id matches our id (loose matching)
    const found = (rawTourDetails as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      const candidateId = e.id ?? e["Id"] ?? e["ID"] ?? e["packageId"] ?? e["package_id"];
      return String(candidateId ?? "") === String(id);
    });
    details = (found && typeof found === "object" ? (found as Record<string, unknown>) : {}) ?? {};
  } else if (rawTourDetails && typeof rawTourDetails === "object") {
    // If it's an object map keyed by id
    details = ((rawTourDetails as Record<string, unknown>)[String(id)] as Record<string, unknown>) ?? {};
  } else {
    details = {};
  }

  const completeData: Record<string, unknown> = {
    ...destination,
    ...details,
  };

  // normalize FAQ payload shape so it satisfies DestinationFAQsProps
  const faqProp = (completeData.faq as { items?: { question: string; answer: string }[] } | null | undefined) ?? null;

  // Normalize attractions into the shape expected by DestinationAttractions to avoid `unknown[]` -> `Attraction[]` errors
  type AttractionLocal = { title?: string; image?: string; description?: string };
  const getString = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
  const attractionsProp: AttractionLocal[] = Array.isArray(completeData.attractions)
    ? (completeData.attractions as unknown[]).map((a) => {
        const obj = typeof a === "object" && a !== null ? (a as Record<string, unknown>) : {};
        return {
          title: getString(obj.title),
          image: getString(obj.image),
          description: getString(obj.description),
        };
      })
    : [];

  // Build a strongly-typed TourData shape for DestinationDetailsOverview
  const detailsProp =
    Array.isArray(completeData.details) && (completeData.details as unknown[]).length > 0
      ? (completeData.details as unknown[]).map((d) => {
          const obj = d && typeof d === "object" ? (d as Record<string, unknown>) : {};
          return {
            title: getString(obj.title) || "Detail",
            description: getString(obj.description),
          };
        })
      : [];

  const tourDataProp = {
    title: getString(completeData.title),
    rating: completeData.rating != null ? Number(completeData.rating) : undefined,
    location: getString(completeData.location),
    description: getString(completeData.description),
    longDescription: getString(completeData.longDescription ?? completeData.long_description),
    details: detailsProp,
  };

  return (
    <div>
      <HeroSection
        title={String(completeData.title)}
        backgroundImage={String(completeData.heroImage || completeData.image)}
        overlay={0.4}
        titleSize="text-4xl md:text-6xl"
      />

      <DestinationDetailsOverview tourData={tourDataProp} />

      {!!completeData.tourWhy && <DestinationWhy tour={completeData as Record<string, unknown>} />}

      <DestinationAttractions attractions={attractionsProp} />

      <DestinationPackages
        destinationName={String(completeData.title)}
        destinationId={id ? Number(id) : undefined}
      />

      <DestinationRelated
        relatedTours={[]}
        currentTourId={id ? Number(id) : undefined}
        allTours={destinations}
      />

      <ContactSection />

      <DestinationFAQs faq={faqProp} destinationTitle={String(completeData.title)} />
    </div>
  );
}
