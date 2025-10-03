"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import SSButton from "../../UI/SSButton";

// Animation variants typed with Variants to avoid `any`
const sectionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const leftContentVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-30px, 0px, 0px)",
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

const buttonVariants: Variants = {
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
      delay: 0.3,
    },
  },
};

const imageVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(30px, 0px, 0px)",
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

const AboutExperience: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-24 overflow-hidden">
      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text content - Now full width on mobile */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start"
            variants={leftContentVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-family-oswald font-semibold mb-6 text-[var(--color-dark-teal)] text-center md:text-left"
              style={{ fontFamily: "var(--font-family-oswald)" }}
              variants={titleVariants}
            >
              Crafting Transformative Travel Experiences
            </motion.h2>

            {/* Image now appears right after the title on mobile - standard img */}
            <motion.div
              className="w-full mb-8 md:hidden"
              variants={imageVariants}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/About/about-experience-1080.webp"
                  srcSet="/images/About/about-experience-480.webp 480w, /images/About/about-experience-720.webp 720w, /images/About/about-experience-1080.webp 1080w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Hot air balloons over African savannah at sunrise"
                  title="A Scenic Train Journey Through the Ghats to Goa"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  width={800}
                  height={500}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-4 mb-8 text-justify"
              variants={textVariants}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ textAlignLast: "left" }}
              >
                At Safari Sutra, we craft journeys that create lasting memories
                beyond the ordinary tourist trail. Our experiences connect you
                intimately with Africa&#39;s breathtaking landscapes and
                wildlife.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ textAlignLast: "left" }}
              >
                From hot air balloon safaris to encounters with local Maasai
                warriors, each adventure is designed to transform your
                perspective while honoring our commitment to sustainable tourism
                and cultural respect.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ textAlignLast: "left" }}
              >
                We tailor each journey to your interests while preserving these
                precious ecosystems for generations to come.
              </p>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              className="flex justify-center md:justify-start w-full"
            >
              <SSButton
                color="var(--color-orange)"
                scrollTo="reviews"
                variant="primary"
              >
                See What Our Clients Say
              </SSButton>
            </motion.div>
          </motion.div>

          {/* Right content - Image (hidden on mobile) - standard img */}
          <motion.div
            className="hidden md:block md:w-1/2"
            variants={imageVariants}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/About/about-experience-1080.webp"
                srcSet="/images/About/about-experience-480.webp 480w, /images/About/about-experience-720.webp 720w, /images/About/about-experience-1080.webp 1080w"
                sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                alt="Hot air balloons over African savannah at sunrise"
                title="A Scenic Train Journey Through the Ghats to Goa"
                className="w-full h-[600px] object-cover"
                loading="lazy"
                width={1200}
                height={900}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutExperience;
