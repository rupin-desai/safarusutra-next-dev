import React from "react";
import Head from "next/head";
import type { Tour as BaseTour } from "@/components/UI/TourCard";

export type TourWithPolicy = BaseTour & {
  cancellationPolicy?: string[];
  gallery?: string[];
  description?: string;
  id?: string | number;
};

const TourPolicy: React.FC<{ tour?: TourWithPolicy | null }> = ({
  tour = null,
}) => {
  const metaTitle = tour?.title
    ? `${tour.title} — Cancellation Policy & Booking Terms | Safari Sutra`
    : "Cancellation Policy & Booking Terms | Safari Sutra";

  const metaDescription =
    (Array.isArray(tour?.cancellationPolicy) &&
      tour!.cancellationPolicy!.join(" ")) ||
    tour?.description?.slice(0, 160) ||
    "Cancellation policy and important booking terms for this tour on Safari Sutra.";

  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://thesafarisutra.com";

  const pageUrl =
    typeof window !== "undefined" && window.location
      ? `${window.location.origin}${window.location.pathname}${
          window.location.search || ""
        }`
      : `${origin}/tour/${encodeURIComponent(String(tour?.id ?? ""))}/policy`;

  const ogImage =
    (Array.isArray(tour?.gallery) &&
      tour!.gallery!.length > 0 &&
      String(tour!.gallery![0])) ||
    "/og-default.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour?.title || "Tour",
    description: tour?.description || metaDescription,
    image: ogImage,
    provider: {
      "@type": "Organization",
      name: "Safari Sutra",
      url: origin,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cancellation Policy",
      itemListElement: (tour?.cancellationPolicy ?? []).map((p, i) => ({
        "@type": "Offer",
        name: `Cancellation rule ${i + 1}`,
        description: String(p ?? ""),
      })),
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <meta name="robots" content="index,follow" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Cancellation Policy
      </h2>

      <ul className="space-y-2 mb-6">
        {(tour?.cancellationPolicy ?? []).map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="bg-orange-100 text-orange-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-gray-700">{String(item)}</span>
          </li>
        ))}
      </ul>

      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
        <p className="font-medium">Important Note:</p>
        <p className="text-sm mt-1">
          We recommend purchasing travel insurance to protect your trip
          investment. Please read all terms and conditions carefully before
          booking.
        </p>
      </div>
    </div>
  );
};

export default TourPolicy;
