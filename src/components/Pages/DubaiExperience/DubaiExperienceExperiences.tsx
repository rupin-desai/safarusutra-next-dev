"use client";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Experiences and attractions (except "Map & Navigation" and "Facilities of the Park")
const experiences = [
  {
    title: "African Village",
    description:
      "Encounter magnificent African wildlife including lions, cheetahs, and giraffes in a recreated savanna landscape.",
    image: "/images/dubai-safari/african-village-1080.webp",
    srcSet:
      "/images/dubai-safari/african-village-480.webp 480w, /images/dubai-safari/african-village-720.webp 720w, /images/dubai-safari/african-village-1080.webp 1080w",
  },
  {
    title: "Arabian Desert Safari",
    description:
      "Discover native Arabian species adapted to desert life, including the majestic Arabian oryx and desert foxes.",
    image: "/images/dubai-safari/arabian-desert-1080.webp",
    srcSet:
      "/images/dubai-safari/arabian-desert-480.webp 480w, /images/dubai-safari/arabian-desert-720.webp 720w, /images/dubai-safari/arabian-desert-1080.webp 1080w",
  },
  {
    title: "Asian Village",
    description:
      "Explore Asia's diverse wildlife from Bengal tigers to Asian elephants in authentically designed habitats.",
    image: "/images/dubai-safari/asian-village-1080.webp",
    srcSet:
      "/images/dubai-safari/asian-village-480.webp 480w, /images/dubai-safari/asian-village-720.webp 720w, /images/dubai-safari/asian-village-1080.webp 1080w",
  },
  {
    title: "Bird Kingdom",
    description:
      "Walk through aviaries featuring colorful exotic birds from around the world in a lush tropical setting.",
    image: "/images/dubai-safari/bird-kingdom-1080.webp",
    srcSet:
      "/images/dubai-safari/bird-kingdom-480.webp 480w, /images/dubai-safari/bird-kingdom-720.webp 720w, /images/dubai-safari/bird-kingdom-1080.webp 1080w",
  },
  {
    title: "Explorer Village",
    description:
      "Interactive educational zone perfect for families and children to learn about wildlife conservation.",
    image: "/images/dubai-safari/explorer-village-1080.webp",
    srcSet:
      "/images/dubai-safari/explorer-village-480.webp 480w, /images/dubai-safari/explorer-village-720.webp 720w, /images/dubai-safari/explorer-village-1080.webp 1080w",
  },
  {
    title: "Animal Feeding",
    description:
      "Participate in scheduled feeding sessions and get closer to your favorite animals under expert guidance.",
    image: "/images/dubai-safari/animal-feeding-1080.webp",
    srcSet:
      "/images/dubai-safari/animal-feeding-480.webp 480w, /images/dubai-safari/animal-feeding-720.webp 720w, /images/dubai-safari/animal-feeding-1080.webp 1080w",
  },
  {
    title: "Birds of Prey",
    description:
      "Marvel at the agility and power of raptors in dynamic flight demonstrations and educational shows.",
    image: "/images/dubai-safari/birds-of-prey-1080.webp",
    srcSet:
      "/images/dubai-safari/birds-of-prey-480.webp 480w, /images/dubai-safari/birds-of-prey-720.webp 720w, /images/dubai-safari/birds-of-prey-1080.webp 1080w",
  },
  {
    title: "Echoes of the Wild",
    description:
      "Enjoy immersive audio-visual shows that celebrate the diversity and beauty of wildlife from around the globe.",
    image: "/images/dubai-safari/echoes-of-the-wild-1080.webp",
    srcSet:
      "/images/dubai-safari/echoes-of-the-wild-480.webp 480w, /images/dubai-safari/echoes-of-the-wild-720.webp 720w, /images/dubai-safari/echoes-of-the-wild-1080.webp 1080w",
  },
  {
    title: "Glass Building",
    description:
      "Discover unique flora and fauna in a climate-controlled environment designed for education and exploration.",
    image: "/images/dubai-safari/glass-building-1080.webp",
    srcSet:
      "/images/dubai-safari/glass-building-480.webp 480w, /images/dubai-safari/glass-building-720.webp 720w, /images/dubai-safari/glass-building-1080.webp 1080w",
  },
  {
    title: "Kids Farm",
    description:
      "A fun and interactive area where children can meet and learn about farm animals in a safe setting.",
    image: "/images/dubai-safari/kids-farm-1080.webp",
    srcSet:
      "/images/dubai-safari/kids-farm-480.webp 480w, /images/dubai-safari/kids-farm-720.webp 720w, /images/dubai-safari/kids-farm-1080.webp 1080w",
  },
  {
    title: "POD Experience",
    description:
      "Relax and observe wildlife from comfortable, eco-friendly pods located throughout the park.",
    image: "/images/dubai-safari/pod-experience-1080.webp",
    srcSet:
      "/images/dubai-safari/pod-experience-480.webp 480w, /images/dubai-safari/pod-experience-720.webp 720w, /images/dubai-safari/pod-experience-1080.webp 1080w",
  },
  {
    title: "Solar Panel Initiative",
    description:
      "Learn about Dubai Safari Park’s commitment to sustainability through its innovative solar energy installations.",
    image: "/images/dubai-safari/solar-panel-1080.webp",
    srcSet:
      "/images/dubai-safari/solar-panel-480.webp 480w, /images/dubai-safari/solar-panel-720.webp 720w, /images/dubai-safari/solar-panel-1080.webp 1080w",
  },
];

// JSON-LD for ItemList of attractions/experiences
const experiencesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dubai Safari Park Attractions and Experiences",
  itemListElement: experiences.map((exp, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: exp.title,
    description: exp.description,
    image: `https://safarusutra.com${exp.image}`,
    url: `https://safarusutra.com/dubai-safari-experience#${encodeURIComponent(
      exp.title.toLowerCase().replace(/\s+/g, "-")
    )}`,
  })),
};

// Animation variants
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
const cardVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: (i: number) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

export default function DubaiExperienceExperiences() {
  return (
    <motion.section
      className="py-16 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      {/* JSON-LD for ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencesJsonLd) }}
      />
      <div className="container mx-auto">
        {/* Mobile/Tablet: Title at top, centered, no sticky */}
        <motion.div
          className="block lg:hidden mb-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <div className="flex flex-col items-center text-center">
            <span
              className="inline-flex items-center px-5 py-2 rounded-full font-semibold text-lg gap-2 mb-6"
              style={{
                color: "var(--color-yellow-orange)",
                background: "rgba(243, 173, 60, 0.08)",
              }}
            >
              <PawPrint size={28} className="mr-2" />
              Discover
            </span>
            <h2
              className="text-3xl md:text-5xl font-family-oswald font-bold mb-6 text-[var(--color-dark-brown)]"
              style={{ fontFamily: "var(--font-family-oswald)" }}
            >
              Safari Experiences
            </h2>
            <p className="text-lg text-gray-700 mt-2 max-w-2xl">
              Explore the diverse zones and attractions at Dubai Safari Park,
              each offering unique wildlife encounters and educational
              experiences. Our partnership ensures you get the most
              comprehensive visit possible.
            </p>
          </div>
        </motion.div>
        {/* Desktop: Sticky title left, cards right */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Title Pill on the left for lg+ */}
          <motion.div
            className="hidden lg:block lg:w-1/3 flex-shrink-0"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.18 }}
            variants={sectionVariants}
          >
            <div className="sticky top-32">
              <div className="flex flex-col items-start">
                <span
                  className="inline-flex items-center px-5 py-2 rounded-full font-semibold text-lg gap-2 mb-6"
                  style={{
                    color: "var(--color-yellow-orange)",
                    background: "rgba(243, 173, 60, 0.08)",
                  }}
                >
                  <PawPrint size={28} className="mr-2" />
                  Discover
                </span>
                <h2
                  className="text-3xl md:text-5xl lg:text-6xl font-family-oswald font-bold mb-6 text-[var(--color-dark-brown)]"
                  style={{ fontFamily: "var(--font-family-oswald)" }}
                >
                  Safari Experiences
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  Explore the diverse zones and attractions at Dubai Safari
                  Park, each offering unique wildlife encounters and educational
                  experiences. Our partnership ensures you get the most
                  comprehensive visit possible.
                </p>
              </div>
            </div>
          </motion.div>
          {/* Experiences Cards on the right */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  id={experience.title.toLowerCase().replace(/\s+/g, "-")}
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group h-96"
                  custom={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={cardVariants}
                >
                  <picture>
                    <source srcSet={experience.srcSet} type="image/webp" />
                    <img
                      src={experience.image}
                      alt={`${experience.title} at Dubai Safari Park`}
                      title={`Experience ${experience.title} at Dubai Safari Park`}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  {/* Black gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  {/* Text content over gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {experience.title}
                    </h3>
                    <p className="text-white text-base drop-shadow-lg">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
