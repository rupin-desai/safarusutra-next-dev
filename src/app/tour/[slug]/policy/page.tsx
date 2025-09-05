import Head from "next/head";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";

import TourHero from "../../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../../components/Pages/TourDetailsPage/TourTabs";
import TourPolicy from "../../../../components/Pages/TourDetailsPage/TourPolicy";
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

  const activeTab = "itinerary";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{`${tour.title} | Safari Sutra`}</title>
        <meta name="description" content={String(tour.description ?? "").slice(0, 160)} />
        <link rel="canonical" href={`https://thesafarisutra.com/tour/${encodeURIComponent(slug)}/itinerary`} />
      </Head>

      <TourHero tour={tour} />

      <TourTabs initialTab={activeTab} slug={slug} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
