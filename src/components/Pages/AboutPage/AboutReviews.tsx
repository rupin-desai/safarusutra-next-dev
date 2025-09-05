"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../UI/SectionTitle";

// keep translate3d / transform strings — cast variants & transitions to any for TS
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

const cardVariants: Variants = {
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

// Page-level variants and transition (typed)
const testimonialPageVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px,20px,0px)" },
  animate: { opacity: 1, transform: "translate3d(0px,0px,0px)" },
  exit: { opacity: 0, transform: "translate3d(0px,-20px,0px)" },
};

const testimonialPageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const testimonialData = [
  {
    name: "Prasanth Sivaraj",
    title: "(From Google Reviews)",
    text: "Safari Sutra Holidays made my travel experience truly unforgettable! Their team handled everything with professionalism and care, from booking flights and hotels to organizing unique local experiences. The itinerary was well-planned, giving me the perfect balance of adventure and relaxation.What I appreciated the most was their attention to detail and willingness to accommodate special requests. Everything was smooth and stress-free, allowing me to fully enjoy my trip. I highly recommend them for anyone looking for a reliable and well-organized travel agency!.",
  },
  {
    name: "Garami Gupta",
    title: "(From Google Reviews)",
    text: "Highly Recommended✨✨One of the best places to book your travel. What they promise, they deliver. If you want to sort out your travel needs, you need to book from Safari Sutra. Hassle free booking experience, helpful staff, all queries would be answered. Booked from them and had a great vacation, from pick up to drop, everything was top notch. Their itinerary was very well planned to see all spots of the destination. The flight bookings, hotel stays were all taken care of according to our needs. They handled everything for us with utmost care. Book now and thank me later.",
  },
  {
    name: "Deepesh Puppala",
    title: "(From Google Reviews)",
    text: "I had an amazing experience with Safari Sutra Holidays! From planning to execution, their team was professional, responsive, and attentive to every detail. They curated a seamless travel itinerary, ensuring a hassle-free and enjoyable trip. The accommodations, transportation, and sightseeing arrangements were all top-notch.What stood out the most was their personalized approach—understanding my preferences and making thoughtful recommendations that enhanced the journey. Whether you're planning a domestic getaway or an international adventure, I highly recommend Safari Sutra Holidays for a stress-free and memorable experience!",
  },
  {
    name: "Shrajan Shetty",
    title: "(From Google Reviews)",
    text: "I recently booked a honeymoon package to Sri Lanka for my best friend through these guys. The experience was fantastic! They handled all the details, from flights to accommodations, making the process stress-free. My friend and his wife had an amazing time, enjoying the beautiful landscapes and rich culture of Sri Lanka. Highly recommend their services for anyone planning a special trip.",
  },
  {
    name: "Nikhil Ambdoskar",
    title: "(From Google Reviews)",
    text: "Had an unforgettable experience with Safari Sutra Holidays – highly recommend them for seamless and memorable adventures!",
  },
  {
    name: "Sonali",
    title: "(From Google Reviews)",
    text: "I think if you want to have a hassle free Trip then mr. Sukhendu Reddy is the man for you. We, family of 3 went to Singapore and Malaysia through his agency. Everything was so meticulously planned , the timings amazed us a lot. It was perfect. The vehicles provided, the city tours and the guides were all good at what they assigned to. And the most surprising was Mr. Sukhendu's patience. He would attend to our calls any time of the day , though the timings differed by 2 and a half hours . I think that is an important quality of a travel agent. Go for it guys. You will love it.",
  },
];

const AboutReviews: React.FC = () => {
  const [testimonialPage, setTestimonialPage] = useState(0);
  const maxPage = Math.ceil(testimonialData.length / 3) - 1;

  const handlePrevPage = () => setTestimonialPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () => setTestimonialPage((prev) => Math.min(maxPage, prev + 1));

  return (
    <section id="reviews" className="py-16 px-4 bg-white relative overflow-hidden">
      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Section Title */}
        <motion.div className="mb-16" variants={titleVariants}>
          <SectionTitle
            icon={<MessageSquare size={16} />}
            pillText="Testimonials"
            title="What Our Clients Say"
            color="#066959"
            centered={true}
          />
          <p className="text-center font-family-baloo text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">
            Don&#39;t just take our word for it. Hear from travelers who have experienced the magic of Safari Sutra firsthand.
          </p>
        </motion.div>

        {/* Desktop Testimonials Grid with Pagination */}
        <motion.div className="hidden md:block" variants={cardVariants}>
          {/* Testimonials Container with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonial-page-${testimonialPage}`}
              variants={testimonialPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={testimonialPageTransition}
              className="grid grid-cols-1 md:grid-cols-3 gap-10" // Increased gap from 6 to 10
            >
              {testimonialData
                .slice(testimonialPage * 3, testimonialPage * 3 + 3)
                .map((testimonial, index) => (
                  <motion.div
                    key={`testimonial-${testimonialPage}-${index}`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    className="bg-white p-5 rounded-xl flex flex-col shadow-md border-2 border-[var(--color-orange)] h-[300px]" // Reduced height from 350px to 300px
                  >
                    {/* Quote icon */}
                    <div className="text-[var(--color-orange)] mb-2 opacity-70"> {/* Reduced margin from 3 to 2 */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" // Reduced from 24 to 20
                        height="20" // Reduced from 24 to 20
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.332.303-.706.93-1.242 1.89-1.61.58-.207.96-.628.96-1.21 0-.682-.54-1.21-1.216-1.21-.14 0-.282.028-.423.08-2.108.6-3.71 1.81-4.796 3.63C3.15 11.875 2.69 14.013 2.69 16.47c0 1.643.506 3.067 1.52 4.274.96 1.137 2.2 1.703 3.73 1.703 1.272 0 2.39-.436 3.35-1.31.96-.874 1.44-1.993 1.44-3.358 0-.66-.172-1.306-.516-1.938-.344-.632-.79-.962-1.24-.99-.25-.026-.51.004-.772.086-.262.08-.47.195-.625.344zm7.137 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.7-1.327-.83-.57-.13-1.09-.14-1.54-.03-.16-.95.09-1.63.4-2.34.31-.7.94-1.24 1.89-1.61.58-.21.96-.63.96-1.21 0-.68-.54-1.21-1.22-1.21-.14 0-.28.03-.42.08-2.11.6-3.71 1.81-4.8 3.63-1.34 2.27-1.8 4.41-1.8 6.87 0 1.64.51 3.07 1.52 4.27.96 1.14 2.2 1.7 3.73 1.7 1.27 0 2.39-.43 3.35-1.3.96-.88 1.44-2 1.44-3.36 0-.66-.17-1.31-.52-1.94-.35-.63-.79-.96-1.24-.99-.25-.03-.51 0-.77.08-.26.08-.47.2-.63.35z" />
                      </svg>
                    </div>

                    {/* Testimonial text - Using line-clamp instead of scroll */}
                    <div className="mb-3 flex-grow"> {/* Reduced margin from 4 to 3 */}
                      <p className="text-gray-700 text-base leading-relaxed italic line-clamp-4"> {/* Reduced from text-lg to text-base and line-clamp-5 to line-clamp-4 */}
                        {testimonial.text}
                      </p>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-orange)] hover:underline text-xs mt-1 cursor-pointer" // Reduced from text-sm to text-xs
                      >
                        Read more...
                      </a>
                    </div>

                    {/* Separator */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div> {/* Reduced margin from my-3 to my-2 */}

                    {/* Author info - Now at the bottom of the card */}
                    <div className="flex items-center mt-auto">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-orange)] flex items-center justify-center text-white font-bold"> {/* Reduced from w-10 h-10 to w-8 h-8 */}
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-2"> {/* Reduced margin from 3 to 2 */}
                        <p className="font-bold text-gray-800 text-sm"> {/* Added text-sm */}
                          {testimonial.name}
                        </p>
                        {testimonial.title && (
                          <p className="text-[var(--color-orange)] text-xs"> {/* Reduced from text-sm to text-xs */}
                            {testimonial.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-10 items-center"> {/* Reduced margin from 12 to 10 */}
            <button
              onClick={handlePrevPage}
              disabled={testimonialPage === 0}
              className={`p-2 rounded-full mr-4 cursor-pointer ${
                testimonialPage === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} /> {/* Reduced from 24 to 20 */}
            </button>

            <div className="flex space-x-3"> {/* Increased spacing from 2 to 3 */}
              {[...Array(maxPage + 1)].map((_, index) => (
                <button
                  key={`page-${index}`}
                  onClick={() => setTestimonialPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    testimonialPage === index
                      ? "bg-[var(--color-orange)]"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={testimonialPage === maxPage}
              className={`p-2 rounded-full ml-4 cursor-pointer ${
                testimonialPage === maxPage
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} /> {/* Reduced from 24 to 20 */}
            </button>
          </div>
        </motion.div>

        {/* Testimonials - Mobile Swiper with Auto Slide */}
        <motion.div className="md:hidden" variants={cardVariants}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30} // Increased from 20 to 30
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet bg-gray-500/50 inline-block rounded-full mx-1.5 cursor-pointer", // Increased spacing with mx-1.5
              bulletActiveClass: "bg-[var(--color-orange)]",
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mb-8"
          >
            {testimonialData.map((testimonial, index) => (
              <SwiperSlide key={`testimonial-mobile-${index}`}>
                <div className="bg-white p-4 rounded-xl flex flex-col shadow-md border-2 border-[var(--color-orange)] mb-10 h-[290px]"> {/* Reduced from p-5 to p-4 and height from 325px to 290px */}
                  {/* Quote icon */}
                  <div className="text-[var(--color-orange)] mb-2 opacity-70"> {/* Reduced from mb-3 to mb-2 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18" // Reduced from 20 to 18
                      height="18" // Reduced from 20 to 18
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.332.303-.706.93-1.242 1.89-1.61.58-.207.96-.628.96-1.21 0-.682-.54-1.21-1.216-1.21-.14 0-.282.028-.423.08-2.108.6-3.71 1.81-4.796 3.63C3.15 11.875 2.69 14.013 2.69 16.47c0 1.643.506 3.067 1.52 4.274.96 1.137 2.2 1.703 3.73 1.703 1.272 0 2.39-.436 3.35-1.31.96-.874 1.44-1.993 1.44-3.358 0-.66-.172-1.306-.516-1.938-.344-.632-.79-.962-1.24-.99-.25-.026-.51.004-.772.086-.262.08-.47.195-.625.344zm7.137 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.7-1.327-.83-.57-.13-1.09-.14-1.54-.03-.16-.95.09-1.63.4-2.34.31-.7.94-1.24 1.89-1.61.58-.21.96-.63.96-1.21 0-.68-.54-1.21-1.22-1.21-.14 0-.28.03-.42.08-2.11.6-3.71 1.81-4.8 3.63-1.34 2.27-1.8 4.41-1.8 6.87 0 1.64.51 3.07 1.52 4.27.96 1.14 2.2 1.7 3.73 1.7 1.27 0 2.39-.43 3.35-1.3.96-.88 1.44-2 1.44-3.36 0-.66-.17-1.31-.52-1.94-.35-.63-.79-.96-1.24-.99-.25-.03-.51 0-.77.08-.26.08-.47.2-.63.35z" />
                    </svg>
                  </div>

                  {/* Testimonial text */}
                  <div className="mb-3 flex-grow"> {/* Reduced from mb-4 to mb-3 */}
                    <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-4"> {/* Reduced from text-base to text-sm and line-clamp-5 to line-clamp-4 */}
                      {testimonial.text}
                    </p>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-orange)] hover:underline text-xs mt-1 cursor-pointer"
                    >
                      Read more...
                    </a>
                  </div>

                  {/* Separator */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div> {/* Reduced from my-3 to my-2 */}

                  {/* Author info */}
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-orange)] flex items-center justify-center text-white font-bold text-xs"> {/* Reduced from w-8 h-8 to w-7 h-7 and added text-xs */}
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-2"> {/* Reduced from ml-3 to ml-2 */}
                      <p className="font-bold text-gray-800 text-sm"> {/* Added text-sm */}
                        {testimonial.name}
                      </p>
                      {testimonial.title && (
                        <p className="text-[var(--color-orange)] text-xs">
                          {testimonial.title}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutReviews;
