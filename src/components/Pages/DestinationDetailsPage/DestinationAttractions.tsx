"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import Illustration from "../../UI/Illustations"; // use local Illustration component

type Attraction = {
  title: string;
  image: string;
  description?: string;
};

// allow the prop to be unknown[] (normalized internally)
interface Props {
  attractions?: unknown[] | Attraction[] | null;
}

// helper to coerce unknown to string safely
const getString = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));

// typed variants (avoid `any`)
const fadeIn: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const titleVariant: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatingAnimation: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
    },
  },
};

const DestinationAttractions: React.FC<Props> = ({ attractions }) => {
  // normalize incoming payload (handles Attraction[] or unknown[])
  const attractionsList = useMemo<Attraction[]>(() => {
    const arr = Array.isArray(attractions) ? attractions : [];
    return arr.map((a) => {
      const obj = a && typeof a === "object" ? (a as Record<string, unknown>) : {};
      return {
        title: getString(obj.title) || "Attraction",
        image: getString(obj.image) || "/graphics/placeholder.jpg",
        description: getString(obj.description),
      };
    });
  }, [attractions]);

  // these can safely run even for empty arrays
  const hasOddCount = attractionsList.length % 2 !== 0;

  const { randomIllustration, randomColor } = useMemo(() => {
    const illustrations = ["camera", "cocktail", "hotAirBallon", "pouch", "seashell1", "suitcase", "umbrella"];
    const colors = [
      "var(--color-dark-brown)",
      "var(--color-medium-brown)",
      "var(--color-orange)",
      "var(--color-yellow-orange)",
      "var(--color-green)",
      "var(--color-dark-teal)",
    ];

    // deterministic-ish selection based on titles
    const seedText = attractionsList.map((a) => String(a.title || "")).join("|");
    let seed = 0;
    for (let i = 0; i < seedText.length; i++) {
      seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    }
    const illustrationIndex = seed % illustrations.length;
    const colorIndex = seed % colors.length;

    return { randomIllustration: illustrations[illustrationIndex], randomColor: colors[colorIndex] };
  }, [attractionsList]);

  if (attractionsList.length === 0) return null;

  return (
    <section className="py-16 md:px-24" id="attractions">
      <div className="container mx-auto px-4">
        <div className="relative">
          <motion.div
            className="absolute top-0 right-0 md:right-12 opacity-80 hidden md:block"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            aria-hidden
          >
            <Illustration
              name={randomIllustration}
              size={200}
              color={randomColor}
              className="transform -translate-y-6 opacity-40"
            />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={titleVariant}
            className="relative z-10"
          >
            <SectionTitle
              icon={<MapPin size={16} />}
              pillText="Experience the Best"
              title="Major Attractions"
              color="#066959"
              centered={true}
              containerClassName="mb-12"
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {attractionsList.map((attraction, index) => (
            <motion.div
              key={index}
              id={`attraction-${index}`}
              className={`h-[400px] rounded-xl overflow-hidden shadow-lg relative group cursor-pointer ${
                hasOddCount && index === attractionsList.length - 1
                  ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto"
                  : ""
              }`}
              variants={fadeIn}
              whileHover={{
                transform: "translate3d(0px, -6px, 0px)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute inset-x-0 bottom-0 p-6 transform transition-all duration-500 ease-out group-hover:-translate-y-5">
                <h3
                  className="text-2xl font-bold text-white leading-tight mb-2 transition-all duration-300 group-hover:mb-4"
                  style={{ fontFamily: "var(--font-family-baloo)" }}
                >
                  {attraction.title}
                </h3>

                <div className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">
                  <p className="text-white/90 text-base line-clamp-4">{attraction.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationAttractions;
