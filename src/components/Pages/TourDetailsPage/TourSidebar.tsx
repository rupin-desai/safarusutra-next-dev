"use client";
import React, { useState, useEffect } from "react";
import { Share2, Check, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SSButton from "@/components/UI/SSButton";
import { generateTourBookingInquiry } from "@/utils/contact.utils";
import type { Tour as BaseTour } from "@/components/UI/TourCard";

type DateObj = {
  range: string;
  enabled?: boolean;
  [key: string]: unknown;
};

type AvailableMonth = {
  month: string;
  dates: DateObj[];
  // derived
  enabledDates?: DateObj[];
};

// Keep the base Tour shape and extend with availableDates.
// Important: do NOT narrow `price` here — BaseTour may have number | string.
type TourWithDates = BaseTour & {
  availableDates?: AvailableMonth[];
  price?: number | string;
  [key: string]: unknown;
};

const TourSidebar = ({ tour, selectedMonth = "", selectedDateRange = "" }: { tour: TourWithDates; selectedMonth?: string; selectedDateRange?: string }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableDatesForMonth, setAvailableDatesForMonth] = useState<DateObj[]>([]);
  const [showDateSelector, setShowDateSelector] = useState(false);

  // Use state for the selected values so they can be updated either from props or internal selection
  const [internalSelectedMonth, setInternalSelectedMonth] = useState<string>(selectedMonth);
  const [internalSelectedDate, setInternalSelectedDate] = useState<string>(selectedDateRange);

  // typed hover transition to satisfy TS when using "spring"
  const hoverTransition = { type: "spring" as const, stiffness: 500, damping: 15 };

  // Initialize available months and dates if tour has availableDates
  useEffect(() => {
    const months = Array.isArray(tour?.availableDates) ? tour.availableDates : [];
    if (months.length === 0) {
      setShowDateSelector(false);
      setAvailableMonths([]);
      setAvailableDatesForMonth([]);
      return;
    }

    const processedMonths: AvailableMonth[] = months.map((m) => {
      const dates = Array.isArray(m.dates) ? m.dates : [];
      const enabledDates = dates.filter((d) => d && (d.enabled ?? true));
      return { ...m, dates, enabledDates };
    });

    const monthsWithEnabledDates = processedMonths.filter((m) => (m.enabledDates ?? []).length > 0);

    if (monthsWithEnabledDates.length > 0) {
      const monthNames = monthsWithEnabledDates.map((m) => m.month);
      setAvailableMonths(monthNames);
      setShowDateSelector(true);

      // Default to first month if no selection from props
      if (!internalSelectedMonth) {
        const first = monthNames[0];
        setInternalSelectedMonth(first);
        const firstMonthData = monthsWithEnabledDates.find((m) => m.month === first);
        if (firstMonthData) {
          setAvailableDatesForMonth(firstMonthData.enabledDates ?? []);
        }
      } else {
        const selected = monthsWithEnabledDates.find((m) => m.month === internalSelectedMonth);
        setAvailableDatesForMonth(selected?.enabledDates ?? []);
      }
    } else {
      setShowDateSelector(false);
      setAvailableMonths([]);
      setAvailableDatesForMonth([]);
    }
    // only depend on tour
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  // Update internal state when props change
  useEffect(() => {
    if (selectedMonth) {
      setInternalSelectedMonth(selectedMonth);
    }
    if (selectedDateRange) {
      setInternalSelectedDate(selectedDateRange);
    }
  }, [selectedMonth, selectedDateRange]);

  // Update available dates when month changes
  useEffect(() => {
    if (!internalSelectedMonth || !Array.isArray(tour?.availableDates)) {
      return;
    }

    const monthData = tour.availableDates.find((item) => item.month === internalSelectedMonth);
    if (monthData && Array.isArray(monthData.dates)) {
      const enabledDates = monthData.dates.filter((dateObj) => dateObj.enabled !== false);
      setAvailableDatesForMonth(enabledDates);

      // If the currently selected date isn't in the new month or is disabled, reset it
      if (internalSelectedDate) {
        const dateStillValid = enabledDates.some((dateObj) => dateObj.range === internalSelectedDate);
        if (!dateStillValid) {
          setInternalSelectedDate("");
        }
      }
    } else {
      setAvailableDatesForMonth([]);
      setInternalSelectedDate("");
    }
  }, [internalSelectedMonth, tour, internalSelectedDate]);

  // Handle booking request
  const handleBookNow = () => {
    let dateInfo = "";
    if (internalSelectedMonth && internalSelectedDate) {
      dateInfo = `\n\nPreferred travel date: ${internalSelectedDate}, ${internalSelectedMonth}`;
    }

    const { subject, message } = generateTourBookingInquiry(tour, dateInfo);

    // Use Next.js router to navigate to contact page with encoded query params
    const params = new URLSearchParams({
      subject: subject ?? "",
      message: message ?? "",
    });
    router.push(`/contact?${params.toString()}`);
  };

  // Handle month selection
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalSelectedMonth(e.target.value);
  };

  // Handle date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalSelectedDate(e.target.value);
  };

  // Handle custom quote request
  const handleCustomQuote = () => {
    const subject = `Custom Quote Request: ${tour.title ?? ""}`;
    const message = `I am interested in a custom quote for the "${tour.title ?? ""}" tour. I would like to discuss specific requirements and preferences.`;
    const params = new URLSearchParams({ subject, message });
    router.push(`/contact?${params.toString()}`);
  };

  // Copy URL to clipboard with feedback
  const copyToClipboard = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      // Reset button text after 2 seconds
      const t = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(t);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <div className="mb-4">
        <span className="text-gray-600 text-sm">Starting from</span>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-orange-500">
            ₹{typeof tour?.price === "number" ? tour.price.toLocaleString() : tour?.price ?? ""}
          </span>
          <span className="text-gray-600 ml-1">per person</span>
        </div>
      </div>

      {/* Date selector (only shown if availableDates exists with enabled dates) */}
      {showDateSelector && (
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <Calendar size={16} className="mr-2 text-orange-500" />
            Select your preferred date
          </h3>

          <div className="space-y-2">
            {/* Month selector */}
            <div>
              <label htmlFor="month-select" className="text-xs text-gray-500 block mb-1">
                Month
              </label>
              <select
                id="month-select"
                value={internalSelectedMonth}
                onChange={handleMonthChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Date selector */}
            <div>
              <label htmlFor="date-select" className="text-xs text-gray-500 block mb-1">
                Date Range
              </label>
              <select
                id="date-select"
                value={internalSelectedDate}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select date</option>
                {availableDatesForMonth.map((dateObj) => (
                  <option key={dateObj.range} value={dateObj.range}>
                    {dateObj.range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {internalSelectedDate && (
            <div className="mt-2 p-2 bg-green-50 text-green-700 text-xs rounded-md">
              You have selected: {internalSelectedDate}, {internalSelectedMonth}
            </div>
          )}
        </div>
      )}

      <SSButton variant="primary" color="var(--color-orange)" className="w-full mb-3" onClick={handleBookNow}>
        Book Now
      </SSButton>

      {/* Custom message before Request Custom Quote button */}
      <p className="text-center text-gray-600 text-sm mb-2 italic">
        Need different dates or special arrangements? We can help!
      </p>

      <SSButton variant="outline" color="var(--color-orange)" className="w-full mb-6" onClick={handleCustomQuote}>
        Request Custom Quote
      </SSButton>

      <div className="flex justify-between mb-6">
        <motion.button
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
            copied ? "bg-green-100 text-green-700" : "bg-[var(--color-orange)]/10 text-[var(--color-orange)] hover:bg-[var(--color-orange)]/20"
          }`}
          whileHover={!copied ? { transform: "translate3d(0px, -2px, 0px)", transition: hoverTransition } : {}}
          whileTap={!copied ? { transform: "translate3d(0px, 1px, 0px)" } : {}}
          initial={{ transform: "translate3d(0px, 0px, 0px)" }}
          onClick={copyToClipboard}
          type="button"
        >
          {copied ? (
            <>
              <Check size={18} />
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={18} />
              <span className="font-medium">Share</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
        <p className="text-gray-600 text-sm mb-3">Our travel experts are ready to assist you with any questions or special requests.</p>
        <SSButton variant="outline" color="var(--color-orange)" className="w-full flex items-center justify-center gap-2" onClick={() => router.push("/contact/")}>
          Contact Our Team
        </SSButton>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <Check size={16} className="text-green-400" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourSidebar;
