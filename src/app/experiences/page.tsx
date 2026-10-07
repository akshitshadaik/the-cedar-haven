import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Footprints, MountainSnow, Users } from "lucide-react";
import { experiences, photos } from "@/data/site";
import { Closing, Lines, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Guided treks, bonfire evenings, sunrise walks, yoga, village walks and sightseeing around Manali.",
  alternates: { canonical: "/experiences" },
};

const seasons = [
  { name: "Spring", months: "March to May", text: "Apple blossom, mild days and the first high trails opening up." },
  { name: "Summer", months: "June", text: "Long green days, river walks and cool evenings by the fire. Our busiest month." },
  { name: "Monsoon", months: "July to September", text: "Misty forests and quiet reading days. Treks depend on the weather, so we plan day by day." },
  { name: "Winter", months: "October to February", text: "Clear skies, crisp mornings and snow on the peaks, sometimes right at the door." },
];

export default function ExperiencesPage() {
  return (
    <>
      <PageHero kicker="Experiences" title="More than|just a stay" image={photos.snowTrek}
        lead="Days planned around the weather, the season and how slow you want to go. Every outing is led by someone from the valley." />

      <section className="section">
        <div className="container">
          <div className="xp-grid" data-stagger>
            {experiences.map((x, i) => (
              <article className="xp-tile" key={x.title}>
                <div className="media"><Image src={x.src} alt={x.alt} fill sizes={i % 4 === 0 ? "(min-width: 1024px) 840px, 100vw" : "(min-width: 1024px) 410px, (min-width: 480px) 50vw, 100vw"} /></div>
                <h3>{x.title}</h3>
                <p className="meta">{x.meta}</p>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="container split">
          <div className="media tall" data-clip>
            <div className="px" data-parallax="5"><Image src={experiences[0].src} alt={experiences[0].alt} fill sizes="(min-width: 768px) 50vw, 100vw" /></div>
          </div>
          <div>
            <h2 className="h2" data-lines><Lines text="A day on the|*Jogini Falls* trail" /></h2>
            <p className="lead" data-fade>Leave after breakfast, walk through Vashisht village and apple orchards, then climb through pine forest to the falls. Lunch is packed by our kitchen and the walk back is all downhill.</p>
            <ul className="detail-list" data-stagger>
              <li><Clock />About 5 hours, with stops</li>
              <li><Footprints />Easy to moderate</li>
              <li><Users />Up to 8 guests per group</li>
              <li><MountainSnow />Best from March to November</li>
            </ul>
            <div className="actions" data-fade>
              <Link href="/contact" className="textlink">Ask our team about it <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2" data-lines><Lines text="Manali through the seasons" /></h2>
          <ul className="rows" data-stagger>
            {seasons.map((s) => (
              <li key={s.name}><h3>{s.name}</h3><small>{s.months}</small><p>{s.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <Closing image={photos.tent} title="Tell us your pace.|We'll plan the days."
        lead="Send your dates and how active you'd like to be. We'll reply with a suggested plan."
        primary={{ href: "/contact", label: "Plan My Days" }} secondary={{ href: "/booking", label: "Book Your Stay" }} />
    </>
  );
}
