import type { Metadata } from "next";
import React from "react";
import BlogsPageClient from "./BlogsPage.client";

export const metadata: Metadata = {
  title: "Travel Blog - Safari Sutra | Stories, Tips & Destination Guides",
  description:
    "Discover travel stories, destination guides, and expert tips for adventures across India and beyond. Find hidden gems and cultural insights.",
  keywords: [
    "travel blog",
    "destination guides",
    "travel tips",
    "safari sutra blog",
    "travel stories",
    "india travel",
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
  alternates: {
    canonical: "https://thesafarisutra.com/blogs",
  },
  openGraph: {
    title: "Travel Blog - Safari Sutra | Stories, Tips & Destination Guides",
    description:
      "Discover travel stories, destination guides, and expert tips for adventures across India and beyond. Find hidden gems and cultural insights.",
    url: "https://thesafarisutra.com/blogs",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1533850595620-7b1711221751",
        alt: "Safari Sutra Travel Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Blog - Safari Sutra | Stories, Tips & Destination Guides",
    description:
      "Discover travel stories, destination guides, and expert tips for adventures across India and beyond. Find hidden gems and cultural insights.",
    images: ["https://images.unsplash.com/photo-1533850595620-7b1711221751"],
  },
};

export default function BlogsPage(): React.ReactElement {
  return <BlogsPageClient />;
}
