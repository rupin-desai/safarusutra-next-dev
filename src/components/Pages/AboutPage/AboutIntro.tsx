"use client";

import React, { useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import Image from "next/image";

/* Typed variants (use translate3d strings for GPU) */
const sectionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
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

const textVariants: Variants = {
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
      delay: 0.2,
    },
  },
};

const balloonVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 100px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.3,
    },
  },
};

const AboutIntro: React.FC = () => {
  const [balloonAnimationComplete, setBalloonAnimationComplete] =
    useState(false);

  // compute typed animation props to avoid `any` casts
  const floatingAnimate =
    balloonAnimationComplete ? { y: [0, -30, 0], rotate: [-4, 4, -4] } : undefined;

  const floatingTransition: Transition | undefined = balloonAnimationComplete
    ? {
        y: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          repeatType: "reverse",
        },
        rotate: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      }
    : undefined;

  return (
    <section
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      id="intro"
    >
      {/* Decorative balloon SVG */}
      <motion.div
        className="absolute -left-10 md:left-10 top-1/4 w-32 h-32 md:w-52 md:h-52 pointer-events-none select-none z-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={balloonVariants}
        onAnimationComplete={() => setBalloonAnimationComplete(true)}
      >
        {/* Inner motion div for the floating animation -- use next/image for optimization */}
        <motion.div animate={floatingAnimate} transition={floatingTransition} className="relative w-full h-full">
          <Image
            src="/graphics/balloon.svg"
            alt=""
            fill
            className="object-contain"
            draggable={false}
            priority={false}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto text-center relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Section Title with Pill */}
        <motion.div className="mb-12" variants={titleVariants}>
          <SectionTitle
            icon={<MapPin size={16} />}
            pillText="Our Story"
            title="About Safari Sutra"
            color="#066959"
            centered={true}
          />
        </motion.div>

        {/* Company Description */}
        <motion.div className="max-w-3xl mx-auto" variants={textVariants}>
          <p
            className="text-lg md:text-xl mx-auto leading-relaxed mb-2 text-justify"
            style={{ textAlignLast: "center" }}
          >
            Once upon a time (okay, 2013), in the sunny, coconut-tree-lined
            streets of Goa, we were just a bunch of travel junkies with a wild
            idea. We called ourselves Exploron—cute name, right? But as we
            helped more and more people swap office blues for ocean views, we
            realized we needed a name that felt more… us.
          </p>

          <p className="text-lg md:text-xl leading-relaxed mb-4 text-center">
            Enter <span className="text-[#F89B21] font-semibold">Safari</span>{" "}
            <span className="text-[#066959] font-semibold">Sutra</span>.
          </p>

          {/* Definition container with equal width lines */}
          <div className="max-w-3xl mx-auto mb-4">
            <div className="flex justify-center">
              <div className="w-full md:w-4/5">
                <p className="text-lg md:text-xl leading-relaxed text-justify">
                  <span className="text-[#F89B21] font-semibold">Safari</span> =
                  adventure, the journey, where the magic happens.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-justify">
                  <span className="text-[#066959] font-semibold">Sutra</span> =
                  thread, connection, the stuff that ties things together.
                </p>
              </div>
            </div>
          </div>

          <p
            className="text-lg md:text-xl leading-relaxed text-justify md:text-center"
            style={{ textAlignLast: "center" }}
          >
            Put it together and you get well., you get us. The travel OGs who
            make your kind of adventure happen.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutIntro;
