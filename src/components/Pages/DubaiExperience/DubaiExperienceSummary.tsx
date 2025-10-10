"use client";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";
import { TreePalm } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { scrollToContactForm } from "@/utils/contact.utils";

// Animation variants using translate3d and spring, matching codebase style
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function handleBookNowClick() {
  // Autofill subject/message and scroll to contact form
  scrollToContactForm("contact-form", "smooth", {
    subject: "Dubai Safari Park Booking Inquiry",
    message:
      "I'm interested in booking the Dubai Safari Park experience. Please share more details.",
  });
}

export default function DubaiExperienceSummary() {
  return (
    <motion.section
      className="py-10 md:py-16 px-4 md:px-16 bg-white"
      initial="initial"
      animate="animate"
      variants={sectionVariants}
    >
      <div className="mx-auto">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Section */}
          <motion.div
            className="w-full mt-8 lg:mt-0 flex flex-col items-center justify-center text-center"
            initial="initial"
            animate="animate"
            variants={sectionVariants}
          >
            {/* Title Pill above partner logo */}
            <div className="flex justify-center mb-2">
              <span
                className="inline-flex items-center px-4 py-1 rounded-full font-semibold text-base gap-2"
                style={{
                  color: "var(--color-dark-teal)",
                  background: "rgba(6, 105, 89, 0.08)",
                  fontFamily: "inherit",
                }}
              >
                <TreePalm size={18} className="mr-1" />
                Our Partner
              </span>
            </div>
            {/* Partner Logo as link */}
            <div className="flex justify-center mt-2 mb-2">
              <a
                href="https://dubaisafari.ae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dubai Safari Park Official Website"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://dubaisafari.ae/wp-content/uploads/2024/10/Logo-w105.svg"
                  alt="Dubai Safari Park Logo"
                  className="h-24 md:h-30 w-auto"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="prose prose-lg mt-6 text-gray-700 max-w-xl mx-auto lg:mx-0 text-center">
              <p>
                Discover a world where adventure meets nature at Dubai Safari
                Park. Enjoy immersive wildlife encounters, vibrant
                entertainment, unique dining, and lifestyle experiences—all in
                one unforgettable destination. Explore diverse zones, meet
                fascinating animals, and reconnect with nature on every visit.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 flex-wrap justify-center items-center">
              <SSButton
                variant="primary"
                color="var(--color-orange)"
                onClick={handleBookNowClick}
              >
                Book Now
              </SSButton>
              <Link
                href="https://dubaisafari.ae/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SSButton variant="outline" color="var(--color-dark-teal)">
                  Visit Official Website
                </SSButton>
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full flex justify-center"
            initial="initial"
            animate="animate"
            variants={sectionVariants}
          >
            <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-full">
              <picture>
                <source
                  srcSet="/images/dubai-safari/dubai-safari-intro-480.webp 480w, /images/dubai-safari/dubai-safari-intro-720.webp 720w, /images/dubai-safari/dubai-safari-intro-1080.webp 1080w"
                  type="image/webp"
                />
                <img
                  src="/images/dubai-safari/dubai-safari-intro-1080.webp"
                  alt="Visitors enjoying Dubai Safari Park experience"
                  className="w-full h-auto object-cover rounded-xl"
                  title="Discover the wonders of Dubai Safari Park with Safari Sutra"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
