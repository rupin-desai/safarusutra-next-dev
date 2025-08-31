import ContactSection from "@/components/Pages/ContactPage/ContactSection";

export const metadata = {
  title: "Contact — Safari Sutra",
  description: "Get in touch with Safari Sutra for bookings and enquiries",
};

export default function ContactPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <ContactSection />
      </div>
    </main>
  );
}