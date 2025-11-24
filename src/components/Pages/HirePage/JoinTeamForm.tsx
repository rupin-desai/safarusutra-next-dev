"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SSButton from "@/components/UI/SSButton";
import { sendJoinTeamApplication } from "@/utils/emailjs_HireB2b.utils";

type FormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9]{7,15}$/; // optional + and 7-15 digits

type FormErrors = Partial<Record<keyof FormData, string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;

// Anti-spam utilities
const checkSpamPatterns = (text: string): boolean => {
  const spamKeywords = [
    /\b(viagra|cialis|lottery|prize|winner|click here|buy now|limited time)\b/gi,
    /\b(earn money|work from home|make \$|casino|poker|betting)\b/gi,
    /\b(free money|get paid|mlm|bitcoin|crypto)\b/gi,
    /(http[s]?:\/\/[^\s]+){2,}/gi, // Multiple URLs
  ];

  return spamKeywords.some((pattern) => pattern.test(text));
};

const checkSuspiciousEmail = (email: string): boolean => {
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

const JoinTeamForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Anti-spam states
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [interactionCount, setInteractionCount] = useState(0);

  const positions = [
    "Travel Consultant",
    "Tour Guide",
    "Content Creator",
    "Marketing Specialist",
    "Operations Manager",
    "Customer Support",
    "Other",
  ];

  // Initialize anti-spam measures
  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  // Validate form whenever form data changes
  useEffect(() => {
    const next: FormErrors = {};
    const { name, email, phone, position, message } = formData;

    if (!name.trim()) next.name = "Full name is required.";
    else if (name.trim().length < 2)
      next.name = "Name must be at least 2 characters.";
    else if (name.trim().length > 100) next.name = "Name is too long.";

    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address.";
    else if (checkSuspiciousEmail(email.trim()))
      next.email = "Please use a valid email address.";

    if (!phone.trim()) next.phone = "Phone number is required.";
    else if (!PHONE_RE.test(phone.trim()))
      next.phone = "Enter a valid phone number (7-15 digits, optional +).";

    if (!position.trim()) next.position = "Please select a position.";

    if (!message.trim()) next.message = "Message is required.";
    else if (message.trim().length < 20)
      next.message = "Message must be at least 20 characters.";
    else if (message.trim().length > 1000)
      next.message = "Message is too long (max 1000 characters).";
    else if (checkSpamPatterns(message))
      next.message = "Message contains suspicious content.";

    setErrors(next);
    setIsFormValid(Object.keys(next).length === 0);
  }, [formData]);

  // Sanitizes phone: allow digits and single leading + only
  const sanitizePhone = (raw: string) => {
    // remove all characters except digits and plus
    let s = raw.replace(/[^\d+]/g, "");
    // allow only one leading +
    if (s.includes("+")) {
      // move any + to start and remove other + signs
      s = "+" + s.replace(/\+/g, "");
      // if plus not at start, ensure it's at start
      if (s.length > 1 && s[1] === "+") s = s.replace(/\+/g, "");
    }
    // finally, strip any pluses not leading
    if (s.startsWith("+")) {
      s = "+" + s.slice(1).replace(/\+/g, "");
    } else {
      s = s.replace(/\+/g, "");
    }
    // limit length (plus + up to 15 digits)
    const digits = s.replace(/\+/g, "");
    const truncatedDigits = digits.slice(0, 15);
    return (s.startsWith("+") ? "+" : "") + truncatedDigits;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Track interaction
    setInteractionCount((prev) => prev + 1);

    if (name === "phone") {
      const clean = sanitizePhone(value);
      setFormData((prev) => ({ ...prev, phone: clean }));
      setErrors((prev) => ({ ...prev, phone: undefined }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Additional spam checks
  const checkAntiSpam = (): string | null => {
    // 1. Honeypot check
    if (honeypot) {
      console.warn("Honeypot triggered");
      return "Invalid submission detected";
    }

    // 2. Time-based check (must take at least 5 seconds for job application)
    const timeTaken = Date.now() - formLoadTime;
    if (timeTaken < 5000) {
      console.warn("Form submitted too quickly");
      return "Please take your time to fill the application";
    }

    // 3. Interaction check
    if (interactionCount < 5) {
      console.warn("Insufficient user interaction");
      return "Please complete all required fields";
    }

    // 4. Check for rapid-fire submissions
    const lastSubmitTime = localStorage.getItem("lastJobSubmit");
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
      if (timeSinceLastSubmit < 300000) {
        // 5 minutes
        return "Please wait before submitting another application";
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(false);

    if (!isFormValid) {
      // mark that user attempted submit so errors become visible
      setAttemptedSubmit(true);
      // also mark all fields touched so messages show after attempted submit
      setTouched({
        name: true,
        email: true,
        phone: true,
        position: true,
        message: true,
      });
      return;
    }

    // Anti-spam checks
    const spamError = checkAntiSpam();
    if (spamError) {
      setError(spamError);
      setTimeout(() => setError(""), 5000);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await sendJoinTeamApplication(formData);
      setSubmitted(true);

      // Store submission timestamp
      localStorage.setItem("lastJobSubmit", Date.now().toString());

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
      });
      setErrors({});
      setTouched({});
      setAttemptedSubmit(false);
      setInteractionCount(0);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : String(err ?? "Something went wrong. Please try again later.");
      setError(message);
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // helper: should show error for a field?
  const shouldShowError = (field: keyof FormData) => {
    // show only after blur/touch or after an attempted submit
    return Boolean(touched[field] || attemptedSubmit);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in joining Safari Sutra. Our team will
            review your application and get back to you soon.
          </p>

          <SSButton
            variant="primary"
            color="var(--color-orange)"
            onClick={() => {
              setSubmitted(false);
              setFormLoadTime(Date.now());
            }}
          >
            Submit Another Application
          </SSButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot field - hidden from real users */}
          <div
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          >
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name && shouldShowError("name")
                    ? "name-error"
                    : undefined
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
                required
              />
              {errors.name && shouldShowError("name") && (
                <p id="name-error" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email && shouldShowError("email")
                    ? "email-error"
                    : undefined
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="your.email@example.com"
                autoComplete="email"
                required
              />
              {errors.email && shouldShowError("email") && (
                <p id="email-error" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                pattern="\+?[0-9]*"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone && shouldShowError("phone")
                    ? "phone-error"
                    : undefined
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
              />
              {errors.phone && shouldShowError("phone") && (
                <p id="phone-error" className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="position"
                className="block text-gray-700 font-medium mb-2"
              >
                Position Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.position}
                aria-describedby={
                  errors.position && shouldShowError("position")
                    ? "position-error"
                    : undefined
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Select a position
                </option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && shouldShowError("position") && (
                <p id="position-error" className="mt-1 text-xs text-red-600">
                  {errors.position}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Why do you want to join Safari Sutra?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message && shouldShowError("message")
                  ? "message-error"
                  : undefined
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
              placeholder="Tell us about your passion for travel and why you'd be a great fit..."
              maxLength={1000}
              required
            ></textarea>
            <div className="flex justify-between items-center mt-1">
              {errors.message && shouldShowError("message") ? (
                <p id="message-error" className="text-xs text-red-600">
                  {errors.message}
                </p>
              ) : (
                <span className="text-xs text-gray-500">
                  {formData.message.length}/1000 characters (min. 20)
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-4">
            {submitting ? (
              <div className="px-8 py-3 bg-[var(--color-orange)] opacity-70 text-white rounded-2xl text-lg font-semibold inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              <SSButton
                type="submit"
                variant={isFormValid ? "primary" : "disabled"}
                color="var(--color-orange)"
                className="text-lg"
                disabled={!isFormValid || submitting}
              >
                Submit Application
              </SSButton>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default JoinTeamForm;
