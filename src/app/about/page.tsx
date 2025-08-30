import Link from "next/link";

export const metadata = {
  title: "About — Safari Sutra",
  description: "About page to verify routing",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="mb-6">This is a basic About page to check App Router routing.</p>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link href="/b2b" className="text-blue-600 hover:underline">
          B2B
        </Link>
      </nav>
    </main>
  );
}