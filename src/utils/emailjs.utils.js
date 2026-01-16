import emailjs from "@emailjs/browser";

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_7jpizv9", // Get from EmailJS dashboard
  templateId: "template_vag32q5", // Get from EmailJS dashboard
  publicKey: "QFwngGZFgeVRp1sDk", // Get from EmailJS dashboard
};

/**
 * Initialize EmailJS
 */
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

/**
 * Send contact form email using EmailJS
 * @param {Object} formData - Contact form data
 * @returns {Promise} - EmailJS response
 */
export const sendContactEmail = async (formData) => {
  try {
    // Template parameters that match your EmailJS template
    const templateParams = {
      to_name: "Safari Sutra Team",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      subject: formData.subject || "New Contact Form Submission",
      message: formData.message,
      reply_to: formData.email,
      current_year: new Date().getFullYear(), // Add current year for email template
    };

    console.log("Sending email with params:", templateParams);

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log("Email sent successfully:", result);
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("EmailJS Error:", error);

    // Handle specific EmailJS errors
    let errorMessage = "Sorry, there was an error sending your message.";

    if (error.status === 400) {
      errorMessage = "Please check your input and try again.";
    } else if (error.status === 401) {
      errorMessage = "Email service temporarily unavailable.";
    } else if (error.status === 413) {
      errorMessage = "Message too long. Please shorten your message.";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Send newsletter subscription email
 * @param {string} email - Subscriber email
 * @returns {Promise} - EmailJS response
 */
export const sendNewsletterEmail = async (email) => {
  try {
    const templateParams = {
      to_name: "Safari Sutra Team",
      subscriber_email: email,
      subject: "New Newsletter Subscription",
      current_year: new Date().getFullYear(), // Add current year for email template
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      "newsletter_template_id", // You'll need to create this template
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    return {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw new Error("Failed to subscribe. Please try again.");
  }
};
