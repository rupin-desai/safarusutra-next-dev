import React from "react";
import locations from "../../../data/ToursFromData.json";
import ToursFromHero from "./ToursFromHero";
import ToursFromWhyChoose from "./ToursFromWhyChoose";
import ToursFromTips from "./ToursFromTips";
import ToursFromTopTours from "./ToursFromTopTours";
import ToursFromTestimonials from "./ToursFromTestimonials";
import ToursFromContact from "./ToursFromContact";

type TopTour = { id: string; slug: string; title: string; duration?: string; price?: string; excerpt?: string };
type Tip = { title: string; text: string };
type Testimonial = { text: string; author: string };
type Contact = { office?: string; email?: string; cta?: string };

type LocationData = {
  slug: string;
  title: string;
  subtitle?: string;
  intro?: string;
  whyChoose?: string[];
  localTips?: Tip[];
  topTours?: TopTour[];
  testimonials?: Testimonial[];
  contact?: Contact;
};

const locationsMap = locations as Record<string, LocationData>;

export default function ToursFromSections({ slug }: { slug: string }) {
  const key = slug?.toLowerCase() ?? "";
  const data: LocationData | undefined = locationsMap[key];
  if (!data) {
    return <div className="container mx-auto px-4 py-12">No data for {slug}</div>;
  }

  return (
    <main>
      <ToursFromHero title={data.title} subtitle={data.subtitle} intro={data.intro} />
      <ToursFromWhyChoose items={data.whyChoose || []} />
      <ToursFromTips tips={data.localTips || []} />
      <ToursFromTopTours tours={data.topTours || []} />
      <ToursFromTestimonials items={data.testimonials || []} />
      <ToursFromContact contact={data.contact || {}} />
    </main>
  );
}