import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
  Linkedin,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SSButton from "@/components/UI/SSButton";
import { scrollToContactForm } from "@/utils/contact.utils";
import { sendContactEmail, initEmailJS } from "@/utils/emailjs.utils";

// Animation variants consistent with the codebase style using transform3d
const containerVariants: Variants = {
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

const leftColVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-30px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const rightColVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(30px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4,
    },
  },
};

const logoVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

const successVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormProps = {
  onSubmit: (data: ContactFormData) => Promise<unknown>;
};

// Anti-spam utilities
const checkSpamPatterns = (text: string): boolean => {
  const spamKeywords = [
    /\b(viagra|cialis|lottery|prize|winner|click here|buy now|limited time|act now)\b/gi,
    /\b(earn money|work from home|make \$|casino|poker|betting)\b/gi,
    /\b(free money|get paid|earn cash|mlm|bitcoin|crypto)\b/gi,
    /(http[s]?:\/\/[^\s]+){3,}/gi, // Multiple URLs
  ];

  return spamKeywords.some((pattern) => pattern.test(text));
};

const checkSuspiciousEmail = (email: string): boolean => {
  // Check for disposable email domains
  const disposableDomains = [
    "tempmail.com",
    "throwaway.email",
    "guerrillamail.com",
    "10minutemail.com",
    "mailinator.com",
    "trashmail.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.includes(domain);
};

// Create separate form component to isolate renders
const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Anti-spam states
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);

  // Initialize EmailJS and anti-spam measures on component mount
  useEffect(() => {
    initEmailJS();
    setFormLoadTime(Date.now());
  }, []);

  // Track user interactions
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasUserInteraction) {
        setHasUserInteraction(true);
        setInteractionCount((prev) => prev + 1);
      }
    };

    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasUserInteraction]);

  // Effect to check for stored form data on component mount
  useEffect(() => {
    const storedSubject = localStorage.getItem("contactFormSubject");
    const storedMessage = localStorage.getItem("contactFormMessage");

    if (storedSubject || storedMessage) {
      setFormData((prevData) => ({
        ...prevData,
        subject: storedSubject ?? prevData.subject,
        message: storedMessage ?? prevData.message,
      }));

      // Also directly update DOM elements for mobile compatibility
      setTimeout(() => {
        const subjectField = document.getElementById(
          "subject"
        ) as HTMLInputElement | null;
        const messageField = document.getElementById(
          "message"
        ) as HTMLTextAreaElement | null;

        if (subjectField && storedSubject) {
          subjectField.value = storedSubject;
        }

        if (messageField && storedMessage) {
          messageField.value = storedMessage;
        }
      }, 300);

      localStorage.removeItem("contactFormSubject");
      localStorage.removeItem("contactFormMessage");
    }
  }, []);

  // Handle scrolling in a separate effect to ensure it happens after data is loaded
  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToContactForm") === "true";

    if (shouldScroll) {
      localStorage.removeItem("scrollToContactForm");

      const behavior =
        (localStorage.getItem("contactFormScrollBehavior") as ScrollBehavior) ||
        "smooth";
      localStorage.removeItem("contactFormScrollBehavior");

      setTimeout(() => {
        scrollToContactForm("contact-form", behavior);
      }, 600);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // Track interaction
      setInteractionCount((prev) => prev + 1);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => {
        if (!prev[name]) return prev;
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    },
    []
  );

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name is too long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else if (checkSuspiciousEmail(formData.email)) {
      newErrors.email = "Please use a valid email address";
    }

    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message is too long (max 1000 characters)";
    } else if (checkSpamPatterns(formData.message)) {
      newErrors.message = "Message contains suspicious content";
    }

    // Check spam patterns in subject
    if (formData.subject && checkSpamPatterns(formData.subject)) {
      newErrors.subject = "Subject contains suspicious content";
    }

    return newErrors;
  }, [formData]);

  // Additional spam checks
  const checkAntiSpam = (): string | null => {
    // 1. Honeypot check
    if (honeypot) {
      console.warn("Honeypot triggered");
      return "Invalid submission detected";
    }

    // 2. Time-based check (must take at least 3 seconds)
    const timeTaken = Date.now() - formLoadTime;
    if (timeTaken < 3000) {
      console.warn("Form submitted too quickly");
      return "Please take your time to fill the form";
    }

    // 3. Interaction check
    if (interactionCount < 3) {
      console.warn("Insufficient user interaction");
      return "Please interact with the form naturally";
    }

    // 4. Check for rapid-fire submissions (rate limiting)
    const lastSubmitTime = localStorage.getItem("lastContactSubmit");
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
      if (timeSinceLastSubmit < 60000) {
        // 1 minute
        return "Please wait a minute before submitting again";
      }
    }

    return null;
  };

  // small helper to safely extract a message from unknown errors
  const getErrorMessage = (error: unknown): string => {
    if (!error) return "An unknown error occurred.";
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    // try to read a message property safely
    try {
      const maybeObj = error as { message?: unknown };
      if (typeof maybeObj.message === "string") return maybeObj.message;
    } catch {
      /* ignore */
    }
    return "An unexpected error occurred.";
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Anti-spam checks
      const spamError = checkAntiSpam();
      if (spamError) {
        setSubmitError(spamError);
        setTimeout(() => {
          setSubmitError(null);
        }, 5000);
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await onSubmit(formData);
        setIsSubmitting(false);
        setIsSuccess(true);

        // Store submission timestamp
        localStorage.setItem("lastContactSubmit", Date.now().toString());

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } catch (error: unknown) {
        setIsSubmitting(false);
        setSubmitError(
          getErrorMessage(error) || "Failed to send message. Please try again."
        );

        setTimeout(() => {
          setSubmitError(null);
        }, 5000);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, validate, onSubmit, honeypot, formLoadTime, interactionCount]
  );

  if (isSuccess) {
    return (
      <motion.div
        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
        variants={successVariants}
        initial="initial"
        animate="animate"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Message Sent!
        </h3>
        <p className="text-green-700">
          Thank you for contacting us. We&apos;ll get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field - hidden from real users */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <AnimatePresence>
        {submitError && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="text-red-500" size={18} />
              <p className="text-red-600">{submitError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition-colors`}
          placeholder="Your name"
          autoComplete="name"
          maxLength={100}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition-colors`}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition-colors`}
            placeholder="+91 9876543210"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.subject ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition-colors`}
          placeholder="What is this about?"
          maxLength={200}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition-colors`}
          placeholder="How can we help you?"
          maxLength={1000}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            <span className="text-xs text-gray-500">
              {formData.message.length}/1000 characters
            </span>
          )}
        </div>
      </div>

      <div>
        <SSButton
          variant="primary"
          color="var(--color-dark-teal)"
          className="w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </SSButton>
      </div>
    </form>
  );
};

// Separate component for contact info to isolate renders
const ContactInfo: React.FC = () => (
  <>
    {/* Logo for desktop - only visible on md screens and up */}
    <motion.div
      className="hidden md:flex flex-col items-center"
      variants={logoVariants}
    >
      <div className="bg-white p-1 rounded-full mb-4 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/logo.png"
          title="Logo of Safari Sutra"
          alt="SafariSutra"
          className="h-10 md:h-18 w-auto"
        />
      </div>
    </motion.div>

    {/* Contact information section - centered vertically and horizontally */}
    <div className="space-y-6 max-w-xs flex-grow flex flex-col justify-center">
      {/* Main Mumbai Address */}
      <div className="flex items-start">
        <MapPin className="mr-4 mt-1 flex-shrink-0" />
        <p>
          WeWork, Chromium, 186/1 We, Jogeshwari - Vikhroli Link Rd, Vidya
          Milind Nagar, Raje Sambhaji Nagar, Marol, Powai, Mumbai, Maharashtra
          400059
        </p>
      </div>
      {/* Hyderabad Address */}
      <div className="flex items-start">
        <MapPin className="mr-4 mt-1 flex-shrink-0" />
        <div>
          <p>
            Madhapur, Building no.9, Raheja Mindspace IT Park, Mindspace -
            Madhapur road, HITEC city, Hyderabad, Telangana State, Telangana,
            IN, 500079
          </p>
        </div>
      </div>
      {/* Mumbai Aarey Colony Address */}
      <div className="flex items-start">
        <MapPin className="mr-4 mt-1 flex-shrink-0" />
        <div>
          <p>
            No 2, 1 Mohan Gokhale Rd, 1st & 20th Floor, Colony, 20th floor,
            Aarey Milk Colony, Mumbai, Maharashtra 400063
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Phone className="mr-4 mt-1 flex-shrink-0" />
        <div>
          <p>
            <a
              href="tel:+919967572970"
              className="hover:underline transition-all"
            >
              +91 9967572970
            </a>
          </p>
          <p>
            <a
              href="tel:+919860415774"
              className="hover:underline transition-all"
            >
              +91 9860415774
            </a>
          </p>
          <p>
            <a
              href="tel:+919429690981"
              className="hover:underline transition-all"
            >
              +91 9429690981
            </a>
          </p>

          <p className="text-sm italic">We Actually Pick Up!</p>
        </div>
      </div>

      <div className="flex items-start">
        <Mail className="mr-4 mt-1 flex-shrink-0" />
        <div>
          <p className="hover:underline transition-all">
            <a href="mailto:hello@safarisutra.com">hello@safarisutra.com</a>
          </p>
          <p className="text-sm italic">
            We reply faster than you can say &quot;chalo nikalte hain!&quot;
          </p>
        </div>
      </div>
    </div>

    <div className="mt-3">
      <div className="flex space-x-4 justify-center">
        <a
          href="https://www.facebook.com/profile.php?id=61560936836457"
          target="_blank"
          rel="noreferrer"
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </a>
        <a
          href="https://www.instagram.com/safarisutra/"
          target="_blank"
          rel="noreferrer"
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
        <a
          href="https://x.com/SafariSutra"
          target="_blank"
          rel="noreferrer"
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="X (formerly Twitter)"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://www.linkedin.com/company/103599001"
          target="_blank"
          rel="noreferrer"
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </>
);

const ContactCard: React.FC = () => {
  // Updated submit handler to use EmailJS
  const handleFormSubmit = useCallback(async (formData: ContactFormData) => {
    try {
      const response = await sendContactEmail(formData);
      return response;
    } catch (error: unknown) {
      console.error("Error in form submission:", error);
      // rethrow after logging, preserve original type
      throw error;
    }
  }, []);

  return (
    <motion.div
      id="contact-form"
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left column - Contact information */}
        <motion.div
          className="order-2 md:order-1 p-6 md:p-8 md:w-5/12 text-white flex flex-col items-center"
          style={{ backgroundColor: "#F89B21" }}
          variants={leftColVariants}
        >
          <ContactInfo />
        </motion.div>

        {/* Right column - Contact form */}
        <motion.div
          className="order-1 md:order-2 px-6 py-6 md:px-10 md:py-12 md:w-7/12 flex items-center justify-center"
          variants={rightColVariants}
        >
          <div className="w-full max-w-lg">
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
