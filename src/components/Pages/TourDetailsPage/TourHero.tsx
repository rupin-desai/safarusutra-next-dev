"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import { getBreadcrumbs } from "../../utils/BreadcrumbDetails";
import type { Tour } from "@/components/UI/TourCard";

// Helper function to generate responsive srcSet from base path
const generateResponsiveSrcSet = (basePath?: string): string => {
  if (!basePath) return "";
  
  // If already contains multiple sizes, return as-is
  if (basePath.includes(',')) return basePath;
  
  // Extract the base path and extension
  const lastSlash = basePath.lastIndexOf('/');
  const lastDot = basePath.lastIndexOf('.');
  
  if (lastSlash === -1 || lastDot === -1) return basePath;
  
  const pathPrefix = basePath.substring(0, lastSlash + 1);
  const nameWithoutExt = basePath.substring(lastSlash + 1, lastDot);
  const extension = basePath.substring(lastDot);
  
  // Generate responsive sizes for hero: 480w, 720w, 1080w, 1920w
  const sizes = [480, 720, 1080, 1920];
  const srcSetEntries = sizes.map(size => {
    const imagePath = `${pathPrefix}${nameWithoutExt}-${size}${extension}`;
    return `${imagePath} ${size}w`;
  });
  
  return srcSetEntries.join(', ');
};

// Helper function to get smallest image as fallback
const getSmallestImageSrc = (basePath?: string): string => {
  if (!basePath) return "/og-default.jpg";
  
  // If it's already a 480px image, return as-is
  if (basePath.includes('-480.')) return basePath;
  
  // Replace larger sizes with 480px version
  return basePath
    .replace('-1920.webp', '-480.webp')
    .replace('-1080.webp', '-480.webp')
    .replace('-720.webp', '-480.webp')
    .replace('-1920.jpg', '-480.jpg')
    .replace('-1080.jpg', '-480.jpg')
    .replace('-720.jpg', '-480.jpg');
};

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

  // Use new responsive properties or fallback to legacy image
  const baseSrc = tour?.srcFallback || tour?.image || tour?.heroImage || "/og-default.jpg";
  const backgroundImageSrc = getSmallestImageSrc(baseSrc); // Use smallest as fallback
  const backgroundImageAlt = tour?.alt || tour?.title || "Tour destination";
  const backgroundImageTitle = tour?.imageTitle || tour?.title || "Tour destination";

  // Generate responsive srcSet
  const responsiveSrcSet = tour?.srcSetWebp && tour.srcSetWebp.includes(',') 
    ? tour.srcSetWebp // Already contains multiple sizes
    : generateResponsiveSrcSet(tour?.srcSetWebp || tour?.srcFallback || tour?.image || tour?.heroImage);

  // Get breadcrumbs based on current path
  const breadcrumbs = getBreadcrumbs(pathname || "/");

  return (
    <>
      <Navbar />
      <section className="relative flex flex-col items-center justify-center overflow-hidden h-[60vh] pt-16">
        {/* Background image with responsive sources */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture className="w-full h-full">
            {responsiveSrcSet && (
              <source 
                srcSet={responsiveSrcSet}
                sizes="(max-width: 480px) 480px, (max-width: 768px) 720px, (max-width: 1024px) 1080px, 100vw"
                type="image/webp"
              />
            )}
            <img
              src={backgroundImageSrc}
              alt={backgroundImageAlt}
              title={backgroundImageTitle}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={800}
            />
          </picture>

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
