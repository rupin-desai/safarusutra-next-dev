import type { Metadata } from "next";
import React from "react";
import HirePageClient from "./HirePage.client";

export const metadata: Metadata = {
  title: "Careers | Join Our Team | Safari Sutra Tours & Travels",
  description:
    "Build your career in travel with Safari Sutra. Explore current job openings and join our passionate team of travel specialists.",
  keywords: [
    "safari sutra careers",
    "travel jobs",
    "tour guide jobs",
    "travel industry careers",
    "employment opportunities",
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
    title: "Careers | Join Our Team | Safari Sutra", // og:title
    type: "website", // og:type
    description:
      "Build your career in travel with Safari Sutra. Explore current job openings and join our passionate team of travel specialists.", // og:description
    url: "https://thesafarisutra.com/hire", // og:url
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80", // og:image
        alt: "Safari Sutra Careers Team", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/hire",
  },
};

export default function Page(): React.ReactElement {
  return <HirePageClient />;
}
