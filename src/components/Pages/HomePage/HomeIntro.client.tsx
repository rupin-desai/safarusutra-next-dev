"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TourCard, { Tour } from "../../UI/TourCard";
import TourDetailsRaw from "@/data/TourDetails.json";
import SSButton from "../../UI/SSButton";

type Package = {
  id: number;
  title?: string;
  slug?: string;
  image?: string;
  route?: string;
  price?: number;
  duration?: string;
  [key: string]: unknown;
};

const packageDetails: Package[] = (TourDetailsRaw as unknown) as Package[];

// Animation variants (keep as-is)
const decorativeElementsVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(-100px, 0px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};
const desktopCarouselVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 80px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 } },
};
const cardVariants: Variants = {
  offLeft: { x: "-120%", scale: 0.8, opacity: 0, zIndex: 0, transition: { type: "tween", duration: 0.5, ease: "easeInOut" } },
  left: { x: "-100%", scale: 0.85, opacity: 0.5, zIndex: 10, transition: { type: "tween", duration: 0.5, ease: "easeInOut" } },
  center: { x: "0%", scale: 1, opacity: 1, zIndex: 20, transition: { type: "tween", duration: 0.5, ease: "easeInOut" } },
  right: { x: "100%", scale: 0.85, opacity: 0.5, zIndex: 10, transition: { type: "tween", duration: 0.5, ease: "easeInOut" } },
  offRight: { x: "120%", scale: 0.8, opacity: 0, zIndex: 0, transition: { type: "tween", duration: 0.5, ease: "easeInOut" } },
};

const DEFAULT_FEATURED_IDS: number[] = [56, 57, 58, 59];

export interface HomeIntroProps {
  featuredIds?: number[] | string[];
  featuredTours?: Tour[]; // server-provided tours (optional)
}

const HomeIntroClient: React.FC<HomeIntroProps> = ({ featuredIds: featuredIdsProp, featuredTours: featuredToursProp }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  // keep isPaused state but drop unused setter to silence lint
  const [isPaused] = useState<boolean>(false);

  const autoplayTimerRef = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);

  // Helper: Fisher-Yates shuffle
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    if (Array.isArray(featuredToursProp) && featuredToursProp.length > 0) {
      setFeaturedIds(featuredToursProp.map((t) => String(t.id)));
      return;
    }
    if (Array.isArray(featuredIdsProp) && featuredIdsProp.length > 0) {
      setFeaturedIds(featuredIdsProp.map((id) => String(id)));
      return;
    }
    if (Array.isArray(DEFAULT_FEATURED_IDS) && DEFAULT_FEATURED_IDS.length > 0) {
      setFeaturedIds(DEFAULT_FEATURED_IDS.map((id) => String(id)));
      return;
    }
    const all = packageDetails.map((p) => String(p.id));
    const shuffled = shuffle(all);
    setFeaturedIds(shuffled.slice(0, Math.min(5, shuffled.length)));
  }, [featuredIdsProp, featuredToursProp]);

  const getIndex = useCallback((idx: number) => {
    const len = featuredIds.length || 1;
    return ((idx % len) + len) % len;
  }, [featuredIds]);

  const featuredList: Tour[] = React.useMemo(() => {
    if (Array.isArray(featuredToursProp) && featuredToursProp.length > 0) {
      return featuredToursProp;
    }
    return featuredIds
      .map((id) => packageDetails.find((p) => String(p.id) === String(id)))
      .filter(Boolean)
      .map((p) => ({
        id: p!.id,
        title: p!.title ?? "",
        image: p!.image ?? "",
        route: p!.route ?? "",
        price: p!.price,
        duration: p!.duration,
      })) as Tour[];
  }, [featuredToursProp, featuredIds]);

  const autoNext = useCallback(() => setActiveIndex((prev) => getIndex(prev + 1)), [getIndex]);

  useEffect(() => {
    if (featuredList.length === 0) return;
    const startAutoplay = () => {
      if (autoplayTimerRef.current) window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = window.setInterval(() => {
        if (!isPaused) autoNext();
      }, 3000) as unknown as number;
    };
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) { window.clearInterval(autoplayTimerRef.current); autoplayTimerRef.current = null; }
      if (pauseTimerRef.current) { window.clearTimeout(pauseTimerRef.current); pauseTimerRef.current = null; }
    };
  }, [featuredList, isPaused, autoNext]);

  const handlePrev = useCallback(() => setActiveIndex((prev) => getIndex(prev - 1)), [getIndex]);
  const handleNext = useCallback(() => setActiveIndex((prev) => getIndex(prev + 1)), [getIndex]);

  const visibleIndices = React.useMemo(() => {
    if (featuredList.length === 0) return [];
    const len = featuredList.length;
    if (len === 1) return [0];
    if (len === 2) return [getIndex(activeIndex - 1), activeIndex];
    return [getIndex(activeIndex - 1), activeIndex, getIndex(activeIndex + 1)];
  }, [activeIndex, featuredList.length, getIndex]);

  const getCardPosition = (idx: number) => {
    if (idx === getIndex(activeIndex - 1)) return "left";
    if (idx === activeIndex) return "center";
    if (idx === getIndex(activeIndex + 1)) return "right";
    return null;
  };

  if (featuredList.length === 0) return null;

  return (
    // hide client-only interactive markup from screen-readers / crawlers (server provided SEO content)
    <div className="relative py-16 md:py-24" aria-hidden="true">
      {/* Decorative motion elements */}
      <motion.div className="absolute top-0 left-0 z-10 w-[300px] h-[80px]" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={decorativeElementsVariants}>
        <motion.img src="/graphics/linearrow.svg" alt="" draggable={false} aria-hidden="true" animate={{ transform: ["translate3d(0px,0,0)", "translate3d(-4px,0,0)", "translate3d(0px,0,0)"] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} />
        <motion.img src="/graphics/plane.svg" alt="" draggable={false} aria-hidden="true" animate={{ transform: ["translate3d(0px,-10px,0) rotate(20deg)", "translate3d(-30px,0,0) rotate(30deg)", "translate3d(0px,-10px,0) rotate(20deg)"] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      </motion.div>

      {/* Carousel & interactive UI (no sr-only headings here) */}
      <div className="relative w-full max-w-5xl mx-auto items-center justify-center">
        {/* desktop carousel */}
        <motion.div className="relative" style={{ height: 500 }} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={desktopCarouselVariants}>
          <motion.button onClick={handlePrev} aria-label="Previous" className="absolute -left-16 top-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"><ArrowLeft size={28} /></motion.button>

          <div className="flex items-center justify-center w-full h-full relative">
            <AnimatePresence initial={false}>
              {visibleIndices.map((idx, mapIndex) => {
                 const position = getCardPosition(idx);
                 if (!position) return null;
                 const tour = featuredList[idx];
                 if (!tour) return null;
                 return (
                   <motion.div
                    // include mapIndex and activeIndex so keys are unique across renders
                    key={`card-${String(tour.id)}-${mapIndex}-${position}-${activeIndex}`}
                     custom={idx}
                     variants={cardVariants}
                     initial={position}
                     animate={position}
                     exit={position === "right" ? "offRight" : "offLeft"}
                     className={`absolute top-1/2 -translate-y-1/2 w-[360px] ${position === "center" ? "cursor-pointer" : ""}`}
                     style={{ pointerEvents: position === "center" ? "auto" : "none" }}
                   >
                     <TourCard tour={tour} />
                   </motion.div>
                 );
               })}
             </AnimatePresence>
          </div>

          <motion.button onClick={handleNext} aria-label="Next" className="absolute -right-16 top-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"><ArrowRight size={28} /></motion.button>
        </motion.div>
      </div>

      <div className="mt-14 text-center">
        <div className="max-w-xl mx-auto mb-6 px-4">
          <h3 className="text-xl md:text-4xl font-family-baloo font-medium text-gray-700 mt-8 md:mt-4 mb-3">Ready for your next adventure?</h3>
        </div>
        <SSButton to="/fixeddepartures" color="var(--color-dark-teal)" className="px-10 py-3.5 text-lg">Explore All Tours</SSButton>
      </div>
    </div>
  );
};

export default HomeIntroClient;
