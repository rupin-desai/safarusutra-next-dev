import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";
import React, { Suspense } from "react";
import TourHero from "../../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../../components/Pages/TourDetailsPage/TourTabs";
import TourInclusions from "@/components/Pages/TourDetailsPage/TourInclusions";
import TourSidebar from "../../../../components/Pages/TourDetailsPage/TourSidebar";

// Strongly-typed Tour shape for this route (keeps fields minimal and safe)
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
  inclusions?: string[];
  exclusions?: string[];
  [k: string]: unknown;
};

// Normalize a raw JSON entry into the Tour shape (handles various JSON shapes)
const normalizeEntry = (entry: unknown): Tour => {
  if (!entry || typeof entry !== "object") return {};
  const e = entry as Record<string, unknown>;
  const rawId = e.id ?? e.ID ?? e["packageId"] ?? e["package_id"];
  const id = typeof rawId === "number" || typeof rawId === "string" ? rawId : undefined;

  const rawCategory = e.category ?? e.categories ?? e["Category"];
  let category: string | string[] | undefined;
  if (typeof rawCategory === "string") category = rawCategory;
  else if (Array.isArray(rawCategory)) category = rawCategory.map((c) => (typeof c === "string" ? c : String(c)));
  else category = undefined;

  // map inclusions and exclusions arrays safely
  const inclusions = Array.isArray(e.inclusions)
    ? (e.inclusions as unknown[]).map((item) => String(item))
    : undefined;

  const exclusions = Array.isArray(e.exclusions)
    ? (e.exclusions as unknown[]).map((item) => String(item))
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
    inclusions,
    exclusions,
    featured: typeof e.featured === "boolean" ? e.featured : undefined,
    relatedDestinations: Array.isArray(e.relatedDestinations) ? (e.relatedDestinations as Array<string | number>) : undefined,
  } as Tour;
};

// Normalize tour data to an array (supports both array and object shapes)
const getToursArray = (): Tour[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return (raw as unknown[]).map(normalizeEntry);
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, unknown>).map(normalizeEntry);
  return [];
};

// Create a safe slug fallback from title/id
const createSlug = (text?: string) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// same Tab union used here
type Tab = "overview" | "itinerary" | "inclusions" | "policy";

/**
 * generateStaticParams must return the list of { slug } objects that match
 * the dynamic route /tour/[slug]/inclusions. We ensure non-empty, deduped slugs here.
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
 * Server metadata generator — ensures meta tags (title / OG / Twitter / keywords / canonical)
 * are available to crawlers and share previews for the inclusions subpage.
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
      title: "Inclusions | Safari Sutra",
      description: "Inclusions for Safari Sutra tours.",
    };
  }

  const tours = getToursArray();
  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) {
    return {
      title: "Inclusions Not Found | Safari Sutra",
      description: "Inclusions information for this tour could not be found.",
    };
  }

  const pageTitle = tour.title ? `Inclusions — ${tour.title} | Safari Sutra` : "Inclusions | Safari Sutra";
  const description = String(tour.description ?? "").slice(0, 160);
  const image = (tour.heroImage as string) || (tour.image as string) || "/logos/logo.svg";
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}/inclusions`;

  return {
    title: pageTitle,
    description,
    keywords: [tour.title ?? "", "inclusions", "tour", "Safari Sutra"].filter(Boolean),
    openGraph: {
      title: pageTitle,
      description,
      url,
      images: image ? [{ url: image, alt: tour.title ?? "Safari Sutra" }] : undefined,
    },
    twitter: {
      title: pageTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function Page({ params }: { params: { slug?: string | string[] } }) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  // annotate activeTab as Tab union
  const activeTab: Tab = "inclusions";

  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />

      <Suspense fallback={<div aria-hidden="true" />}>
        <TourTabs initialTab={activeTab} />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div aria-hidden="true" />}>
              <TourInclusions tour={tour} />
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
