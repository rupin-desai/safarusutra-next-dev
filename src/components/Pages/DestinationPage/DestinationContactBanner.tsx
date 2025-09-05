"use client";

import React from "react";
import { motion } from "framer-motion";
import SSButton from "@/components/UI/SSButton";

// cast variant to any to allow translate3d string
const bannerVariants: any = {
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
      damping: 30,
    },
  },
};

const DestinationContactBanner: React.FC = () => {
  return (
    <section className="relative py-0">
      <div
        className="h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522506209496-4536d9020ec4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWluJTIwaGlrZXxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <motion.div
            className="text-center max-w-3xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.4 }}
            variants={bannerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              That Wanderlust Itch? Let's Scratch It!
            </h2>
            <p
              className="text-base px-6 md:px-2 md:text-xl text-white/90 mb-8 text-justify"
              style={{ textAlignLast: "center" }}
            >
              Your dream vacation has been sitting in your 'someday' folder for
              too long! Our travel wizards are ready to turn your travel dreams
              into real-life adventures.
            </p>
            {/* removed unsupported `size` prop to match SSButton props */}
            <SSButton to="/contact" color="var(--color-orange)">
              Let The Adventures Begin!
            </SSButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationContactBanner;
