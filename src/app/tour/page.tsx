import type { Metadata } from "next";
import React from "react";
import TourPageClient from "./TourPage.client";

export const metadata: Metadata = {
  title: "Tours | Safari Sutra Tours & Travels in India",
  description:
    "Explore Safari Sutra's curated tours and fixed departures — short escapes, domestic adventures and international journeys.",
  keywords: ["tours", "fixed departures", "travel packages", "Safari Sutra tours"],
  openGraph: {
    title: "Tours | Safari Sutra",
    description:
      "Explore Safari Sutra's curated tours and fixed departures — short escapes, domestic adventures and international journeys.",
    url: "https://thesafarisutra.com/tour",
  },
};

export default function TourPage(): React.ReactElement {
  return <TourPageClient />;
}
