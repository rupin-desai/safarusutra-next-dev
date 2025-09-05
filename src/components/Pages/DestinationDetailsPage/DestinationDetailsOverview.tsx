"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Star,
  Users,
  Calendar,
  Globe,
  Clock,
  Map,
  IndianRupee,
  Phone,
} from "lucide-react";
import TourSidebar from "./DestinationSidebar";

type Detail = {
  title: string;
  description?: string;
};

type TourData = {
  title: string;
  rating?: number;
  location?: string;
  description?: string;
  longDescription?: string;
  details: Detail[];
};

interface Props {
  tourData: TourData;
  executeScroll?: (id: string) => void;
}

// Animation variants cast to any to allow translate3d/transform strings
const fadeIn: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const contentFadeIn: any = {
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
      damping: 20,
    },
  },
};

const staggerContainer: any = {
  initial: "initial",
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/* MotionSection: reliable in-view trigger using useInView + useAnimation */
const MotionSection: React.FC<{
  variants?: any;
  className?: string;
  children?: React.ReactNode;
  threshold?: number;
}> = ({ variants = {}, className = "", children, threshold = 0.18 }) => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="initial"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

const getDetailStyles = (title: string, index: number): string => {
  switch (title) {
    case "Best For":
      return "text-[var(--color-orange)]";
    case "Price Range":
      return "text-[var(--color-yellow-orange)]";
    case "Best Time To Visit":
      return "text-[var(--color-green)]";
    case "Languages Spoken":
      return "text-[var(--color-dark-teal)]";
    case "Currency":
      return "text-[var(--color-medium-brown)]";
    case "Time Zone":
      return "text-[var(--color-dark-brown)]";
    case "Drives On":
      return "text-[var(--color-dark-teal)]";
    case "Calling Code":
      return "text-[var(--color-orange)]";
    default: {
      const colors = [
        "orange",
        "yellow-orange",
        "green",
        "dark-teal",
        "medium-brown",
      ];
      const colorIndex = index % colors.length;
      const color = colors[colorIndex];
      return `text-[var(--color-${color})]`;
    }
  }
};

const getDetailIcon = (title: string, colorClass: string): React.ReactElement | null => {
  switch (title) {
    case "Best For":
      return <Users size={20} className={colorClass} />;
    case "Price Range":
      return <IndianRupee size={20} className={colorClass} />;
    case "Best Time To Visit":
      return <Calendar size={20} className={colorClass} />;
    case "Languages Spoken":
      return <Globe size={20} className={colorClass} />;
    case "Currency":
      return <IndianRupee size={20} className={colorClass} />;
    case "Time Zone":
      return <Clock size={20} className={colorClass} />;
    case "Drives On":
      return <Map size={20} className={colorClass} />;
    case "Calling Code":
      return <Phone size={20} className={colorClass} />;
    default:
      return null;
  }
};

const DestinationDetailsOverview: React.FC<Props> = ({ tourData, executeScroll }) => {
  if (!tourData) return null;

  const formatDescription = (description?: string) => {
    const lines = String(description || "").split("\n");
    return lines.map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <MotionSection
      className="bg-white py-12 md:py-16 px-4 md:px-16"
      variants={fadeIn}
      threshold={0.22}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left"
              style={{ fontFamily: "var(--font-family-baloo)" }}
              variants={contentFadeIn}
            >
              {tourData.title}
            </motion.h1>

            <motion.div
              className="flex items-center mb-6 justify-center lg:justify-start"
              variants={contentFadeIn}
            >
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(Number(tourData.rating || 0))
                        ? "fill-[var(--color-yellow-orange)] text-[var(--color-yellow-orange)]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {tourData.rating ?? "0"} ({Math.floor(Number(tourData.rating || 0) * 20)} reviews)
              </span>
              <span className="mx-3 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{tourData.location}</span>
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-none mb-8 text-center lg:text-left"
              variants={contentFadeIn}
            >
              <p>{tourData.description}</p>
              <p>{formatDescription(tourData.longDescription)}</p>
            </motion.div>

            <div className="w-full lg:hidden mb-10">
              <TourSidebar tourData={tourData} executeScroll={executeScroll ?? (() => {})} />
            </div>

            <motion.h2
              className="text-2xl font-bold mb-6 text-center lg:text-left self-center lg:self-start w-full"
              variants={contentFadeIn}
            >
              Trip Details
            </motion.h2>

            {/* changed to plain div so MotionSection controls propagate directly to child motion items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 w-full">
              {Array.isArray(tourData.details) &&
                tourData.details.map((detail, index) => {
                  const colorClass = getDetailStyles(detail.title, index);
                  return (
                    <motion.div
                      key={index}
                      className="border-b border-gray-100 pb-4"
                      variants={contentFadeIn}
                      whileHover={
                        ({
                          transform: "translate3d(0px, -3px, 0px)",
                          transition: { type: "spring", stiffness: 400, damping: 15 },
                        } as any)
                      }
                    >
                      <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                        {getDetailIcon(detail.title, colorClass)}
                        <h3 className={`text-lg font-bold ${colorClass}`}>{detail.title}</h3>
                      </div>

                      <div className="text-gray-700 leading-relaxed text-center lg:text-left lg:pl-7">
                        {formatDescription(detail.description)}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/3">
            <TourSidebar tourData={tourData} executeScroll={executeScroll ?? (() => {})} />
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default DestinationDetailsOverview;
