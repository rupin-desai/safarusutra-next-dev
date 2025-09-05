"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Illustration from "./Illustations";

type TitleSize = "small" | "medium" | "large";

interface Props {
  icon?: React.ReactNode;
  pillText?: string;
  title: string;
  color?: string;
  centered?: boolean;
  containerClassName?: string;
  titleSize?: TitleSize;
  showIllustrations?: boolean;
}

// Title animation variants
const titleVariant: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Floating animation for the illustrations
const floatingAnimation: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      y: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
      },
      rotate: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
      },
    },
  },
};

// List of available illustrations
const ILLUSTRATIONS = [
  "camera",
  "cocktail",
  "hotAirBalloon", // fixed minor spelling
  "pouch",
  "seashell1",
  "suitcase",
  "coconut",
  "coconutTree",
] as const;

// List of available colors
const COLORS = [
  "var(--color-dark-brown)",
  "var(--color-medium-brown)",
  "var(--color-orange)",
  "var(--color-yellow-orange)",
  "var(--color-green)",
  "var(--color-dark-teal)",
] as const;

/**
 * Section title with floating illustrations on left and right sides
 */
const SectionTitleWithIllustrations: React.FC<Props> = ({
  icon,
  pillText,
  title,
  color = "#066959",
  centered = true,
  containerClassName = "",
  titleSize = "medium",
  showIllustrations = true,
}) => {
  // Select random illustrations and colors for left and right sides
  const { leftIllustration, rightIllustration } = useMemo(() => {
    const leftIndex = Math.floor(Math.random() * ILLUSTRATIONS.length);
    let rightIndex = Math.floor(Math.random() * ILLUSTRATIONS.length);
    if (ILLUSTRATIONS.length > 1) {
      while (rightIndex === leftIndex) {
        rightIndex = Math.floor(Math.random() * ILLUSTRATIONS.length);
      }
    }

    const leftColorIndex = Math.floor(Math.random() * COLORS.length);
    let rightColorIndex = Math.floor(Math.random() * COLORS.length);
    if (COLORS.length > 1) {
      while (rightColorIndex === leftColorIndex) {
        rightColorIndex = Math.floor(Math.random() * COLORS.length);
      }
    }

    return {
      leftIllustration: {
        name: String(ILLUSTRATIONS[leftIndex]),
        color: String(COLORS[leftColorIndex]),
      },
      rightIllustration: {
        name: String(ILLUSTRATIONS[rightIndex]),
        color: String(COLORS[rightColorIndex]),
      },
    };
  }, []);

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Left floating illustration */}
      {showIllustrations && (
        <motion.div
          className="absolute top-0 opacity-80 hidden md:block"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          style={{ left: "8%" }}
        >
          <Illustration
            name={leftIllustration.name}
            size={120}
            color={leftIllustration.color}
            className="transform -translate-y-2 opacity-40"
          />
        </motion.div>
      )}

      {/* Right floating illustration */}
      {showIllustrations && (
        <motion.div
          className="absolute top-0 opacity-80 hidden md:block"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          style={{ right: "8%" }}
        >
          <Illustration
            name={rightIllustration.name}
            size={120}
            color={rightIllustration.color}
            className="transform -translate-y-2 opacity-40"
          />
        </motion.div>
      )}

      {/* Section title component */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={titleVariant}
        className="relative z-10"
      >
        <SectionTitle
          icon={icon}
          pillText={pillText ?? ""}
          title={title}
          color={color}
          centered={centered}
          titleSize={titleSize}
        />
      </motion.div>
    </div>
  );
};

export default SectionTitleWithIllustrations;
