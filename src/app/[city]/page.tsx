import { notFound } from "next/navigation";
import toursDataRaw from "../../data/ToursFromData.json";
import HeroSection from "../../components/UI/HeroSection";

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
      <main className="p-6 container mx-auto">
        <h1 className="text-3xl font-bold">{data.title ?? heroTitle}</h1>
        {data.subtitle && <p className="text-lg mt-2">{data.subtitle}</p>}
        {data.intro && <p className="mt-4">{data.intro}</p>}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <ul className="list-disc ml-6 mt-2">
            {whyChoose.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Top Tours</h2>
          <div className="grid gap-4 mt-4">
            {topTours.map((tour) => (
              <div key={tour.id} className="p-4 border rounded-lg shadow">
                <h3 className="text-xl font-bold">{tour.title}</h3>
                <p>
                  {tour.duration ?? "Duration N/A"} — {tour.price ?? "Price on request"}
                </p>
                {tour.excerpt && <p className="mt-1">{tour.excerpt}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          {testimonials.map((t, idx) => (
            <blockquote key={idx} className="mt-4 p-4 border-l-4 bg-gray-50">
              <p>&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-2">— {t.author}</footer>
            </blockquote>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          {contact.cta && <p className="mt-2">{contact.cta}</p>}
          <p className="mt-1">
            📧 <a href={`mailto:${contact.email}`} className="text-blue-600">{contact.email}</a>
          </p>
        </section>
      </main>
    </>
  );
}
