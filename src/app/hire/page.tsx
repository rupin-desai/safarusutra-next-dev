import Link from "next/link";

export const metadata = {
  title: "Hire — Safari Sutra",
  description: "Hire page for Safari Sutra Holidays",
};

export default function HirePage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Hire</h1>
      <p className="mb-4">
        For vehicle hire, private guides and customised itineraries please contact us.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Quick contact</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li>Phone: +91 99675 72970</li>
          <li>Email: <a href="mailto:info@thesafarisutra.com" className="text-blue-600 hover:underline">info@thesafarisutra.com</a></li>
        </ul>
      </section>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
      </nav>
    </main>
  );
}