import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";

// Import client components (they stay as children)
import TourHero from "../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../components/Pages/TourDetailsPage/TourTabs";
import TourOverview from "../../../components/Pages/TourDetailsPage/TourOverview";
import TourItinerary from "../../../components/Pages/TourDetailsPage/TourItinerary";
import TourInclusions from "../../../components/Pages/TourDetailsPage/TourInclusions";
import TourPolicy from "../../../components/Pages/TourDetailsPage/TourPolicy";
import TourSidebar from "../../../components/Pages/TourDetailsPage/TourSidebar";

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
  const description =
    (tour.metaDescription as string) ||
    (tour.description as string) ||
    (tour.caption as string) ||
    `Explore ${tour.title} with Safari Sutra — itinerary, inclusions and departure dates.`;
  const image = (tour.heroImage as string) || (tour.image as string) || "/logos/logo.svg";
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "tours", "Safari Sutra"].filter(Boolean),
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />
      <TourTabs />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TourOverview tour={tour} />
            <TourItinerary tour={tour} />
            <TourInclusions tour={tour} />
            <TourPolicy tour={tour} />
          </div>

          <div className="lg:col-span-1">
            <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
          </div>
        </div>
      </div>
    </div>
  );
}