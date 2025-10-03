import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tourDataRaw from "@/data/TourDetails.json";
import TourPageClient from "./TourPage.client";
import type { Tour } from "@/components/UI/TourCard";

// Add this type definition
type ItineraryDay = {
  day?: number;
  title?: string;
  description?: string;
  location?: string;
  activities?: string[];
};

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
  const id =
    typeof rawId === "number" || typeof rawId === "string" ? rawId : undefined;

  const rawCategory = e.category ?? e.categories ?? e["Category"];
  let category: string | string[] | undefined;
  if (typeof rawCategory === "string") category = rawCategory;
  else if (Array.isArray(rawCategory))
    category = rawCategory.map((c) => (typeof c === "string" ? c : String(c)));
  else category = undefined;

  const highlights = Array.isArray(e.highlights)
    ? (e.highlights as unknown[]).map((h) =>
        typeof h === "string" ? h : String(h)
      )
    : undefined;

  // Handle gallery with new responsive properties
  const gallery = Array.isArray(e.gallery)
    ? (e.gallery as unknown[]).map((g) => {
        if (typeof g === "string") return g; // Legacy string format
        if (g && typeof g === "object") {
          const galleryItem = g as Record<string, unknown>;
          return {
            srcSetWebp:
              typeof galleryItem.srcSetWebp === "string"
                ? galleryItem.srcSetWebp
                : undefined,
            srcFallback:
              typeof galleryItem.srcFallback === "string"
                ? galleryItem.srcFallback
                : undefined,
            alt:
              typeof galleryItem.alt === "string" ? galleryItem.alt : undefined,
            imageTitle:
              typeof galleryItem.imageTitle === "string"
                ? galleryItem.imageTitle
                : undefined,
            ...galleryItem,
          };
        }
        return String(g ?? "");
      })
    : undefined;

  const attractions = Array.isArray(e.attractions)
    ? (e.attractions as unknown[]).map((a) =>
        typeof a === "string" ? a : String(a)
      )
    : undefined;

  const inclusions = Array.isArray(e.inclusions)
    ? (e.inclusions as unknown[]).map((v) => String(v))
    : undefined;
  const exclusions = Array.isArray(e.exclusions)
    ? (e.exclusions as unknown[]).map((v) => String(v))
    : undefined;
  const cancellationPolicy = Array.isArray(e.cancellationPolicy)
    ? (e.cancellationPolicy as unknown[]).map((v) => String(v))
    : undefined;

  const itinerary = Array.isArray(e.itinerary)
    ? (e.itinerary as unknown[]).map((it) => {
        if (!it || typeof it !== "object") return {};
        const o = it as Record<string, unknown>;
        return {
          day:
            typeof o.day === "number"
              ? o.day
              : typeof o.day === "string"
              ? Number(o.day)
              : undefined,
          title: typeof o.title === "string" ? o.title : undefined,
          description:
            typeof o.description === "string" ? o.description : undefined,
          activities: Array.isArray(o.activities)
            ? (o.activities as unknown[]).map((a) => String(a))
            : undefined,
          ...o,
        };
      })
    : undefined;

  const availableDates = Array.isArray(e.availableDates)
    ? (e.availableDates as unknown[]).map((m) => {
        const md =
          m && typeof m === "object" ? (m as Record<string, unknown>) : {};
        const month = md.month ? String(md.month) : "";
        const dates = Array.isArray(md.dates)
          ? (md.dates as unknown[]).map((d) => {
              const dd =
                d && typeof d === "object"
                  ? (d as Record<string, unknown>)
                  : {};
              return {
                range: dd.range ? String(dd.range) : String(d ?? ""),
                enabled: dd.enabled === false ? false : true,
                ...dd,
              };
            })
          : [];
        return { month, dates };
      })
    : undefined;

  return {
    id,
    title:
      typeof e.title === "string"
        ? e.title
        : typeof e.name === "string"
        ? e.name
        : undefined,
    subtitle: typeof e.subtitle === "string" ? e.subtitle : undefined,
    slug: typeof e.slug === "string" ? e.slug : undefined,

    // New responsive image properties
    srcSetWebp: typeof e.srcSetWebp === "string" ? e.srcSetWebp : undefined,
    srcFallback: typeof e.srcFallback === "string" ? e.srcFallback : undefined,
    alt: typeof e.alt === "string" ? e.alt : undefined,
    imageTitle: typeof e.imageTitle === "string" ? e.imageTitle : undefined,

    // Legacy image properties for backward compatibility
    heroImage: typeof e.heroImage === "string" ? e.heroImage : undefined,
    image: typeof e.image === "string" ? e.image : undefined,

    metaDescription:
      typeof e.metaDescription === "string" ? e.metaDescription : undefined,
    description: typeof e.description === "string" ? e.description : undefined,
    caption: typeof e.caption === "string" ? e.caption : undefined,
    duration: typeof e.duration === "string" ? e.duration : undefined,
    price:
      typeof e.price === "number"
        ? e.price
        : typeof e.price === "string"
        ? e.price
        : undefined,
    route: typeof e.route === "string" ? e.route : undefined,
    location: typeof e.location === "string" ? e.location : undefined,
    category,
    highlights,
    gallery,
    attractions,
    itinerary,
    inclusions,
    exclusions,
    cancellationPolicy,
    availableDates,
    featured: typeof e.featured === "boolean" ? e.featured : undefined,
    relatedDestinations: Array.isArray(e.relatedDestinations)
      ? (e.relatedDestinations as Array<string | number>)
      : undefined,
    destinationNames: Array.isArray(e.destinationNames)
      ? (e.destinationNames as unknown[]).map((d) => String(d))
      : undefined,
    locationType:
      typeof e.locationType === "string" ? e.locationType : undefined,
    bestTime: typeof e.bestTime === "string" ? e.bestTime : undefined,
    contact: typeof e.contact === "string" ? e.contact : undefined,
    notes: typeof e.notes === "string" ? e.notes : undefined,
  } as Tour;
};

/* Normalize tour data to an array (supports both array and object shapes) */
const getToursArray = (): Tour[] => {
  const raw: unknown = tourDataRaw;
  if (Array.isArray(raw)) return (raw as unknown[]).map(normalizeEntry);
  if (raw && typeof raw === "object")
    return Object.values(raw as Record<string, unknown>).map(normalizeEntry);
  return [];
};

export async function generateStaticParams() {
  const tours = getToursArray();
  if (!tours || tours.length === 0) return [];

  const params = tours
    .map((t) => {
      const candidate = t?.slug
        ? String(t.slug)
        : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
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
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      alternates: {
        canonical: "https://thesafarisutra.com/tour",
      },
    };
  }

  const tours = getToursArray();
  const tour = tours.find((t) => {
    const candidate = t?.slug
      ? String(t.slug)
      : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) {
    return {
      title: "Tour Not Found | Safari Sutra",
      description: "The tour you are looking for could not be found.",
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
      alternates: {
        canonical: "https://thesafarisutra.com/tour",
      },
    };
  }

  const title = tour.title
    ? `${tour.title} | Safari Sutra`
    : "Tour | Safari Sutra";
  const description = String(
    tour.metaDescription ??
      tour.description ??
      tour.caption ??
      `Explore ${tour.title} with Safari Sutra — itinerary, inclusions and departure dates.`
  );

  // Use new responsive image properties or fallback to legacy
  const image = String(
    tour.srcFallback ?? tour.heroImage ?? tour.image ?? "/logos/logo.svg"
  );
  const url = `https://thesafarisutra.com/tour/${encodeURIComponent(slug)}`;

  return {
    title,
    description,
    keywords: [tour.title ?? "", "tours", "Safari Sutra"].filter(Boolean),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: image
        ? [
            {
              url: String(image),
              alt: tour.alt ?? tour.title ?? "Safari Sutra",
            },
          ]
        : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [String(image)] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

function getFullImageUrl(src: string): string {
  if (!src)
    return "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2";
  if (src.startsWith("http")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `https://thesafarisutra.com${path}`;
}

export default function TourPageDetails({
  params,
}: {
  params: { slug?: string | string[] };
}) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  if (!slug) return notFound();

  const tours = getToursArray();

  const tour = tours.find((t) => {
    const candidate = t?.slug
      ? String(t.slug)
      : createSlug(String(t?.title ?? "")) || (t?.id ? String(t.id) : "");
    return String(candidate) === String(slug);
  });

  if (!tour) return notFound();

  // --- JSON-LD schemas ---
  // FIX: Ensure slug is properly defined
  const pageSlug = tour.slug || createSlug(String(tour?.title ?? ""));

  // --- Optimized JSON-LD schema ---
  // Helper: ISO 8601 duration (e.g. "P4D" for 4 days)
  function toIsoDuration(duration?: string): string | undefined {
    if (!duration) return undefined;
    const dayMatch = duration.match(
      /(\d+)\s*D|(\d+)\s*Days|(\d+)\s*N\s*-\s*(\d+)D/i
    );
    if (dayMatch) {
      const days = dayMatch[4] || dayMatch[1] || dayMatch[2] || dayMatch[3];
      if (days) return `P${days}D`;
    }
    const num = duration.match(/\d+/);
    if (num) return `P${num[0]}D`;
    return undefined;
  }

  // Deduplicate keywords
  function getUniqueKeywords(tour: Tour): string[] {
    const arr = [
      ...(Array.isArray(tour.category)
        ? tour.category
        : tour.category
        ? [tour.category]
        : []),
      ...(tour.destinationNames ?? []),
      ...(tour.attractions?.slice(0, 10) ?? []), // Limit to top 10 attractions
    ]
      .map((k) => String(k).trim())
      .filter(Boolean);
    return Array.from(new Set(arr));
  }

  const isoDuration = toIsoDuration(tour.duration);
  const keywords = getUniqueKeywords(tour);

  // Group additionalProperty items by type for better structure
  const inclusionsProps = (tour.inclusions ?? []).map((inc: string) => ({
    "@type": "PropertyValue",
    name: "Inclusion",
    value: inc,
  }));

  const exclusionsProps = (tour.exclusions ?? []).map((exc: string) => ({
    "@type": "PropertyValue",
    name: "Exclusion",
    value: exc,
  }));

  const cancellationProps = (tour.cancellationPolicy ?? []).map(
    (rule: string) => ({
      "@type": "PropertyValue",
      name: "Cancellation Policy",
      value: rule,
    })
  );

  const optimizedJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title || "Tour Package",
    description: tour.description || tour.metaDescription || "",
    image: getFullImageUrl(
      tour.srcFallback || tour.heroImage || tour.image || ""
    ),
    url: `https://thesafarisutra.com/tour/${pageSlug}`,
    touristType: "leisure",
    keywords,
    duration: isoDuration,
    provider: {
      "@type": "Organization",
      name: "Safari Sutra",
      url: "https://thesafarisutra.com",
    },
    offers: {
      "@type": "Offer",
      price:
        typeof tour.price === "number" ? String(tour.price) : tour.price ?? "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://thesafarisutra.com/tour/${pageSlug}`,
    },
    itinerary: Array.isArray(tour.itinerary)
      ? tour.itinerary.map((day: ItineraryDay, idx: number) => {
          const item: Record<string, unknown> = {
            "@type": "TouristAttraction",
            name: `Day ${day.day !== undefined ? day.day : idx + 1}: ${
              day.title || "Tour Day"
            }`,
            description: day.description,
          };
          if (day.location) {
            item.address = {
              "@type": "PostalAddress",
              addressLocality: day.location,
            };
          }
          if (Array.isArray(day.activities) && day.activities.length > 0) {
            item.keywords = day.activities.join(", ");
          }
          return item;
        })
      : [],
    additionalProperty: [
      ...inclusionsProps,
      ...exclusionsProps,
      ...cancellationProps,
    ],
  };

  // pass serializable tour prop to client component with all responsive image properties
  const tourProp = JSON.parse(JSON.stringify(tour)) as Tour;

  return (
    <>
      {/* Only inject the optimized schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizedJsonLd) }}
      />

      {/* Main client component */}
      <TourPageClient tour={tourProp} />
    </>
  );
}
