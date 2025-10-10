"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionTitle from "@/components/UI/SectionTitle";
import SSButton from "@/components/UI/SSButton";
import { Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { generateTourBookingInquiry } from "@/utils/contact.utils";

const packages = [
  {
    title: "Behind the Scenes",
    features: [
      "All-day access to Dubai Safari Park.",
      "90 minutes private guided transported tour of 5 selected behind the scenes experiences.",
      "Access to 6 zones (African Village, Asian Village, Explorer Village, Arabian Desert, Kids Farm & Alwadi ).",
      "Unlimited access to shuttle train around the Park.",
      "15 minutes Arabian Desert Safari.",
      "Reserved Seating in all 3 Live Animal Presentations.",
      "Access to Wildlife Talks as per announced schedule.",
      "Access to Young Explorers Workshops as per announced schedule.",
      "A wide choice of dining and retail options available at an additional cost",
      "Complimentary Parking",
    ],
    image:
      "https://dubaisafari.ae/wp-content/uploads/2024/10/behind-the-scene-2-1.jpg",
    alt: "Behind the Scenes tour at Dubai Safari Park",
    button: { text: "Book Package", href: "#" },
  },
  {
    title: "King of Safari",
    features: [
      "All-day access to Dubai Safari Park.",
      "Private guided transported tour for up to 10 guests for 4 hours.",
      "Fast track access to 35 minutes Explorer Safari Tour.",
      "Access to 6 zones (African Village, Asian Village, Explorer Village, Arabian Desert, Kids Farm and Alwadi ).",
      "Unlimited access to shuttle train around the Park.",
      "15 minutes Arabian Desert Safari.",
      "Reserved Seating in all 3 Live Animal Presentations.",
      "Access to 3 animal feeding encounters: Giraffe Feeding, Bird Feeding and Goat Feeding",
      "Access to Wildlife Talks as per announced schedule.",
      "Access to Young Explorers Workshops as per announced schedule.",
      "A wide choice of dining and retail options available at an additional cost",
      "VIP Parking",
    ],
    image:
      "https://dubaisafari.ae/wp-content/uploads/2024/10/9-Asian-Moon-bear.jpg",
    alt: "King of Safari tour at Dubai Safari Park",
    button: { text: "Book Package", href: "#" },
  },
  {
    title: "Dine in the Wild",
    features: [
      "Enjoy delicious breakfast Menu.",
      "All-day access to Dubai Safari Park.",
      "Access to 6 zones (African Village, Asian Village, Explorer Village, Arabian Desert, Kids Farm and Alwadi).",
      "15 minutes Arabian Desert Safari.",
      "Reserved Seating in all 3 Live Animal Presentations.",
      "Access to complementary animal feeding / encounters as per announced schedule**",
      "Access to wildlife talks as per announced schedule.",
      "Access to Young Explorers workshops as per announced schedule.",
      "A wide choice of dining and retail options available at an additional cost.",
      "Complimentary parking.",
      "Unlimited access to shuttle train around the Park.",
    ],
    image:
      "https://dubaisafari.ae/wp-content/uploads/2024/10/dine-in-the-wild-2.jpg",
    alt: "Dine in the Wild at Dubai Safari Park",
    button: { text: "Book Package", href: "#" },
  },
  {
    title: "Jungle Capture",
    features: [
      "All-day access to Dubai Safari Park.",
      "3 hour exclusive guided tour for up to 3 wildlife photography lovers, offering behind-the-scenes access to capture selected animals.",
      "Access to 6 zones (African Village, Asian Village, Explorer Village, Arabian Desert, Kids Farm and Alwadi).",
      "Unlimited access to shuttle train around the Park.",
      "15 minutes Arabian Desert Safari.",
      "Reserved Seating in all 3 Live Animal Presentations.",
      "Access to the complementary animal feeding / encounter experiences as per announced schedule.",
      "Access to wildlife talks as per announced schedule.",
      "Access to Young Explorers workshops as per announced schedule.",
      "A wide choice of dining and retail options available at an additional cost.",
      "Complimentary parking.",
    ],
    image:
      "https://dubaisafari.ae/wp-content/uploads/2024/10/DSC06390-copy.jpg",
    alt: "Jungle Capture at Dubai Safari Park",
    button: { text: "Book Package", href: "#" },
  },
];

// Only animate the content (title, image, features, button)
const contentVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    transform: `translate3d(${direction > 0 ? "100%" : "-100%"}, 0, 0)`,
    position: "absolute",
    width: "100%",
    height: "100%",
  }),
  center: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    position: "relative",
    width: "100%",
    height: "100%",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    transform: `translate3d(${direction < 0 ? "100%" : "-100%"}, 0, 0)`,
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: { duration: 0.2 },
  }),
};

export default function DubaiExperiencePackages() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Touch swipe logic (like HomeHero)
  const touchStartX = useRef<number>(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleBook = () => {
    const pkg = packages[current];
    const { subject, message } = generateTourBookingInquiry({
      title: pkg.title,
    });
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const formId = "contact-form";
        const contactForm = document.getElementById(formId);
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            const subjectField = contactForm.querySelector("#subject") as
              | HTMLInputElement
              | HTMLTextAreaElement
              | null;
            if (subjectField) subjectField.value = subject;
            const messageField = contactForm.querySelector("#message") as
              | HTMLInputElement
              | HTMLTextAreaElement
              | null;
            if (messageField) messageField.value = message;
            const firstInput = contactForm.querySelector(
              "input,textarea,select,button"
            );
            if (firstInput) (firstInput as HTMLElement).focus();
          }, 400);
        } else {
          try {
            localStorage.setItem("contactFormSubject", subject);
            localStorage.setItem("contactFormMessage", message);
            localStorage.setItem("scrollToContactForm", "true");
            localStorage.setItem("contactFormScrollBehavior", "smooth");
          } catch {}
        }
      }
    }, 100);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? packages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === packages.length - 1 ? 0 : prev + 1));
  };

  // Set your desired heights here:
  const mobileHeight = 950; // for mobile (sm)
  const mdHeight = 760; // for md screens
  const lgHeight = 640; // for lg and above

  return (
    <section className="py-16 px-0 bg-white w-full overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionTitle
          icon={<Crown size={22} className="text-[#F89B21]" />}
          pillText="Dubai Exclusive"
          title="Dubai Safari Park Experience Packages"
          color="#F89B21"
          centered
          containerClassName="mb-10"
          titleSize="large"
        />
        {/* Desktop/Tablet View */}
        <div
          id="ds-carousel-area"
          className="relative w-full hidden md:block"
          style={{
            height: `${lgHeight}px`,
            maxWidth: 1100,
            margin: "0 auto",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Arrows are outside and not animated */}
          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="absolute -left-3 md:left-2 top-1/2 -translate-y-1/2 bg-white text-[var(--color-orange)] rounded-full w-11 h-11 flex items-center justify-center shadow hover:bg-[var(--color-orange)] hover:text-white cursor-pointer z-10 border-2 border-[var(--color-orange)]"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="absolute -right-3 md:right-2 top-1/2 -translate-y-1/2 bg-white text-[var(--color-orange)] rounded-full w-11 h-11 flex items-center justify-center shadow hover:bg-[var(--color-orange)] hover:text-white cursor-pointer z-10 border-2 border-[var(--color-orange)]"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <ChevronRight size={28} />
          </button>
          <div
            className={`
              flex bg-white border border-gray-200 rounded-xl overflow-visible w-full h-full
              flex-row items-stretch
              relative
            `}
            style={{
              height: `${lgHeight}px`,
              width: "100%",
              maxWidth: 1100,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={packages[current].title}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                {/* Left: Title above Image */}
                <div
                  className={`
                    flex flex-col items-center justify-center bg-gray-50 w-full
                    pt-8 pb-6 px-6 md:px-10
                    md:min-w-[400px] md:max-w-[600px] md:w-full
                  `}
                  style={{
                    maxWidth: 600,
                    flex: "1 1 400px",
                    height: "100%",
                  }}
                >
                  <h3 className="text-3xl md:text-5xl lg:text-6xl text-[var(--color-dark-brown)] font-family-oswald text-center mb-4">
                    {packages[current].title}
                  </h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={packages[current].image}
                    alt={packages[current].alt}
                    className="rounded-lg w-full max-w-2xl object-cover border border-gray-200"
                    loading="lazy"
                    style={{
                      minHeight: 260,
                      maxHeight: 400,
                      objectFit: "cover",
                    }}
                  />
                </div>
                {/* Right: Content */}
                <div
                  className={`
                    flex flex-col justify-center w-full
                    p-6 md:p-10
                    items-start
                    text-left
                    md:items-start
                    md:text-left
                  `}
                  style={{
                    flex: "2 1 500px",
                    maxWidth: 700,
                    overflowY: "auto",
                  }}
                >
                  <ul className="mb-4 space-y-2 text-[var(--color-dark-brown)] text-base w-full max-w-xl">
                    {packages[current].features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-orange)] mt-1">
                          •
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-4 mt-2 justify-start">
                    <SSButton
                      variant="primary"
                      color="var(--color-orange)"
                      className="text-base font-semibold px-5 py-2 rounded-xl"
                      onClick={handleBook}
                    >
                      {packages[current].button.text}
                    </SSButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Mobile View */}
        <div
          id="ds-carousel-area-mobile"
          className="relative w-full block md:hidden"
          style={{
            height: `${mobileHeight}px`,
            maxWidth: 600,
            margin: "0 auto",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Arrows are outside and not animated */}
          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-[var(--color-orange)] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[var(--color-orange)] hover:text-white cursor-pointer z-10 border-2 border-[var(--color-orange)]"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-[var(--color-orange)] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[var(--color-orange)] hover:text-white cursor-pointer z-10 border-2 border-[var(--color-orange)]"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <ChevronRight size={24} />
          </button>
          <div
            className={`
              flex flex-col bg-white border border-gray-200 rounded-xl overflow-visible w-full h-full
              items-center relative
            `}
            style={{
              height: `${mobileHeight}px`,
              width: "100%",
              maxWidth: 600,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={packages[current].title}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                <div
                  className={`
                    flex flex-col items-center justify-start bg-gray-50 w-full
                    pt-6 pb-4 px-4
                  `}
                >
                  <h3 className="text-2xl text-[var(--color-dark-brown)] font-family-oswald text-center mb-3">
                    {packages[current].title}
                  </h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={packages[current].image}
                    alt={packages[current].alt}
                    className="rounded-lg w-full object-cover border border-gray-200"
                    loading="lazy"
                    style={{
                      minHeight: 120,
                      maxHeight: 180,
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className={`
                    flex flex-col justify-center w-full
                    p-4
                    items-start
                    text-left
                  `}
                  style={{
                    overflowY: "auto",
                  }}
                >
                  <ul className="mb-3 space-y-2 text-[var(--color-dark-brown)] text-sm w-full">
                    {packages[current].features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-orange)] mt-1">
                          •
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3 mt-2 justify-start">
                    <SSButton
                      variant="primary"
                      color="var(--color-orange)"
                      className="text-sm font-semibold px-4 py-2 rounded-xl"
                      onClick={handleBook}
                    >
                      {packages[current].button.text}
                    </SSButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {packages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full border border-[var(--color-orange)] transition ${
                current === idx ? "bg-[var(--color-orange)]" : "bg-white"
              }`}
              aria-label={`Go to ${packages[idx].title}`}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (min-width: 768px) and (max-width: 1023px) {
          #ds-carousel-area {
            height: ${mdHeight}px !important;
          }
          #ds-carousel-area > div {
            height: ${mdHeight}px !important;
          }
        }
        @media (min-width: 1024px) {
          #ds-carousel-area {
            height: ${lgHeight}px !important;
          }
          #ds-carousel-area > div {
            height: ${lgHeight}px !important;
          }
        }
        @media (max-width: 767px) {
          #ds-carousel-area-mobile {
            height: ${mobileHeight}px !important;
          }
          #ds-carousel-area-mobile > div {
            height: ${mobileHeight}px !important;
          }
        }
      `}</style>
    </section>
  );
}
