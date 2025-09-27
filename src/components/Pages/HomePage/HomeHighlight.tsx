"use client";

import React, { useRef } from "react";
import { Instagram } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import { motion, Variants, TargetAndTransition, Transition } from "framer-motion";
import InstagramEmbed from "@/components/UI/InstagramEmbed";

const titleVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 30px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const leftColumnVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const rightColumnVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(50px, 0px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

// const mobileLeftVariants: Variants = {
//   initial: { opacity: 0, transform: "translate3d(-30px, 0px, 0px)" },
//   animate: {
//     opacity: 1,
//     transform: "translate3d(0px, 0px, 0px)",
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//       delay: 0.2,
//     },
//   },
// };

// const mobileRightVariants: Variants = {
//   initial: { opacity: 0, transform: "translate3d(30px, 0px, 0px)" },
//   animate: {
//     opacity: 1,
//     transform: "translate3d(0px, 0px, 0px)",
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//       delay: 0.3,
//     },
//   },
// };

const followVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.6,
    },
  },
};

// add a typed variant that reuses rightColumnVariants but injects an extra delay
const rightColumnDelayedVariants: Variants = (() => {
  const baseAnimate = rightColumnVariants.animate as TargetAndTransition | undefined;
  const baseTransition = (baseAnimate?.transition as Transition) || {};

  const delayedTransition: Transition = {
    ...baseTransition,
    delay: (typeof baseTransition.delay === "number" ? baseTransition.delay : 0) + 0.4,
  };

  return {
    initial: rightColumnVariants.initial,
    animate: {
      ...(baseAnimate || {}),
      transition: delayedTransition,
    },
  } as Variants;
})();

const HomeHighlight: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleInstagramClick = (postId: string): void => {
    if (!postId) return;
    if (typeof window !== "undefined") {
      window.open(`https://www.instagram.com/p/${postId}/`, "_blank");
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={titleVariants}
      >
        <SectionTitle
          icon={<Instagram size={16} />}
          pillText="On The #GRAM"
          title="Travel Moments Worth Sharing"
          color="#E1306C" // Instagram color
        />
      </motion.div>

      <div className="max-w-6xl mx-auto mt-12">
        {/* Grid with Instagram Embed */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* First column: Main Instagram post - HIDDEN ON MOBILE */}
          <motion.div
            className="col-span-2 md:col-span-1 relative cursor-pointer hidden md:block"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={leftColumnVariants}
            onClick={() => handleInstagramClick("DGCzij1sXNv")}
          >
            {/* Line with plane SVG */}
            <motion.img
              src="/graphics/linewithplane.svg"
              alt="Curved line with airplane trail"
              title="Travel path with airplane trail decoration"
              className="absolute 
                        -top-70 -left-20 w-52 h-52 
                        md:-top-70 md:-left-30 md:w-72 md:h-72 
                        lg:-top-70 lg:-left-20 lg:w-92 lg:h-92 
                        z-0"
              aria-hidden="true"
              draggable={false}
              transition={{
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Instagram Embed Container */}
            <div className="overflow-hidden rounded-lg relative group h-[600px] md:h-[650px] cursor-pointer">
              <div className="w-full h-full">
                <InstagramEmbed postId="DGCzij1sXNv" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center font-medium">
                    View on Instagram
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Second column: Two stacked Instagram posts */}
          <motion.div
            className="col-span-1 space-y-4 hidden md:block"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={rightColumnVariants}
          >
            {/* Replace Unsplash image with Instagram post */}
            <div
              className="w-full h-80 relative group overflow-hidden rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleInstagramClick("DHgQ7-rodOj")}
            >
              {/* Instagram Post */}
              <div className="w-full h-full">
                <InstagramEmbed postId="DHgQ7-rodOj" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center">View Gallery</p>
                </div>
              </div>
            </div>

            {/* Instagram Reel (already an embed) */}
            <div
              className="w-full h-80 relative group overflow-hidden rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleInstagramClick("DCUFnipIr_C")}
            >
              <div className="w-full h-full">
                <InstagramEmbed postId="DCUFnipIr_C" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center">Watch Reel</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Third column: Two stacked images - come from right with delay */}
          <motion.div
            className="col-span-1 space-y-4 hidden md:block"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={rightColumnDelayedVariants}
          >
            {/* Instagram Post (already an embed) */}
            <div
              className="overflow-hidden rounded-lg relative group h-[315px] cursor-pointer"
              onClick={() => handleInstagramClick("DHk2_cPIZa5")}
            >
              <div className="w-full h-full">
                <InstagramEmbed postId="DHk2_cPIZa5" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center">View Post</p>
                </div>
              </div>
            </div>

            {/* Instagram Post (already an embed) */}
            <div
              className="overflow-hidden rounded-lg relative group h-[315px] cursor-pointer"
              onClick={() => handleInstagramClick("DCbociEIk8N")}
            >
              <div className="w-full h-full">
                <InstagramEmbed postId="DCbociEIk8N" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center">View Photo Gallery</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile large post */}
          <div className="col-span-2 md:hidden">
            <motion.div
              className="overflow-hidden rounded-lg relative group h-[450px] cursor-pointer"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={leftColumnVariants}
              onClick={() => handleInstagramClick("DGCzij1sXNv")}
            >
              <div className="w-full h-full">
                <InstagramEmbed postId="DGCzij1sXNv" />
              </div>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center instagram-loading-overlay">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm text-center font-medium">
                    View on Instagram
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={followVariants}
        >
          <motion.a
            href="https://www.instagram.com/safarisutra"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center px-5 py-2 rounded-full sm:border border-pink-600 hover:border-white/0 sm:hover:text-white text-white sm:text-pink-600 transition-colors duration-300 overflow-hidden group"
            whileTap={{
              scale: 0.95,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
          >
            {/* Mobile gradient - always visible */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 sm:hidden -z-10" />

            {/* Desktop gradient with right-to-left exit animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 hidden sm:block -z-10 transform scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100 origin-right" />

            <Instagram size={18} className="mr-2" />
            <span className="relative z-10">Follow us @safarisutra</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHighlight;
