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
  
  // New responsive image properties
  srcSetWebp?: string;
  srcFallback?: string;
  alt?: string;
  imageTitle?: string;
  
  // Legacy image properties for backward compatibility
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
  itinerary?: ItineraryDay[];
  route?: string;
  [k: string]: unknown;
};

type ItineraryDay = {
  day?: number;
  title?: string;
  description?: string;
  location?: string;
  activities?: string[];
  meals?: {
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
    [key: string]: unknown;
  };
  accommodation?: string;
  [key: string]: unknown;
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
    
    // New responsive image properties
    srcSetWebp: typeof e.srcSetWebp === "string" ? e.srcSetWebp : undefined,
    srcFallback: typeof e.srcFallback === "string" ? e.srcFallback : undefined,
    alt: typeof e.alt === "string" ? e.alt : undefined,
    imageTitle: typeof e.imageTitle === "string" ? e.imageTitle : undefined,
    
    // Legacy image properties
    heroImage: typeof e.heroImage === "string" ? e.heroImage : undefined,
    image: typeof e.image === "string" ? e.image : undefined,
    
    metaDescription: typeof e.metaDescription === "string" ? e.metaDescription : undefined,
    description: typeof e.description === "string" ? e.description : undefined,
    caption: typeof e.caption === "string" ? e.caption : undefined,
    duration: typeof e.duration === "string" ? e.duration : undefined,
    price: typeof e.price === "number" ? e.price : typeof e.price === "string" ? e.price : undefined,
    location: typeof e.location === "string" ? e.location : undefined,
    route: typeof e.route === "string" ? e.route : undefined,
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

// Generate TouristTrip JSON-LD schema
const generateTouristTripJsonLd = (tour: Tour, slug: string) => {
  if (!tour || !Array.isArray(tour.itinerary) || tour.itinerary.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title || "Tour Package",
    "description": tour.description || `${tour.title} itinerary`,
    "image": tour.srcFallback || tour.heroImage || tour.image,
    "url": `https://thesafarisutra.com/tour/${slug}/itinerary`,
    "touristType": "leisure",
    "duration": tour.duration,
    ...(tour.price && {
      "offers": {
        "@type": "Offer",
        "price": typeof tour.price === "string" ? tour.price.replace(/[^\d.]/g, "") : String(tour.price),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    }),
    "itinerary": tour.itinerary.map((day: ItineraryDay, idx: number) => ({
      "@type": "TouristAttraction", 
      "name": `Day ${day.day !== undefined ? day.day : idx + 1}: ${day.title || "Tour Day"}`,
      "description": day.description,
      ...(day.location && {
        "address": {
          "@type": "PostalAddress",
          "addressLocality": day.location
        }
      }),
      ...(Array.isArray(day.activities) && day.activities.length > 0 && {
        "potentialAction": day.activities.map((activity: string) => ({
          "@type": "Action",
          "name": activity
        }))
      })
    })),
    "subTrip": tour.itinerary.map((day: ItineraryDay, idx: number) => ({
      "@type": "Trip",
      "name": `Day ${day.day !== undefined ? day.day : idx + 1}`,
      "description": day.description,
      "partOfTrip": {
        "@type": "TouristTrip", 
        "name": tour.title
      },
      ...(day.location && {
        "arrivalLocation": {
          "@type": "Place",
          "name": day.location
        }
      }),
      ...(day.accommodation && {
        "accommodationBooking": {
          "@type": "LodgingReservation",
          "lodgingBusiness": {
            "@type": "LodgingBusiness",
            "name": day.accommodation
          }
        }
      })
    }))
  };
};

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
  params: Promise<{ slug?: string | string[] }>; // Fixed: Next.js 15 async params
}): Promise<Metadata> {
  const { slug: rawSlug } = await params; // Fixed: await params
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
  // Use new responsive properties first, then fallback to legacy
  const image = tour.srcFallback || (tour.heroImage as string) || (tour.image as string) || "/logos/logo.svg";
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}/itinerary`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "itinerary", "tour", "Safari Sutra"].filter(Boolean),
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image, alt: tour.alt ?? tour.title ?? "Safari Sutra" }] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function TourItineraryPage({ params }: { params: Promise<{ slug?: string | string[] }> }) { // Fixed: Next.js 15 async params and async function
  const { slug: rawSlug } = await params; // Fixed: await params
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug ? String(t.slug) : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  const activeTab = "itinerary";

  // Generate JSON-LD for structured data
  const jsonLd = generateTouristTripJsonLd(tour, slug);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Add JSON-LD structured data at page level */}
      {jsonLd && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      )}

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
