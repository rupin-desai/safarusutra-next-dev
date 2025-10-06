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
type ToursFromImage = {
  srcSetWebp?: string;
  srcFallback: string;
  alt?: string;
  imageTitle?: string;
};
type Contact = {
  office?: string;
  email?: string;
  cta?: string;
  title?: string;
  text?: string;
  backgroundImage?: string | ToursFromImage;
};

type CityData = {
  slug: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  whyChoose?: string[];
  localTips?: Tip[];
  topTours?: TopTour[];
  testimonials?: Testimonial[];
  heroimg?: string | ToursFromImage;
  introimg?: string | ToursFromImage;
  tipsimg?: string | ToursFromImage;
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
export async function generateMetadata({
  params,
}: {
  params: { city?: string };
}): Promise<Metadata> {
  const raw = String(params?.city ?? "").toLowerCase();
  const cityKey = raw.startsWith("tours-from-")
    ? raw.replace(/^tours-from-/, "")
    : raw;
  const data: CityData | undefined = toursData[cityKey];

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://thesafarisutra.com";
  const cityTitle = "Tours from Mumbai with Safari Sutra Tours & Travels";
  const description = (
    data?.contact?.text ??
    data?.intro ??
    data?.subtitle ??
    `Explore curated tours departing from ${cityKey} with Safari Sutra.`
  ).toString();

  // Use srcFallback for og:image if heroimg is an object
  let heroImg: string | undefined;
  if (typeof data?.heroimg === "object" && data.heroimg !== null) {
    heroImg = data.heroimg.srcFallback;
  } else {
    heroImg =
      (typeof data?.heroimg === "string" ? data.heroimg : undefined) ??
      (typeof data?.contact?.backgroundImage === "object"
        ? data.contact.backgroundImage.srcFallback
        : data?.contact?.backgroundImage) ??
      `/images/tours-from-${cityKey}/hero.jpg`;
  }
  const image = heroImg ?? "/og-default.jpg";
  const canonical = `${siteUrl}/tours-from-${encodeURIComponent(cityKey)}`;

  return {
    title: cityTitle,
    description: description.slice(0, 160),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: cityTitle,
      type: "website",
      url: canonical,
      description: description.slice(0, 160),
      siteName: "Safari Sutra",
      images: [
        {
          url: image,
          alt: cityTitle,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    other: {
      "X-Robots-Tag": "index, follow",
    },
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
  const cityKey = raw.startsWith("tours-from-")
    ? raw.replace(/^tours-from-/, "")
    : raw;
  const data: CityData | undefined = toursData[cityKey];

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "DEBUG Page render -> raw param:",
      params.city,
      "normalized slug:",
      cityKey,
      "hasData:",
      Boolean(data)
    );
  }

  if (!data) {
    return notFound();
  }

  const whyChoose = data.whyChoose ?? [];
  const topTours: TopTour[] = data.topTours ?? [];
  const testimonials: Testimonial[] = data.testimonials ?? [];
  const contact = (data.contact as Contact) ?? {
    email: "hello@safarisutra.com",
    cta: "",
  };

  const heroTitle = data.title ?? `Tours from ${cityKey}`;
  // Prepare hero image props for HeroSection
  let heroBg = "";
  let srcSetWebp = "";
  let alt = "";
  let imageTitle = "";

  if (typeof data.heroimg === "object" && data.heroimg !== null) {
    heroBg = data.heroimg.srcFallback;
    srcSetWebp = data.heroimg.srcSetWebp ?? "";
    alt = data.heroimg.alt ?? "";
    imageTitle = data.heroimg.imageTitle ?? "";
  } else if (typeof data.heroimg === "string") {
    heroBg = data.heroimg;
  } else if (
    typeof data.contact?.backgroundImage === "object" &&
    data.contact.backgroundImage !== null
  ) {
    heroBg = data.contact.backgroundImage.srcFallback;
    srcSetWebp = data.contact.backgroundImage.srcSetWebp ?? "";
    alt = data.contact.backgroundImage.alt ?? "";
    imageTitle = data.contact.backgroundImage.imageTitle ?? "";
  } else if (typeof data.contact?.backgroundImage === "string") {
    heroBg = data.contact.backgroundImage;
  } else {
    heroBg = `/images/tours-from-${cityKey}/hero.jpg`;
  }

  // Build JSON-LD for LocalBusiness + Organization + BreadcrumbList for local SEO
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://thesafarisutra.com";
  const pageUrl = `${siteUrl}/tours-from-${encodeURIComponent(cityKey)}`;

  // attempt to extract email from contact.office if present (common format in data)
  const emailMatch = contact.office
    ? String(contact.office).match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
      )
    : null;
  const email = contact.email ?? (emailMatch ? emailMatch[0] : undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#org`,
        name: "Safari Sutra",
        url: siteUrl,
        logo: `${siteUrl}/logos/logo.svg`,
        sameAs: [
          "https://www.facebook.com/SafariSutra",
          "https://www.instagram.com/safarisutra/",
          "https://x.com/SafariSutra",
        ].filter(Boolean),
      },
      {
        "@type": "LocalBusiness",
        name: "Safari Sutra",
        image: [
          typeof data?.heroimg === "object" && data.heroimg !== null
            ? data.heroimg.srcFallback
            : typeof data?.heroimg === "string"
            ? data.heroimg
            : typeof data?.contact?.backgroundImage === "object"
            ? data.contact.backgroundImage.srcFallback
            : data?.contact?.backgroundImage ?? heroBg,
        ],
        description:
          data.subtitle ??
          data.intro ??
          `Tours departing from ${cityKey} by Safari Sutra.`,
        url: pageUrl,
        email: email ?? undefined,
        address: contact.office
          ? { "@type": "PostalAddress", streetAddress: contact.office }
          : undefined,
        areaServed: cityKey,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:30",
            closes: "18:30",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tours",
            item: `${siteUrl}/tour`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Tours from ${data.title ?? cityKey}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <HeroSection
        title={heroTitle}
        backgroundImage={heroBg}
        srcSetWebp={srcSetWebp}
        alt={alt}
        imageTitle={imageTitle}
        overlay={0.6}
        titleSize="text-4xl md:text-6xl"
      />
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <>
        <ToursFromIntro
          subtitle={data.subtitle}
          intro={data.intro}
          imageSrc={data.introimg}
        />
        <ToursFromTopTours tours={topTours} cityName={cityKey} />
        <ToursFromWhyChoose items={whyChoose} cityName={cityKey} />
        <ToursFromTips
          tips={data.localTips ?? []}
          imageSrc={data.tipsimg ?? data.contact?.backgroundImage}
          cityName={cityKey}
        />
        <ToursFromTestimonials items={testimonials} cityName={cityKey} />
        <ToursFromContact contact={contact} />
        <HomeHighlight />
      </>
    </>
  );
}
