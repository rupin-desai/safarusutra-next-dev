"use client";

import React, { memo } from "react";
import { Compass } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import SSButton from "@/components/UI/SSButton";
import { motion, Variants } from "framer-motion";

// Animation variants defined outside component (typed)
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

const star1Variants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(50px, -50px, 0px) rotate(0deg)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const star2Variants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-50px, 50px, 0px) rotate(0deg)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const buttonVariants: Variants = {
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
      delay: 0.3,
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
    transform: "translate3d(30px, 30px, 0px) rotate(0deg)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.6,
    },
  },
};

type StyleCardData = {
  img: string;
  title: string;
  oneliner: string;
  color: string;
  alt: string;
  width: number;
  height: number;
};

const cards: StyleCardData[] = [
  {
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    title: "Glamping, Not Camping",
    oneliner: "Luxurious comfort meets wilderness adventure",
    color: "var(--color-orange)",
    alt: "Luxury glamping tent with comfortable furnishings at sunrise",
    width: 480,
    height: 404,
  },
  {
    img: "https://images.unsplash.com/photo-1600714480856-dc99b28892eb",
    title: "Guides Who Know Their Stuff",
    oneliner: "Expert local guides bringing destinations to life",
    color: "var(--color-dark-teal)",
    alt: "Safari guide pointing out wildlife to tourists during a tour",
    width: 480,
    height: 404,
  },
  {
    img: "https://images.unsplash.com/photo-1688820661462-a44e4b2770e8",
    title: "Culture Without the Clichés",
    oneliner: "Authentic cultural experiences beyond the tourist traps",
    color: "var(--color-yellow-orange)",
    alt: "Traditional Bharatanatyam dancer performing authentic cultural dance",
    width: 480,
    height: 404,
  },
  {
    img: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7",
    title: "Green Travel (Not Just the Scenery)",
    oneliner: "Eco-friendly adventures with a positive footprint",
    color: "var(--color-green)",
    alt: "Beautiful green hills showcasing eco-friendly sustainable travel destinations",
    width: 480,
    height: 404,
  },
];

// Build JSON-LD schema using cards data (inject directly, no Helmet)
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: cards.map((card, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: card.title,
    description: card.oneliner,
  })),
};

// Card component with its own visibility detection - memoized for performance
const StyleCard = memo(function StyleCard({ card, idx }: { card: StyleCardData; idx: number }) {
  const isRight = idx % 2 === 0;
  const isThirdCard = idx === 2;

  return (
    <motion.div
      key={card.title}
      className={`flex flex-col md:flex-row items-center ${isRight ? "md:flex-row-reverse" : ""} gap-8 md:gap-8 lg:gap-32 ${
        !isRight ? "md:-mb-48 lg:-mb-42" : "md:-mb-48 lg:-mb-64"
      } relative`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={isRight ? rightCardVariants : leftCardVariants}
    >
      {/* Mobile Layout - Always Image on top, then title and oneliner (centered) */}
      <div className="flex flex-col items-center text-center md:hidden w-full">
        <div className="relative mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.img}
            alt={card.alt}
            className="w-[300px] h-[220px] object-cover rounded-2xl shadow-lg"
            width={300}
            height={220}
            loading="lazy"
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 520px, 480px"
            decoding="async"
          />
          {isThirdCard && (
            <motion.img
              src="/graphics/greenplane.svg"
              alt=""
              className="absolute -bottom-8 -right-8 w-12 h-12 z-10"
              aria-hidden="true"
              draggable={false}
              variants={planeVariants}
              animate={{
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                },
              }}
              width={48}
              height={48}
            />
          )}
        </div>
        <div className="w-full px-4">
          <h3
            className="text-3xl font-family-oswald font-semibold"
            style={{
              color: card.color,
              fontFamily: "var(--font-family-oswald)",
            }}
          >
            {card.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{card.oneliner}</p>
        </div>
      </div>

      {/* Desktop Layout - With oneliners below titles */}
      {isRight ? (
        // Image right on desktop
        <div className="hidden md:flex flex-col items-start md:w-1/2 relative">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.img}
              alt={card.alt}
              className="md:w-[520px] md:h-[320px] lg:w-[480px] lg:h-[404px] object-cover rounded-2xl shadow-lg"
              width={520}
              height={320}
              loading="lazy"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 520px, 480px"
              decoding="async"
            />
            {isThirdCard && (
              <motion.img
                src="/graphics/greenplane.svg"
                alt=""
                className="absolute md:-bottom-10 md:-right-10 lg:-bottom-16 lg:-right-18 md:w-20 md:h-20 lg:w-32 lg:h-32 z-10"
                aria-hidden="true"
                draggable={false}
                variants={planeVariants}
                animate={{
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  rotate: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  },
                }}
                width={128}
                height={128}
              />
            )}
          </div>
          <div className="mt-4 lg:mt-6 w-full">
            <h3
              className="md:text-3xl lg:text-4xl font-family-oswald font-semibold text-left"
              style={{
                color: card.color,
                fontFamily: "var(--font-family-oswald)",
              }}
            >
              {card.title}
            </h3>
            <p className="text-gray-600 md:text-base lg:text-lg mt-1 lg:mt-2 text-left">{card.oneliner}</p>
          </div>
        </div>
      ) : (
        // Image left on desktop
        <div className="hidden md:flex flex-col items-start md:w-1/2">
          <div className="mb-4 lg:mb-6 w-full">
            <h3
              className="md:text-3xl lg:text-4xl font-family-oswald font-semibold text-left"
              style={{
                color: card.color,
                fontFamily: "var(--font-family-oswald)",
              }}
            >
              {card.title}
            </h3>
            <p className="text-gray-600 md:text-base lg:text-lg mt-1 lg:mt-2 text-left">{card.oneliner}</p>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.img}
              alt={card.alt}
              className="md:w-[520px] md:h-[320px] lg:w-[480px] lg:h-[404px] object-cover rounded-2xl shadow-lg"
              width={520}
              height={320}
              loading="lazy"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 520px, 480px"
              decoding="async"
            />
          </div>
        </div>
      )}
      {/* Empty div for desktop spacing/alignment */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
});

StyleCard.displayName = "StyleCard";

const HomeStyle = () => {
  return (
    <section id="travel-styles" className="py-16 md:px-0 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* JSON-LD injected directly (no Helmet) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Star SVG at top right - UPDATED for better mobile detection */}
      <motion.div initial="initial" animate="animate" variants={star1Variants} className="absolute top-6 right-4 md:right-12 lg:right-20">
        <motion.img
          src="/graphics/star.svg"
          alt=""
          className="w-12 h-12 md:w-16 md:h-16 z-10"
          aria-hidden="true"
          draggable={false}
          style={{ transformOrigin: "center" }}
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          width={64}
          height={64}
        />
      </motion.div>

      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={titleVariants} className="text-center">
        <SectionTitle icon={<Compass size={16} />} pillText="Travel Style" title="What's Your Travel Style?" color="#066959" centered={true} titleSize="large" />
      </motion.div>

      <div className="flex justify-center w-full mt-16">
        <div className="w-full md:w-4/5 lg:w-3/4 space-y-16 md:space-y-12 lg:space-y-20">
          {cards.map((card, idx) => (
            <StyleCard key={card.title} card={card} idx={idx} />
          ))}
        </div>
      </div>

      <motion.div initial="initial" animate="animate" variants={star2Variants} className="absolute bottom-32 md:bottom-40 left-4 md:left-12 lg:left-28">
        <motion.img
          src="/graphics/star2.svg"
          alt=""
          className="w-10 h-10 md:w-14 md:h-14 z-10"
          aria-hidden="true"
          draggable={false}
          style={{ transformOrigin: "center" }}
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: {
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          width={56}
          height={56}
        />
      </motion.div>

      <motion.div className="flex justify-center mt-16 md:mt-56 lg:mt-52" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={buttonVariants}>
        <SSButton color="var(--color-green)" to="/fixeddepartures" className="text-lg">
          Book your adventure now!
        </SSButton>
      </motion.div>
    </section>
  );
};

export default memo(HomeStyle);
