"use client";
import React from "react";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle";
import Illustration from "../../UI/Illustations";

const BRAND = "#066959";

/* pick illustrations from your illustrations folder */
const ILLUS = [
  "camera",
  "hotAirBallon",
  "binoculars",
  "planeIllustration",
  "starfish",
  "suitcase",
  "coconutTree",
];

export default function ToursFromWhyChoose({ items, cityName }: { items?: string[]; cityName?: string }) {
  if (!items || items.length === 0) return null;

  const title = cityName ? `Why Choose Safari Sutra from ${cityName}` : "Why Choose Safari Sutra";

  return (
    <section className="py-24" aria-labelledby="why-choose-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionTitle
            pillText="Why Choose Us"
            title={title}
            icon={<Compass size={16} />}
            color={BRAND}
            centered
          />
        </div>

        {/* use flex-wrap so last row items are centered; gap preserved */}
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((it, i) => {
            const illusName = ILLUS[i % ILLUS.length];

            return (
              <article
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row w-full sm:w-[48%] lg:w-[31%]"
                style={{ minWidth: 260 }}
              >
                {/* left: colored panel taking ~35% of card on md+ */}
                <div
                  className="hidden md:flex w-[30%] items-center justify-center p-4 rounded-l-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  <motion.div
                    className="flex items-center justify-center"
                    animate={{
                      transform: [
                        "translate3d(0px, -12px, 0px)",
                        "translate3d(0px, 10px, 0px)",
                        "translate3d(0px, -8px, 0px)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  >
                    <div className="w-40 h-40 flex items-center justify-center">
                      <Illustration name={illusName} size={100} color="#fff" />
                    </div>
                  </motion.div>
                </div>

                {/* mobile: circular icon above text */}
                <div className="md:hidden flex items-center justify-center pt-6">
                  <motion.div
                    animate={{
                      transform: [
                        "translate3d(0px, -6px, 0px)",
                        "translate3d(0px, 6px, 0px)",
                        "translate3d(0px, -4px, 0px)",
                      ],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: BRAND }}
                    >
                      <Illustration name={illusName} size={56} color="#fff" />
                    </div>
                  </motion.div>
                </div>

                {/* right: text area - centered */}
                <div className="flex-1 p-6 flex items-center justify-center">
                  <p className="text-center text-gray-700 leading-relaxed">{it}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}