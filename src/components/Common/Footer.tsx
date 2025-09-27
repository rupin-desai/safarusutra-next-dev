"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import Illustration from "../UI/Illustations"; // adjust path if your Illustration component lives elsewhere

// Animation variants defined outside component
const logoVariants: Variants = {
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

const quickLinksVariants: Variants = {
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
      delay: 0.1,
    },
  },
};

const companyLinksVariants: Variants = {
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
      delay: 0.15,
    },
  },
};

const contactVariants: Variants = {
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
      delay: 0.2,
    },
  },
};

const copyrightVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

// Animation variants for illustrations (typed and using numeric cubic-bezier easing)
const illustrationVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.4, // Semi-transparent
    transition: {
      duration: 0.8,
      // use numeric cubic-bezier array (framer-motion accepts Easing[] here)
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Footer = () => {
  return (
    <footer className="relative py-6 md:py-10  overflow-hidden">
      {/* Styles for the brown underline */}
      <style jsx>{`
        .footer-heading {
          position: relative;
          display: inline-block;
          padding-bottom: 5px;
        }

        .footer-heading::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background-color: rgb(103, 77, 50, 0.6);
          border-radius: 1px;
        }

        /* Center the underline for mobile view */
        @media (max-width: 768px) {
          .footer-heading::after {
            left: 50%;
            right: 50%;
            transform: translateX(-50%);
            width: 40px;
          }
        }
      `}</style>

      {/* Solid orange background */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#F89B21" }}
      ></div>

      {/* Coconut Tree Illustration - Right side (visible on all devices) */}
      <motion.div
        className="absolute bottom-0 md:-bottom-20 right-5 w-28 h-48 md:w-36 md:h-64 lg:w-40 lg:h-72 pointer-events-none z-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={illustrationVariants}
      >
        <Illustration
          name="coconutTree"
          size={120}
          color="rgba(103, 77, 50, 0.6)"
          className="w-full h-full"
          alt="Coconut tree illustration"
        />
      </motion.div>

      {/* Cycle Illustration - Left side (visible only on desktop) */}
      <motion.div
        className="absolute bottom-8 left-70 hidden md:block w-32 h-28 lg:w-52 lg:h-48 pointer-events-none z-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={illustrationVariants}
      >
        <Illustration
          name="cycle"
          size={160}
          color="var(--color-medium-brown)"
          className="w-full h-full"
          alt="Bicycle illustration"
        />
      </motion.div>

      <div className="mx-auto px-4 md:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8">
          {/* Logo section updated with Link to home */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={logoVariants}
            className="flex flex-col items-center"
          >
            <Link href="/" className="flex flex-col items-center">
              <div className="bg-white p-3 md:p-3 rounded-xl shadow-md mb-2 md:mb-4 mx-auto">
                <Image
                  src="/logos/logo.svg"
                  alt="SafariSutra"
                  title="Logo of Safari Sutra"
                  width={96}
                  height={96}
                  className="h-14 md:h-20 w-auto"
                  priority={false}
                />
              </div>
              <p className="text-white text-xs md:text-sm font-medium tracking-wide text-center">
                EXPLORE. ESCAPE. EXPERIENCE
              </p>
            </Link>
          </motion.div>

          {/* Quick links section - updated with Fixed Departures + Tours (removed B2B) */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={quickLinksVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-medium mb-2 md:mb-4 text-base md:text-lg footer-heading">
              Quick Links
            </h3>
            {/* Single-column Quick Links (centered on mobile, left-aligned on desktop) */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <Link href="/" className="text-white  hover:underline whitespace-nowrap">Home</Link>
              <Link href="/about/" className="text-white  hover:underline whitespace-nowrap">About</Link>
              <Link href="/destination/" className="text-white  hover:underline whitespace-nowrap">Destinations</Link>
              <Link href="/fixed-departures/" className="text-white  hover:underline whitespace-nowrap">Fixed Departures</Link>
              <Link href="/tour/" className="text-white  hover:underline whitespace-nowrap">Tours</Link>
              <Link href="/hire/" className="text-white  hover:underline whitespace-nowrap">Hire</Link>
            </div>
          </motion.div>

          {/* Company links section - stays in a single column */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={companyLinksVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-medium mb-2 md:mb-4 text-base md:text-lg footer-heading">
              Company
            </h3>
            {/* Mobile: Row with wrapping */}
            <div className="flex flex-wrap justify-center gap-3 md:hidden">
              <Link href="/contact/" className="text-white text-sm hover:underline whitespace-nowrap">Contact Us</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/privacy-policy/" className="text-white text-sm hover:underline whitespace-nowrap">Privacy Policy</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/terms-and-conditions/" className="text-white text-sm hover:underline whitespace-nowrap">Terms & Conditions</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/cancellation-policy/" className="text-white text-sm hover:underline whitespace-nowrap">Cancellation Policy</Link>
            </div>

            {/* Desktop links - single column list */}
            <div className="hidden md:flex flex-col space-y-2">
              <Link href="/contact/" className="text-white hover:underline whitespace-nowrap">Contact Us</Link>
              <Link href="/privacy-policy/" className="text-white hover:underline whitespace-nowrap">Privacy Policy</Link>
              <Link href="/terms-and-conditions/" className="text-white hover:underline whitespace-nowrap">Terms & Conditions</Link>
              <Link href="/cancellation-policy/" className="text-white hover:underline whitespace-nowrap">Cancellation Policy</Link>
            </div>
          </motion.div>

          {/* Tours links section - lists all "tours-from" city pages */}
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={companyLinksVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-medium mb-2 md:mb-4 text-base md:text-lg footer-heading">
              Tours
            </h3>
            {/* Mobile: compact city chips */}
            <div className="flex flex-wrap justify-center items-center gap-2 md:hidden">
              <span className="text-white text-sm font-medium">Tours from :</span>
              <Link href="/tours-from-mumbai/" className="text-white text-sm hover:underline whitespace-nowrap">Mumbai</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-hyderabad/" className="text-white text-sm hover:underline whitespace-nowrap">Hyderabad</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-bangalore/" className="text-white text-sm hover:underline whitespace-nowrap">Bangalore</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-pune/" className="text-white text-sm hover:underline whitespace-nowrap">Pune</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-nashik/" className="text-white text-sm hover:underline whitespace-nowrap">Nashik</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-nagpur/" className="text-white text-sm hover:underline whitespace-nowrap">Nagpur</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-goa/" className="text-white text-sm hover:underline whitespace-nowrap">Goa</Link>
              <span className="text-white text-sm">•</span>
              <Link href="/tours-from-vijayawada/" className="text-white text-sm hover:underline whitespace-nowrap">Vijayawada</Link>
            </div>

            {/* Desktop: full list */}
            <div className="hidden md:flex flex-col space-y-2">
              <Link href="/tours-from-mumbai/" className="text-white hover:underline whitespace-nowrap">Tours from Mumbai</Link>
              <Link href="/tours-from-hyderabad/" className="text-white hover:underline whitespace-nowrap">Tours from Hyderabad</Link>
              <Link href="/tours-from-bangalore/" className="text-white hover:underline whitespace-nowrap">Tours from Bangalore</Link>
              <Link href="/tours-from-pune/" className="text-white hover:underline whitespace-nowrap">Tours from Pune</Link>
              <Link href="/tours-from-nashik/" className="text-white hover:underline whitespace-nowrap">Tours from Nashik</Link>
              <Link href="/tours-from-nagpur/" className="text-white hover:underline whitespace-nowrap">Tours from Nagpur</Link>
              <Link href="/tours-from-goa/" className="text-white hover:underline whitespace-nowrap">Tours from Goa</Link>
              <Link href="/tours-from-vijayawada/" className="text-white hover:underline whitespace-nowrap">Tours from Vijayawada</Link>
            </div>
          </motion.div>
       

          {/* Contact info and social - updated with brown underline */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={contactVariants}
            className="flex flex-col items-center md:items-start"
          >
            {/* Title only visible on desktop with brown underline */}
            <h3 className="hidden md:block text-white font-medium mb-4 text-lg footer-heading">
              Contact
            </h3>

            {/* Email contact */}
            <div className="flex items-center md:block mb-3 md:mb-2">
              <Mail size={16} className="text-white mr-2 md:hidden" />
              <p className="text-white text-sm md:text-base hover:underline transition-all">
                <a href="mailto:hello@safarisutra.com">hello@safarisutra.com</a>
              </p>
            </div>

            {/* Phone contacts */}
            <div className="flex flex-col items-center md:items-start mb-3 md:mb-4">
              <div className="flex items-center justify-center md:hidden mb-1">
                <Phone size={16} className="text-white" />
              </div>

              <p className="mb-1">
                <a
                  href="tel:+919967572970"
                  className="hover:underline transition-all text-white text-sm md:text-base"
                >
                  +91 9967572970
                </a>
              </p>
              <p className="mb-1">
                <a
                  href="tel:+919860415774"
                  className="hover:underline transition-all text-white text-sm md:text-base"
                >
                  +91 9860415774
                </a>
              </p>
              <p>
                <a
                  href="tel:+919429690981"
                  className="hover:underline transition-all text-white text-sm md:text-base"
                >
                  +91 94296 90981
                </a>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61560936836457"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/SafariSutra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/safarisutra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/103599001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright - unchanged */}
        <motion.div
          className="mt-4 md:mt-8 pt-3 md:pt-6 border-t border-white text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={copyrightVariants}
        >
          <p className="text-white text-xs md:text-sm">
            &copy; {new Date().getFullYear()} SafariSutra. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
