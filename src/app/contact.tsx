import Link from "next/link";

export const metadata = {
  title: "Contact — Safari Sutra",
  description: "Contact page for Safari Sutra Holidays",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-4">Contact details and enquiry form placeholder.</p>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <Link href="/hire" className="text-blue-600 hover:underline">Hire</Link>
      </nav>
    </main>
  );
}