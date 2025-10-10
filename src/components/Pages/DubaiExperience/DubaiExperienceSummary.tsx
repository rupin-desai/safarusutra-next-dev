import SectionTitle from "@/components/UI/SectionTitle";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";
import { TreePalm } from "lucide-react";

export default function DubaiExperienceSummary() {
  return (
    <section className="py-10 md:py-16 px-4 md:px-16 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Section */}
          <div className="w-full mt-8 lg:mt-0 flex flex-col items-center justify-center text-center">
            <SectionTitle
              icon={<TreePalm size={16} />}
              pillText="Our Partner"
              title="Dubai Safari Park Experience"
              color="#066959"
            />

            <div className="prose prose-lg mt-6 text-gray-700 max-w-xl mx-auto lg:mx-0 text-center">
              <p>
                Discover a world where adventure meets nature at Dubai Safari
                Park. Enjoy immersive wildlife encounters, vibrant
                entertainment, unique dining, and lifestyle experiences—all in
                one unforgettable destination. Explore diverse zones, meet
                fascinating animals, and reconnect with nature on every visit.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 flex-wrap justify-center items-center">
              <Link
                href="https://dubaisafari.ae/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SSButton variant="primary" color="var(--color-orange)">
                  Visit Official Website
                </SSButton>
              </Link>
              <Link href="/contact">
                <SSButton variant="outline" color="var(--color-dark-teal)">
                  Book Now
                </SSButton>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-full">
              <picture>
                <source
                  srcSet="/images/dubai-safari/dubai-safari-intro-480.webp 480w, /images/dubai-safari/dubai-safari-intro-720.webp 720w, /images/dubai-safari/dubai-safari-intro-1080.webp 1080w"
                  type="image/webp"
                />
                <img
                  src="/images/dubai-safari/dubai-safari-intro-1080.webp"
                  alt="Visitors enjoying Dubai Safari Park experience"
                  className="w-full h-auto object-cover rounded-xl"
                  title="Discover the wonders of Dubai Safari Park with Safari Sutra"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
