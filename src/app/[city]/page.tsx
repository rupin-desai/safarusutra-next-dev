import type { Metadata } from "next";
import { notFound } from "next/navigation";
import toursDataRaw from "../../data/ToursFromData.json";
import HeroSection from "../../components/UI/HeroSection";
import ToursFromIntro from "../../components/Pages/ToursFromPage/ToursFromIntro";
import ToursFromWhyChoose from "../../components/Pages/ToursFromPage/ToursFromWhyChoose";
import ToursFromTopTours from "../../components/Pages/ToursFromPage/ToursFromTopTours";
import ToursFromTestimonials from "../../components/Pages/ToursFromPage/ToursFromTestimonials";
import ToursFromContact from "../../components/Pages/ToursFromPage/ToursFromContact";
import ToursFromTips from "../../components/Pages/ToursFromPage/ToursFromTips";
import HomeHighlight from "../../components/Pages/HomePage/HomeHighlight";


type Tip = { title: string; text: string };
type TopTour = {
  id: string;
  slug: string;
  title: string;
  duration?: string;
  price?: string;
  excerpt?: string;
};
type Testimonial = { text: string; author: string };
type Contact = { office?: string; email?: string; cta?: string; title?: string; text?: string; backgroundImage?: string };

type CityData = {
  slug: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  whyChoose?: string[];
  localTips?: Tip[];
  topTours?: TopTour[];
  testimonials?: Testimonial[];
  // new optional hero image for the page (use in HeroSection)
  heroimg?: string;
  // intro image used by ToursFromIntro
  introimg?: string;
  // tips image used by ToursFromTips
  tipsimg?: string;
  contact?: Contact;
};

// toursDataRaw comes from JSON — cast via unknown first to avoid TS structural mismatch errors.
const toursData = toursDataRaw as unknown as Record<string, CityData>;

interface PageProps {
  params: { city: string };
}

/**
 * Server metadata generator for tours-from city pages — includes OpenGraph and basic SEO.
 * Also provides canonical url.
 */
export async function generateMetadata({ params }: { params: { city?: string } }): Promise<Metadata> {
  const raw = String(params?.city ?? "").toLowerCase();
  const cityKey = raw.startsWith("tours-from-") ? raw.replace(/^tours-from-/, "") : raw;
  const data: CityData | undefined = toursData[cityKey];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thesafarisutra.com";
  const cityTitle = (data?.title ?? `Tours from ${cityKey}`).toString();
  const description =
    (data?.contact?.text ?? data?.intro ?? data?.subtitle ?? `Explore curated tours departing from ${cityKey} with Safari Sutra.`).toString();

  // Prefer explicit hero image from data (heroimg), then contact.backgroundImage, then convention
  const heroImg: string | undefined = data?.heroimg ?? data?.contact?.backgroundImage ?? `/images/tours-from-${cityKey}/hero.jpg`;
  const image = heroImg ?? "/og-default.jpg";
  const canonical = `${siteUrl}/tours-from-${encodeURIComponent(cityKey)}`;

  return {
    title: cityTitle,
    description: description.slice(0, 160),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: cityTitle,
      description: description.slice(0, 160),
      url: canonical,
      images: [{ url: image, alt: cityTitle }],
    },
    robots: {
      index: true,
      follow: true,
    },
    // canonical handled by metadataBase + openGraph.url; Next will emit link rel=canonical
  };
}

export async function generateStaticParams(): Promise<{ city: string }[]> {
  const entries = Object.entries(toursData ?? {});
  const slugs = entries
    .map(([key, d]) => String(d?.slug ?? key).toLowerCase())
    .filter(Boolean);

  console.log("DEBUG generateStaticParams - tours slugs:", slugs);
  if (slugs.length === 0) return [{ city: "tours-from-mumbai" }];

  return slugs.map((s) => ({ city: `tours-from-${s}` }));
}

export default function ToursFromCityPage({ params }: PageProps) {
  const raw = String(params.city ?? "").toLowerCase();
  const cityKey = raw.startsWith("tours-from-") ? raw.replace(/^tours-from-/, "") : raw;
  const data: CityData | undefined = toursData[cityKey];

  if (process.env.NODE_ENV !== "production") {
    console.log("DEBUG Page render -> raw param:", params.city, "normalized slug:", cityKey, "hasData:", Boolean(data));
  }

  if (!data) {
    return notFound();
  }

  const whyChoose = data.whyChoose ?? [];
  const topTours: TopTour[] = data.topTours ?? [];
  const testimonials: Testimonial[] = data.testimonials ?? [];
  const contact = (data.contact as Contact) ?? { email: "hello@safarisutra.com", cta: "" };

  const heroTitle = data.title ?? `Tours from ${cityKey}`;
  // prefer heroimg from data, then contact.backgroundImage, then convention path
  const heroBg: string = data?.heroimg ?? data.contact?.backgroundImage ?? `/images/tours-from-${cityKey}/hero.jpg`;

  // Build JSON-LD for LocalBusiness + Organization + BreadcrumbList for local SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thesafarisutra.com";
  const pageUrl = `${siteUrl}/tours-from-${encodeURIComponent(cityKey)}`;

  // attempt to extract email from contact.office if present (common format in data)
  const emailMatch = contact.office ? String(contact.office).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) : null;
  const email = contact.email ?? (emailMatch ? emailMatch[0] : undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#org`,
        "name": "Safari Sutra",
        "url": siteUrl,
        "logo": `${siteUrl}/logos/logo.svg`,
        "sameAs": ["https://www.facebook.com/SafariSutra", "https://www.instagram.com/safarisutra/", "https://x.com/SafariSutra"].filter(Boolean),
      },
      {
        "@type": "LocalBusiness",
        "name": "Safari Sutra",
        "image": [data?.heroimg ?? data.contact?.backgroundImage ?? heroBg],
        "description": data.subtitle ?? data.intro ?? `Tours departing from ${cityKey} by Safari Sutra.`,
        "url": pageUrl,
        "email": email ?? undefined,
        "address": contact.office ? { "@type": "PostalAddress", "streetAddress": contact.office } : undefined,
        "areaServed": cityKey,
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:30", "closes": "18:30" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Tours", "item": `${siteUrl}/tour` },
          { "@type": "ListItem", "position": 3, "name": `Tours from ${data.title ?? cityKey}`, "item": pageUrl }
        ]
      }
    ]
  };

  return (
    <>
      <HeroSection title={heroTitle} backgroundImage={heroBg} overlay={0.6} titleSize="text-4xl md:text-6xl" />
      {/* JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <>
        {/* pass intro image (introimg) to ToursFromIntro */}
        <ToursFromIntro subtitle={data.subtitle} intro={data.intro} imageSrc={data.introimg} />
        <ToursFromTopTours tours={topTours} cityName={cityKey} />
        <ToursFromWhyChoose items={whyChoose} />
        {/* prefer city-specific tips image (tipsimg), fall back to contact backgroundImage */}
        <ToursFromTips tips={data.localTips ?? []} imageSrc={data.tipsimg ?? data.contact?.backgroundImage} />
        <ToursFromTestimonials items={testimonials} />
        <ToursFromContact contact={contact} />

        {/* Home page highlight section (Instagram gallery) — appended at bottom */}
        <HomeHighlight />
      </>
    </>
  );
}
