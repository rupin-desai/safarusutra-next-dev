import emailjs from "@emailjs/browser";

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_7jpizv9",
  publicKey: "QFwngGZFgeVRp1sDk",
  templateId: "template_3vuq6s2", // Make sure this matches your template ID
};

// Track initialization to prevent multiple initializations
let isInitialized = false;

/**
 * Initialize EmailJS
 */
export const initEmailJS = () => {
  if (!isInitialized) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    isInitialized = true;
    console.log("EmailJS initialized successfully");
  }
};

/**
 * Send join team application form
 * @param {Object} formData - Join team form data
 * @returns {Promise} - EmailJS response
 */
export const sendJoinTeamApplication = async (formData) => {
  try {
    // Template parameters for join team email - include all possible fields
    const templateParams = {
      to_name: "Safari Sutra HR Team",
      from_name: formData.name || "",
      from_email: formData.email || "",
      phone: formData.phone || "",
      message: formData.message || "",
      position: formData.position || "",
      // Include empty B2B fields
      company_name: "",
      business_type: "",
      // Other required fields
      reply_to: formData.email || "",
      current_year: new Date().getFullYear().toString(),
      subject: `New Team Application: ${formData.position} from ${formData.name}`,
    };

    console.log("Sending join team application with params:", templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log("Join team application sent successfully:", response);
    return {
      success: true,
      message: "Thank you! Your application has been submitted successfully.",
    };
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error(
      "Sorry, there was an error submitting your application. Please try again later."
    );
  }
};

/**
 * Send B2B partnership request
 * @param {Object} formData - B2B partner form data
 * @returns {Promise} - EmailJS response
 */
export const sendB2BPartnerRequest = async (formData) => {
  try {
    // Template parameters for B2B partner email - include all possible fields
    const templateParams = {
      to_name: "Safari Sutra Partnerships Team",
      from_name: formData.contactName || "",
      from_email: formData.email || "",
      phone: formData.phone || "",
      message: formData.message || "",
      // B2B specific fields
      company_name: formData.companyName || "",
      business_type: formData.businessType || "",
      // Include empty job fields
      position: "",
      // Other required fields
      reply_to: formData.email || "",
      current_year: new Date().getFullYear().toString(),
      subject: `New B2B Partnership Request from ${formData.companyName} (${formData.businessType})`,
    };

    console.log("Sending B2B partnership request with params:", templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log("B2B partnership request sent successfully:", response);
    return {
      success: true,
      message:
        "Thank you! Your partnership request has been submitted successfully.",
    };
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error(
      "Sorry, there was an error submitting your request. Please try again later."
    );
  }
};
