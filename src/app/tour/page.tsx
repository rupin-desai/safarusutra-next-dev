import type { Metadata } from "next";
import React from "react";
import TourPageClient from "./TourPage.client";

export const metadata: Metadata = {
  title: "Tours | Safari Sutra Tours & Travels in India",
  description:
    "Explore Safari Sutra's curated tours and fixed departures — short escapes, domestic adventures and international journeys.",
  keywords: [
    "tours",
    "fixed departures",
    "travel packages",
    "Safari Sutra tours",
  ],
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
    title: "Tours | Safari Sutra", // og:title
    type: "website", // og:type
    description:
      "Explore Safari Sutra's curated tours and fixed departures — short escapes, domestic adventures and international journeys.", // og:description
    url: "https://thesafarisutra.com/tour", // og:url
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png", // og:image
        alt: "Safari Sutra Tours", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/tour",
  },
};

export default function TourPage(): React.ReactElement {
  return <TourPageClient />;
}
