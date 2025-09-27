"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { X, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import SSButton from "../UI/SSButton";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isLegalPage?: boolean;
}

// Use translate3d strings in variants (keeps your requested transform style)
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    transform: "translate3d(100%, 0px, 0px)",
  },
  open: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(100%, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linkVariants: Variants = {
  closed: {
    opacity: 0,
    transform: "translate3d(50px, 0px, 0px)",
  },
  open: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(50px, 0px, 0px)",
  },
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu, isLegalPage = false }) => {
  // Disable scrolling when the menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (typeof window !== "undefined") document.body.style.overflow = "";
    };
  }, [isOpen]);

  const hoverColor = isLegalPage ? "text-[var(--color-orange)]" : "text-green-600";

  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleMenu}
        />
      )}

      <motion.aside
        className="fixed top-0 right-0 h-full bg-white shadow-xl w-4/5 z-70 p-6 flex flex-col"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="exit"
        variants={menuVariants}
        onClick={(e) => e.stopPropagation()}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-row mb-8 relative">
          <motion.button
            onClick={toggleMenu}
            className="p-2 absolute top-0 right-0 text-gray-800"
            whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.9)" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </motion.button>

          <motion.div className="flex flex-col items-center mx-auto" variants={linkVariants}>
            <Link href="/" onClick={toggleMenu} className="flex flex-col items-center">
              <Image src="/logos/logo.svg"  title="Logo of Safari Sutra" alt="SafariSutra" className="h-16 w-16" width={64} height={64} unoptimized />
              <span className="text-xs font-extralight tracking-widest mt-1 text-gray-800 text-center">SAFARI SUTRA</span>
            </Link>
          </motion.div>
        </div>

        <nav className="mt-6 flex flex-col space-y-6 flex-grow">
          <motion.div variants={linkVariants} className="text-right">
            <Link href="/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              Home
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} className="text-right">
            <Link href="/about/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              About
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} className="text-right">
            <Link href="/destination/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              Destinations
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} className="text-right">
            <Link href="/fixed-departures/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              Fixed Departures
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} className="text-right">
            <Link href="/tour/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              All Tours
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} className="text-right">
            <Link href="/hire/" className={`text-3xl font-medium text-gray-800 transition-colors ${hoverColor}`} onClick={toggleMenu}>
              Hire
            </Link>
          </motion.div>
        </nav>

        <div className="mt-auto space-y-4">
          <motion.div variants={linkVariants} className="w-full">
            <SSButton to="/contact/" variant="primary" color={isLegalPage ? "var(--color-orange)" : "var(--color-green)"} className="w-full py-3 text-center" onClick={toggleMenu}>
              Contact Us
            </SSButton>
          </motion.div>

          <motion.div variants={linkVariants} className="w-full">
            <a
              href="https://www.instagram.com/safarisutra/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-medium"
              style={{
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <Instagram size={20} />
              Follow us on Instagram
            </a>
          </motion.div>

          <motion.div variants={linkVariants} className="flex justify-center space-x-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61560936836457" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" onClick={toggleMenu}>
              <Facebook size={20} className="text-gray-700" />
            </a>
            <a href="https://x.com/SafariSutra" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" onClick={toggleMenu}>
              <Twitter size={20} className="text-gray-700" />
            </a>
            <a href="https://www.linkedin.com/company/103599001" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" onClick={toggleMenu}>
              <Linkedin size={20} className="text-gray-700" />
            </a>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default MobileMenu;
