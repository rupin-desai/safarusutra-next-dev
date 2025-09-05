import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Common/Navbar";
// Ensure that Navbar exists at the specified path and is exported correctly.

export const metadata: Metadata = {
  title: "Privacy Policy | Safari Sutra",
  description:
    "Learn how Safari Sutra collects, uses, protects, and shares your personal information. Read our privacy policy and understand your data protection rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR",
    "CCPA",
    "Safari Sutra privacy",
    "travel data protection",
  ],
  openGraph: {
    title: "Privacy Policy | Safari Sutra",
    description:
      "Learn how Safari Sutra collects, uses, protects, and shares your personal information. Read our privacy policy and understand your data protection rights.",
    url: "https://thesafarisutra.com/privacy",
  },
  twitter: {
    title: "Privacy Policy | Safari Sutra",
    description:
      "Learn how Safari Sutra collects, uses, protects, and shares your personal information.",
  },
};

export default function PrivacyPolicy(): React.ReactElement {
  return (
    <div>
      <Navbar isLegalPage={true} />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-24 md:pt-28"></div>

      <section
        className="py-12 px-4 md:py-16 md:px-16 bg-white"
        style={{ willChange: "opacity" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Simple section title */}
          <div
            className="mb-10 text-center"
            style={{
              transform: "translate3d(0px, 30px, 0px)",
              willChange: "transform, opacity",
            }}
          >
            <h1 className="text-3xl md:text-5xl font-family-oswald text-[var(--color-dark-teal)] mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">Effective Date: May 21, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-justify mb-10">
            <p>
              At Safari Sutra Holidays Private Limited (&quot;Safari Sutra,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your privacy,
              especially as a provider of personalized vacation experiences. We are not here
              for your data. We assure you that we will not spam you with unsolicited emails,
              messages, or calls. This Privacy Policy outlines how we collect, use, protect,
              and share personal information of users of our website (www.thesafarisutra.com),
              mobile applications, and related services.
            </p>
            <p>
              Personal information means data that can be linked to a specific individual,
              such as name, address, telephone number, email address, and payment details. We
              encourage you to review this Privacy Policy to understand our practices. We do
              not sell or rent your personal information to third parties. We may update this
              policy periodically, so we recommend bookmarking this page or checking it
              regularly for the latest version. Regardless of updates, we will adhere to the
              privacy practices described in this policy at the time you provide your personal
              information.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              1. What Personal Information We Collect and How We Use It
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                You are not required to provide personal information when browsing our website
                or mobile app unless you choose to make a purchase, register as a member, or
                sign up for services such as email newsletters. Below, we outline the types of
                personal information we collect and their uses:
              </p>

              <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
                1.1 Making a Purchase
              </h3>
              <p>
                To purchase travel or related services (e.g., flights, hotels, holiday packages)
                through our website or app, you must provide certain personal information,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Your full name, telephone number, email address, and billing address.
                </li>
                <li>
                  Payment instrument details, such as credit/debit card number and expiration
                  date.
                </li>
                <li>
                  Names and details of travelers (if not you), including passport details and
                  travel preferences (e.g., frequent flyer numbers, dietary requirements).
                </li>
              </ul>
              <p>
                We use this information to process, fulfill, and confirm your reservations and
                transactions, and to keep you informed of each transaction&#39;s status. If you make
                a reservation for other travelers, you confirm and represent that each traveler
                has consented to you disclosing their personal information to us.
              </p>

              <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
                1.2 Member Registration
              </h3>
              <p>
                If you choose to become a registered member of our website or app, you must
                provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Your name, address, telephone number, and email address.
                </li>
                <li>
                  A unique login name, password, password validation, and password hint.
                </li>
              </ul>
              <p>We collect this information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Verify your identity and complete reservations for holidays, flights, hotels,
                  or other services.
                </li>
                <li>
                  Contact you for customer service purposes, if necessary.
                </li>
                <li>
                  Customize our website or app content to meet your needs.
                </li>
                <li>Make improvements to our services and user experience.</li>
                <li>
                  Confirm your registration and each reservation you make.
                </li>
              </ul>
            </div>
          </div>

          {/* Continue with remaining sections using the same pattern */}
          <div className="mb-8">
            <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
              1.3 Member Profile
            </h3>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                As a registered member, you may choose to complete an online profile with
                additional information, such as travel preferences, frequent traveler numbers,
                credit card billing information, or preferred delivery address for travel
                documents. This information helps us streamline your booking process by reducing
                repetitive data entry.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
              1.4 Mobile App Permissions
            </h3>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Our mobile app does not publicly disclose any personal or sensitive data related
                to financial activities, payment details, or government identification numbers.
                We may request the following permissions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Camera and Microphone (iOS only):</strong> Required to allow you to
                  take photos or videos and send them to our customer support team via chat for
                  assistance with travel-related issues.
                </li>
                <li>
                  <strong>GPS Location (Android and iOS):</strong> Used to suggest nearby
                  attractions, accommodations, or services based on your location.
                </li>
              </ul>
              <p>
                These permissions are used solely to enhance your experience and are not shared
                with third parties except as necessary for service fulfillment.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
              1.5 Online Surveys
            </h3>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We value your feedback and may conduct voluntary online surveys. Participation is
                optional, and survey data is typically aggregated and anonymized to improve our
                website, app, and services, or to develop appealing content, features, and
                promotions. Participants remain anonymous unless otherwise stated in the survey.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
              1.6 Promotions and Sweepstakes
            </h3>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We occasionally sponsor promotions or sweepstakes to offer members opportunities
                to win travel-related prizes. Information collected, such as contact details or
                survey responses, is used to notify winners and improve our services.
                Participation is voluntary, and data is not shared with third parties except as
                necessary for prize fulfillment.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-[var(--color-orange)] mt-6 mb-3">
              1.7 Automatic Logging of Session Data
            </h3>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We automatically log anonymous session data about your device&apos;s connection to the
                internet, such as IP address, operating system, browser type, and user activities
                on our website or app. This data helps us analyze user behavior (e.g., pages
                visited, time spent, click patterns), diagnose server issues, and improve our
                systems. Session data does not identify you personally but may indicate your
                Internet Service Provider (ISP) or approximate geographic location.
              </p>
            </div>
          </div>
          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              2. Cookies
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We use cookies, small data files stored on your device, to enhance your experience
                on our website and app. Cookies do not collect personally identifiable information
                (PII) such as your name or address, nor can they run programs, plant viruses, or
                harvest personal data. Our use of cookies is similar to reputable travel and
                online platforms. We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Allow you to log in without re-entering your username each time (only your
                  password is required).
                </li>
                <li>
                  Personalize your experience by displaying relevant content or advertisements.
                </li>
                <li>
                  Send you tailored emails about destinations or fare sales (if you have not opted
                  out).
                </li>
                <li>
                  Track the effectiveness of advertisements on our site without collecting PII.
                </li>
              </ul>
              <p>
                Third-party advertising partners may also place cookies to provide travel-related
                ads based on aggregated, anonymous data from your visits to our site and others.
                No PII is collected or shared in this process. You can manage cookie preferences
                through your browser settings or our cookie consent tool. Blocking our cookies may
                limit certain features or prevent you from making purchases on our site. We
                support your right to control cookies and recommend allowing cookies from trusted
                sites like Safari Sutra for the best experience.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              3. With Whom Your Personal Information Is Shared
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                To fulfill your travel arrangements, we must share certain personal information
                with third-party providers, such as airlines, hotels, car rental agencies, or
                tour operators. This sharing is limited to what is necessary for booking and
                service fulfillment. We do not sell or rent your personal information to third
                parties. We may use non-personally identifiable, aggregated data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perform statistical analysis to improve our services.</li>
                <li>
                  Share anonymous statistics with suppliers, advertisers, or partners (e.g.,
                  number of clicks on their links).
                </li>
              </ul>
              <p>
                We may engage trusted third parties for specific projects, such as market research
                or contest processing, under strict confidentiality agreements. These parties use
                your information solely for the project and are prohibited from other uses. Under
                GDPR and CCPA, data sharing is based on contractual necessity, legitimate
                interests, or your explicit consent.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              4. How You Can Opt Out of Promotional Communications
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                As a member or promotion participant, you may receive occasional emails or SMS
                updates about fare sales, special offers, travel inspirations, or new services, in
                compliance with Telecom Regulation Authority of India (TRAI) guidelines. These
                communications are transactional or promotional, as authorized by you. To opt out:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Click the &quot;unsubscribe&quot; link in any email.</li>
                <li>
                  Log in to your account on www.thesafarisutra.com and update preferences
                  under the &quot;Settings&quot; section.
                </li>
                <li>
                  Email{" "}
                  <a
                    href="mailto:hello@thesafarisutra.com"
                    className="text-[var(--color-orange)]"
                  >
                    hello@thesafarisutra.com
                  </a>{" "}
                  to request removal from promotional communications.
                </li>
              </ul>
              <p>
                We reserve the right to limit membership to users who accept transactional emails
                for booking confirmations and customer service purposes.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              5. Safeguards to Protect Your Personal Information
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We implement strict security measures to protect your personal information,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>SSL Encryption:</strong> All personal information, including payment
                  details, is transmitted using Secure Socket Layer (SSL) encryption to prevent
                  unauthorized access.
                </li>
                <li>
                  <strong>PCI DSS Compliance:</strong> Payments are processed through third-party
                  gateways that adhere to Payment Card Industry Data Security Standards (PCI DSS).
                </li>
                <li>
                  <strong>Secure Servers:</strong> Data is stored on secure servers with restricted
                  access.
                </li>
                <li>
                  <strong>Regular Audits:</strong> We conduct periodic security audits to ensure
                  compliance with industry standards.
                </li>
              </ul>
              <p>
                In the unlikely event of a data breach, we will notify affected users and relevant
                authorities within 72 hours, as required by GDPR and other applicable laws.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              6. Your Data Protection Rights
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Under GDPR, CCPA, and other applicable laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data.
                </li>
                <li>
                  <strong>Correction:</strong> Request corrections to inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your data, subject to legal
                  retention requirements.
                </li>
                <li>
                  <strong>Restriction:</strong> Request restrictions on how we process your data.
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a structured, machine-readable
                  format.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt out of marketing communications or data sales (under
                  CCPA).
                </li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:hello@thesafarisutra.com"
                  className="text-[var(--color-orange)]"
                >
                  hello@thesafarisutra.com
                </a>
                . We will respond within 30 days, as required by law.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              7. Links to Other Websites
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Our website and app may contain links to third-party websites. Safari Sutra is not
                responsible for the privacy practices of these sites, which may differ significantly
                from ours. We encourage you to read their privacy policies before sharing personal
                information.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              8. Data Retention
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We retain personal information only as long as necessary to fulfill the purposes
                outlined in this policy or as required by law (e.g., up to 7 years for tax and
                accounting purposes). After this period, data is securely deleted or anonymized.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              9. Disclosure for Legal Reasons
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We may disclose your personal information if required by law, court order, or
                government authority, or if we believe disclosure is necessary to protect our
                rights, properties, or safety, or to prevent harm to others. In the event of a
                merger or acquisition of Safari Sutra, your information may be transferred to the
                acquiring entity, subject to equivalent privacy protections.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              10. Contact Us
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                For questions or concerns about this Privacy Policy or to exercise your data
                protection rights, please contact our Data Protection Officer:
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:hello@thesafarisutra.com"
                  className="text-[var(--color-orange)] hover:underline"
                >
                  hello@thesafarisutra.com
                </a>
              </p>
              <p>
                <strong>Address:</strong> Safari Sutra Holidays Private Limited, Work, Chromium,
                186/1 We, Jogeshwari - Vikhroli Link Rd, Vidya Milind Nagar, Raje Sambhaji Nagar,
                Marol, Powai, Mumbai, Maharashtra 400059
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+919860415774"
                  className="text-[var(--color-orange)] hover:underline"
                >
                  +91 9860415774
                </a>
                /{" "}
                <a
                  href="tel:+919967572970"
                  className="text-[var(--color-orange)] hover:underline"
                >
                  +91 9967572970
                </a>
              </p>
              <p>
                Please reference &quot;Privacy Policy&quot; in your email subject line. We will
                respond to all reasonable inquiries within seven working days. We look forward to
                serving your personalized vacation needs!
              </p>
            </div>
          </div>

          <div className="text-center mt-12 border-t pt-8">
            <p className="text-sm text-gray-500">
              Safari Sutra Holidays Private Limited © 2024 All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
