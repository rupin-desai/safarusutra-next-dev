import type { Metadata } from "next";
import React from "react";
import FixedDeparturesPageClient from "./FixedDeparturesPage.client";

export const metadata: Metadata = {
  title: "Fixed‑Date Departures | Safari Sutra",
  description:
    "Handpicked fixed‑date departures with guaranteed departure dates — mini escapes, home‑turf adventures and faraway wonders.",
  openGraph: {
    title: "Fixed‑Date Departures | Safari Sutra",
    description:
      "Handpicked fixed‑date departures with guaranteed departure dates — mini escapes, home‑turf adventures and faraway wonders.",
    url: "https://thesafarisutra.com/fixed-departures",
  },
};

export default function Page() {
  return <FixedDeparturesPageClient />;
}