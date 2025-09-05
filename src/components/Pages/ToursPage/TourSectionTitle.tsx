import React from "react";
import { Tag, Globe, Calendar, MapPin, Star } from "lucide-react";

interface Props {
  pillText?: string;
  title: string;
  count?: number;
}

/**
 * Responsive TourSectionTitle
 * - pillText: short label shown in the pill (e.g. "Short", "Domestic")
 * - title: main title string to display
 * - count: optional number badge shown at right
 */
const TourSectionTitle: React.FC<Props> = ({ pillText = "", title, count }) => {
  const iconFor = (key?: string) => {
    const k = String(key || "").toLowerCase();
    const props = { className: "w-4 h-4 md:w-4 md:h-4 text-current" };
    if (k.includes("short")) return <Calendar {...props} />;
    if (k.includes("domestic")) return <MapPin {...props} />;
    if (k.includes("international")) return <Globe {...props} />;
    if (k.includes("other")) return <Tag {...props} />;
    return <Star {...props} />;
  };

  const creativeLabel = (key?: string) => {
    const k = String(key || "").toLowerCase();
    if (k.includes("short")) return "Mini Escapes";
    if (k.includes("domestic")) return "Home-Turf Adventures";
    if (k.includes("international")) return "Faraway Wonders";
    if (k.includes("other")) return "Surprise Picks";
    return key || "Handpicked Tours";
  };

  const getPillClasses = (key?: string) => {
    const k = String(key || "").toLowerCase();
    const map: Record<string, { bg: string; text: string; border: string }> = {
      short: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-700",
      },
      domestic: {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        border: "border-emerald-700",
      },
      international: {
        bg: "bg-indigo-50",
        text: "text-indigo-800",
        border: "border-indigo-700",
      },
      other: {
        bg: "bg-slate-50",
        text: "text-slate-800",
        border: "border-slate-700",
      },
      default: {
        bg: "bg-gray-50",
        text: "text-gray-800",
        border: "border-gray-700",
      },
    };
    return map[Object.keys(map).find((m) => k.includes(m)) || "default"];
  };

  const pill = getPillClasses(pillText);
  const displayPill = creativeLabel(pillText);

  return (
    <div className="px-4 sm:px-6 md:px-8 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center md:items-start">
        <div className="w-full md:flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 items-center">
            {/* Pill: auto width, count shown inside on md and below */}
            <span
              className={`inline-flex items-center gap-2 ${pill.bg} ${pill.text} ${pill.border} border px-3 py-1 rounded-full text-sm font-normal shadow-sm`}
              aria-hidden="true"
            >
              <span className="flex items-center" aria-hidden="true">
                {iconFor(pillText)}
              </span>
              <span className="whitespace-nowrap">{displayPill}</span>

              {/* count inside pill for small/med screens */}
              {typeof count === "number" && (
                <span
                  className={`ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white ${pill.border} border text-xs font-semibold ${pill.text} shadow-sm md:hidden`}
                  aria-hidden="true"
                >
                  {count}
                </span>
              )}
            </span>

            {/* Title: centered on md and below, left-aligned on larger */}
            <h2 className="mt-3 sm:-mt-2 text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-normal font-family-oswald text-gray-900 leading-tight pl-0 sm:pl-2">
              {title}
            </h2>
          </div>
        </div>

        {/* external count for md+ screens */}
        {typeof count === "number" && (
          <div className="hidden md:flex flex-shrink-0 self-start md:self-center" aria-hidden="true">
            <span
              className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white ${pill.border} border text-sm sm:text-base md:text-lg font-semibold ${pill.text} shadow-md`}
            >
              {count}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TourSectionTitle);
