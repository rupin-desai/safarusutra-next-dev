import React from "react";
import { MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SSButton from "../UI/SSButton";
import { generateTourBookingInquiry } from "@/utils/contact.utils";

export type Tour = {
  id: number;
  image?: string;
  title?: string; // made optional to match incoming Package data
  route?: string;
  price?: number;
  attractions?: unknown[];
  duration?: string;
  [key: string]: any;
};

// Updated card variants with both hover and initial states (typed)
const cardVariants: Variants = {
  initial: {
    transform: "translate3d(0px, 0px, 0px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    transform: "translate3d(0px, -5px, 0px)",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const createSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const extractTitle = (title?: string): string => {
  if (!title) return "";
  const colonIndex = title.indexOf(":");
  return colonIndex > 0 ? title.substring(0, colonIndex).trim() : title;
};

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const router = useRouter();

  const formattedPrice = typeof tour.price === "number" ? `₹${tour.price.toLocaleString()}` : "₹24,999";
  const attractionCount = tour.attractions?.length ?? 0;
  const durationDays = tour.duration ? String(tour.duration).split(" ")[0] : "N/A";
  const titleSlug = createSlug(tour.title ?? String(tour.id));
  const displayTitle = extractTitle(tour.title);

  const handleBookNow = () => {
    // contact.utils.js is untyped JS -> assert the returned shape to avoid TS errors
    const result = generateTourBookingInquiry(tour) as { subject?: string; message?: string };
    const subject = result.subject ?? "";
    const message = result.message ?? "";
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (message) params.set("message", message);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <motion.div
      className="relative h-[500px] max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-lg group"
      initial="initial"
      whileHover="hover"
      animate="initial"
      variants={cardVariants}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tour.image ?? "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2"}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-3 mt-3 p-3">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 font-family-baloo line-clamp-2">
            {displayTitle}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <p className="truncate">{tour.route}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6 mt-16">
          <div className="flex items-center justify-between w-full">
            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">From</p>
              <p className="text-lg font-bold text-white">{formattedPrice}</p>
            </div>

            <div className="h-10 w-px bg-white/30" />

            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">Duration</p>
              <p className="text-white text-base">{durationDays} Days</p>
            </div>

            <div className="h-10 w-px bg-white/30" />

            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">Attractions</p>
              <p className="text-white text-base">{attractionCount}+</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SSButton variant="primary" color="#f89b21" onClick={handleBookNow} className="text-sm py-2">
            Book Now
          </SSButton>

          <Link
            href={`/tour/${tour.id}/${titleSlug}`}
            className="flex-1 py-2 text-white text-center rounded-2xl font-medium transition-all duration-150 hover:brightness-110 hover:shadow-md active:scale-95 active:shadow-inner"
            aria-label={`View details for ${tour.title}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
