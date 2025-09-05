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

  const positions = [
    "Travel Consultant",
    "Tour Guide",
    "Content Creator",
    "Marketing Specialist",
    "Operations Manager",
    "Customer Support",
    "Other",
  ];

  // Validate form whenever form data changes
  useEffect(() => {
    const { name, email, phone, position, message } = formData;
    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      position.trim() !== "" &&
      message.trim() !== "";

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    setSubmitting(true);
    setError("");

    try {
      await sendJoinTeamApplication(formData);
      setSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
      });
    } catch (err: unknown) {
      // Narrow unknown to a usable message without using `any`
      const message = err instanceof Error ? err.message : String(err ?? "Something went wrong. Please try again later.");
      setError(message);
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {submitted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in joining Safari Sutra. Our team will review your application and get back to you soon.
          </p>

          <SSButton
            variant="primary"
            color="var(--color-orange)"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Application
          </SSButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Full Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
                Position Interested In*
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
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
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Why do you want to join Safari Sutra?*
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
              placeholder="Tell us about your passion for travel and why you'd be a great fit..."
              required
            ></textarea>
          </div>

          {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">{error}</div>}

          <div className="flex justify-center pt-4">
            {submitting ? (
              <div className="px-8 py-3 bg-[var(--color-orange)] opacity-70 text-white rounded-2xl text-lg font-semibold inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              <SSButton
                type="submit"
                variant={isFormValid ? "primary" : "disabled"}
                color="var(--color-orange)"
                className="text-lg"
                disabled={!isFormValid}
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
