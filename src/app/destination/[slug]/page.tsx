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
import ScrollProvider from "@/components/Pages/DestinationDetailsPage/ScrollProvider.client";

import destinationDetailsRaw from "@/data/DestinatonDetails.json";
import destinationsRaw from "@/data/Destinations.json";

// --- Helpers ---
const getString = (v: unknown) =>
  typeof v === "string" ? v : v == null ? "" : String(v);

function getHeroImageObj(val: unknown): {
  srcSetWebp?: string;
  srcFallback?: string;
  alt?: string;
  imageTitle?: string;
} {
  if (val && typeof val === "object") {
    const o = val as Record<string, unknown>;
    return {
      srcSetWebp: typeof o.srcSetWebp === "string" ? o.srcSetWebp : "",
      srcFallback: typeof o.srcFallback === "string" ? o.srcFallback : "",
      alt: typeof o.alt === "string" ? o.alt : "",
      imageTitle: typeof o.imageTitle === "string" ? o.imageTitle : "",
    };
  }
  if (typeof val === "string") {
    return { srcFallback: val };
  }
  return {};
}

function getImageObj(val: unknown): {
  srcSetWebp?: string;
  srcFallback?: string;
} {
  if (val && typeof val === "object") {
    const o = val as Record<string, unknown>;
    return {
      srcSetWebp: typeof o.srcSetWebp === "string" ? o.srcSetWebp : "",
      srcFallback: typeof o.srcFallback === "string" ? o.srcFallback : "",
    };
  }
  if (typeof val === "string") {
    return { srcFallback: val };
  }
  return {};
}

function parseRating(val: unknown): number | undefined {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const num = parseFloat(val);
    return isNaN(num) ? undefined : num;
  }
  return undefined;
}

const createSlug = (text: string) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

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

const getDestinationsArray = (): Destination[] => {
  const raw: unknown = destinationsRaw;
  if (Array.isArray(raw)) return raw as Destination[];
  if (raw && typeof raw === "object")
    return Object.values(raw as Record<string, Destination>);
  return [];
};

const resolveDetailsForIdOrSlug = (idOrSlug: string) => {
  const raw: unknown = destinationDetailsRaw;
  if (Array.isArray(raw)) {
    const byId = (raw as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      return String(e.id ?? "") === String(idOrSlug);
    });
    if (byId) return (byId as Record<string, unknown>) ?? {};
    const bySlug = (raw as unknown[]).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      const slug =
        e.slug ??
        (typeof e.title === "string" ? createSlug(e.title) : undefined);
      return String(slug ?? "") === String(idOrSlug);
    });
    return (bySlug as Record<string, unknown>) ?? {};
  }
  if (raw && typeof raw === "object") {
    const map = raw as Record<string, unknown>;
    if (map[idOrSlug]) return (map[idOrSlug] as Record<string, unknown>) ?? {};
    const numericKey = Object.keys(map).find(
      (k) => String(k) === String(idOrSlug)
    );
    if (numericKey) return (map[numericKey] as Record<string, unknown>) ?? {};
    const found = Object.values(map).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const e = entry as Record<string, unknown>;
      return (
        String(
          e.id ??
            e.slug ??
            (typeof e.title === "string" ? createSlug(e.title) : "")
        ) === String(idOrSlug)
      );
    });
    return (found as Record<string, unknown>) ?? {};
  }
  return {};
};

export async function generateStaticParams() {
  const items = getDestinationsArray();
  const params = items
    .map((d) => {
      const slugFromField =
        typeof d.slug === "string" && d.slug.trim().length > 0
          ? d.slug.trim()
          : undefined;
      const title = typeof d.title === "string" ? d.title.trim() : "";
      const slugFallback = title
        ? createSlug(title)
        : d.id
        ? String(d.id)
        : undefined;
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
        canonical: "https://thesafarisutra.com/destination",
      },
      openGraph: {
        title: "Destination | Safari Sutra",
        type: "website",
        url: "https://thesafarisutra.com/destination",
        description: "Discover destinations and travel guides at Safari Sutra.",
        siteName: "Safari Sutra",
        images: [
          {
            url: "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2",
            alt: "Safari Sutra Destination",
          },
        ],
      },
    };
  }

  const destinations = getDestinationsArray();
  let destination = destinations.find((d) => {
    const candidate = d?.slug
      ? String(d.slug)
      : createSlug(String(d?.title ?? ""));
    return String(candidate) === String(slug);
  });

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
        canonical: "https://thesafarisutra.com/destination",
      },
      openGraph: {
        title: "Destination Not Found | Safari Sutra",
        type: "website",
        url: "https://thesafarisutra.com/destination",
        description: "The destination you are looking for could not be found.",
        siteName: "Safari Sutra",
        images: [
          {
            url: "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2",
            alt: "Safari Sutra Destination Not Found",
          },
        ],
      },
    };
  }

  const id = destination.id
    ? String(destination.id)
    : String(destination.slug ?? "");
  const details = resolveDetailsForIdOrSlug(id);

  const completeData = { ...destination, ...details };

  const title = completeData.title
    ? `${String(completeData.title)} | Safari Sutra Tours & Travels in India`
    : "Destination | Safari Sutra";
  const description =
    String(
      completeData.metaDescription ||
        completeData.description ||
        completeData.caption
    ) ||
    `Explore ${String(
      completeData.title
    )} with Safari Sutra — itineraries, highlights, packages and FAQs.`;

  const image = String(
    completeData.heroImage ||
      completeData.image ||
      "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2"
  );
  const url = `https://thesafarisutra.com/destination/${slug}`;

  return {
    title,
    description,
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
      canonical: url,
    },
    openGraph: {
      title,
      type: "website",
      url,
      description,
      siteName: "Safari Sutra",
      images: [
        {
          url: image,
          alt: String(completeData.title) || "Safari Sutra Destination",
        },
      ],
    },
  };
}

export default function Page({ params }: { params: { slug?: string } }) {
  const slug = params?.slug ?? "";
  if (!slug) return notFound();

  const destinations = getDestinationsArray();

  let destination = destinations.find((d) => {
    const candidate = d?.slug
      ? String(d.slug)
      : createSlug(String(d?.title ?? ""));
    return String(candidate) === String(slug);
  });

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

  const id = destination.id
    ? String(destination.id)
    : String(destination.slug ?? "");

  const details = resolveDetailsForIdOrSlug(id);
  const completeData: Record<string, unknown> = { ...destination, ...details };

  // --- FAQ ---
  type FAQLocal = { question: string; answer: string };
  const faqRaw = completeData.faq;
  const faqProp: { items?: FAQLocal[] } | null =
    faqRaw && typeof faqRaw === "object"
      ? (() => {
          const items = (faqRaw as Record<string, unknown>).items;
          if (!Array.isArray(items)) return null;
          const mapped = (items as unknown[])
            .map((it) => {
              const o =
                it && typeof it === "object"
                  ? (it as Record<string, unknown>)
                  : {};
              const question = getString(o.question ?? o.q ?? "");
              const answer = getString(o.answer ?? o.a ?? "");
              return { question, answer };
            })
            .filter((x) => x.question || x.answer);
          return mapped.length ? { items: mapped } : null;
        })()
      : null;

  // --- Details ---
  const detailsObj = (
    details && typeof details === "object"
      ? (details as Record<string, unknown>)
      : {}
  ) as Record<string, unknown>;
  const detailsProp: { title: string; description?: string }[] = [];
  if (Array.isArray(detailsObj.details)) {
    (detailsObj.details as unknown[]).forEach((item) => {
      const o =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};
      const title = getString(o.title ?? o.name ?? o.label ?? "");
      const description = getString(o.description ?? o.desc ?? o.value ?? "");
      if (title)
        detailsProp.push({ title, description: description || undefined });
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
        if (title)
          detailsProp.push({ title, description: description || undefined });
      }
    }
  }

  // --- Attractions ---
  type AttractionLocal = {
    title?: string;
    image?: string;
    description?: string;
    srcSetWebp?: string;
    srcFallback?: string;
  };
  const attractionsProp: AttractionLocal[] = Array.isArray(
    completeData.attractions
  )
    ? (completeData.attractions as unknown[]).map((a) => {
        const o = (
          a && typeof a === "object" ? (a as Record<string, unknown>) : {}
        ) as Record<string, unknown>;
        return {
          title: getString(o.title),
          image: getString(o.image),
          description: getString(o.description),
          srcSetWebp: getString(o.srcSetWebp),
          srcFallback: getString(o.srcFallback),
        };
      })
    : [];

  // --- Tour Data ---
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
      parseRating(
        completeData.rating ??
          completeData.Rating ??
          details.rating ??
          details.Rating
      ) ??
      parseRating(
        altFromArray
          ? (altFromArray as Record<string, unknown>).rating
          : undefined
      ),
    location: getString(completeData.location),
    description: getString(completeData.description),
    longDescription: getString(
      completeData.longDescription ?? completeData.long_description
    ),
    details: detailsProp,
    attractions: attractionsProp,
  };

  // --- TourWhy ---
  type TourWhyLocal = {
    title?: string;
    description?: string;
    backgroundImage?: string;
    srcSetWebp?: string;
    srcFallback?: string;
  };
  const tourWhyRaw = completeData.tourWhy;
  const tourWhyProp: TourWhyLocal | undefined =
    tourWhyRaw && typeof tourWhyRaw === "object"
      ? (() => {
          const o = tourWhyRaw as Record<string, unknown>;
          const bgObj = getImageObj(o.backgroundImage);
          return {
            title: getString(o.title),
            description: getString(o.description),
            backgroundImage: bgObj.srcFallback,
            srcSetWebp: bgObj.srcSetWebp,
            srcFallback: bgObj.srcFallback,
          };
        })()
      : undefined;

  // --- Hero Image ---
  const heroImageObj = getHeroImageObj(completeData.heroImage);

  // --- JSON-LD ---
  const getFullImageUrl = (src: string): string => {
    if (!src)
      return "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2";
    if (src.startsWith("http")) return src;
    const path = src.startsWith("/") ? src : `/${src}`;
    return `https://thesafarisutra.com${path}`;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getString(completeData.title),
    description: getString(
      completeData.metaDescription ||
        completeData.description ||
        completeData.caption
    ),
    image: getFullImageUrl(
      getString(completeData.heroImage || completeData.image)
    ),
    brand: {
      "@type": "Brand",
      name: "Safari Sutra",
    },
    category: getString(completeData.location),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://thesafarisutra.com/destination/${slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        title={String(completeData.title)}
        backgroundImage={heroImageObj.srcFallback}
        srcSetWebp={heroImageObj.srcSetWebp}
        alt={
          heroImageObj.alt ||
          heroImageObj.imageTitle ||
          String(completeData.title)
        }
        overlay={0.4}
        titleSize="text-4xl md:text-6xl"
      />

      <ScrollProvider />

      <DestinationDetailsOverview tourData={tourDataProp} />

      {!!tourWhyProp && (
        <DestinationWhy
          tour={{ title: getString(completeData.title), tourWhy: tourWhyProp }}
        />
      )}

      <DestinationAttractions attractions={attractionsProp} />

      <DestinationPackages
        destinationName={String(completeData.title)}
        destinationId={id ? Number(id) : undefined}
      />

      <DestinationRelated
        relatedTours={[]}
        currentTourId={id ? Number(id) : undefined}
        allTours={destinations}
      />

      <ContactSection />

      <DestinationFAQs
        faq={faqProp}
        destinationTitle={String(completeData.title)}
      />
    </div>
  );
}
