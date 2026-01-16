"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import SSButton from "./SSButton";
import { sendContactEmail } from "@/utils/emailjs.utils";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialSubject?: string;
    initialMessage?: string;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const desktopModalVariants = {
    hidden: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
    visible: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    exit: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
};

const mobileModalVariants = {
    hidden: { transform: "translate3d(0px, 100%, 0px)" },
    visible: { transform: "translate3d(0px, 0px, 0px)" },
    exit: { transform: "translate3d(0px, 100%, 0px)" },
};

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    initialSubject = "",
    initialMessage = "",
}) => {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: initialSubject,
        message: initialMessage,
    });

    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            setMounted(false);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Update form data when props change
    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({
                ...prev,
                subject: initialSubject,
                message: initialMessage,
            }));
            setStatus("idle");
            setErrorMessage("");
        }
    }, [isOpen, initialSubject, initialMessage]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        try {
            await sendContactEmail(formData);
            setStatus("success");
            // Optional: Close after a delay or let user close manually
            // setTimeout(onClose, 3000); 
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Something went wrong. Please try again."
            );
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-0 md:p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-white w-full md:max-w-lg overflow-hidden flex flex-col h-[75vh] md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-2xl shadow-2xl"
                        variants={isMobile ? mobileModalVariants : desktopModalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between py-3 px-4 md:p-4 border-b border-white/10 bg-[var(--color-orange)] shrink-0">
                            <h3 className="text-lg font-bold text-white font-family-baloo leading-none">
                                Plan Your Trip
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center h-full">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h4>
                                    <p className="text-gray-600 mb-6">
                                        Your inquiry has been sent successfully. Our team will get back to you shortly.
                                    </p>
                                    <SSButton onClick={onClose} color="var(--color-orange)">
                                        Close
                                    </SSButton>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 pb-6 md:pb-0">
                                    {status === "error" && (
                                        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2 text-sm">
                                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-all"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-all bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us about your travel plans..."
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="w-full bg-[var(--color-orange)] text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Inquiry
                                                </>
                                            )}
                                        </button>
                                        <p className="text-xs text-center text-gray-500 mt-3">
                                            We respect your privacy. Your information is safe with us.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BookingModal;
