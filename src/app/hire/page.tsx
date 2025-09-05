import type { Metadata } from "next";
import React from "react";
import HirePageClient from "./HirePage.client";

export const metadata: Metadata = {
  title: "Careers | Join Our Team | Safari Sutra",
  description:
    "Build your career in travel with Safari Sutra. Explore current job openings and join our passionate team of travel specialists.",
  keywords: [
    "safari sutra careers",
    "travel jobs",
    "tour guide jobs",
    "travel industry careers",
    "employment opportunities",
  ],
  openGraph: {
    title: "Careers | Join Our Team | Safari Sutra",
    description:
      "Build your career in travel with Safari Sutra. Explore current job openings and join our passionate team of travel specialists.",
    url: "https://thesafarisutra.com/hire",
  },
};

export default function Page(): React.ReactElement {
  return <HirePageClient />;
}
