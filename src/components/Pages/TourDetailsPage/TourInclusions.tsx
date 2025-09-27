import React from "react";
import Head from "next/head";
import { CheckCircle } from "lucide-react";
import type { Tour as BaseTour, GalleryItem } from "@/components/UI/TourCard";

const TourInclusions = ({ tour }: { tour?: BaseTour | null }) => {
  const inclusions: string[] = Array.isArray(tour?.inclusions)
    ? (tour!.inclusions as string[])
    : [];
  const exclusions: string[] = Array.isArray(tour?.exclusions)
    ? (tour!.exclusions as string[])
    : [];

  // improved SEO title
  const metaTitle = tour?.title
    ? `${tour.title} — Inclusions & What&apos;s Included | Safari Sutra`
    : "Tour Inclusions — What&apos;s Included | Safari Sutra";

  const metaDescription =
    (inclusions.length && inclusions.slice(0, 5).join(", ")) ||
    (typeof tour?.description === "string" ? tour.description.slice(0, 160) : undefined) ||
    "Tour inclusions and exclusions on Safari Sutra.";

  const origin =
    typeof window !== "undefined" && window.location && window.location.origin
      ? window.location.origin
      : "https://thesafarisutra.com";

  const pageUrl =
    typeof window !== "undefined" && window.location
      ? `${window.location.origin}${window.location.pathname}${
          window.location.search || ""
        }`
      : `${origin}/tour/${tour?.id || ""}`;

  // Fix: Handle both string and GalleryItem types in gallery
  const getImageUrl = (galleryItem: string | GalleryItem | undefined): string => {
    if (!galleryItem) return "/og-default.jpg";
    
    if (typeof galleryItem === "string") {
      return galleryItem;
    }
    
    // GalleryItem object - prioritize srcFallback, then srcSetWebp
    return galleryItem.srcFallback || galleryItem.srcSetWebp || "/og-default.jpg";
  };

  const ogImage = tour?.gallery && Array.isArray(tour.gallery) && tour.gallery.length > 0
    ? getImageUrl(tour.gallery[0])
    : "/og-default.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour?.title || "Tour",
    description: tour?.subtitle || tour?.description || metaDescription,
    image: ogImage,
    provider: {
      "@type": "Organization",
      name: "Safari Sutra",
      url: origin,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Inclusions & Exclusions",
      itemListElement: [
        ...inclusions.slice(0, 10).map((inc: string, i: number) => ({
          "@type": "Offer",
          name: `Inclusion ${i + 1}`,
          description: inc,
        })),
        ...exclusions.slice(0, 10).map((exc: string, i: number) => ({
          "@type": "Offer",
          name: `Exclusion ${i + 1}`,
          description: exc,
        })),
      ],
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <meta name="robots" content="index,follow" />

        <script
          type="application/ld+json"
          // Next/React will escape by default; use dangerouslySetInnerHTML via an object in Head
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Inclusions</h2>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">What&apos;s Included</h3>
        <ul className="space-y-2">
          {inclusions.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <CheckCircle
                className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                size={18}
              />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">What&apos;s Not Included</h3>
        <ul className="space-y-2">
          {exclusions.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <CheckCircle
                className="text-red-500 mt-0.5 mr-2 flex-shrink-0"
                size={18}
              />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourInclusions;
