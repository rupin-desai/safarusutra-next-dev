"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../Common/Navbar";
import { getBreadcrumbs } from "../utils/BreadcrumbDetails";

// Animation variants defined outside component
const titleVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 40px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      delay: 0.2,
    },
  },
};

const breadcrumbVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      delay: 0.3,
    },
  },
};

const HeroSection: React.FC<{
  title: string;
  backgroundImage: string;
  overlay?: number;
  titleSize?: string;
  customBreadcrumbs?: any[] | null;
}> = ({
  title,
  backgroundImage,
  overlay = 0.2,
  titleSize = "text-4xl md:text-6xl lg:text-7xl",
  customBreadcrumbs = null,
}) => {
  // Get current pathname to generate breadcrumbs (Next.js)
  const pathname = usePathname() ?? "/";

  // animation state — trigger on mount (removed useLoading dependency)
  const [animationState, setAnimationState] = useState<"initial" | "animate">(
    "initial"
  );

  useEffect(() => {
    // trigger animate after mount
    const t = window.setTimeout(() => setAnimationState("animate"), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Use the provided background image directly
  const backgroundImageSrc = backgroundImage;

  // Get breadcrumbs - either custom or generated from current path
  const breadcrumbs = customBreadcrumbs || getBreadcrumbs(pathname);

  return (
    <>
      {/* Navbar is always included */}
      <Navbar />
      <section className="relative flex flex-col items-center justify-center overflow-hidden h-[40vh] pt-16">
        {/* Background image using standard img */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImageSrc}
            alt={`${title} background image`}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Dark overlay for better text visibility */}
          {overlay > 0 && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
            ></div>
          )}
        </div>

        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center">
          {/* Animated Title - with larger size */}
          <motion.h1
            className={`text-white font-family-baloo ${titleSize} uppercase text-center font-bold z-10 drop-shadow-lg mb-4`}
            initial="initial"
            animate={animationState}
            variants={titleVariants}
          >
            {title}
          </motion.h1>

          {/* Breadcrumb navigation */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div
              className="bg-dark-brown py-1 px-4 rounded-lg"
              initial="initial"
              animate={animationState}
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
                      <span className="text-white/80">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="hover:text-green-400 transition-colors"
                      >
                        {crumb.label}
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

export default HeroSection;
