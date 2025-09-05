"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import DestinationCard from "@/components/UI/DestinationCard";

interface Props {
  relatedTours?: any[];
  currentTourId?: string | number;
  allTours?: any[];
}

// Optimized animation variants using translate3d for better performance (cast to any)
const fadeIn: any = {
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

const cardVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index: number) => ({
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

// Rotation animation variants using transform strings (no x/y)
const rotateAnimation: any = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      rotate: { repeat: Infinity, duration: 25, ease: "linear" },
    },
  },
};

// Slightly different rotation for second star using transform
const rotateReverseAnimation: any = {
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
  const selectedTours = useMemo((): any[] => {
    if (!relatedTours || relatedTours.length === 0 || !allTours || allTours.length === 0) return [];

    // Find current tour to determine if it's domestic or international
    const currentTour = allTours.find((tour) => String(tour.id) === String(currentTourId));
    if (!currentTour) return relatedTours.slice(0, 3);

    // Check if tour is domestic (India) or international
    const isDomestic = currentTour.location === "India";

    // Filter tours by same category (domestic/international) but exclude current tour
    const sameCategoryTours = allTours.filter(
      (tour) =>
        String(tour.id) !== String(currentTourId) &&
        (isDomestic ? tour.location === "India" : tour.location !== "India")
    );

    // Randomly select up to 3 tours from the same category
    return sameCategoryTours.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [relatedTours, currentTourId, allTours]);

  if (!selectedTours || selectedTours.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden" id="similar">
      {/* First star - top right */}
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute top-10 right-5 md:right-60 h-12 w-12 md:w-20 md:h-20 opacity-95 md:block"
        initial="initial"
        animate="animate"
        variants={rotateAnimation}
        aria-hidden
      />

      {/* Second star - bottom left */}
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute bottom-16 left-8 w-16 h-16 opacity-20 hidden md:block"
        initial="initial"
        animate="animate"
        variants={rotateReverseAnimation}
        aria-hidden
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
          {selectedTours.map((tour, index) => (
            <motion.div
              key={tour.id ?? index}
              custom={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <DestinationCard tour={tour} index={index} isNewlyLoaded={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRelated;
