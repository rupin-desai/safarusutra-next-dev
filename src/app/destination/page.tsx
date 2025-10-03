import type { Metadata } from "next";
import React from "react";
import DestinationPageClient from "./DestinationPage.client";

export const metadata: Metadata = {
  title: "Destinations | Safari Sutra Tours & Travels in India",
  description:
    "Discover destinations with Safari Sutra — beaches, mountains, wildlife and cultural escapes. Browse destination guides, highlights and packages.",
  keywords: [
    "destinations",
    "travel destinations",
    "safari sutra destinations",
    "travel guides",
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
    title: "Destinations | Safari Sutra", // og:title
    type: "website", // og:type
    description:
      "Discover destinations with Safari Sutra — beaches, mountains, wildlife and cultural escapes. Browse destination guides, highlights and packages.", // og:description
    url: "https://thesafarisutra.com/destination", // og:url
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png", // og:image
        alt: "Safari Sutra Destinations", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/destination",
  },
};

export default function DestinationPage(): React.ReactElement {
  return <DestinationPageClient />;
}
