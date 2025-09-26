"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Common/Navbar";
import SSButton from "@/components/UI/SSButton";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import heroDataRaw from "@/data/HeroData.json";

type Slide = {
  id?: string;
  title: string;
  subtitle?: string;
  // removed `image` (we only use srcSetWebp + srcFallback)
  alt?: string;
  imageTitle?: string;
  srcSetWebp?: string; // added for local webp srcset
  srcFallback?: string; // local fallback image
  buttonText?: string;
  buttonLink?: string;
};

const heroData: Slide[] = (heroDataRaw as unknown) as Slide[];

// helper to get first src from a srcset string
const firstSrcFromSrcSet = (ss?: string): string | undefined => {
  if (!ss) return undefined;
  const first = ss.split(",")[0]?.trim();
  if (!first) return undefined;
  return first.split(/\s+/)[0];
};

// keep helper to optionally randomize client-side only
const getRandomizedHeroData = (data: Slide[]) => {
  if (!Array.isArray(data) || data.length <= 1) return data;
  const first = data[0];
  const rest = data.slice(1);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [first, ...rest];
};

const desktopVariants: Variants = {
  enter: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  center: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(0px, -20px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.3 },
  },
};

const mobileNextVariants: Variants = {
  enter: { opacity: 0, transform: "translate3d(50px, 0px, 0px)" },
  center: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(-50px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.3 },
  },
};

const mobilePrevVariants: Variants = {
  enter: { opacity: 0, transform: "translate3d(-50px, 0px, 0px)" },
  center: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(50px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.3 },
  },
};

const socialIconsVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(10px, 0px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { staggerChildren: 0.1, delayChildren: 0.5, ease: "easeOut", duration: 0.4 },
  },
};

const iconVariant: Variants = {
  initial: { opacity: 0, transform: "scale(0.9)" },
  animate: { opacity: 1, transform: "scale(1)", transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const cloudAnim: Variants = {
  initial: { opacity: 1, transform: "translate3d(-1300px, 50px, 0)" },
  animate: {
    opacity: 1,
    transform: "translate3d(-1300px, 0, 0)",
    transition: { type: "spring", stiffness: 150, damping: 25 },
  },
};

const HomeHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [autoplayPaused, setAutoplayPaused] = useState<boolean>(false);
  const [swipeDirection, setSwipeDirection] = useState<"next" | "prev">("next");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // client-only slides state (initialized deterministically for SSR)
  const [clientSlides, setClientSlides] = useState<Slide[]>(() => heroData);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  // shuffle / preload only on client to avoid hydration mismatch
  useEffect(() => {
    const shuffled = getRandomizedHeroData(heroData);
    setClientSlides(shuffled);

    const preloads: HTMLImageElement[] = [];
    // explicitly type `s` as Slide to avoid `any`
    shuffled.forEach((s: Slide) => {
      const srcToPreload = s.srcFallback ?? firstSrcFromSrcSet(s.srcSetWebp);
      if (!srcToPreload) return; // nothing to preload
      const img = new Image();
      img.src = srcToPreload;
      img.alt = s.alt ?? s.title;
      img.title = s.imageTitle ?? s.alt ?? s.title; // use imageTitle for preload title
      preloads.push(img);
    });
    return () => {
      preloads.length = 0;
    };
  }, []);

  const slides = clientSlides;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (!autoplayPaused) {
      timer = window.setTimeout(() => {
        setCurrentSlide((p) => (p + 1) % clientSlides.length);
        setSwipeDirection("next");
      }, 5000);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [currentSlide, autoplayPaused, clientSlides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index > currentSlide || (currentSlide === clientSlides.length - 1 && index === 0)) {
        setSwipeDirection("next");
      } else {
        setSwipeDirection("prev");
      }
      setCurrentSlide(index);
      setAutoplayPaused(true);
      window.setTimeout(() => setAutoplayPaused(false), 5000);
    },
    [currentSlide, clientSlides.length]
  );

  const nextSlide = useCallback(() => {
    setSwipeDirection("next");
    goToSlide((currentSlide + 1) % clientSlides.length);
  }, [currentSlide, goToSlide, clientSlides.length]);

  const prevSlide = useCallback(() => {
    setSwipeDirection("prev");
    goToSlide(currentSlide === 0 ? clientSlides.length - 1 : currentSlide - 1);
  }, [currentSlide, goToSlide, clientSlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setSwipeDirection("next");
        nextSlide();
      } else {
        setSwipeDirection("prev");
        prevSlide();
      }
    }
  };

  const getActiveVariants = () => (!isMobile ? desktopVariants : swipeDirection === "next" ? mobileNextVariants : mobilePrevVariants);

  return (
    <>
      <Navbar />

      {/* ensure images are requested early */}
      <div style={{ display: "none", visibility: "hidden" }}>
        {clientSlides.map((s, i) => {
          const src = s.srcFallback ?? firstSrcFromSrcSet(s.srcSetWebp) ?? "";
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`pre-${i}`}
              src={src}
              alt={s.alt ?? s.title}
              title={s.imageTitle ?? s.alt ?? s.title} // imageTitle used here
              aria-hidden="true"
              loading="lazy"
            />
          );
        })}
      </div>

      <section
        className="relative h-[100svh] md:h-[105vh] flex flex-col items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div className="hidden md:flex flex-col absolute top-32 right-8 z-20 gap-4" variants={socialIconsVariants} initial="initial" animate="animate">
          <motion.a href="https://www.facebook.com/profile.php?id=61560936836457" target="_blank" rel="noreferrer" aria-label="Facebook" className="bg-white/80 p-2 rounded-full" variants={iconVariant}>
            <Facebook size={18} className="text-[#F89B21]" />
          </motion.a>

          <motion.a href="https://x.com/SafariSutra" target="_blank" rel="noreferrer" aria-label="X" className="bg-white/80 p-2 rounded-full" variants={iconVariant}>
            <Twitter size={18} className="text-[#F89B21]" />
          </motion.a>

          <motion.a href="https://www.instagram.com/safarisutra/" target="_blank" rel="noreferrer" aria-label="Instagram" className="bg-white/80 p-2 rounded-full" variants={iconVariant}>
            <Instagram size={18} className="text-[#F89B21]" />
          </motion.a>

          <motion.a href="https://www.linkedin.com/company/103599001" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="bg-white/80 p-2 rounded-full" variants={iconVariant}>
            <Linkedin size={18} className="text-[#F89B21]" />
          </motion.a>
        </motion.div>

        {slides.map((slide, index) => {
          const builtSrcSet = slide.srcSetWebp ?? (slide.id ? `/images/Destinations/${slide.id}-480.webp 480w, /images/Destinations/${slide.id}-720.webp 720w, /images/Destinations/${slide.id}-1080.webp 1080w` : undefined);
          const firstSrc = firstSrcFromSrcSet(builtSrcSet);
          const fallbackSrc = slide.srcFallback ?? firstSrc ?? "";

          return (
            <div key={`bg-${index}`} className="absolute inset-0 z-0 transition-opacity duration-500" style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 0 : -1 }}>
              {builtSrcSet ? (
                <picture>
                  <source type="image/webp" srcSet={builtSrcSet} sizes="100vw" />
                  {/* fallback uses provided srcFallback or first src from srcSet */}
                  <img
                    src={fallbackSrc}
                    alt={slide.alt ?? slide.title}
                    title={slide.imageTitle ?? slide.alt ?? slide.title}
                    className="w-full h-full object-cover"
                    decoding="async"
                    loading={index === currentSlide ? "eager" : "lazy"}
                  />
                </picture>
              ) : (
                // fallback if no srcSet (rare)
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fallbackSrc}
                  alt={slide.alt ?? slide.title}
                  title={slide.imageTitle ?? slide.alt ?? slide.title}
                  className="w-full h-full object-cover"
                  decoding="async"
                  loading={index === currentSlide ? "eager" : "lazy"}
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          );
        })}

        <div className="container mx-auto md:-mt-10 px-5 md:px-32 relative z-10 flex flex-col justify-center h-full">
          <AnimatePresence mode="wait">
            <motion.div key={`slide-${currentSlide}`} className="max-w-5xl" initial="enter" animate="center" exit="exit" variants={getActiveVariants()}>
              <motion.h1 className="text-white font-family-oswald uppercase text-4xl md:text-5xl lg:text-8xl xl:text-[6.5rem] font-bold mb-4 md:mb-6 leading-tighter" variants={getActiveVariants()}>
                {slides[currentSlide]?.title}
              </motion.h1>

              <motion.p className="text-white text-xl md:text-2xl mb-8 max-w-2xl" variants={getActiveVariants()}>
                {slides[currentSlide]?.subtitle}
              </motion.p>

              <motion.div variants={getActiveVariants()}>
                <SSButton color="var(--color-green)" to={slides[currentSlide].buttonLink} className="text-xl py-3 px-8">
                  {slides[currentSlide]?.buttonText ?? "Explore"}
                </SSButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:block">
          <button className="absolute cursor-pointer z-20 left-4 md:left-8 top-1/2 transform -translate-y-1/2 hover:bg-white/30 text-white rounded-full p-2 transition-all" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>

          <button className="absolute cursor-pointer z-20 right-4 md:right-8 top-1/2 transform -translate-y-1/2 hover:bg-white/30 text-white rounded-full p-2 transition-all" onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="md:hidden absolute bottom-24 left-0 right-0 z-20 flex justify-center">
          <div className="text-white/70 text-xs">Swipe to explore</div>
        </div>

        <div className="absolute bottom-12 md:bottom-12 left-0 right-0 z-20 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button key={`indicator-${index}`} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>

        <motion.div className="absolute bottom-0 left-1/2 w-[2000px] sm:w-[3000px] min-w-full overflow-hidden pointer-events-none select-none -mb-48 sm:-mb-72 z-10" initial="initial" animate="animate" variants={cloudAnim}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/graphics/cloud.min.svg" alt="decorative cloud graphic" title="Decorative cloud graphic" className="w-[3000px] min-w-full" loading="eager" />
        </motion.div>
      </section>
    </>
  );
};

export default HomeHero;
