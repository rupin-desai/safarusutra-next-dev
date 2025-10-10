import SectionTitle from "@/components/UI/SectionTitle";
import { Compass, MapPin } from "lucide-react";

const attractions = ["Facilities of the Park", "Map & Navigation"];

export default function DubaiExperienceAttractions() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <SectionTitle
          icon={<Compass size={16} />}
          pillText="Explore More"
          title="Additional Attractions"
          color="var(--color-dark-teal)"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[var(--color-yellow-orange)] transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold text-[var(--color-dark-brown)] flex items-center">
                <MapPin
                  size={18}
                  className="mr-2 text-[var(--color-yellow-orange)]"
                />
                {attraction}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
