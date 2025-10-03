"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SSButton from "../../UI/SSButton";

// Animation variants updated to remove delays
const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const AboutBanner = () => {
  return (
    <section className="relative py-40 md:py-48 overflow-hidden">
      {/* Decorative star element */}
      <motion.div
        className="absolute top-20 right-10 md:right-40 z-10 w-14 h-14 md:w-24 md:h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <Image
          src="/graphics/star.svg"
          alt="Star for decoration"
          title="Decorative star for about banner section"
          width={96}
          height={96}
          className="w-14 h-14 md:w-24 md:h-24"
        />
      </motion.div>

      {/* Background image with overlay - responsive sources from /images/about */}
      <div className="absolute inset-0 w-full h-full z-0">
        <picture>
          <source
            srcSet="/images/About/about-banner-bg-480.webp 480w, /images/About/about-banner-bg-720.webp 720w, /images/About/about-banner-bg-1080.webp 1080w"
            sizes="100vw"
            type="image/webp"
          />
          {/* fallback img */}
          <img
            src="/images/About/about-banner-bg-1080.webp"
            srcSet="/images/About/about-banner-bg-480.webp 480w, /images/About/about-banner-bg-720.webp 720w, /images/About/about-banner-bg-1080.webp 1080w"
            sizes="100vw"
            alt="Beach ocean view with one boat"
            title="Beach ocean view with one boat"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content container */}
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Direct animations with translate3d instead of y */}
        <motion.h2
          className="text-4xl md:text-6xl font-family-oswald font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-family-oswald)" }}
          initial={{ opacity: 0, transform: "translate3d(0px, 30px, 0px)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          Where To Next?
          <br />
          Explore Breathtaking Destinations
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, transform: "translate3d(0px, 30px, 0px)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          From misty mountains to sun-soaked beaches, golden deserts to vibrant
          cities—your next adventure is just one click away!
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, transform: "translate3d(0px, 20px, 0px)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <SSButton
            variant="primary"
            color="var(--color-orange)"
            to="/destination/"
          >
            View Destinations
          </SSButton>

          <SSButton variant="outline" color="white" to="/contact/">
            Contact Us
          </SSButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutBanner;
