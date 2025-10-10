"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import MobileMenu from "./MobileMenu";
import SSButton from "../UI/SSButton";

type NavbarProps = {
  isLegalPage?: boolean;
};

// Animation variants defined outside component
const navbarVariants: Variants = {
  visible: (scrolled: boolean) => ({
    transform: "translate3d(0px, 0px, 0px)",
    backgroundColor: scrolled
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(255, 255, 255, 0)",
    boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    },
  }),
  hidden: {
    transform: "translate3d(0px, -100%, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    },
  },
};

const logoVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -20px, 0px)",
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

const navLinksVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1,
    },
  },
};

const contactButtonVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const Navbar: React.FC<NavbarProps> = ({ isLegalPage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setVisible(true);
        setScrolled(currentScrollY > 50);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setScrolled(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen((v) => !v);

  // Determine text color and underline color based on page type
  const textColor = isLegalPage || scrolled ? "text-gray-800" : "text-white";
  const underlineColor = isLegalPage
    ? "var(--color-orange)"
    : scrolled
    ? "var(--color-green)"
    : "white";

  const hamburgerColor = isLegalPage
    ? "bg-[var(--color-medium-brown)]"
    : scrolled
    ? "bg-gray-800"
    : "bg-white";

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: ${underlineColor};
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .nav-link.active::after {
          transform: scaleX(1);
        }

        ${
          isLegalPage
            ? `
        .navbar-legal {
          background-color: rgba(255, 255, 255, 0.9) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
        `
            : ""
        }
      `}</style>

      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 ${
          isLegalPage ? "navbar-legal" : ""
        }`}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        custom={scrolled || isLegalPage}
        variants={navbarVariants}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo - Left */}
          <motion.div
            className="flex-shrink-0"
            initial="initial"
            animate="animate"
            variants={logoVariants}
          >
            <Link href="/" className="flex flex-col items-center">
              <Image
                src="/logos/logo.svg"
                title="Logo of Safari Sutra"
                alt="SafariSutra"
                width={40}
                height={40}
                unoptimized
              />
              <span
                className={`text-xs md:text-sm font-extralight mt-1 ${textColor}`}
              >
                SAFARI SUTRA
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <motion.div
            className="hidden md:flex items-center justify-center flex-1"
            initial="initial"
            animate="animate"
            variants={navLinksVariants}
          >
            <div className="flex space-x-8">
              {/* Home */}
              <Link
                key="/"
                href="/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              {/* About */}
              <Link
                key="/about/"
                href="/about/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/about/" ? "active" : ""
                }`}
              >
                About
              </Link>
              {/* Destinations */}
              <Link
                key="/destination/"
                href="/destination/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/destination/" ? "active" : ""
                }`}
              >
                Destinations
              </Link>
              {/* Tours */}
              <Link
                key="/tour/"
                href="/tour/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/tour/" ? "active" : ""
                }`}
              >
                Tours
              </Link>
              {/* Fixed Departures */}
              <Link
                key="/fixed-departures/"
                href="/fixed-departures/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/fixed-departures/" ? "active" : ""
                }`}
              >
                Departures
              </Link>
              {/* Experiences */}
              <Link
                key="/dubai-safari-experience"
                href="/dubai-safari-experience"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname.startsWith("/dubai-safari-experience")
                    ? "active"
                    : ""
                }`}
              >
                Experiences
              </Link>
              {/* Hire */}
              <Link
                key="/hire/"
                href="/hire/"
                className={`nav-link uppercase font-medium transition-colors ${textColor} ${
                  pathname === "/hire/" ? "active" : ""
                }`}
              >
                Hire
              </Link>
            </div>
          </motion.div>

          {/* Contact Button - Right */}
          <motion.div
            className="hidden md:block"
            initial="initial"
            animate="animate"
            variants={contactButtonVariants}
          >
            <SSButton
              to="/contact/"
              variant="primary"
              color={isLegalPage ? "var(--color-orange)" : "var(--color-green)"}
              className="px-3"
            >
              Contact Us
            </SSButton>
          </motion.div>

          {/* Hamburger Icon for Mobile */}
          <motion.div
            className="md:hidden cursor-pointer"
            initial="initial"
            animate="animate"
            variants={logoVariants}
            onClick={toggleMenu}
          >
            <div
              className={`w-6 h-0.5 mb-1.5 transition-all ${hamburgerColor} ${
                isOpen ? "transform rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 mb-1.5 transition-all ${hamburgerColor} ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 transition-all ${hamburgerColor} ${
                isOpen ? "transform -rotate-45 -translate-y-2" : ""
              }`}
            />
          </motion.div>
        </div>
      </motion.nav>

      {/* Separate AnimatePresence for the mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            key="mobile-menu"
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            isLegalPage={isLegalPage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
