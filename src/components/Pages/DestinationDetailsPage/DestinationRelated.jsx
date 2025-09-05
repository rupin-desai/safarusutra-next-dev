import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import SectionTitle from "../../ui/Elements/SectionTitle";
import DestinationCard from "../../ui/Elements/DestinationCard";

// Optimized animation variants using transform3d for better performance
const fadeIn = {
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

const cardVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index) => ({
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

// Rotation animation variants
const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 25, // Slow rotation
      ease: "linear",
    },
  },
};

// Slightly different rotation for second star
const rotateReverseAnimation = {
  animate: {
    rotate: -360,
    transition: {
      repeat: Infinity,
      duration: 30, // Even slower rotation in opposite direction
      ease: "linear",
    },
  },
};

const DestinationRelated = ({ relatedTours, currentTourId, allTours }) => {
  // Get randomly selected related tours based on current tour type (domestic/international)
  const selectedTours = useMemo(() => {
    if (!relatedTours || relatedTours.length === 0 || !allTours) return [];

    // Find current tour to determine if it's domestic or international
    const currentTour = allTours.find((tour) => tour.id === currentTourId);
    if (!currentTour) return relatedTours.slice(0, 3);

    // Check if tour is domestic (India) or international
    const isDomestic = currentTour.location === "India";

    // Filter tours by same category (domestic/international) but exclude current tour
    const sameCategoryTours = allTours.filter(
      (tour) =>
        tour.id !== currentTourId &&
        (isDomestic ? tour.location === "India" : tour.location !== "India")
    );

    // Randomly select 3 tours from the same category
    return sameCategoryTours.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [relatedTours, currentTourId, allTours]);

  if (!selectedTours || selectedTours.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden" id="similar">
      {/* First star - top right */}
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute top-10 right-5 md:right-60 h-12 w-12 md:w-20 md:h-20 opacity-95  md:block"
        initial={{ rotate: 0 }}
        animate="animate"
        variants={rotateAnimation}
      />

      {/* Second star - bottom left */}
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute bottom-16 left-8 w-16 h-16 opacity-20 hidden md:block"
        initial={{ rotate: 0 }}
        animate="animate"
        variants={rotateReverseAnimation}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          icon={<Compass size={16} />}
          pillText="Explore More"
          title="Similar Safari Experiences"
          color="#452F1B"
          centered={true}
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
              key={tour.id}
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
