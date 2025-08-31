export const metadata = {
  title: "Terms & Conditions — Safari Sutra",
  description: "Terms and conditions for Safari Sutra services",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>Terms &amp; Conditions</h1>

        <p>
          These terms and conditions govern your use of Safari Sutra services. Please read them carefully.
        </p>

        <h2>Booking</h2>
        <p>Bookings are subject to availability and the specific supplier terms.</p>

        <h2>Payments &amp; Cancellations</h2>
        <p>
          Payment, cancellation and refund conditions vary by package and supplier. See the cancellation policy for details.
        </p>

        <h2>Liability</h2>
        <p>
          Safari Sutra acts as an agent for suppliers; liability is limited to the extent permitted by law.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms email{" "}
          <a href="mailto:hello@safarisutra.com">hello@safarisutra.com</a>.
        </p>
      </div>
    </main>
  );
}