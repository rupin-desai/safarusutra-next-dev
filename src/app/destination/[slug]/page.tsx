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

import destinationDetailsRaw from "@/data/DestinatonDetails.json"; // per-destination details (map or array)
import destinationsRaw from "@/data/Destinations.json"; // main array of destinations

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
  const raw: unknown = destinationsRaw;
  if (Array.isArray(raw)) return raw as Destination[];
  if (raw && typeof raw === "object") return Object.values(raw as Record<string, Destination>);
  return [];
};

/* Resolve per-destination details (map or array) by id or slug */
const resolveDetailsForIdOrSlug = (idOrSlug: string) => {
  const raw: unknown = destinationDetailsRaw;
  if (Array.isArray(raw)) {
    // try id match first, then slug/title fallback
    const byId = (raw as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      return String(e.id ?? "") === String(idOrSlug);
    });
    if (byId) return (byId as Record<string, unknown>) ?? {};
    const bySlug = (raw as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      const slug = e.slug ?? (typeof e.title === "string" ? createSlug(e.title) : undefined);
      return String(slug ?? "") === String(idOrSlug);
    });
    return (bySlug as Record<string, unknown>) ?? {};
  }
  if (raw && typeof raw === "object") {
    const map = raw as Record<string, unknown>;
    // direct key
    if (map[idOrSlug]) return (map[idOrSlug] as Record<string, unknown>) ?? {};
    // try numeric key
    const numericKey = Object.keys(map).find((k) => String(k) === String(idOrSlug));
    if (numericKey) return (map[numericKey] as Record<string, unknown>) ?? {};
    // try finding by id/slug within values
    const found = Object.values(map).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      return String(e.id ?? e.slug ?? (typeof e.title === "string" ? createSlug(e.title) : "")) === String(idOrSlug);
    });
    return (found as Record<string, unknown>) ?? {};
  }
  return {};
};

export async function generateStaticParams() {
  const items = getDestinationsArray();
  const params = items
    .map((d) => {
      const slugFromField = typeof d.slug === "string" && d.slug.trim().length > 0 ? d.slug.trim() : undefined;
      const title = typeof d.title === "string" ? d.title.trim() : "";
      const slugFallback = title ? createSlug(title) : d.id ? String(d.id) : undefined;
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
  let destination = destinations.find((d) => {
    const candidate = d?.slug ? String(d.slug) : createSlug(String(d?.title ?? ""));
    return String(candidate) === String(slug);
  });

  // fallback: try to resolve a detail entry that matches slug
  if (!destination) {
    const det = resolveDetailsForIdOrSlug(slug);
    if (det && Object.keys(det).length > 0) {
      destination = {
        id: det.id,
        title: String(det.title ?? det.name ?? ""),
        slug: det.slug ?? slug,
        description: String(det.description ?? ""),
        image: String(det.image ?? det.heroImage ?? ""),
      } as Destination;
    }
  }

  if (!destination) {
    return {
      title: "Destination Not Found | Safari Sutra",
      description: "The destination you are looking for could not be found.",
    };
  }

  const id = destination.id ? String(destination.id) : String(destination.slug ?? "");
  const details = resolveDetailsForIdOrSlug(id);

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

export default function Page({ params }: { params: { slug?: string } }) {
  const slug = params?.slug ?? "";
  if (!slug) return notFound();

  const destinations = getDestinationsArray();

  // find by slug/title in primary destinations array
  let destination = destinations.find((d) => {
    const candidate = d?.slug ? String(d.slug) : createSlug(String(d?.title ?? ""));
    return String(candidate) === String(slug);
  });

  // fallback: if not found in array, try destinationDetails map/array
  if (!destination) {
    const det = resolveDetailsForIdOrSlug(slug);
    if (det && Object.keys(det).length > 0) {
      destination = {
        id: det.id,
        title: String(det.title ?? det.name ?? ""),
        slug: det.slug ?? slug,
        description: String(det.description ?? ""),
        image: String(det.image ?? det.heroImage ?? ""),
      } as Destination;
    }
  }

  if (!destination) return notFound();

  const id = destination.id ? String(destination.id) : String(destination.slug ?? "");

  // get per-destination details
  const details = resolveDetailsForIdOrSlug(id);
  const completeData: Record<string, unknown> = { ...destination, ...details };

  // helpers
  const getString = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
  const parseRating = (v: unknown): number | undefined => {
    if (v == null) return undefined;
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const n = Number(String(v).replace(/[^\d.]/g, ""));
      return Number.isFinite(n) ? n : undefined;
    }
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      return parseRating(o.rating ?? o.Rating ?? o.score ?? o.value ?? o.stars);
    }
    return undefined;
  };

  // normalize FAQ into the shape DestinationFAQs expects: { items?: {question, answer}[] } | null
  type FAQLocal = { question: string; answer: string };
  const faqRaw = completeData.faq;
  const faqProp: { items?: FAQLocal[] } | null =
    faqRaw && typeof faqRaw === "object"
      ? (() => {
          const items = (faqRaw as Record<string, unknown>).items;
          if (!Array.isArray(items)) return null;
          const mapped = (items as unknown[])
            .map((it) => {
              const o = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
              const question = getString(o.question ?? o.q ?? "");
              const answer = getString(o.answer ?? o.a ?? "");
              return { question, answer };
            })
            .filter((x) => x.question || x.answer);
          return mapped.length ? { items: mapped } : null;
        })()
      : null;

  // build detailsProp expected by DestinationDetailsOverview (Detail[])
  const detailsObj = (details && typeof details === "object" ? (details as Record<string, unknown>) : {}) as Record<
    string,
    unknown
  >;
  const detailsProp: { title: string; description?: string }[] = [];
  if (Array.isArray(detailsObj.details)) {
    (detailsObj.details as unknown[]).forEach((item) => {
      const o = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const title = getString(o.title ?? o.name ?? o.label ?? "");
      const description = getString(o.description ?? o.desc ?? o.value ?? "");
      if (title) detailsProp.push({ title, description: description || undefined });
    });
  } else {
    for (const [key, val] of Object.entries(detailsObj)) {
      if (
        [
          "id",
          "title",
          "slug",
          "heroImage",
          "image",
          "metaDescription",
          "description",
          "caption",
          "location",
          "faq",
          "tourWhy",
        ].includes(key)
      )
        continue;
      if (val == null) continue;
      if (typeof val === "string") {
        const title = getString(key);
        const description = getString(val);
        detailsProp.push({ title, description: description || undefined });
      } else if (typeof val === "object") {
        const o = val as Record<string, unknown>;
        const title = getString(o.title ?? key);
        const description = getString(o.description ?? o.desc ?? o.value ?? "");
        if (title) detailsProp.push({ title, description: description || undefined });
      }
    }
  }

  // attractions
  type AttractionLocal = { title?: string; image?: string; description?: string };
  const attractionsProp: AttractionLocal[] = Array.isArray(completeData.attractions)
    ? (completeData.attractions as unknown[]).map((a) => {
        const o = (a && typeof a === "object" ? (a as Record<string, unknown>) : {}) as Record<string, unknown>;
        return {
          title: getString(o.title),
          image: getString(o.image),
          description: getString(o.description),
        };
      })
    : [];

  // try to resolve rating from merged data, details, or destinations array fallback
  const altFromArray =
    Array.isArray(destinationsRaw) && id
      ? (destinationsRaw as unknown[]).find((a) => {
          if (!a || typeof a !== "object") return false;
          const o = a as Record<string, unknown>;
          return String(o.id ?? "") === String(id);
        })
      : undefined;

  const tourDataProp = {
    title: getString(completeData.title),
    rating:
      parseRating(completeData.rating ?? completeData.Rating ?? details.rating ?? details.Rating) ??
      parseRating(altFromArray ? (altFromArray as Record<string, unknown>).rating : undefined),
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

      <DestinationPackages destinationName={String(completeData.title)} destinationId={id ? Number(id) : undefined} />

      <DestinationRelated relatedTours={[]} currentTourId={id ? Number(id) : undefined} allTours={destinations} />

      <ContactSection />

      <DestinationFAQs faq={faqProp} destinationTitle={String(completeData.title)} />
    </div>
  );
}
