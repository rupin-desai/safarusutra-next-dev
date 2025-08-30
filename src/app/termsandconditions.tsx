import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Safari Sutra",
  description: "Terms and conditions for Safari Sutra Holidays",
};

export default function TermsAndConditions() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">This page holds the terms and conditions for Safari Sutra Holidays.</p>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <Link href="/PrivacyPolicy" className="text-blue-600 hover:underline">Privacy</Link>
        <Link href="/CancellationPolicy" className="text-blue-600 hover:underline">Cancellation</Link>
      </nav>
    </main>
  );
}