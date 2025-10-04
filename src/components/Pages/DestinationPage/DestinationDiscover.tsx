"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Compass } from "lucide-react";
import CountUp from "react-countup";
import SectionTitle from "../../UI/SectionTitle";
import SSButton from "../../UI/SSButton";

// Animation variants (use Variants and translate3d strings)
const sectionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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
      damping: 30,
    },
  },
};

const DestinationDiscover: React.FC = () => {
  const [countVisible, setCountVisible] = useState(false);

  // Start counter when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const counterElement = document.getElementById("customer-counter");
    if (counterElement) observer.observe(counterElement);

    return () => {
      if (counterElement) observer.unobserve(counterElement);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-16 px-8 md:px-20 bg-white overflow-hidden relative">
      <style>
        {`
          @keyframes slowRotateClockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slowRotateCounterClockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>

      {/* Decorative elements remain unchanged */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/graphics/star.svg"
        alt="Decorative spinning star graphic for discover section"
        title="Decorative star graphic"
        className="absolute top-0 right-5 md:top-20 md:right-10 w-12 h-12 md:w-16 md:h-16 opacity-90"
        style={{
          animation: "slowRotateClockwise 30s linear infinite",
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/graphics/star2.svg"
        alt="Decorative spinning star graphic for discovery section"
        title="Decorative spinning star graphic"
        className="absolute bottom-20 left-10 w-28 h-28 opacity-15"
        style={{
          animation: "slowRotateCounterClockwise 45s linear infinite",
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionTitle
          icon={<Compass size={16} />}
          pillText="Why Travel With Us"
          title="Not Your Typical Travel Gurus"
          color="#F89B21"
          centered={true}
          containerClassName="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed text-justify">
              Think of us as your travel fairy godparents—minus the wand, plus
              the Wi‑Fi! We don&apos;t just book trips; we craft
              &quot;remember-that-time-when&quot; moments that&apos;ll have you
              humble-bragging for years. Whether you&apos;re dreaming of selfies
              with elephants in the wild, sipping chai with locals in hidden
              mountain villages, or simply escaping your boss&apos;s weekly
              &quot;quick catch-ups,&quot; we&apos;ve got you covered. And
              unlike those one-size-fits-all travel factories, we obsess over
              the little details—because we know it&apos;s the difference
              between a nice vacation and a
              &quot;OMG-did-that-really-happen&quot; adventure that breaks your
              Instagram feed!
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <SSButton to="/contact/" color="var(--color-orange)">
                Let&apos;s Make Magic Happen
              </SSButton>

              <div className="flex items-center text-sm text-gray-600">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-[var(--color-orange)]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </span>
                <span className="ml-2">
                  Rated &quot;Mind-Blowing&quot; by 300+ happy travelers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Responsive image using srcSet and fallback */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Destinations/destination-discover-1080.webp"
                srcSet="/images/Destinations/destination-discover-480.webp 480w, /images/Destinations/destination-discover-720.webp 720w, /images/Destinations/destination-discover-1080.webp 1080w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt="Wild Bengal tiger walking through golden hour grasslands on an Indian safari tour"
                title="Golden hour safari with a Bengal tiger in India – wildlife travel experience"
                className="object-cover w-full h-full"
                style={{ width: "100%", height: "100%" }}
                loading="lazy"
              />
            </div>

            {/* Floating orange customer card with slant */}
            <div
              id="customer-counter"
              className="absolute -top-5 -right-5 bg-[var(--color-orange)] p-4 rounded-lg shadow-lg max-w-[180px] transform rotate-[3deg] hover:rotate-0 transition-transform"
              style={{
                boxShadow: "0 10px 25px -5px rgba(248, 155, 33, 0.4)",
              }}
            >
              <div className="flex flex-col">
                <div className="text-white text-sm font-medium mb-1">
                  Happy Customers
                </div>
                <p className="text-3xl font-bold text-white">
                  {countVisible ? (
                    <CountUp
                      start={0}
                      end={1200}
                      duration={2.5}
                      separator=","
                      suffix="+"
                      useEasing={true}
                    />
                  ) : (
                    "1200+"
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DestinationDiscover;
