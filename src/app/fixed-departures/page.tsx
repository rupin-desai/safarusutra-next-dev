import type { Metadata } from "next";
import React from "react";
import FixedDeparturesPageClient from "./FixedDeparturesPage.client";

export const metadata: Metadata = {
  title: "Fixed‑Date Departures | Safari Sutra Tours & Travels in India",
  description:
    "Handpicked fixed‑date departures with guaranteed departure dates — mini escapes, home‑turf adventures and faraway wonders.",
  keywords: [
    "fixed departures",
    "guaranteed tours",
    "group tours",
    "mini escapes",
    "adventure travel",
    "Safari Sutra fixed departures",
    "India tours",
    "scheduled tours",
    "travel packages",
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
    title: "Fixed‑Date Departures | Safari Sutra", // og:title
    type: "website", // og:type
    description:
      "Handpicked fixed‑date departures with guaranteed departure dates — mini escapes, home‑turf adventures and faraway wonders.", // og:description
    url: "https://thesafarisutra.com/fixed-departures", // og:url
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // og:image
        alt: "Safari Sutra Fixed Departures", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/fixed-departures",
  },
};

export default function Page() {
  return <FixedDeparturesPageClient />;
}
