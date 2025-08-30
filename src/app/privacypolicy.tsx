import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Safari Sutra",
  description: "Privacy policy for Safari Sutra Holidays",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">This page describes how we handle personal data.</p>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <Link href="/TermsAndConditions" className="text-blue-600 hover:underline">Terms</Link>
        <Link href="/CancellationPolicy" className="text-blue-600 hover:underline">Cancellation</Link>
      </nav>
    </main>
  );
}