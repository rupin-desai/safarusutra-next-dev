"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Compass } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import DestinationCard from "@/components/UI/DestinationCard";
import type { Tour as DestinationCardTour } from "@/components/UI/DestinationCard";

/* Minimal shared tour shape used for props from different JSON sources */
type SharedTour = {
  id?: string | number;
  title?: string;
  image?: string;
  location?: string;
  caption?: string;
  price?: string | number;
  duration?: string;
  [k: string]: unknown;
};

interface Props {
  relatedTours?: SharedTour[];
  currentTourId?: string | number;
  allTours?: SharedTour[];
}

// seeded PRNG (Park–Miller) to produce deterministic "random" ordering from a seed
const seededRandom = (seedValue: number) => {
  let seed = seedValue % 2147483647;
  if (seed <= 0) seed += 2147483646;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
};

const seededShuffle = <T,>(arr: T[], seedValue: number) => {
  const rnd = seededRandom(seedValue);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
};

// Optimized animation variants using translate3d for better performance
const fadeIn: Variants = {
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

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  // animate can be a function that receives custom (index)
  animate: (index = 0) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.1,
    },
  }),
};

// Rotation animation variants using Variants
const rotateAnimation: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      rotate: { repeat: Infinity, duration: 25, ease: "linear" },
    },
  },
};

const rotateReverseAnimation: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: -360,
    transition: {
      rotate: { repeat: Infinity, duration: 30, ease: "linear" },
    },
  },
};

const DestinationRelated: React.FC<Props> = ({ relatedTours = [], currentTourId, allTours = [] }) => {
  // Get randomly selected related tours based on current tour type (domestic/international)
  const selectedTours = useMemo((): SharedTour[] => {
    if (!allTours || allTours.length === 0) return (relatedTours ?? []).slice(0, 3);

    // Find current tour to determine if it's domestic or international
    const currentTour = allTours.find((tour) => String(tour.id ?? "") === String(currentTourId ?? ""));
    if (!currentTour) return (relatedTours ?? []).slice(0, 3);

    const isDomestic = String((currentTour.location ?? "")).toLowerCase() === "india";

    const sameCategoryTours = allTours.filter(
      (tour) =>
        String(tour.id ?? "") !== String(currentTourId ?? "") &&
        (isDomestic ? String(tour.location ?? "").toLowerCase() === "india" : String(tour.location ?? "").toLowerCase() !== "india")
    );

    // derive numeric seed from currentTourId (stable)
    const seedStr = String(currentTourId ?? String(currentTour.id ?? ""));
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;

    // deterministically shuffle and pick first 3
    return seededShuffle(sameCategoryTours, seed).slice(0, 3);
  }, [relatedTours, currentTourId, allTours]);

  if (!selectedTours || selectedTours.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden" id="similar">
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute top-10 right-5 md:right-60 h-12 w-12 md:w-20 md:h-20 opacity-95 md:block"
        initial="initial"
        animate="animate"
        variants={rotateAnimation}
        aria-hidden={true}
      />

      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute bottom-16 left-8 w-16 h-16 opacity-20 hidden md:block"
        initial="initial"
        animate="animate"
        variants={rotateReverseAnimation}
        aria-hidden={true}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          icon={<Compass size={16} />}
          pillText="Explore More"
          title="Similar Safari Experiences"
          color="#452F1B"
          centered
          containerClassName="mb-12"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {selectedTours.map((tour, index) => {
            // normalize to DestinationCard's Tour shape to satisfy prop types
            const cardTour: DestinationCardTour = {
              id: tour.id as string | number,
              title: String(tour.title ?? ""),
              image: String(tour.image ?? "/graphics/placeholder.jpg"),
              location: String(tour.location ?? ""),
              caption: String(tour.caption ?? "Unforgettable Safari Experience"),
              price: String(tour.price ?? ""),
              duration: String(tour.duration ?? ""),
            };

            return (
              <motion.div
                key={String(tour.id ?? index)}
                custom={index}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <DestinationCard tour={cardTour} index={index} isNewlyLoaded={false} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRelated;
