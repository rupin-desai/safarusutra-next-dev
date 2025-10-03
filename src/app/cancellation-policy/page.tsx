import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Common/Navbar";

export const metadata: Metadata = {
  title: "Cancellation Policy | Safari Sutra Tours & Travels in India",
  description:
    "Read Safari Sutra's cancellation, refund, and modification policies for your travel bookings. Know your rights and responsibilities.",
  openGraph: {
    title: "Cancellation Policy | Safari Sutra", // og:title
    type: "website", // og:type
    url: "https://thesafarisutra.com/cancellation-policy", // og:url
    description:
      "Read Safari Sutra's cancellation, refund, and modification policies for your travel bookings. Know your rights and responsibilities.", // og:description
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png", // og:image
        alt: "Safari Sutra Cancellation Policy", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/cancellation-policy",
  },
};

export default function CancellationPolicy(): React.ReactElement {
  return (
    <div>
      <Navbar isLegalPage={true} />

      <div className="pt-24 md:pt-28" />

      <section
        className="py-12 px-4 md:py-16 md:px-16 bg-white"
        style={{ willChange: "opacity" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Simple section title */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-family-oswald text-[var(--color-dark-teal)] mb-2">
              Cancellation Policy
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

          {/* Section 2 - HIGHLIGHTED SECTION */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              2. General Terms of Cancellation, Refunds, and Modifications
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We understand that travel plans may change. Safari Sutra
                enforces a strict cancellation policy to ensure operational
                efficiency, effective for all bookings made on or after May 21,
                2025. All bookings are subject to the following general
                cancellation terms and the specific conditions of third-party
                providers:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Cancellation Requests:
                  </strong>{" "}
                  Cancellations must be submitted in writing to{" "}
                  <a
                    href="mailto:hello@thesafarisutra.com"
                    className="text-[var(--color-orange)]"
                  >
                    hello@thesafarisutra.com
                  </a>
                  . A cancellation is effective only upon our written
                  confirmation of receipt. No cancellation option is available
                  directly on our website or app; contact our support team for
                  assistance.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Cancellation Fees:
                  </strong>{" "}
                  Most bookings require a non-refundable deposit (typically
                  10–50% of the booking cost). Additional cancellation fees may
                  apply, ranging from 25% to 100% of the booking cost, depending
                  on the service, provider terms, and timing of cancellation.
                  Exact fees will be communicated at booking.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Non-Refundable Bookings:
                  </strong>{" "}
                  Flights, hotels, or packages marked as
                  &quot;Non-Refundable&quot; on the final travel vouchers or
                  itinerary are not eligible for refunds, resulting in a zero
                  refund if canceled.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Refundable Bookings:
                  </strong>{" "}
                  For services marked as &quot;Refundable&quot; on the final
                  travel vouchers or itinerary, refunds will be processed as per
                  the specific cancellation policy outlined in the booking
                  confirmation and itinerary. Refunds may vary due to
                  international exchange rates, supplier policies, and payments
                  received to date. Eligible refunds will be processed within 90
                  working days from the date of cancellation or when the
                  supplier processes the refund, whichever is later. For on-trip
                  cancellations, refunds will be processed within 90 working
                  days from the date of your return or when the supplier
                  processes the refund, whichever is later.
                  <br />
                  <span className="block mt-2 text-[var(--color-dark-teal)] font-medium">
                    If refund is approved, your refund will be processed and a
                    credit will automatically be applied to your original method
                    of payment within 7-10 business days.
                  </span>
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Modifications:
                  </strong>{" "}
                  Changes to bookings (e.g., dates, destinations, traveler
                  names) are subject to availability, third-party provider
                  conditions, and may incur additional fees or fare differences.
                  Hotel changes made on-trip (e.g., canceling a booked hotel and
                  booking a new one) incur a 100% cancellation fee for the
                  original booking.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    No-Show Policy:
                  </strong>{" "}
                  Failure to check in or utilize booked services without prior
                  cancellation results in forfeiture of the full booking amount,
                  with no eligibility for refunds.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Third-Party Cancellations:
                  </strong>{" "}
                  For flight cancellations due to airline actions (e.g.,
                  grounded, canceled, or delayed flights), customers must
                  contact the respective airline directly. Safari Sutra is not
                  liable for such cancellations, and refunds are subject to the
                  airline&apos;s processing timelines and policies. Similarly,
                  for hotel cancellations, refunds are subject to the
                  hotel&apos;s terms as outlined in the itinerary.
                </li>
                <li>
                  <strong className="text-[var(--color-orange)]">
                    Additional Costs:
                  </strong>{" "}
                  Additional costs due to breached baggage limits, failure to
                  complete mandatory web check-in (e.g., for low-cost carriers
                  like Ryanair), or on-trip upgrades (e.g., hotel room upgrades
                  or additional amenities) are your responsibility and not
                  refundable by Safari Sutra.
                </li>
              </ul>
              <p className="mt-4">
                We strongly recommend purchasing travel insurance to cover
                cancellations, modifications, or disruptions beyond our control.
                You acknowledge that third-party provider conditions may impose
                stricter cancellation or modification policies, which take
                precedence over Safari Sutra&apos;s terms where applicable. For
                queries or clarifications, contact{" "}
                <a
                  href="mailto:hello@thesafarisutra.com"
                  className="text-[var(--color-orange)]"
                >
                  hello@thesafarisutra.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Section 3 */}
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
                  third-party providers, including hotel staff behavior,
                  cleanliness, or quality of accommodation.
                </li>
                <li>
                  Failure to board due to invalid or expired passports, damaged
                  travel documents, or non-compliance with destination
                  requirements (e.g., visa or health regulations).
                </li>
              </ul>
              <p>
                Use of third-party services is at your sole risk, and you agree
                to review and comply with their terms and conditions. If Safari
                Sutra is informed in advance of third-party booking issues
                (e.g., cancellations due to operational reasons), we will make
                reasonable efforts to provide alternatives or refund the booking
                amount after deducting applicable service charges, if supported
                by the provider. You must contact the provider directly for
                further resolutions. Safari Sutra disclaims any implied
                warranties beyond the jurisdiction of Chennai, India.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              4. User Responsibilities
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Ensuring your passport has at least 1-year validity and is in
                  good condition, along with securing valid visas and health
                  certificates as required by your destination.
                </li>
                <li>
                  Complying with all applicable travel regulations, including
                  immigration, customs, and health requirements.
                </li>
                <li>
                  Completing mandatory web check-in for certain airlines (e.g.,
                  low-cost carriers) and adhering to baggage limitations as
                  outlined in the final travel vouchers.
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

          {/* Section 5 */}
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

          {/* Section 6 */}
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

          {/* Section 7 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              7. Marketing and Communications
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                By using our services, you authorize Safari Sutra to contact you
                with booking confirmations, itinerary information, cancellation
                updates, payment confirmations, refund statuses, or promotional
                offers via email, phone, SMS, or other mediums, in compliance
                with the Telecom Regulation Authority of India (TRAI)
                guidelines. These communications are transactional and
                authorized by you. To opt out of promotional communications,
                email{" "}
                <a
                  href="mailto:hello@thesafarisutra.com"
                  className="text-[var(--color-orange)]"
                >
                  hello@thesafarisutra.com
                </a>{" "}
                or adjust your preferences with our service providers. Our
                communications comply with our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Sections 8-13 */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              8. Dispute Resolution
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                These Terms and any disputes arising from our services are
                governed by the laws of Tamil Nadu, India. You agree to resolve
                disputes through binding arbitration in Chennai, India,
                conducted under the rules of the Indian Arbitration and
                Conciliation Act, 1996. You waive the right to participate in
                class action lawsuits against Safari Sutra. Safari Sutra
                considers itself subject only to the jurisdiction of the courts
                of Chennai, India.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              9. Compliance with Travel Regulations
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Our services comply with international travel regulations,
                including those set by the International Air Transport
                Association (IATA) and local authorities. You agree to comply
                with all applicable laws and regulations at your travel
                destination, including visa, health, and customs requirements.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              10. Force Majeure
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Safari Sutra is not liable for failure to perform our
                obligations due to events beyond our control, including but not
                limited to natural disasters, pandemics, government
                restrictions, strikes, or third-party service disruptions.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              11. Termination of Services
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                Safari Sutra reserves the right to terminate access to our
                website, mobile applications, or services at any time, without
                notice, for reasons including but not limited to maintenance,
                violation of these Terms, or at our sole discretion.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              12. Changes to These Terms
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              <p>
                We may update these Terms to reflect changes in our practices,
                third-party provider conditions, or legal requirements. We will
                notify you of significant changes via email or a notice on our
                website. Continued use of our services after such changes
                constitutes acceptance of the updated Terms. You are responsible
                for regularly reviewing these Terms.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-family-oswald text-[var(--color-dark-teal)] mb-4">
              13. Contact Us
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                For questions or concerns about these Terms, please contact us
                at:
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
                <strong>Address:</strong> Safari Sutra Holidays Private Limited,
                Work, Chromium, 186/1 We, Jogeshwari - Vikhroli Link Rd, Vidya
                Milind Nagar, Raje Sambhaji Nagar, Marol, Powai, Mumbai,
                Maharashtra 400059
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
