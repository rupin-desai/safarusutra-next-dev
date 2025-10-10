import SectionTitle from "@/components/UI/SectionTitle";
import { Camera } from "lucide-react";

export default function DubaiExperienceTips() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <SectionTitle
          icon={<Camera size={16} />}
          pillText="Visitor Info"
          title="Safari Tips & Information"
          color="var(--color-medium-brown)"
          centered
        />

        <div className="mt-8 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-dark-teal)] mb-3">
                Best Time to Visit
              </h3>
              <p className="text-gray-700">
                The park is open from 9:00 AM to 5:00 PM daily. We recommend
                visiting during weekdays to avoid crowds. Early mornings and
                late afternoons offer the best wildlife viewing as animals are
                most active during cooler hours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-dark-teal)] mb-3">
                What to Bring
              </h3>
              <p className="text-gray-700">
                Comfortable walking shoes, sun protection (hat, sunglasses,
                sunscreen), water bottle, camera, and light clothing
                appropriate for the season. The park has water stations
                throughout for refilling bottles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-dark-teal)] mb-3">
                Special Experiences
              </h3>
              <p className="text-gray-700">
                Safari Sutra clients receive access to special experiences
                including VIP animal encounters and behind-the-scenes tours.
                These must be booked in advance through our concierge service.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-dark-teal)] mb-3">
                Photography Tips
              </h3>
              <p className="text-gray-700">
                Bring a zoom lens for wildlife photography. The best light for
                photography is during the &quot;golden hours&quot; shortly after opening
                and before closing. Tripods are permitted in designated areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}