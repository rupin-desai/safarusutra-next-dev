"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Newspaper, ArrowRight, ArrowLeft } from "lucide-react";
import SectionTitle from "../../UI/SectionTitle";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

type BlogPost = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  slug: string;
};

const starTopVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(50px, -50px, 0px) rotate(0deg)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const starBottomVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(-50px, 50px, 0px) rotate(0deg)" },
  animate: {
    opacity: 0.6,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
  },
};

const titleVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 30px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

const leftButtonVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(-20px, -50%, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, -50%, 0px)", transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
};

const rightButtonVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(20px, -50%, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, -50%, 0px)", transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
};

const paginationVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { duration: 0.5, ease: "easeOut", delay: 0.5 } },
};

export default function HomeBlog(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const cardsPerPage = 3;

  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
      title: "A Journey Through the Serengeti",
      subtitle: "Witnessing the great migration up close",
      slug: "journey-through-serengeti",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      title: "Hidden Gems of Tanzania",
      subtitle: "Discovering off-the-beaten-path locations",
      slug: "hidden-gems-tanzania",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516260872877-6a7d5846d1eb",
      title: "Safari Packing Essentials",
      subtitle: "What to bring on your African adventure",
      slug: "safari-packing-essentials",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1502989642968-94fbdc9eace4",
      title: "Wildlife Photography Tips",
      subtitle: "Capture amazing memories of your safari",
      slug: "wildlife-photography-tips",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1503656142023-618e7d1f435a",
      title: "Cultural Experiences in Kenya",
      subtitle: "Connecting with local communities",
      slug: "cultural-experiences-kenya",
    },
  ];

  const pageCount = Math.ceil(blogPosts.length / cardsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
  const prevPage = () => setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
  const goToPage = (pageIndex: number) => setCurrentPage(pageIndex);

  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden">
      <motion.img
        src="/graphics/star2.svg"
        alt=""
        className="absolute -top-10 -right-10 w-28 h-28 z-0"
        aria-hidden="true"
        draggable={false}
        style={{ transformOrigin: "center" }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={starTopVariants}
        animate={{ rotate: 360 }}
        transition={{ rotate: { duration: 25, ease: "linear", repeat: Infinity } }}
      />

      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={titleVariants}>
        <SectionTitle icon={<Newspaper size={16} />} pillText="Travel Chitti" title="We've Got Stories to Tell" color="#F58925" />
      </motion.div>

      <div className="mt-16 relative max-w-7xl mx-auto">
        <motion.div
          className="absolute top-1/2 -left-4 z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={leftButtonVariants}
        >
          <motion.button
            onClick={prevPage}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            whileHover={{ transform: "translate3d(-2px, 0px, 0px) scale(1.1)" }}
            whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.95)" }}
            aria-label="Previous posts"
            type="button"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-4 z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={rightButtonVariants}
        >
          <motion.button
            onClick={nextPage}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            whileHover={{ transform: "translate3d(2px, 0px, 0px) scale(1.1)" }}
            whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.95)" }}
            aria-label="Next posts"
            type="button"
          >
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`blog-page-${currentPage}`}
            initial={{ opacity: 0, transform: "translate3d(50px, 0px, 0px)" }}
            animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
            exit={{ opacity: 0, transform: "translate3d(-50px, 0px, 0px)" }}
            transition={springConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts
              .slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage)
              .map((post, index) => (
                <motion.div
                  key={`blog-${currentPage}-${index}`}
                  initial={{ opacity: 0, transform: "translate3d(0px, 30px, 0px)" }}
                  animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
                  transition={{ ...springConfig, delay: index * 0.15 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:-translate-y-2 duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={`${post.image}?w=600&fit=crop&crop=entropy&auto=format&q=80`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      width={600}
                      height={192}
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 text-gray-800">{post.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm">{post.subtitle}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-medium text-orange-500 hover:text-orange-700 transition-colors" aria-label={`Read ${post.title}`}>
                      Read Now <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        <motion.div className="flex justify-center mt-8 gap-2" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={paginationVariants}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${currentPage === index ? "bg-orange-500" : "bg-gray-300 hover:bg-orange-300"}`}
              whileHover={{ transform: "translate3d(0px, 0px, 0px) scale(1.5)" }}
              whileTap={{ transform: "translate3d(0px, 0px, 0px) scale(0.9)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              aria-label={`Go to page ${index + 1}`}
              onClick={() => goToPage(index)}
              type="button"
            />
          ))}
        </motion.div>
      </div>

      <motion.img
        src="/graphics/star.svg"
        alt=""
        className="absolute -bottom-10 -left-10 w-28 h-28 z-0"
        aria-hidden="true"
        draggable={false}
        style={{ transformOrigin: "center" }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={starBottomVariants}
        animate={{ rotate: -360 }}
        transition={{ rotate: { duration: 20, ease: "linear", repeat: Infinity } }}
      />
    </section>
  );
}