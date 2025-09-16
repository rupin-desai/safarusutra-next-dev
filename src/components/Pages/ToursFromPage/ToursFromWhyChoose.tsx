"use client";
import React from "react";
import { Compass, Sparkles, Globe, Award, Leaf } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import Illustration from "../../UI/Illustations";

const ICONS = [Compass, Sparkles, Globe, Award, Leaf];
const BRAND = "#066959";

export default function ToursFromWhyChoose({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-10" aria-labelledby="why-choose-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionTitle pillText="Why Choose Us" title="Why Choose Safari Sutra" icon={<Compass size={16} />} color={BRAND} centered />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = ICONS[i % ICONS.length];
            const illusSize = 56;

            return (
              <article key={i} className="relative bg-white border rounded-lg p-6 shadow-sm overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                      <Illustration name={Icon.name?.toLowerCase() ?? "binoculars"} size={illusSize} color="#fff" />
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 leading-relaxed">{it}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}