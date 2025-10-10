"use client";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { PawPrint } from "lucide-react";

const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0,40px,0)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0,0,0)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function HomeExperience() {
  return (
    <motion.section
      className="w-full px-4 rounded-2xl my-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center gap-14 md:gap-20">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <picture>
            <source
              srcSet="/images/dubai-safari/dubai-safari-hero-480.webp 480w, /images/dubai-safari/dubai-safari-hero-720.webp 720w, /images/dubai-safari/dubai-safari-hero-1080.webp 1080w"
              type="image/webp"
            />
            <img
              src="/images/dubai-safari/dubai-safari-hero-1080.webp"
              alt="Dubai Safari Park Experience"
              className="rounded-xl shadow-xl w-full max-w-2xl object-cover"
              loading="lazy"
            />
          </picture>
        </div>
        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-base gap-2 mb-5 bg-orange-50 text-orange-600">
            <PawPrint size={22} />
            Featured Experience
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 text-gray-900 leading-tight">
            Dubai Safari Park
          </h2>
          <p className="text-gray-700 mb-8 max-w-lg text-lg md:text-xl">
            Journey into the wild at Dubai Safari Park with Safari Sutra.
            Encounter exotic animals, enjoy immersive attractions, and create
            unforgettable memories in one of the world’s most innovative
            wildlife destinations.
          </p>
          <Link href="/dubai-safari-experience">
            <SSButton variant="primary" color="var(--color-orange)">
              Explore Dubai Safari Park Experience
            </SSButton>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
