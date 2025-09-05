"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import { getBreadcrumbs } from "../../utils/BreadcrumbDetails";
import type { Tour } from "@/components/UI/TourCard";

// Animation variants for title (keep transform: translate3d)
const titleVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 40px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 18,
      delay: 0.2,
    },
  },
};

// Animation variants for breadcrumbs (keep transform: translate3d)
const breadcrumbVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 18,
      delay: 0.3,
    },
  },
};

const TourHero = ({ tour }: { tour?: Tour | null }) => {
  // Get current pathname to generate breadcrumbs
  const pathname = usePathname();

  // Use tour.image directly (provide fallback)
  const backgroundImageSrc = tour?.image ?? "/og-default.jpg";

  // Get breadcrumbs based on current path
  const breadcrumbs = getBreadcrumbs(pathname || "/");

  return (
    <>
      <Navbar />
      <section className="relative flex flex-col items-center justify-center overflow-hidden h-[60vh] pt-16">
        {/* Background image */}
        <div className="absolute inset-0 z-0 overflow-hidden ">
          <Image
            src={backgroundImageSrc}
            alt={tour?.title ?? ""}
            className="w-full h-full object-cover"
            fill
            priority
          />

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center">
          {/* Animated Title - smaller size, no quotes */}
          <motion.h1
            className="text-white font-family-baloo text-2xl md:text-4xl lg:text-5xl uppercase text-center font-bold z-10 drop-shadow-lg mb-3"
            initial="initial"
            animate="animate"
            variants={titleVariants}
          >
            {String(tour?.title ?? "")}
          </motion.h1>

          {/* Subtitle (only on md screens and up) */}
          <motion.p
            className="hidden md:block text-md md:text-lg text-white/90 mb-4 max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={titleVariants}
          >
            {String(tour?.subtitle ?? "Experience the adventure of a lifetime with our carefully crafted tour package")}
          </motion.p>

          {/* Breadcrumb navigation in slate background container */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div
              className="bg-slate-800/70 py-1.5 px-4 rounded-full backdrop-blur-sm"
              initial="initial"
              animate="animate"
              variants={breadcrumbVariants}
            >
              <div className="flex items-center justify-center text-white text-sm md:text-base">
                <Link
                  href="/"
                  className="hover:text-green-400 transition-colors flex items-center"
                >
                  <Home size={16} />
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <ChevronRight size={16} className="mx-2 text-white/70" />
                    {crumb.isLast || !crumb.path ? (
                      <span className="text-white/80">{String(crumb.label ?? "")}</span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="hover:text-green-400 transition-colors"
                      >
                        {String(crumb.label ?? "")}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default TourHero;
