import React from "react";
import { motion } from "framer-motion";
import SSButton from "../../ui/Buttons/SSButton";
import { useNavigate } from "react-router-dom";
import { navigateToContactForm } from "../../utils/contactUtils";

const DestinationWhy = ({ tour }) => {
  const navigate = useNavigate();

  // If no tour data or tourWhy section is provided, don't render anything
  if (!tour || !tour.tourWhy) return null;

  const { title, description, backgroundImage } = tour.tourWhy;

  // Handle custom destination request
  const handleCustomBooking = () => {
    navigateToContactForm({
      navigate,
      subject: `Custom ${tour.title} Tour Booking`,
      message: `I'm interested in booking a custom tour to ${tour.title}. I would like to discuss my specific requirements and preferences.`,
    });
  };

  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={`${tour.title} landscape`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, transform: "translate3d(0px, 20px, 0px)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          viewport={{ once: true, amount: 0.4 }}
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
            <SSButton color="var(--color-orange)" onClick={handleCustomBooking}>
              Book Custom Tour
            </SSButton>

            <SSButton type="outline" color="white" to="/tour">
              View Packages
            </SSButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationWhy;
