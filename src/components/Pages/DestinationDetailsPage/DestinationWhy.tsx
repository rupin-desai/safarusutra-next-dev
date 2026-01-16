"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import SSButton from "@/components/UI/SSButton";
import { useRouter } from "next/navigation";

import BookingModal from "@/components/UI/BookingModal";

interface Props {
  tour?: {
    title?: string;
    price?: string | number;
    image?: string;
    tourWhy?: {
      title?: string;
      description?: string;
      backgroundImage?: string;
      srcSetWebp?: string;
      srcFallback?: string;
      imageTitle?: string;
      alt?: string;
    };
  } | null;
}

// Animation variant using translate3d (typed as Variants)
const containerAnim: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  whileInView: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
};

const DestinationWhy: React.FC<Props> = ({ tour }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({ subject: "", message: "" });

  if (!tour || !tour.tourWhy) return null;

  const {
    title,
    description,
    backgroundImage,
    srcSetWebp,
    srcFallback,
    imageTitle,
    alt,
  } = tour.tourWhy;

  const handleCustomBooking = () => {
    const subject = `Custom ${tour.title ?? ""} Tour Booking`;
    const message = `I'm interested in booking a custom tour to ${tour.title ?? ""
      }. I would like to discuss my specific requirements and preferences.`;
    setModalData({ subject, message });
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden">
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSubject={modalData.subject}
        initialMessage={modalData.message}
        title={`Book ${tour.title ?? "Custom"} Tour`}
        price={tour.price}
        image={tour.image}
      />
      <div className="absolute inset-0 z-0">
        {srcSetWebp || srcFallback ? (
          <div className="absolute inset-0">
            {/* Responsive image using srcSet */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              srcSet={srcSetWebp}
              src={srcFallback || backgroundImage}
              alt={alt || imageTitle || `${tour.title ?? ""} landscape`}
              title={imageTitle || alt || `${tour.title ?? ""} landscape`}
              className="object-cover w-full h-full"
              style={{ position: "absolute", inset: 0 }}
            />
          </div>
        ) : backgroundImage ? (
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt={alt || imageTitle || `${tour.title ?? ""} landscape`}
              title={imageTitle || alt || `${tour.title ?? ""} landscape`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-900/40" />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          viewport={{ once: true, amount: 0.4 }}
          variants={containerAnim}
          className="max-w-xl mx-auto"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-family-baloo)" }}
          >
            {title}
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <SSButton
              variant="primary"
              color="var(--color-orange)"
              onClick={handleCustomBooking}
            >
              Book Custom Tour
            </SSButton>

            <SSButton variant="outline" color="white" to="/tour/">
              View Packages
            </SSButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationWhy;
