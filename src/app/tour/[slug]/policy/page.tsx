import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";
import React, { Suspense } from "react";

import TourHero from "../../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../../components/Pages/TourDetailsPage/TourTabs";
import TourPolicy from "@/components/Pages/TourDetailsPage/TourPolicy";
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

/* Normalize a single raw entry into Tour safely */
const normalizeEntry = (entry: unknown): Tour => {
  if (!entry || typeof entry !== "object") return {};
  const e = entry as Record<string, unknown>;

  // narrow the various possible id fields to string | number | undefined
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

  // map cancellation policy array safely
  const cancellationPolicy = Array.isArray(e.cancellationPolicy)
    ? (e.cancellationPolicy as unknown[]).map((item) => String(item))
    : undefined;

  // also map other policy-related fields if they exist
  const paymentPolicy = Array.isArray(e.paymentPolicy)
    ? (e.paymentPolicy as unknown[]).map((item) => String(item))
    : undefined;

  const bookingTerms = Array.isArray(e.bookingTerms)
    ? (e.bookingTerms as unknown[]).map((item) => String(item))
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
    cancellationPolicy,
    paymentPolicy,
    bookingTerms,
    featured: typeof e.featured === "boolean" ? e.featured : undefined,
    relatedDestinations: Array.isArray(e.relatedDestinations)
      ? (e.relatedDestinations as Array<string | number>)
      : undefined,
  };
};

/* Normalize tour data to an array (supports both array and object shapes) */
const getToursArray = (): Tour[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return raw.map(normalizeEntry);
  if (raw && typeof raw === "object")
    return Object.values(raw as Record<string, unknown>).map(normalizeEntry);
  return [];
};

/* Create a safe slug fallback from title */
const createSlug = (text?: string) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * generateStaticParams for /tour/[slug]/policy
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
 * Server metadata generator for each tour policy page
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
      title: "Tour Policy | Safari Sutra",
      description: "Tour policies, cancellation and booking terms for Safari Sutra tours.",
    };
  }

  const tours = getToursArray();
  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) {
    return {
      title: "Tour Policy Not Found | Safari Sutra",
      description: "Policy details for this tour could not be found.",
    };
  }

  // Dynamic title that clearly indicates this is the policy page for the specific tour
  const title = tour.title ? `Policy — ${tour.title} | Safari Sutra` : "Tour Policy | Safari Sutra";
  const description =
    (typeof tour.metaDescription === "string" && tour.metaDescription) ||
    (typeof tour.description === "string" && tour.description) ||
    (typeof tour.caption === "string" && tour.caption) ||
    `Policy details for ${tour.title} — cancellations, refunds and booking terms.`;
  const image = String(tour.heroImage || tour.image || "/logos/logo.svg");
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}/policy`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "policy", "cancellation", "refund", "Safari Sutra"].filter(Boolean),
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

export default function TourPolicyPage({ params }: { params: { slug?: string | string[] } }) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />

      <Suspense fallback={<div aria-hidden="true" />}>
        <TourTabs initialTab="policy" slug={slug} />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div aria-hidden="true" />}>
              <TourPolicy tour={tour} />
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
