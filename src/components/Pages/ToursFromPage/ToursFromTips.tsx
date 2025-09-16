import React from "react";
import { MapPin, Info } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";

export default function ToursFromTips({
  tips,
  imageSrc,
  cityName,
}: {
  tips: { title: string; text: string }[];
  imageSrc?: string;
  cityName?: string;
}) {
  if (!tips || tips.length === 0) return null;

  const formatCity = (c?: string) => {
    if (!c) return "";
    return String(c)
      .replace(/[-_]/g, " ")
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const cityDisplay = formatCity(cityName);
  const title = cityDisplay
    ? `Local Tips for ${cityDisplay} Travelers`
    : "Local Tips for Travelers";

  return (
    <section className="mx-auto max-w-[80rem] px-4 pb-24">
      <SectionTitle
        icon={<MapPin size={18} />}
        pillText="Travel Smart"
        title={title}
        color="#F89B21"
        titleSize="medium"
        centered={true}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-2 items-stretch">
        {/* left: stylized list with single lucide info icon (tooltip via title on wrapper) */}
        <div className="text-left flex flex-col justify-start">
          <ul className="space-y-6">
            {tips.map((t) => (
              <li key={t.title} className="flex gap-4 items-start">
                <span
                  className="text-[var(--color-dark-teal)] mt-1 flex-shrink-0"
                  title="Tip"
                  role="img"
                  aria-label="Tip"
                >
                  <Info size={22} />
                </span>

                <div>
                  <div className="text-2xl font-semibold text-[var(--color-dark-brown)]">
                    {t.title}
                  </div>
                  <div className="text-lg text-gray-700 mt-1">{t.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* right: image centered vertically relative to left — increased max width */}
        <div className="hidden md:flex items-center justify-center h-full">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="Local tips illustration"
              className="w-full max-w-3xl rounded-md object-cover shadow-sm max-h-[80%]"
            />
          ) : (
            <div className="w-full max-w-3xl h-full rounded-md bg-gray-100 border border-gray-100" />
          )}
        </div>
      </div>
    </section>
  );
}