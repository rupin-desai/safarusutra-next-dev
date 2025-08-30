"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import TourCard, { Tour } from "../../UI/TourCard";
import packageDetailsRaw from "@/data/PackageDetails.json";
import SSButton from "../../UI/SSButton";

type Package = {
  id: number;
  [key: string]: any;
};

const packageDetails: Package[] = (packageDetailsRaw as unknown) as Package[];

// Animation variants (typed)
const decorativeElementsVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-100px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
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
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const desktopCarouselVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 80px, 0px)",
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

const mobileCarouselVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 60px, 0px)",
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

const cardVariants: Variants = {
  offLeft: {
    x: "-120%",
    scale: 0.8,
    opacity: 0,
    zIndex: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  left: {
    x: "-100%",
    scale: 0.85,
    opacity: 0.5,
    zIndex: 10,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    zIndex: 20,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  right: {
    x: "100%",
    scale: 0.85,
    opacity: 0.5,
    zIndex: 10,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  offRight: {
    x: "120%",
    scale: 0.8,
    opacity: 0,
    zIndex: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
};

const mobileCardVariants: Variants = {
  offLeft: {
    x: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  center: {
    x: "0%",
    opacity: 1,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  offRight: {
    x: "100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
};

const DEFAULT_FEATURED_IDS: number[] = [56, 57, 58, 59];

interface HomeIntroProps {
  featuredIds?: number[] | string[];
}

const HomeIntro: React.FC<HomeIntroProps> = ({ featuredIds: featuredIdsProp }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
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

  // Initialize featuredIds
  useEffect(() => {
    if (Array.isArray(featuredIdsProp) && featuredIdsProp.length > 0) {
      setFeaturedIds(featuredIdsProp.map((id) => String(id)));
      return;
    }

    if (Array.isArray(DEFAULT_FEATURED_IDS) && DEFAULT_FEATURED_IDS.length > 0) {
      setFeaturedIds(DEFAULT_FEATURED_IDS.map((id) => String(id)));
      return;
    }

    // Fallback: pick randomized first 5 ids from packageDetails
    const all = packageDetails.map((p) => String(p.id));
    const shuffled = shuffle(all);
    setFeaturedIds(shuffled.slice(0, Math.min(5, shuffled.length)));
  }, [featuredIdsProp]);

  const getIndex = (idx: number) => {
    const len = featuredIds.length || 1;
    return ((idx % len) + len) % len;
  };

  // derive featuredTours from ids using packageDetails.json
  const featuredTours = featuredIds
    .map((id) => packageDetails.find((p) => String(p.id) === String(id)))
    .filter(Boolean) as unknown as Tour[]; // cast to Tour[] (title is optional now)

  // auto navigation helper
  const autoNext = () => {
    setActiveIndex((prev) => getIndex(prev + 1));
  };

  useEffect(() => {
    if (featuredIds.length === 0) return;

    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        window.clearInterval(autoplayTimerRef.current);
      }
      autoplayTimerRef.current = window.setInterval(() => {
        if (!isPaused) autoNext();
      }, 3000) as unknown as number;
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    };
  }, [featuredIds, isPaused]);

  if (featuredIds.length === 0 || featuredTours.length === 0) {
    return null;
  }

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = window.setTimeout(() => setIsPaused(false), 5000) as unknown as number;
  };

  const handlePrev = () => {
    pauseAutoplay();
    setActiveIndex((prev) => getIndex(prev - 1));
  };

  const handleNext = () => {
    pauseAutoplay();
    setActiveIndex((prev) => getIndex(prev + 1));
  };

  const getCardPosition = (idx: number) => {
    const len = featuredIds.length;
    const diff = ((idx - activeIndex) + len) % len;
    if (diff === 0) return "center";
    if (diff === len - 1) return "left";
    if (diff === 1) return "right";
    if (diff < len / 2) return "offRight";
    return "offLeft";
  };

  const visibleIndices = featuredIds.map((_, i) => i);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative py-16 md:py-24 flex flex-col items-center overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 z-10 w-[300px] h-[80px] sm:w-[260px] sm:h-[60px] md:w-[340px] md:h-[80px] lg:w-[420px] lg:h-[110px]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={decorativeElementsVariants}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/graphics/linearrow.svg"
          alt=""
          className="
            absolute top-0 md:top-10 left-[-150px] w-[800px] h-auto
            sm:left-[-60px] sm:w-[180px]
            md:left-[-80px] md:w-[240px]
            lg:left-[-100px] lg:w-[320px]
          "
          draggable={false}
          aria-hidden="true"
          animate={{
            transform: [
              "translate3d(0px, 0px, 0px)",
              "translate3d(-4px, 0px, 0px)",
              "translate3d(0px, 0px, 0px)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/graphics/plane.svg"
          alt=""
          className="
            absolute top-5 md:top-10 left-[32px] w-14 h-14
            sm:left-[56px] sm:w-10 sm:h-10
            md:left-[80px] md:w-14 md:h-14
            lg:left-[104px] lg:w-20 lg:h-20
          "
          draggable={false}
          aria-hidden="true"
          animate={{
            transform: [
              "translate3d(0px, -10px, 0px) rotate(20deg)",
              "translate3d(-30px, 0px, 0px) rotate(30deg)",
              "translate3d(0px, -10px, 0px) rotate(20deg)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="mb-12 md:mb-3"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        <SectionTitle
          icon={<MapPin size={16} />}
          pillText="Top Tours"
          title="Safari Sutra's Hit List"
          color="#066959"
          centered={true}
        />
      </motion.div>

      <motion.div
        className="relative w-full max-w-5xl mx-auto items-center justify-center hidden xl:block"
        style={{ height: 500 }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={desktopCarouselVariants}
        id="destinations-xl"
      >
        <motion.button
          onClick={handlePrev}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute cursor-pointer -left-16 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Previous"
        >
          <ArrowLeft size={28} />
        </motion.button>

        <div className="flex items-center justify-center w-full h-full relative">
          <AnimatePresence initial={false}>
            {visibleIndices.map((idx) => {
              const position = getCardPosition(idx);
              if (position !== "center" && position !== "left" && position !== "right") {
                return null;
              }

              const tour = featuredTours[idx];
              if (!tour) return null;

              return (
                <motion.div
                  key={`xl-card-${tour.id}`}
                  custom={idx}
                  variants={cardVariants}
                  initial={position}
                  animate={position}
                  exit={getCardPosition(idx) === "right" ? "offRight" : "offLeft"}
                  className={`absolute top-1/2 -translate-y-1/2 w-[360px] ${position === "center" ? "cursor-pointer" : ""}`}
                  style={{
                    pointerEvents: position === "center" ? "auto" : "none",
                  }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleNext}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute -right-16 cursor-pointer z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Next"
        >
          <ArrowRight size={28} />
        </motion.button>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredIds.map((_, idx) => (
            <div
              key={`indicator-xl-${idx}`}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === activeIndex ? "bg-[var(--color-dark-teal)] w-4" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-2xl mx-auto items-center justify-center hidden md:block xl:hidden"
        style={{ height: 380 }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={desktopCarouselVariants}
        id="destinations-md"
      >
        <motion.button
          onClick={handlePrev}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute cursor-pointer -left-10 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Previous"
        >
          <ArrowLeft size={22} />
        </motion.button>

        <div className="flex items-center justify-center w-full h-full relative">
          <AnimatePresence initial={false}>
            {visibleIndices.map((idx) => {
              const position = getCardPosition(idx);
              if (position !== "center" && position !== "left" && position !== "right") {
                return null;
              }

              const tour = featuredTours[idx];
              if (!tour) return null;

              return (
                <motion.div
                  key={`md-card-${tour.id}`}
                  custom={idx}
                  variants={cardVariants}
                  initial={position}
                  animate={position}
                  exit={getCardPosition(idx) === "right" ? "offRight" : "offLeft"}
                  className={`absolute top-1/2 -translate-y-1/2 w-[240px] ${position === "center" ? "cursor-pointer" : ""}`}
                  style={{
                    pointerEvents: position === "center" ? "auto" : "none",
                  }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleNext}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute -right-10 cursor-pointer z-30 flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Next"
        >
          <ArrowRight size={22} />
        </motion.button>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredIds.map((_, idx) => (
            <div
              key={`indicator-md-${idx}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? "bg-[var(--color-dark-teal)] w-3" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-xs mx-auto flex md:hidden items-center justify-center"
        style={{ height: 380 }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={mobileCarouselVariants}
        id="destinations-sm"
      >
        <motion.button
          onClick={handlePrev}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute -left-5 cursor-pointer z-30 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Previous"
        >
          <ArrowLeft size={22} />
        </motion.button>

        <div className="flex items-center justify-center w-full h-full relative">
          <AnimatePresence initial={false}>
            {visibleIndices.map((idx) => {
              let position = "center";
              if (idx === getIndex(activeIndex - 1)) position = "offLeft";
              else if (idx === activeIndex) position = "center";
              else if (idx === getIndex(activeIndex + 1)) position = "offRight";
              else return null;

              const tour = featuredTours[idx];
              if (!tour) return null;

              return (
                <motion.div
                  key={`mobile-card-${tour.id}`}
                  custom={idx}
                  variants={mobileCardVariants}
                  initial={position === "offRight" ? "offRight" : "offLeft"}
                  animate={position}
                  exit={position === "center" && idx < activeIndex ? "offLeft" : "offRight"}
                  className="absolute w-full"
                >
                  <TourCard tour={tour} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleNext}
          whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.85)" }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute -right-5 cursor-pointer z-30 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-dark-teal)] text-white shadow-lg"
          style={{ top: "50%" }}
          aria-label="Next"
        >
          <ArrowRight size={22} />
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0, transform: "translate3d(0px, 20px, 0px)" }}
        whileInView={{
          opacity: 1,
          transform: "translate3d(0px, 0px, 0px)",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.4,
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-xl mx-auto mb-6 px-4">
          <h3 className="text-xl md:text-4xl font-family-baloo font-medium text-gray-700 mt-8 md:mt-4  mb-3">
            Ready for your next adventure?
          </h3>
        </div>
        <SSButton to="/fixeddepartures" color="var(--color-dark-teal)" className="px-10 py-3.5 text-lg">
          Explore All Tours
        </SSButton>
      </motion.div>
    </section>
  );
};

export default HomeIntro;
