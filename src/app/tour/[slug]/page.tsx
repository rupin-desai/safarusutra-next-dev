import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";
import TourPageClient from "./TourPage.client";
import type { Tour } from "@/components/UI/TourCard";

/* helper to create a URL-friendly slug from title/id */
const createSlug = (text?: string) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* Normalize a single raw entry into the shared Tour shape */
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
    featured: typeof e.featured === "boolean" ? e.featured : undefined,
    relatedDestinations: Array.isArray(e.relatedDestinations) ? (e.relatedDestinations as Array<string | number>) : undefined,
  } as Tour;
};

/* Normalize tour data to an array (supports both array and object shapes) */
const getToursArray = (): Tour[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return (raw as unknown[]).map(normalizeEntry);
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, unknown>).map(normalizeEntry);
  return [];
};

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
 * Server metadata generator for each tour page (uses tour data)
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
      title: "Tour | Safari Sutra",
      description: "Explore our curated tours on Safari Sutra.",
    };
  }

  const tours = getToursArray();
  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) {
    return {
      title: "Tour Not Found | Safari Sutra",
      description: "The tour you are looking for could not be found.",
    };
  }

  const title = tour.title ? `${tour.title} | Safari Sutra` : "Tour | Safari Sutra";
  const description = String(
    tour.metaDescription ?? tour.description ?? tour.caption ?? `Explore ${tour.title} with Safari Sutra — itinerary, inclusions and departure dates.`
  );
  const image = String(tour.heroImage ?? tour.image ?? "/logos/logo.svg");
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "tours", "Safari Sutra"].filter(Boolean),
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: String(image), alt: tour.title ?? "Safari Sutra" }] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [String(image)] : undefined,
    },
  };
}

export default function TourPageDetails({ params }: { params: { slug?: string | string[] } }) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  // pass serializable tour prop to client component
  const tourProp = JSON.parse(JSON.stringify(tour)) as Tour;

  return <TourPageClient tour={tourProp} />;
}