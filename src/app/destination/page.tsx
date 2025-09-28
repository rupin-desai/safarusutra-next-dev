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
  openGraph: {
    title: "Destinations | Safari Sutra",
    description:
      "Discover destinations with Safari Sutra — beaches, mountains, wildlife and cultural escapes. Browse destination guides, highlights and packages.",
    url: "https://thesafarisutra.com/destination",
  },
};

export default function DestinationPage(): React.ReactElement {
  return <DestinationPageClient />;
}
