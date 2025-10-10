import SectionTitle from "@/components/UI/SectionTitle";
import { Video } from "lucide-react";

export default function DubaiExperienceVideos() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <SectionTitle
          icon={<Video size={16} />}
          pillText="Visual Tour"
          title="Experience Dubai Safari"
          color="var(--color-orange)"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
              title="Dubai Safari Park Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold text-[var(--color-dark-brown)]">
                Dubai Safari Park Tour
              </h3>
              <p className="text-sm text-gray-600">
                Take a complete tour of Dubai Safari Park&#39;s main attractions
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
              title="Wildlife Encounters at Dubai Safari"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold text-[var(--color-dark-brown)]">
                Wildlife Encounters
              </h3>
              <p className="text-sm text-gray-600">
                Up-close experiences with Dubai Safari&#39;s most fascinating animals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}