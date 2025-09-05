"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, Variants, Transition } from "framer-motion";
import { Compass } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import CountUp from "react-countup";

// Animation variants typed with Variants to avoid `any`
const titleVariants: Variants = {
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

const rightCardVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(100px, 0px, 0px)",
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

const leftCardVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-100px, 0px, 0px)",
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

const planeVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(100px, 0px, 0px) rotate(15deg)",
  },
  animate: {
    opacity: 0.8,
    transform: "translate3d(0px, 0px, 0px) rotate(15deg)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.5,
    },
  },
};

type Stat = {
  rawNumber: number;
  suffix: string;
  label: string;
  text: string;
  img: string;
  alt: string;
  color: string;
  duration: number;
  decimals: number;
  isInfinity: boolean;
};

const stats: Stat[] = [
  {
    rawNumber: 15000,
    suffix: "+",
    label: "Trips Planned",
    text: "We've helped travelers design over 15,000 personalized adventures across the globe, each one tailored to create unforgettable experiences.",
    img: "https://images5.alphacoders.com/541/thumb-1920-541026.jpg",
    alt: "A group of travelers exploring a scenic mountain landscape at sunrise",
    color: "var(--color-orange)",
    duration: 2.5,
    decimals: 0,
    isInfinity: false,
  },
  {
    rawNumber: 1000,
    suffix: "+",
    label: "International Escapades",
    text: "Over 1,000 international adventures and counting! From African safaris to European getaways, we've helped travelers explore every corner of the world.",
    img: "https://images.pexels.com/photos/386000/pexels-photo-386000.jpeg",
    alt: "Passport with travel stamps alongside travel planning materials",
    color: "var(--color-dark-teal)",
    duration: 2,
    decimals: 0,
    isInfinity: false,
  },
  {
    rawNumber: 9999,
    suffix: "",
    label: "Memories Made",
    text: "Countless memories created (and ∞ chai cups consumed ☕) throughout our journey. Each adventure adds another story to our ever-growing collection of travel tales.",
    img: "https://images.pexels.com/photos/459270/pexels-photo-459270.jpeg",
    alt: "A group of friends sharing memories around a campfire during sunset",
    color: "var(--color-yellow-orange)",
    duration: 3,
    decimals: 0,
    isInfinity: true,
  },
];

interface StatCardProps {
  stat: Stat;
  idx: number;
  isLast: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, idx, isLast }) => {
  const isEven = idx % 2 === 0;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center md:items-start md:flex-row md:gap-16 gap-8 relative ${
        !isLast ? "pb-12 mb-12 border-b border-gray-200" : ""
      }`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={isEven ? rightCardVariants : leftCardVariants}
    >
      <div className={`md:w-1/2 flex flex-col items-center md:items-start ${!isEven && "md:order-2"}`}>
        <h3
          className="text-6xl md:text-8xl font-family-oswald font-bold mb-0 text-center md:text-left leading-none"
          style={{
            color: stat.color,
            fontFamily: "var(--font-family-oswald)",
          }}
        >
          {isInView ? (
            <>
              {stat.isInfinity ? (
                "∞"
              ) : (
                <CountUp
                  end={stat.rawNumber}
                  duration={stat.duration}
                  separator=","
                  decimals={stat.decimals}
                />
              )}
              {stat.suffix}
            </>
          ) : (
            "0"
          )}
        </h3>

        <p className="text-xl md:text-2xl font-medium mb-3 text-center md:text-left" style={{ color: stat.color }}>
          {stat.label}
        </p>

        <p className="text-lg text-gray-700 text-justify" style={{ textAlignLast: "left" }}>
          {stat.text}
        </p>
      </div>

      <div className={`md:w-1/2 w-full ${!isEven && "md:order-1"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={stat.img}
          alt={stat.alt}
          className="w-full h-[280px] md:h-[400px] object-cover rounded-2xl shadow-lg"
          width={800}
          height={600}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

const AboutStats: React.FC = () => {
  const [planeAnimationComplete, setPlaneAnimationComplete] = useState(false);

  return (
    <section className="py-16 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute right-0 md:right-20 top-20 md:top-40 w-32 md:w-64 z-0 pointer-events-none"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={planeVariants}
        onAnimationComplete={() => setPlaneAnimationComplete(true)}
      >
        <motion.div
          animate={
            planeAnimationComplete
              ? {
                  y: [-10, 10, -10],
                  x: [0, -15, 0],
                  rotate: [0, 2, 0],
                }
              : {}
          }
          transition={
            planeAnimationComplete
              ? ({
                  y: {
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  },
                  x: {
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  },
                  opacity: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  },
                } as Transition)
              : undefined
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/graphics/planeoutline.svg"
            alt=""
            className="w-full h-auto"
            draggable={false}
            width={256}
            height={128}
          />
        </motion.div>
      </motion.div>

      <motion.div className="relative z-10" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }} variants={titleVariants}>
        <SectionTitle icon={<Compass size={16} />} pillText="Our Journey" title="Turning 'Someday' Into 'Let's Go!'" color="#F89B21" centered={true} />
      </motion.div>

      <div className="flex justify-center w-full mt-16 relative z-10">
        <div className="w-full md:w-3/4">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} isLast={idx === stats.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
