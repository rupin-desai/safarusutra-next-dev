import SectionTitle from "@/components/UI/SectionTitle";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";
import { TreePalm } from "lucide-react";

export default function DubaiExperienceSummary() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              icon={<TreePalm size={16} />}
              pillText="Our Partner"
              title="Dubai Safari Park Experience"
              color="#066959"
            />

            <div className="prose prose-lg mt-6 text-gray-700">
              <p>
                Safari Sutra proudly partners with Dubai Safari Park to bring
                you an unparalleled wildlife experience in the heart of the
                UAE. Spanning over 119 hectares, this world-class facility
                houses more than 3,000 animals across 78 species, creating a
                remarkable ecosystem where desert meets savanna.
              </p>
              <p>
                Our exclusive partnership allows Safari Sutra travelers
                special access to unique experiences, guided tours, and
                behind-the-scenes encounters that aren&#39;t available to
                regular visitors. From the African Village to the Arabian
                Desert Safari, immerse yourself in global wildlife habitats
                meticulously recreated in Dubai&#39;s innovative conservation
                park.
              </p>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
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

          <div className="rounded-xl overflow-hidden shadow-lg">
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
    </section>
  );
}