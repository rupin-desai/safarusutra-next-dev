import React from "react";
import { Star } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import ToursFromTourCard from "./ToursFromTourCard";

export default function ToursFromTopTours({
  tours,
  cityName,
}: {
  tours: { id: string; slug: string; title?: string; duration?: string; price?: string; excerpt?: string; image?: string }[];
  cityName?: string;
}) {
  if (!tours || tours.length === 0) return null;

  const formatCity = (c?: string) => {
    if (!c) return "";
    return String(c)
      .replace(/[-_]/g, " ")
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const cityDisplay = formatCity(cityName);
  const title = cityDisplay ? `Top Tours from ${cityDisplay}` : "Top Tours";

  return (
    <section className="mx-auto max-w-6xl px-4 mt-8">
      <SectionTitle
        icon={<Star size={16} />}
        pillText="Popular"
        title={title}
        color="#F89B21"
        titleSize="medium"
        centered={true}
      />

      {/* responsive grid; cards are centered when last row not full */}
      <div className="flex flex-wrap justify-center gap-6">
        {tours.map((t) => (
          <div key={t.id} className="w-full sm:w-[48%] lg:w-[31%] min-w-[260px]">
            <ToursFromTourCard tour={t} />
          </div>
        ))}
      </div>
    </section>
  );
}