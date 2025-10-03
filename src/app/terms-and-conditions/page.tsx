import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Common/Navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | Safari Sutra Tours & Travels in India",
  description:
    "Read Safari Sutra's Terms & Conditions covering bookings, cancellations, liabilities, and user responsibilities for travel services and website use.",
  keywords: [
    "terms and conditions",
    "booking terms",
    "cancellation policy",
    "safari sutra terms",
    "travel terms",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Terms & Conditions | Safari Sutra", // og:title
    type: "website", // og:type
    description:
      "Read Safari Sutra's Terms & Conditions covering bookings, cancellations, liabilities, and user responsibilities for travel services and website use.", // og:description
    url: "https://thesafarisutra.com/terms-and-conditions", // og:url
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png", // og:image
        alt: "Safari Sutra Terms & Conditions", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/terms-and-conditions",
  },
};

export default function TermsAndConditions(): React.ReactElement {
  return (
    <div>
      <Navbar isLegalPage={true} />

      <div className="pt-24 md:pt-28"></div>

      <section className="py-12 px-4 md:py-16 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Simple section title */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-family-oswald text-[var(--color-dark-teal)] mb-2">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500">Last Updated: May 21, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-justify mb-10">
            <p>
              Welcome to Safari Sutra Holidays Private Limited (&quot;Safari
              Sutra,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              These Terms and Conditions (&quot;Terms&quot;) govern your use of
              our website, mobile applications, and all travel-related services,
              including but not limited to bookings for flights, hotels, holiday
              packages, and other travel arrangements. By accessing or using our
              services, you agree to be bound by these Terms and the specific
              conditions of third-party providers (e.g., airlines, hotels, tour
              operators). If you do not agree with these Terms, please do not
              use our services. These Terms do not constitute a partnership or
              agency relationship between you and Safari Sutra, and no party has
              authority to bind the other in any way.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              1. Booking Process and Payment Obligations
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                All bookings are subject to availability, confirmation by Safari
                Sutra, and the terms and conditions of third-party providers.
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Provide accurate, complete, and up-to-date information,
                  including full names, passport details, contact information,
                  and travel preferences, as required during booking.
                </li>
                <li>
                  Pay all applicable fees, taxes, surcharges, and charges in
                  full at the time of booking or as specified. Payments are
                  non-transferable and must be made in the currency indicated.
                </li>
                <li>
                  Use only accepted payment methods, processed through PCI
                  DSS-compliant third-party payment gateways to ensure secure
                  transactions.
                </li>
              </ul>
              <p>
                Safari Sutra acts as a booking agent for third-party providers
                and is not responsible for the fulfillment of services by these
                providers. All bookings are subject to the specific terms and
                conditions of third-party providers, which may impose additional
                restrictions or fees. We reserve the right to reject any booking
                at our sole discretion.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              2. General Terms of Cancellation, Refunds, and Modifications
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Safari Sutra enforces strict cancellation, refund, and
                modification policies to ensure operational efficiency. All
                bookings are subject to the following general terms and the
                specific conditions of third-party providers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cancellation Requests:</strong> Cancellations must be
                  submitted in writing to{" "}
                  <a
                    href="mailto:hello@thesafarisutra.com"
                    className="text-[var(--color-orange)]"
                  >
                    hello@thesafarisutra.com
                  </a>
                  . A cancellation is effective only upon our written
                  confirmation of receipt.
                </li>
                <li>
                  <strong>Cancellation Fees:</strong> Most bookings require a
                  non-refundable deposit (typically 10–50% of the booking cost).
                  Additional cancellation fees may apply, ranging from 25% to
                  100% of the booking cost, depending on the service, provider
                  terms, and timing of cancellation. Exact fees will be
                  communicated at booking.
                </li>
                <li>
                  <strong>Non-Refundable Bookings:</strong> Promotional fares,
                  special offers, or certain holiday packages are non-refundable
                  and non-modifiable, as indicated during booking.
                </li>
                <li>
                  <strong>Refunds:</strong> Eligible refunds, if any, will be
                  processed within 30 days, less any non-refundable deposits or
                  fees imposed by Safari Sutra or third-party providers. Refunds
                  are subject to third-party provider policies, which may
                  prohibit refunds.
                </li>
                <li>
                  <strong>Modifications:</strong> Changes to bookings (e.g.,
                  dates, destinations, traveler names) are subject to
                  availability, third-party conditions, and may incur additional
                  fees or fare differences.
                </li>
                <li>
                  <strong>No-Show Policy:</strong> Failure to check in or
                  utilize booked services without prior cancellation results in
                  forfeiture of the full booking amount, with no eligibility for
                  refunds.
                </li>
              </ul>
              <p>
                We strongly recommend purchasing travel insurance to cover
                cancellations, modifications, or disruptions beyond our control.
                You acknowledge that third-party provider conditions may impose
                stricter cancellation or modification policies, which take
                precedence over Safari Sutra&#39;s terms where applicable.
              </p>
            </div>
          </div>

          {/* Sections 3-13 follow the same pattern */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              3. Third-Party Services and Liability
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Safari Sutra acts solely as a booking agent for third-party
                service providers (e.g., airlines, hotels, tour operators, car
                rental companies). All bookings are subject to the terms and
                conditions of these providers, which may include additional
                fees, restrictions, or cancellation policies. Safari Sutra is
                not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Delays, cancellations, overbookings, or disruptions caused by
                  third-party providers.
                </li>
                <li>
                  Loss, injury, damage, or inconvenience resulting from
                  third-party services or unforeseen events, including natural
                  disasters, political unrest, pandemics, or weather conditions.
                </li>
                <li>
                  Changes to itineraries, schedules, or services imposed by
                  third-party providers.
                </li>
              </ul>
              <p>
                Use of third-party services is at your sole risk, and you agree
                to review and comply with their terms and conditions. Safari
                Sutra disclaims any implied warranties beyond the jurisdiction
                of Mumbai, India.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              4. User Responsibilities
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Providing accurate and valid travel documentation, including
                  passports, visas, and health certificates, as required by your
                  destination.
                </li>
                <li>
                  Complying with all applicable travel regulations, including
                  immigration, customs, and health requirements.
                </li>
                <li>
                  Ensuring adequate travel insurance to cover cancellations,
                  medical emergencies, or other incidents.
                </li>
                <li>
                  Adhering to the policies and conduct requirements of
                  third-party providers during travel.
                </li>
              </ul>
              <p>
                Failure to meet these responsibilities may result in denied
                boarding, additional costs, or cancellation of services, for
                which Safari Sutra is not liable.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              5. Intellectual Property
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                All content on our website, including text, images, logos,
                graphics, and branding, is the property of Safari Sutra Holidays
                Private Limited or its licensors and is protected by
                intellectual property laws. You may not reproduce, distribute,
                or use any content without prior written consent, except for
                personal, non-commercial use related to your bookings.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              6. Prohibited Conduct
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Make fraudulent bookings or provide false or misleading
                  information.
                </li>
                <li>
                  Use our website or services for unlawful purposes or to harm
                  others.
                </li>
                <li>
                  Attempt to access, modify, or disrupt our systems, including
                  through hacking, malware, or unauthorized access.
                </li>
                <li>
                  Engage in any activity that interferes with the operation of
                  our website, mobile applications, or services.
                </li>
              </ul>
              <p>
                Violation of these terms may result in immediate termination of
                your access to our services, forfeiture of bookings, and
                potential legal action.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 border-t pt-8">
            <p className="text-sm text-gray-500">
              Safari Sutra Holidays Private Limited © 2025 All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
