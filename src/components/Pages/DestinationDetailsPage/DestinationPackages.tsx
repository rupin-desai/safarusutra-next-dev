"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Package as PackageIcon, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/UI/SectionTitle";
import TourCard from "@/components/UI/TourCard";
import SSButton from "@/components/UI/SSButton";
import DestinationsData from "@/data/DestinatonDetails.json";

// Animation variants (cast to any so translate3d strings are accepted)
const fadeIn: any = {
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

const cardVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index: number) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.08,
    },
  }),
};

const floatingAnimation: any = {
  animate: {
    y: [-8, 8, -8],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
};

interface Props {
  destinationName?: string;
  destinationId?: number | string;
}

const DestinationPackages: React.FC<Props> = ({ destinationName = "", destinationId }) => {
  const router = useRouter();

  const destinationPackages = useMemo(() => {
    if (!DestinationsData || !Array.isArray(DestinationsData)) return [];

    const destNameLower = String(destinationName).toLowerCase().trim();
    const destIdNum = Number(destinationId);

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wholeWordRegex = destNameLower ? new RegExp(`\\b${escapeRegExp(destNameLower)}\\b`, "i") : null;

    const related = (DestinationsData as any[]).filter((pkg) => {
      const destinationMatch =
        Array.isArray(pkg.destinationNames) &&
        pkg.destinationNames.some((dn: any) => String(dn).toLowerCase().trim() === destNameLower);

      const idMatch =
        Array.isArray(pkg.relatedDestinations) &&
        pkg.relatedDestinations.some((rid: any) => Number(rid) === destIdNum);

      if (destinationMatch || idMatch) return true;

      const hasExplicit =
        (Array.isArray(pkg.destinationNames) && pkg.destinationNames.length > 0) ||
        (Array.isArray(pkg.relatedDestinations) && pkg.relatedDestinations.length > 0);

      if (!hasExplicit && wholeWordRegex) {
        return (
          (typeof pkg.title === "string" && wholeWordRegex.test(pkg.title)) ||
          (typeof pkg.route === "string" && wholeWordRegex.test(pkg.route)) ||
          (typeof pkg.description === "string" && wholeWordRegex.test(pkg.description))
        );
      }

      return false;
    });

    const seen = new Set();
    return related.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [destinationName, destinationId]);

  const handleCustomPackageRequest = () => {
    const subject = encodeURIComponent(`Custom ${destinationName} Package Request`);
    const message = encodeURIComponent(`I'm interested in a custom travel package for ${destinationName}. Please share options & pricing.`);
    router.push(`/contact?subject=${subject}&message=${message}`);
  };

  if (!destinationPackages || destinationPackages.length === 0) {
    return (
      <section className="py-16 relative overflow-hidden" id="packages">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            icon={<PackageIcon size={16} />}
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
            <motion.div className="mb-6 flex justify-center" variants={cardVariants as any}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-orange)]/10 rounded-full flex items-center justify-center">
                <MessageCircle size={32} className="text-[var(--color-orange)]" />
              </div>
            </motion.div>

            <motion.h3 className="text-xl md:text-2xl font-bold mb-4" variants={cardVariants as any}>
              No Pre-Designed Packages Available
            </motion.h3>

            <motion.p className="text-gray-600 mb-8 max-w-lg mx-auto" variants={cardVariants as any}>
              We don't currently have standard packages for {destinationName}, but we'd love to create a custom travel experience tailored to your preferences and budget.
            </motion.p>

            <motion.div variants={cardVariants as any}>
              <SSButton color="var(--color-orange)" onClick={handleCustomPackageRequest}>
                Request Custom Package
              </SSButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden" id="packages">
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
          icon={<PackageIcon size={16} />}
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
          {destinationPackages.map((pkg: any, index: number) => (
            <motion.div
              key={pkg.id ?? index}
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
          <SSButton variant="primary" color="var(--color-orange)" to="/tour">
            View All Packages
          </SSButton>

          <SSButton variant="outline" color="var(--color-dark-teal)" onClick={handleCustomPackageRequest}>
            Request Custom Package
          </SSButton>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationPackages;
