"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, Variants, MotionProps } from "framer-motion";

type SSButtonBase = {
  children: React.ReactNode;
  to?: string | null;
  scrollTo?: string | null;
  variant?: "primary" | "outline";
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// include MotionProps so framer-motion handlers (onDrag etc.) match expected types
export type SSButtonProps = SSButtonBase & MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const hoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      scale: { type: "spring", stiffness: 500, damping: 20, mass: 0.5 },
    },
  },
  tap: { scale: 0.98 },
};

export default function SSButton({
  children,
  to = null,
  scrollTo = null,
  variant = "primary",
  color = "var(--color-orange)",
  className = "",
  onClick,
  ...rest
}: SSButtonProps): React.ReactElement {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);

    if (scrollTo) {
      e.preventDefault();
      const el = document.getElementById(scrollTo);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    if (to) {
      router.push(to);
    }
  };

  const isWhiteColor =
    color === "white" ||
    color === "#fff" ||
    color === "#ffffff" ||
    (typeof color === "string" && color.includes("white"));

  const base = "inline-block cursor-pointer px-8 py-3 rounded-2xl font-semibold";

  let buttonStyle: React.CSSProperties = {};

  if (variant === "primary") {
    buttonStyle = { backgroundColor: color, color: "white" };
  } else {
    if (isWhiteColor) {
      buttonStyle = {
        backgroundColor: "transparent",
        color: "white",
        border: "2px solid white",
      };
    } else {
      buttonStyle = {
        backgroundColor: "transparent",
        color,
        border: `2px solid ${color}`,
      };
    }
  }

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={hoverVariants}
      className={`${base} ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      {...(rest as MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </motion.button>
  );
}
