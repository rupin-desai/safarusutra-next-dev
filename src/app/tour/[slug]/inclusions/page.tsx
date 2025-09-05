import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";

import TourHero from "../../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../../components/Pages/TourDetailsPage/TourTabs";
import TourInclusions from "../../../../components/Pages/TourDetailsPage/TourInclusions";
import TourSidebar from "../../../../components/Pages/TourDetailsPage/TourSidebar";

/* Normalize tour data to an array (supports both array and object shapes) */
const getToursArray = (): any[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return raw as any[];
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, any>);
  return [];
};

/* Create a safe slug fallback from title */
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

export default function TourInclusionsPage({ params }: { params: { slug?: string | string[] } }) {
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

      <TourTabs initialTab={activeTab} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TourInclusions tour={tour} />
          </div>

          <div className="lg:col-span-1">
            <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
          </div>
        </div>
      </div>
    </div>
  );
}
