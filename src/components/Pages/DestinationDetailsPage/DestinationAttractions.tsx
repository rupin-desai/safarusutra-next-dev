"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";

type Attraction = {
  title: string;
  image: string;
  description?: string;
};

interface Props {
  attractions?: Attraction[] | null;
}

// Animation variants cast to any to allow translate3d/transform strings
const fadeIn: any = {
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

const titleVariant: any = {
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

const staggerContainer: any = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Floating animation now uses transform/translate3d (no x/y props)
const floatingAnimation: any = {
  initial: { transform: "translate3d(0px, 0px, 0px) rotate(0deg)" },
  animate: {
    transform: "translate3d(0px, -8px, 0px) rotate(-2deg)",
    transition: {
      transform: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "reverse" },
    },
  },
};

const DestinationAttractions: React.FC<Props> = ({ attractions }) => {
  if (!attractions || attractions.length === 0) return null;

  const hasOddCount = attractions.length % 2 !== 0;

  // deterministic color based on attractions content to avoid SSR/CSR mismatch
  const { randomColor } = useMemo(() => {
    const colors = [
      "var(--color-dark-brown)",
      "var(--color-medium-brown)",
      "var(--color-orange)",
      "var(--color-yellow-orange)",
      "var(--color-green)",
      "var(--color-dark-teal)",
    ];

    // create a stable seed from attraction titles
    const seedText = (attractions || []).map((a) => String(a.title || "")).join("|");
    let seed = 0;
    for (let i = 0; i < seedText.length; i++) {
      seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    }
    const colorIndex = seed % colors.length;
    return { randomColor: colors[colorIndex] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* dependency intentionally stable: attractions reference */]);

  return (
    <section className="py-16 md:px-24" id="attractions">
      <div className="container mx-auto px-4">
        <div className="relative">
          <motion.img
            src="/graphics/illustration.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 md:right-12 hidden md:block opacity-80 pointer-events-none"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            // use strings for width/height so SSR and CSR match exactly
            style={{ width: "200px", height: "200px", color: randomColor, transform: "translate3d(0px, 0px, 0px) rotate(0deg)" }}
          />

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={titleVariant}
            className="relative z-10"
          >
            <SectionTitle
              icon={<MapPin size={16} />}
              pillText="Experience the Best"
              title="Major Attractions"
              color="#066959"
              centered={true}
              containerClassName="mb-12"
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {attractions.map((attraction, index) => (
            <motion.div
              key={index}
              id={`attraction-${index}`}
              className={`h-[400px] rounded-xl overflow-hidden shadow-lg relative group cursor-pointer ${
                hasOddCount && index === attractions.length - 1
                  ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto"
                  : ""
              }`}
              variants={fadeIn}
              whileHover={{
                transform: "translate3d(0px, -6px, 0px)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                },
              } as any}
            >
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute inset-x-0 bottom-0 p-6 transform transition-all duration-500 ease-out group-hover:-translate-y-5">
                <h3
                  className="text-2xl font-bold text-white leading-tight mb-2 transition-all duration-300 group-hover:mb-4"
                  style={{ fontFamily: "var(--font-family-baloo)" }}
                >
                  {attraction.title}
                </h3>

                <div className="max-h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">
                  <p className="text-white/90 text-base line-clamp-4">{attraction.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationAttractions;
