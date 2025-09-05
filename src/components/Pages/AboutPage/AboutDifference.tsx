"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";

// Animation variants (kept translate3d strings — cast to any to satisfy TS)
const sectionVariants: any = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const titleVariants: any = {
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

const featureVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 40px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

// Using the green color from CSS variables
const BRAND_GREEN = "#066959"; // #70A653

type IllustrationKey = "binoculars" | "camera" | "hat" | "pouch";

interface FeatureItemProps {
  illustration: IllustrationKey | string;
  title: string;
  problem: string;
  solution: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  illustration,
  title,
  problem,
  solution,
  index,
}) => {
  return (
    <motion.div className="mb-8 md:mb-0 relative" variants={featureVariants}>
      {/* Content container with centered illustration */}
      <div className="relative z-10 px-4 py-4">
        {/* Center illustration on top for all screen sizes */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ transform: "translate3d(0px, 20px, 0px)" }}
            animate={{ transform: "translate3d(0px, 0px, 0px)" }}
            whileInView={{ rotate: [-3, 3, -3] }}
            viewport={{ once: true }}
            transition={{
              transform: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.2,
              },
              rotate: {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              },
            }}
          >
            {/* Nested animation for floating effect */}
            <motion.div
              animate={{
                transform: [
                  "translate3d(0px, -5px, 0px)",
                  "translate3d(0px, 5px, 0px)",
                  "translate3d(0px, -5px, 0px)",
                ],
              }}
              transition={{
                transform: {
                  type: "tween",
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <div
                className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: BRAND_GREEN,
                }}
              >
                <div className="w-12 h-12 md:w-24 md:h-24 flex items-center justify-center">
                  {/* Simple div with icon/text instead of Illustration component */}
                  <div className="text-white text-2xl md:text-4xl font-bold">
                    {illustration === "binoculars" && "👀"}
                    {illustration === "camera" && "📷"}
                    {illustration === "hat" && "🧢"}
                    {illustration === "pouch" && "💰"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Text content - centered for all screens */}
        <div className="flex flex-col items-center text-center">
          <h3
            className="text-2xl font-family-oswald font-semibold mb-3"
            style={{
              fontFamily: "var(--font-family-oswald)",
              color: BRAND_GREEN,
            }}
          >
            {title}
          </h3>

          <div className="space-y-4">
            {/* Problem text - using tailwind instead of inline styles */}
            <p className="text-xl font-medium font-family-baloo text-gray-700 text-center">
              {problem}
            </p>

            {/* Solution text */}
            <p
              className="text-lg text-gray-800 font-medium text-center"
              style={{ color: BRAND_GREEN }}
            >
              {solution}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Updated AboutDifference component with responsive grid layout
const AboutDifference: React.FC = () => {
  const features = [
    {
      illustration: "binoculars",
      title: "Customised, Not Copy-Paste",
      problem: "Tired of cookie-cutter trips?",
      solution: "We craft unique adventures tailored to you!",
    },
    {
      illustration: "camera",
      title: "Experts Who Know Their Stuff",
      problem: "Overwhelmed by choices?",
      solution: "Our travel experts guide you every step of the way!",
    },
    {
      illustration: "hat",
      title: "Hidden Gems",
      problem: "Tired of tourist traps?",
      solution:
        "Discover off-the-beaten-path treasures that make your journey unforgettable!",
    },
    {
      illustration: "pouch",
      title: "Transparent Pricing",
      problem: "Worried about hidden costs?",
      solution: "No surprises — just clear, upfront pricing!",
    },
  ];

  return (
    <section className="py-12 px-4 overflow-hidden">
      {/* Screen-reader heading for SEO */}
      <h2 className="sr-only">The Safari Sutra Difference - Why Choose Us</h2>

      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <motion.div className="text-center mb-10" variants={titleVariants}>
          <SectionTitle
            icon={<Sparkles size={16} />}
            pillText="Why Choose Us"
            title="The Safari Sutra Difference"
            color="#70A653"
            centered={true}
          />
        </motion.div>

        {/* Updated grid layout with responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 mt-8">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutDifference;
