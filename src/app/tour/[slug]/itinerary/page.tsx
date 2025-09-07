import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";
import React, { Suspense } from "react";

import TourHero from "../../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../../components/Pages/TourDetailsPage/TourTabs";
import TourItinerary from "@/components/Pages/TourDetailsPage/TourItinerary";
import TourSidebar from "../../../../components/Pages/TourDetailsPage/TourSidebar";

/* Strongly-typed Tour shape to avoid `any` */
type Tour = {
  id?: string | number;
  title?: string;
  slug?: string;
  heroImage?: string;
  image?: string;
  metaDescription?: string;
  description?: string;
  caption?: string;
  duration?: string;
  price?: number | string;
  location?: string;
  category?: string | string[];
  featured?: boolean;
  relatedDestinations?: Array<string | number>;
  [k: string]: unknown;
};

const normalizeEntry = (entry: unknown): Tour => {
  if (!entry || typeof entry !== "object") return {};
  const e = entry as Record<string, unknown>;
  const rawId = e.id ?? e.ID ?? e["packageId"] ?? e["package_id"];
  const id = typeof rawId === "number" || typeof rawId === "string" ? rawId : undefined;

  // normalize category to string | string[] | undefined
  const rawCategory = e.category ?? e.categories ?? e["Category"];
  let category: string | string[] | undefined;
  if (typeof rawCategory === "string") {
    category = rawCategory;
  } else if (Array.isArray(rawCategory)) {
    category = rawCategory.map((c) => (typeof c === "string" ? c : String(c)));
  } else {
    category = undefined;
  }

  // map itinerary array safely
  const itinerary = Array.isArray(e.itinerary)
    ? (e.itinerary as unknown[]).map((it) => {
        if (!it || typeof it !== "object") return {};
        const o = it as Record<string, unknown>;
        return {
          day: typeof o.day === "number" ? o.day : typeof o.day === "string" ? Number(o.day) : undefined,
          title: typeof o.title === "string" ? o.title : undefined,
          description: typeof o.description === "string" ? o.description : undefined,
          location: typeof o.location === "string" ? o.location : undefined,
          activities: Array.isArray(o.activities) ? (o.activities as unknown[]).map(a => String(a)) : undefined,
          accommodation: typeof o.accommodation === "string" ? o.accommodation : undefined,
          meals: o.meals && typeof o.meals === "object" ? o.meals : undefined,
          ...o,
        };
      })
    : undefined;

  return {
    id,
    title: typeof e.title === "string" ? e.title : typeof e.name === "string" ? e.name : undefined,
    slug: typeof e.slug === "string" ? e.slug : undefined,
    heroImage: typeof e.heroImage === "string" ? e.heroImage : undefined,
    image: typeof e.image === "string" ? e.image : undefined,
    metaDescription: typeof e.metaDescription === "string" ? e.metaDescription : undefined,
    description: typeof e.description === "string" ? e.description : undefined,
    caption: typeof e.caption === "string" ? e.caption : undefined,
    duration: typeof e.duration === "string" ? e.duration : undefined,
    price: typeof e.price === "number" ? e.price : typeof e.price === "string" ? e.price : undefined,
    location: typeof e.location === "string" ? e.location : undefined,
    category,
    itinerary,
    featured: typeof e.featured === "boolean" ? e.featured : undefined,
    relatedDestinations: Array.isArray(e.relatedDestinations)
      ? (e.relatedDestinations as Array<string | number>)
      : undefined,
  };
};

/* Normalize tour data to an array (supports both array and object shapes) */
const getToursArray = (): Tour[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return (raw as unknown[]).map(normalizeEntry);
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, unknown>).map(normalizeEntry);
  return [];
};

// helper to create a URL-friendly slug from title/id
const createSlug = (text?: string) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * generateStaticParams must return the list of { slug } objects that match
 * the dynamic route /tour/[slug]/itinerary. We ensure non-empty, deduped slugs here.
 */
export async function generateStaticParams() {
  const tours = getToursArray();
  if (!tours || tours.length === 0) return [];

  const params = tours
    .map((t) => {
      const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
      return { slug: String(candidate ?? "") };
    })
    .filter((p) => p.slug && p.slug.length > 0);

  const seen = new Set<string>();
  return params.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

/**
 * Server metadata generator for the itinerary subpage of a tour
 */
export async function generateMetadata({
  params,
}: {
  params: { slug?: string | string[] };
}): Promise<Metadata> {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";
  if (!slug) {
    return {
      title: "Itinerary | Safari Sutra",
      description: "Tour itineraries and day-by-day plans from Safari Sutra.",
    };
  }

  const tours = getToursArray();
  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) {
    return {
      title: "Itinerary Not Found | Safari Sutra",
      description: "The itinerary you are looking for could not be found.",
    };
  }

  const title = tour.title ? `Itinerary — ${tour.title} | Safari Sutra` : "Itinerary | Safari Sutra";
  const description =
    tour.metaDescription ||
    tour.description ||
    tour.caption ||
    `Day-by-day itinerary for ${tour.title} by Safari Sutra.`;
  const image = (tour.heroImage as string) || (tour.image as string) || "/logos/logo.svg";
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}/itinerary`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "itinerary", "tour", "Safari Sutra"].filter(Boolean),
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image, alt: tour.title ?? "Safari Sutra" }] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function TourItineraryPage({ params }: { params: { slug?: string | string[] } }) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  const activeTab = "itinerary";

  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />

      <Suspense fallback={<div aria-hidden="true" />}>
        <TourTabs initialTab={activeTab} slug={slug} />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div aria-hidden="true" />}>
              <TourItinerary tour={tour} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<div aria-hidden="true" />}>
              <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
