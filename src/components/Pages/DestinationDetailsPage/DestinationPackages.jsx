import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Package, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../ui/Elements/SectionTitle";
import TourCard from "../Tour/TourCard";
import SSButton from "../../ui/Buttons/SSButton";
import packageData from "../../data/packagedetails.json";
import { navigateToContactForm } from "../../utils/contactUtils";

// Optimized animation variants using transform3d for better performance
const fadeIn = {
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

const cardVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.1,
    },
  }),
};

// Rotation animation variants
const floatingAnimation = {
  animate: {
    y: [-8, 8, -8],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const DestinationPackages = ({ destinationName, destinationId }) => {
  const navigate = useNavigate();

  // Get packages for this destination using the new destinationNames array
  const destinationPackages = useMemo(() => {
    if (!packageData || packageData.length === 0) return [];

    // normalize lookup value and ensure id is number
    const destNameLower =
      destinationName?.toString().toLowerCase().trim() || "";
    const destIdNum = Number(destinationId);

    // helper to match whole words (avoid substring false-positives)
    const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wholeWordRegex = destNameLower
      ? new RegExp(`\\b${escapeRegExp(destNameLower)}\\b`, "i")
      : null;

    // Filter packages using the destinationNames array
    const relatedPackages = packageData.filter((pkg) => {
      // 1) Exact match against destinationNames (case-insensitive)
      const destinationMatch =
        Array.isArray(pkg.destinationNames) &&
        pkg.destinationNames.some(
          (dn) => dn?.toString().toLowerCase().trim() === destNameLower
        );

      // 2) Exact match against relatedDestinations (numeric)
      const idMatch =
        Array.isArray(pkg.relatedDestinations) &&
        pkg.relatedDestinations.some((rid) => Number(rid) === destIdNum);

      // If we have a clear mapping via destinationNames or relatedDestinations, accept it
      if (destinationMatch || idMatch) return true;

      // 3) Only if package has no explicit destinationNames/relatedDestinations,
      // use conservative whole-word fallback on title/route/description.
      const hasExplicitMappings =
        (Array.isArray(pkg.destinationNames) &&
          pkg.destinationNames.length > 0) ||
        (Array.isArray(pkg.relatedDestinations) &&
          pkg.relatedDestinations.length > 0);

      if (!hasExplicitMappings && wholeWordRegex) {
        const titleMatch =
          typeof pkg.title === "string" && wholeWordRegex.test(pkg.title);
        const routeMatch =
          typeof pkg.route === "string" && wholeWordRegex.test(pkg.route);
        const descMatch =
          typeof pkg.description === "string" &&
          wholeWordRegex.test(pkg.description);

        return titleMatch || routeMatch || descMatch;
      }

      return false;
    });

    // Remove duplicates by creating a Set of package IDs
    const uniquePackageIds = new Set();
    const uniquePackages = relatedPackages.filter((pkg) => {
      // If we haven't seen this ID before, add it and keep the package
      if (!uniquePackageIds.has(pkg.id)) {
        uniquePackageIds.add(pkg.id);
        return true;
      }
      // Otherwise filter it out
      return false;
    });

    return uniquePackages;
  }, [packageData, destinationName, destinationId]);

  // Handle custom package request
  const handleCustomPackageRequest = () => {
    navigateToContactForm({
      navigate,
      subject: `Custom ${destinationName} Package Request`,
      message: `I'm interested in creating a custom travel package for ${destinationName}. Please provide information about available options and pricing.`,
    });
  };

  // If no packages found, show custom package message
  if (!destinationPackages || destinationPackages.length === 0) {
    return (
      <section className="py-16 relative overflow-hidden" id="packages">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            icon={<Package size={16} />}
            pillText="Custom Packages"
            title={`${destinationName} Travel Packages`}
            color="#F89B21"
            centered={true}
            containerClassName="mb-12"
          />

          <motion.div
            className="bg-[#FBF8F3] rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <motion.div
              className="mb-6 flex justify-center"
              variants={cardVariants}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-orange)]/10 rounded-full flex items-center justify-center">
                <MessageCircle
                  size={32}
                  className="text-[var(--color-orange)]"
                />
              </div>
            </motion.div>

            <motion.h3
              className="text-xl md:text-2xl font-bold mb-4"
              variants={cardVariants}
            >
              No Pre-Designed Packages Available
            </motion.h3>

            <motion.p
              className="text-gray-600 mb-8 max-w-lg mx-auto"
              variants={cardVariants}
            >
              We don't currently have standard packages for {destinationName},
              but we'd love to create a custom travel experience tailored to
              your preferences and budget.
            </motion.p>

            <motion.div variants={cardVariants}>
              <SSButton
                color="var(--color-orange)"
                onClick={handleCustomPackageRequest}
              >
                Request Custom Package
              </SSButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Regular display for when packages are found
  return (
    <section className="py-16 relative overflow-hidden" id="packages">
      {/* Floating decoration element */}
      <motion.img
        src="/illustrations/suitcase.svg"
        alt=""
        className="absolute top-20 right-10 md:right-20 h-16 w-16 md:w-24 md:h-24 opacity-25 hidden md:block"
        initial={{ y: 0 }}
        animate="animate"
        variants={floatingAnimation}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          icon={<Package size={16} />}
          pillText="Available Packages"
          title={`${destinationName} Travel Packages`}
          color="#F89B21"
          centered={true}
          containerClassName="mb-12"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {destinationPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              custom={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <TourCard tour={pkg} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center flex flex-wrap justify-center gap-4"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SSButton type="primary" color="var(--color-orange)" to="/tour">
            View All Packages
          </SSButton>

          <SSButton
            type="outline"
            color="var(--color-dark-teal)"
            onClick={handleCustomPackageRequest}
          >
            Request Custom Package
          </SSButton>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationPackages;
