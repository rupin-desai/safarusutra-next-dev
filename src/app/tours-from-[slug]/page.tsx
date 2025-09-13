import React from "react";
import { Metadata } from "next";
import locationsRaw from "../../data/ToursFromData.json";
import ToursFromHero from "../../components/Pages/ToursFromPage/ToursFromHero";
import ToursFromWhyChoose from "../../components/Pages/ToursFromPage/ToursFromWhyChoose";
import ToursFromTips from "../../components/Pages/ToursFromPage/ToursFromTips";
import ToursFromTopTours from "../../components/Pages/ToursFromPage/ToursFromTopTours";
import ToursFromTestimonials from "../../components/Pages/ToursFromPage/ToursFromTestimonials";
import ToursFromContact from "../../components/Pages/ToursFromPage/ToursFromContact";

type TopTour = { id: string; slug: string; title: string; duration?: string; price?: string; excerpt?: string };
type Tip = { title: string; text: string };
type Testimonial = { text: string; author: string };
type Contact = { office?: string; email?: string; cta?: string };

type LocationData = {
  slug: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  whyChoose?: string[];
  localTips?: Tip[];
  topTours?: TopTour[];
  testimonials?: Testimonial[];
  contact?: Contact;
};

const locations = locationsRaw as Record<string, LocationData>;

type Props = { params: { slug: string } };

/* export static params for every city in the data file */
export const generateStaticParams = async () => {
  return Object.keys(locations).map((slug) => ({ slug }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (params.slug || "location").toLowerCase();
  const data = locations[slug];
  const capital = capitalize(slug);
  const title = data?.title ?? `Tours from ${capital} | Safari Sutra`;
  const description = data?.intro ? data.intro.slice(0, 160) : `Explore curated tours departing from ${capital}.`;
  const canonical = `https://thesafarisutra.com/tours-from-${slug}/`;

  const keywords = [
    `${capital} tours`,
    `${capital} tour packages`,
    "Safari Sutra",
    ...(data?.topTours?.slice(0, 6).flatMap(t => [t.title, t.excerpt]).filter(Boolean) as string[] || []),
  ].slice(0, 20);

  const ogImage = `/images/tours-from-${slug}/hero.jpg`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

export default function Page({ params }: Props) {
  const slug = (params.slug ?? "location").toLowerCase();
  const data = locations[slug];

  if (!data) {
    return <main className="container mx-auto px-4 py-12">No data for {slug}</main>;
  }

  const canonical = `https://thesafarisutra.com/tours-from-${slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Safari Sutra",
    "url": canonical,
    "description": data.intro ?? "",
    "areaServed": capitalize(slug),
    "telephone": "",
    "email": data.contact?.email ?? "hello@safarisutra.com",
    "sameAs": [
      "https://www.facebook.com/thesafarisutra",
      "https://www.instagram.com/thesafarisutra"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Powai",
      "addressLocality": "Mumbai",
      "addressRegion": "MH",
      "addressCountry": "IN"
    }
  };

  return (
    <main>
      {/* JSON-LD for Schema.org (improves rich results) */}
      <script
        type="application/ld+json"
        // server component safe injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToursFromHero title={data.title ?? `Tours from ${capitalize(slug)}`} subtitle={data.subtitle} intro={data.intro} />
      <ToursFromWhyChoose items={data.whyChoose ?? []} />
      <ToursFromTips tips={data.localTips ?? []} />
      <ToursFromTopTours tours={data.topTours ?? []} />
      <ToursFromTestimonials items={data.testimonials ?? []} />
      <ToursFromContact contact={data.contact ?? {}} />
    </main>
  );
}

/* helpers */
function capitalize(s: string) {
  return s && s.length ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}