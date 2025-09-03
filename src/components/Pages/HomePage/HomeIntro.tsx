import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import HomeIntroLazy from "./HomeIntro.client.lazy";
import packageDetailsRaw from "@/data/PackageDetails.json";
import type { Tour } from "../../UI/TourCard";

type Package = {
  id: number;
  title?: string;
  slug?: string;
  image?: string;
  route?: string;
  price?: number;
  duration?: string;
  [key: string]: unknown;
};

const packageDetails: Package[] = (packageDetailsRaw as unknown) as Package[];

const DEFAULT_FEATURED_IDS: number[] = [56, 57, 58, 59];

function createSlug(title?: string, id?: number) {
  const t = title ?? String(id ?? "");
  return t.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
}

export default function HomeIntro({ featuredIds: featuredIdsProp }: { featuredIds?: string[] }) {
  let featuredIds: string[] = [];

  if (Array.isArray(featuredIdsProp) && featuredIdsProp.length > 0) {
    featuredIds = featuredIdsProp.map((id) => String(id));
  } else if (Array.isArray(DEFAULT_FEATURED_IDS) && DEFAULT_FEATURED_IDS.length > 0) {
    featuredIds = DEFAULT_FEATURED_IDS.map((id) => String(id));
  } else {
    const all = packageDetails.map((p) => String(p.id));
    featuredIds = all.slice(0, Math.min(5, all.length));
  }

  const featuredTours: Tour[] = featuredIds
    .map((id) => packageDetails.find((p) => String(p.id) === String(id)))
    .filter(Boolean)
    .map((p) => ({
      id: p!.id,
      title: p!.title ?? "",
      slug: p!.slug ?? createSlug(p!.title, p!.id),
      image: p!.image ?? "/graphics/placeholder.jpg",
      route: p!.route ?? "",
      price: p!.price ?? undefined,
      duration: p!.duration ?? "",
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featuredTours.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/tour/${t.id}/${t.slug}`,
    })),
  };

  return (
    <section id="destinations" className="sr-only">
      {/* Server-only SEO headings (appear in static HTML) */}
      <h2 className="sr-only">Top Tours — Safari Sutra&apos;s Hit List</h2>

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <SectionTitle icon={<MapPin size={16} />} pillText="Top Tours" title="Safari Sutra&apos;s Hit List" color="#066959" centered={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((t) => (
            <article key={t.id}>
              <a href={`/tour/${t.id}/${t.slug}`}>
                <img src={t.image} alt={t.title} className="w-full h-40 object-cover" />
                <h3>{t.title}</h3>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10">
          {/* client-only carousel — will NOT be included in server HTML */}
          <HomeIntroLazy featuredTours={featuredTours} />
        </div>
      </div>

      <h3 className="sr-only">Ready for your next adventure?</h3>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
