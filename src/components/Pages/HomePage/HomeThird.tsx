"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
// import HomeBlog from "./HomeBlog";
// import HomeNewsletter from "./HomeNewsletter";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";

// Animation variants defined outside component
// use x/y numeric props instead of raw "transform" string to satisfy framer-motion types
const backgroundSvgVariants: Variants = {
  initial: {
    opacity: 0.2,
    x: -100,
    y: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 2,
    },
  },
};

const HomeThird: React.FC = () => {
  return (
    <section className="relative">
      {/* Background SVG - with animation and proper overflow handling */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          src="/graphics/biggreenline.svg"
          alt=""
          className="absolute w-[330%] md:w-[120%] top-[170px] md:top-[50px] h-auto object-cover pointer-events-none select-none -left-[100px]"
          aria-hidden="true"
          draggable={false}
          style={{
            maxWidth: "none",
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={backgroundSvgVariants}
        />
      </div>
      <div className="relative z-10">
        {/* <HomeBlog /> */}
        <ContactSection />
      </div>
    </section>
  );
};

export default HomeThird;
