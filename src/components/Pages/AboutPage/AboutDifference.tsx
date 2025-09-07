"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import Illustration from "../../UI/Illustations"; // uses the old project's Illustration API

// Animation variants typed with Variants to avoid `any`
const sectionVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const titleVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 30px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const featureVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

const BRAND_GREEN = "#066959";

interface FeatureItemProps {
  illustration: string;
  title: string;
  problem: string;
  solution: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ illustration, title, problem, solution, index }) => {
  // compute size safely (client-only)
  const size = typeof window !== "undefined" && window.innerWidth >= 768 ? 80 : 50;

  return (
    <motion.div className="mb-8 md:mb-0 relative" variants={featureVariants}>
      <div className="relative z-10 px-4 py-4">
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ transform: "translate3d(0px, 20px, 0px)" }}
            animate={{ transform: "translate3d(0px, 0px, 0px)" }}
            whileInView={{ rotate: [-3, 3, -3] }}
            viewport={{ once: true }}
            transition={{
              transform: { type: "spring", stiffness: 300, damping: 25, delay: 0.2 },
              rotate: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.5 },
            }}
          >
            <motion.div
              animate={{
                transform: ["translate3d(0px, -5px, 0px)", "translate3d(0px, 5px, 0px)", "translate3d(0px, -5px, 0px)"],
              }}
              transition={{
                transform: { type: "tween", duration: 3 + index * 0.3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
              }}
            >
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: BRAND_GREEN }}>
                <div className="w-12 h-12 md:w-24 md:h-24 flex items-center justify-center">
                  <Illustration name={illustration} size={size} color="#FFFFFF" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-family-oswald font-semibold mb-3" style={{ fontFamily: "var(--font-family-oswald)", color: BRAND_GREEN }}>
            {title}
          </h3>

          <div className="space-y-4 max-w-md">
            <p className="text-xl font-medium font-family-baloo text-gray-700" style={{ textAlign: "justify", textAlignLast: "center" }}>
              {problem}
            </p>

            <p className="text-lg text-gray-800 font-medium" style={{ textAlign: "justify", textAlignLast: "center", color: BRAND_GREEN }}>
              {solution}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutDifference: React.FC = () => {
  const features = [
    { illustration: "binoculars", title: "Customised, Not Copy-Paste", problem: "Tired of cookie-cutter trips?", solution: "We craft unique adventures tailored to you!" },
    { illustration: "camera", title: "Experts Who Know Their Stuff", problem: "Overwhelmed by choices?", solution: "Our travel experts guide you every step of the way!" },
    { illustration: "hat", title: "Hidden Gems", problem: "Tired of tourist traps?", solution: "Discover off-the-beaten-path treasures that make your journey unforgettable!" },
    { illustration: "pouch", title: "Transparent Pricing", problem: "Worried about hidden costs?", solution: "No surprises — just clear, upfront pricing!" },
  ];

  return (
    <section className="py-12 px-4 overflow-hidden">
      <h2 className="sr-only">The Safari Sutra Difference - Why Choose Us</h2>

      <motion.div className="container mx-auto" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
        <motion.div className="text-center mb-10" variants={titleVariants}>
          <SectionTitle icon={<Sparkles size={16} />} pillText="Why Choose Us" title="The Safari Sutra Difference" color="#70A653" centered={true} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 mt-8">
          {features.map((f, i) => (
            <FeatureItem key={f.title} {...f} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutDifference;
