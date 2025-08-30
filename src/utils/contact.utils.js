/**
 * Utility function to navigate to contact page, scroll to form, and autofill fields
 *
 * @param {Object} options - Configuration options
 * @param {Function} options.navigate - React Router's navigate function
 * @param {string} options.subject - Subject line to autofill
 * @param {string} options.message - Message body to autofill
 * @param {number} options.delay - Delay in ms before scrolling (default: 800)
 * @param {string} options.behavior - Scroll behavior (default: "smooth")
 * @param {string} options.formId - ID of the contact form element (default: "contact-form")
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

  // Store form data in localStorage instead of sessionStorage for better mobile support
  if (subject) {
    localStorage.setItem("contactFormSubject", subject);
  }

  if (message) {
    localStorage.setItem("contactFormMessage", message);
  }

  // Set a flag that we should scroll to form
  localStorage.setItem("scrollToContactForm", "true");
  localStorage.setItem("contactFormScrollBehavior", behavior);

  // Navigate to contact page
  navigate("/contact");

  // On mobile, we'll rely on useEffect in ContactCard component to handle the scrolling
  // The timeout here is for desktop browsers
  setTimeout(() => {
    scrollToContactForm(formId, behavior);
  }, delay);
};

/**
 * Helper function to scroll to contact form
 *
 * @param {string} formId - ID of the form element to scroll to
 * @param {string} behavior - Scroll behavior (smooth or auto)
 */
export const scrollToContactForm = (
  formId = "contact-form",
  behavior = "smooth"
) => {
  const contactForm = document.getElementById(formId);
  if (contactForm) {
    contactForm.scrollIntoView({ behavior });
  } else {
    console.warn(`Contact form with ID "${formId}" not found`);
  }
};

/**
 * Helper to generate a booking inquiry message for a tour
 *
 * @param {Object} tour - Tour object with title and other properties
 * @param {String} dateInfo - Optional date information to include in the message
 * @returns {Object} Object containing subject and message
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
