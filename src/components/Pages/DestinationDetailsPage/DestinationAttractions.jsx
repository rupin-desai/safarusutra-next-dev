import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "../../ui/Elements/SectionTitle";
import Illustration from "../../ui/Elements/Illustations"; // Import the Illustration component

// Optimized animation variants using transform3d
const fadeIn = {
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

// Title animation variants
const titleVariant = {
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

// Container to stagger child animations
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Floating animation for the illustration
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      y: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
      },
      rotate: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
      },
    },
  },
};

const DestinationAttractions = ({ attractions }) => {
  if (!attractions || attractions.length === 0) return null;

  // Determine if we have an odd number of attractions
  const hasOddCount = attractions.length % 2 !== 0;

  // Select a random illustration and color
  const { randomIllustration, randomColor } = useMemo(() => {
    const illustrations = [
      "camera",
      "cocktail",
      "hotAirBallon",
      "pouch",
      "seashell1",
      "suitcase",
      "umbrella",
    ];

    const colors = [
      "var(--color-dark-brown)",
      "var(--color-medium-brown)",
      "var(--color-orange)",
      "var(--color-yellow-orange)",
      "var(--color-green)",
      "var(--color-dark-teal)",
    ];

    const illustrationIndex = Math.floor(Math.random() * illustrations.length);
    const colorIndex = Math.floor(Math.random() * colors.length);

    return {
      randomIllustration: illustrations[illustrationIndex],
      randomColor: colors[colorIndex],
    };
  }, []);

  return (
    <section className="py-16 md:px-24" id="attractions">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Floating illustration positioned to the right with random color */}
          <motion.div
            className="absolute top-0 right-0 md:right-12 opacity-80 hidden md:block"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
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
              titleSize="large" // Using the custom title size
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
          {attractions.map((attraction, index) => (
            <motion.div
              key={index}
              id={`attraction-${index}`}
              className={`h-[400px] rounded-xl overflow-hidden shadow-lg relative group cursor-pointer ${
                hasOddCount && index === attractions.length - 1
                  ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto"
                  : ""
              }`}
              variants={fadeIn}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                },
              }}
            >
              {/* Background image */}
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay that expands on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300"></div>

              {/* Content container - positioned at bottom initially, moves up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 transform transition-all duration-500 ease-out group-hover:translate-y-[-20px]">
                {/* Title - always visible */}
                <h3
                  className="text-2xl font-bold text-white leading-tight mb-2 transition-all duration-300 group-hover:mb-4"
                  style={{ fontFamily: "var(--font-family-baloo)" }}
                >
                  {attraction.title}
                </h3>

                {/* Description - appears on hover with fade-in effect */}
                <div className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">
                  <p className="text-white/90 text-base line-clamp-4">
                    {attraction.description}
                  </p>
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
