import React from "react";
import { Star, Quote, Calendar } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";

type Review = {
  text: string;
  author: string;
  rating?: number; // 1-5 optional
  date?: string; // ISO or readable string optional
};

export default function ToursFromTestimonials({ items }: { items: Review[] }) {
  if (!items || items.length === 0) return null;

  const fmtDate = (d?: string) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return d;
    }
  };

  const renderStars = (size = 18) =>
    Array.from({ length: 5 }).map((_, idx) => (
      <Star key={idx} size={size} className="text-yellow-400" aria-hidden />
    ));

  return (
    <section className="mx-auto  px-4 pb-24">
      <SectionTitle pillText="Reviews" title="What People Are Saying" icon={<Star size={16} />} centered color="#6b46c1" />

      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {items.map((r, i) => (
          <blockquote
            key={i}
            className="relative bg-gradient-to-br from-white via-slate-50 to-white border border-gray-100 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 w-full md:w-[48%] lg:w-[31%] max-w-[560px] min-h-[260px] flex flex-col"
            aria-label={`Review by ${r.author}`}
          >
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl md:text-2xl font-semibold text-gray-900">{r.author}</div>
                  <div className="text-sm md:text-base text-gray-500 flex items-center gap-2 mt-1">
                    {r.date && (
                      <>
                        <Calendar size={14} className="opacity-70" />
                        <time dateTime={r.date}>{fmtDate(r.date)}</time>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-2 text-gray-800 text-lg md:text-xl leading-relaxed italic text-justify flex-1">
                <span className="inline-flex -translate-y-1 mr-3 text-slate-300">
                  <Quote size={20} />
                </span>
                {r.text}
              </p>
            </div>

            {/* bottom centered stars */}
            <footer className="mt-6 flex items-center justify-center">
              <div className="flex items-center gap-2" aria-hidden>
                {renderStars(18)}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}