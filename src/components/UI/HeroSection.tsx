"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../Common/Navbar";
import { getBreadcrumbs } from "../utils/BreadcrumbDetails";

// Animation variants typed with framer-motion Variants
const titleVariants: Variants = {
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

const breadcrumbVariants: Variants = {
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

interface Breadcrumb {
  label: string;
  path?: string;
  isLast?: boolean;
}

interface HeroSectionProps {
  title?: string;
  backgroundImage: string;
  overlay?: number;
  titleSize?: string;
  customBreadcrumbs?: Breadcrumb[] | null;
  compact?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  backgroundImage,
  overlay = 0.2,
  titleSize = "text-4xl md:text-6xl lg:text-7xl",
  customBreadcrumbs = null,
  compact = false,
}) => {
  const pathname = usePathname() ?? "/";

  const [animationState, setAnimationState] = useState<"initial" | "animate">(
    "initial"
  );

  useEffect(() => {
    const t = window.setTimeout(() => setAnimationState("animate"), 60);
    return () => window.clearTimeout(t);
  }, []);

  const backgroundImageSrc = backgroundImage;

  // ensure typed breadcrumbs
  const breadcrumbs: Breadcrumb[] =
    (customBreadcrumbs ?? (getBreadcrumbs(pathname) as Breadcrumb[])) || [];

  // Check if this is a blog slug page (not the main /blogs page)
  const isBlogSlugPage =
    pathname.startsWith("/blogs/") &&
    pathname !== "/blogs" &&
    !pathname.endsWith("/blogs");

  return (
    <>
      <Navbar />
      <section
        className={`relative flex flex-col items-center justify-center overflow-hidden pt-16 ${
          isBlogSlugPage || compact ? "h-[25vh]" : "h-[40vh]"
        }`}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImageSrc}
            alt={`${title || "Page"} background image`}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {overlay > 0 && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
            ></div>
          )}
        </div>

        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center">
          {!isBlogSlugPage && !compact && title && (
            <motion.h1
              className={`text-white font-family-baloo ${titleSize} uppercase text-center font-bold z-10 drop-shadow-lg mb-4`}
              initial="initial"
              animate={animationState}
              variants={titleVariants}
            >
              {title}
            </motion.h1>
          )}

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
