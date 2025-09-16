import { notFound } from "next/navigation";
import toursDataRaw from "../../data/ToursFromData.json";
import HeroSection from "../../components/UI/HeroSection";
import ToursFromIntro from "../../components/Pages/ToursFromPage/ToursFromIntro";
import ToursFromWhyChoose from "../../components/Pages/ToursFromPage/ToursFromWhyChoose";
import ToursFromTopTours from "../../components/Pages/ToursFromPage/ToursFromTopTours";
import ToursFromTestimonials from "../../components/Pages/ToursFromPage/ToursFromTestimonials";
import ToursFromContact from "../../components/Pages/ToursFromPage/ToursFromContact";
import ToursFromTips from "../../components/Pages/ToursFromPage/ToursFromTips";

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
type Contact = { office?: string; email?: string; cta?: string };

type CityData = {
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

const toursData = toursDataRaw as Record<string, CityData>;

interface PageProps {
  params: { city: string };
}

/* pre-generate pages when using `output: "export"` */
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
  const contact = data.contact ?? { email: "hello@safarisutra.com", cta: "" };

  const heroTitle = data.title ?? `Tours from ${cityKey}`;
  const heroBg = `/images/tours-from-${cityKey}/hero.jpg`; // fallback image path convention

  return (
    <>
      <HeroSection title={heroTitle} backgroundImage={heroBg} overlay={0.35} titleSize="text-4xl md:text-6xl" />
      <>
        {/* subtitle moved inside Intro component */}
        <ToursFromIntro subtitle={data.subtitle} intro={data.intro} />
        <ToursFromWhyChoose items={whyChoose} />
        <ToursFromTips tips={data.localTips ?? []} />
        <ToursFromTopTours tours={topTours} />
        <ToursFromTestimonials items={testimonials} />
        <ToursFromContact contact={contact} />
      </>
    </>
  );
}
