export const metadata = {
  title: "Privacy Policy — Safari Sutra",
  description: "Privacy policy for Safari Sutra",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>Privacy Policy</h1>

        <p>
          Safari Sutra is committed to protecting your privacy. This policy explains
          what personal information we collect, how we use it, and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Contact information you provide when enquiring or booking (name, email, phone).</li>
          <li>Booking details, preferences and travel-related information.</li>
          <li>Usage data from our website (cookies and analytics).</li>
        </ul>

        <h2>How we use your information</h2>
        <p>
          We use your information to process bookings, respond to enquiries, improve our
          services, and send you relevant updates where you&apos;ve consented.
        </p>

        <h2>Your choices</h2>
        <p>
          You can request access, correction or deletion of your personal data by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy requests or questions please email{" "}
          <a href="mailto:hello@safarisutra.com">hello@safarisutra.com</a>.
        </p>
      </div>
    </main>
  );
}