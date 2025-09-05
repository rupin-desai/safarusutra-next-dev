/**
 * Utility function to navigate to contact page, scroll to form, and autofill fields
 *
 * @param {Object} options
 * @param {(path: string) => void} options.navigate - navigation function (next/router or similar)
 * @param {string} [options.subject]
 * @param {string} [options.message]
 * @param {number} [options.delay=800]
 * @param {string} [options.behavior="smooth"]
 * @param {string} [options.formId="contact-form"]
 * @returns {void}
 */
export const navigateToContactForm = ({
  navigate,
  subject,
  message,
  delay = 800,
  behavior = "smooth",
  formId = "contact-form",
}) => {
  if (!navigate) {
    console.error("Navigate function is required");
    return;
  }

  // Store form data in localStorage (safer across navigations)
  try {
    if (subject) {
      localStorage.setItem("contactFormSubject", subject);
    }

    if (message) {
      localStorage.setItem("contactFormMessage", message);
    }

    // Set a flag that we should scroll to form
    localStorage.setItem("scrollToContactForm", "true");
    localStorage.setItem("contactFormScrollBehavior", behavior);
  } catch (err) {
    // ignore storage errors on SSR or strict privacy modes
    console.warn("Could not access localStorage:", err);
  }

  // Navigate to contact page
  navigate("/contact");

  // Try to scroll after a short delay (desktop fallback)
  setTimeout(() => {
    scrollToContactForm(formId, behavior);
  }, delay);
};

/**
 * Helper function to scroll to contact form
 *
 * @param {string} [formId="contact-form"]
 * @param {string} [behavior="smooth"]
 * @returns {void}
 */
export const scrollToContactForm = (formId = "contact-form", behavior = "smooth") => {
  try {
    const contactForm = document.getElementById(formId);
    if (contactForm) {
      contactForm.scrollIntoView({ behavior });
    } else {
      // element not found — caller may handle via effect on contact page
      console.warn(`Contact form with ID "${formId}" not found`);
    }
  } catch (err) {
    // ignore errors when called in non-browser context
    console.warn("scrollToContactForm error:", err);
  }
};

/**
 * Helper to generate a booking inquiry message for a tour
 *
 * @param {Object} tour - Tour object with title and other properties
 * @param {string} [dateInfo=""] - Optional date information to include in the message
 * @returns {{subject: string, message: string}}
 */
export const generateTourBookingInquiry = (tour, dateInfo = "") => {
  if (!tour || !tour.title) {
    console.error("Tour object with title is required");
    return { subject: "", message: "" };
  }

  return {
    subject: `Booking Inquiry: ${tour.title}`,
    message: `I'm interested in booking the "${tour.title}" tour. Please provide me with more information about availability and pricing.${dateInfo}`,
  };
};
