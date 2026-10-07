import type { Metadata } from "next";
import { photos } from "@/data/site";
import { Gallery } from "@/components/sections/Gallery";
import { Closing, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of The Cedar Haven: the lodge, rooms, Himachali food, experiences and the mountains around Manali.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Moments at|The Cedar Haven" lead="The lodge, the rooms, the food and the valley around us. Tap any photo to see it larger." />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container"><Gallery /></div>
      </section>
      <Closing image={photos.roomLamp} title="Like what you see?|The rooms look better in person."
        primary={{ href: "/rooms", label: "See the Rooms" }} secondary={{ href: "/booking", label: "Book Your Stay" }} />
    </>
  );
}
