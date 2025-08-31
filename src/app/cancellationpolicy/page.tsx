export const metadata = {
  title: "Cancellation Policy — Safari Sutra",
  description: "Safari Sutra cancellation & refund policy",
};

export default function CancellationPolicyPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>Cancellation Policy</h1>

        <p>
          We understand plans change. Please contact us as soon as possible if you
          need to cancel or modify your booking. Refunds and fees depend on the
          specific tour, provider policies, and timing of your request.
        </p>

        <h2>How cancellations are handled</h2>
        <ul>
          <li>More than 30 days before departure: Full refund minus any non-refundable fees.</li>
          <li>8–30 days before departure: Partial refund (varies by package).</li>
          <li>7 days or less: Generally non-refundable.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For cancellations or questions please email <a href="mailto:hello@safarisutra.com">hello@safarisutra.com</a> or call our office.
        </p>
      </div>
    </main>
  );
}