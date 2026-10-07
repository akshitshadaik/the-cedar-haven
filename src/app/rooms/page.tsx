import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, Check, Coffee, MountainSnow, Wifi } from "lucide-react";
import { inr, photos, rooms } from "@/data/site";
import { AvailabilityBar, Lines, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Deluxe Mountain View Room ₹5,500, Premium Valley Suite ₹8,000 and Cedar Family Room ₹10,000 per night, breakfast included, in Manali.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero kicker="Rooms" title="Comfort designed|around mountain living" image={photos.welcome}
        lead="Three kinds of rooms, all with cedar interiors, wood-fired heat and a view worth waking up for. Breakfast is always included." />

      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="container">
          {rooms.map((r, i) => (
            <article key={r.id} className={`room-row${i % 2 ? " flip" : ""}`} aria-labelledby={`r-${r.id}`}>
              <div className="media" data-clip>
                <div className="px" data-parallax="3"><Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 55vw, 100vw" /></div>
              </div>
              <div>
                <h2 id={`r-${r.id}`} data-lines><Lines text={r.name} /></h2>
                <p className="price" data-fade style={{ fontSize: "1.4rem", marginTop: 14 }}>{inr(r.price)} <small>/ night</small></p>
                <p className="meta" data-fade><span>{r.size}</span><span>{r.guests}</span></p>
                <p className="lead" data-fade style={{ marginTop: 16 }}>{r.long}</p>
                <ul className="amenities" data-stagger>
                  {r.amenities.map((a) => <li key={a}><Check />{a}</li>)}
                </ul>
                <div className="actions" data-fade>
                  <Link href={`/booking?room=${r.id}`} className="btn btn-primary">Book this room <ArrowRight /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section surface-alt" style={{ paddingBlock: "64px 96px" }}>
        <div className="container">
          <h2 className="h2" data-lines><Lines text="Every stay includes" /></h2>
          <ul className="strip" data-stagger>
            <li><Wifi />Free Wi-Fi</li>
            <li><Coffee />Breakfast, 7:00 to 10:30</li>
            <li><BellRing />Room service till 10 PM</li>
            <li><MountainSnow />Mountain or valley view</li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <AvailabilityBar />
      </section>
    </>
  );
}
