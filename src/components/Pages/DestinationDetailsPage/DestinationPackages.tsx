"use client";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Package as PackageIcon, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/UI/SectionTitle";
import TourCard, { type Tour } from "@/components/UI/TourCard";
import SSButton from "@/components/UI/SSButton";
import ToursDataRaw from "@/data/TourDetails.json";

type PackageItem = {
  id?: string | number;
  title?: string;
  route?: string;
  description?: string;
  image?: string;
  price?: string | number;
  duration?: string;
  destinationNames?: (string | number)[];
  relatedDestinations?: (string | number)[];
} & Record<string, unknown>;

const fadeIn: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const cardVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 30px, 0px)" },
  animate: (index = 0) => ({ opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { type: "spring", stiffness: 300, damping: 20, delay: index * 0.08 } }),
};

const floatingAnimation: Variants = {
  initial: { transform: "translate3d(0px, 0px, 0px)" },
  animate: { transform: "translate3d(0px, -8px, 0px)", transition: { transform: { repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "reverse" } } },
};

interface Props {
  destinationName?: string;
  destinationId?: number | string;
}

const DestinationPackages: React.FC<Props> = ({ destinationName = "", destinationId }) => {
  const router = useRouter();

  const destinationPackages = useMemo(() => {
    const raw = ToursDataRaw as unknown;
    const allPackages = Array.isArray(raw) ? (raw as PackageItem[]) : Object.values((raw as Record<string, PackageItem>) || {});
    if (!allPackages || allPackages.length === 0) return [];

    const destNameLower = String(destinationName || "").toLowerCase().trim();
    const destIdStr = destinationId != null ? String(destinationId) : "";
    const destIdNum = Number.isFinite(Number(destinationId)) ? Number(destinationId) : undefined;

    const matchesDestination = (pkg: PackageItem) => {
      if (Array.isArray(pkg.relatedDestinations) && destIdStr) {
        for (const rid of pkg.relatedDestinations) {
          if (String(rid) === destIdStr) return true;
          if (destIdNum != null && Number(rid) === destIdNum) return true;
        }
      }

      if (Array.isArray(pkg.destinationNames) && destNameLower) {
        for (const dn of pkg.destinationNames) {
          if (String(dn).toLowerCase().trim() === destNameLower) return true;
        }
      }

      if (destNameLower) {
        const safe = (s?: unknown) => (typeof s === "string" ? s.toLowerCase() : String(s ?? "").toLowerCase());
        const text = `${safe(pkg.title)} ${safe(pkg.route)} ${safe(pkg.description)}`;
        const regex = new RegExp(`\\b${destNameLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        if (regex.test(text)) return true;
      }

      return false;
    };

    const related = allPackages.filter((p) => matchesDestination(p));

    const seen = new Set<string>();
    return related.filter((p) => {
      const key = String(p.id ?? "");
      if (seen.has(key) && key !== "") return false;
      seen.add(key);
      return true;
    });
  }, [destinationName, destinationId]);

  const handleCustomPackageRequest = () => {
    const subject = encodeURIComponent(`Custom ${destinationName} Package Request`);
    const message = encodeURIComponent(`I am interested in a custom travel package for ${destinationName}. Please share options & pricing.`);
    router.push(`/contact?subject=${subject}&message=${message}`);
  };

  if (!destinationPackages || destinationPackages.length === 0) {
    return (
      <section className="py-16 relative overflow-hidden" id="destination-packages">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle icon={<PackageIcon size={16} />} pillText="Custom Packages" title={`${destinationName} Travel Packages`} color="#F89B21" centered containerClassName="mb-12" />

          <motion.div className="bg-[#FBF8F3] rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <motion.div className="mb-6 flex justify-center" variants={cardVariants as unknown as Variants}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-orange)]/10 rounded-full flex items-center justify-center">
                <MessageCircle size={32} className="text-[var(--color-orange)]" />
              </div>
            </motion.div>

            <motion.h3 className="text-xl md:text-2xl font-bold mb-4" variants={cardVariants as unknown as Variants}>
              No Pre-Designed Packages Available
            </motion.h3>

            <motion.p className="text-gray-600 mb-8 max-w-lg mx-auto" variants={cardVariants as unknown as Variants}>
              We don&apos;t currently have standard packages for {destinationName}, but we&apos;d love to create a custom travel experience tailored to your preferences and budget.
            </motion.p>

            <motion.div variants={cardVariants as unknown as Variants}>
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
    <section className="py-16 relative overflow-hidden" id="destination-packages">
      <motion.img src="/illustrations/suitcase.svg" alt="" className="absolute top-20 right-10 md:right-20 h-16 w-16 md:w-24 md:h-24 opacity-25 hidden md:block" initial="initial" animate="animate" variants={floatingAnimation} aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle icon={<PackageIcon size={16} />} pillText="Available Packages" title={`${destinationName} Travel Packages`} color="#F89B21" centered containerClassName="mb-12" />

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
          {destinationPackages.map((pkg: PackageItem, index: number) => (
            <motion.div key={pkg.id ?? index} custom={index} variants={cardVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <TourCard tour={pkg as Tour} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-10 text-center flex flex-wrap justify-center gap-4" variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <SSButton variant="primary" color="var(--color-orange)" to="/tour/">
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
