import type { Metadata } from "next";
import Image from "next/image";
import { photos, signatureDishes } from "@/data/site";
import { DiningTabs } from "@/components/sections/DiningTabs";
import { Closing, Lines, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Dining",
  description: "The Cedar Table serves Himachali specialties, hearty breakfasts and continental dishes made with produce from the Kullu valley.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return (
    <>
      <PageHero kicker="The Cedar Table" title="Taste the|*Himalayas*" image={photos.thali}
        lead="Seasonal produce, slow-cooked Himachali recipes and a fireplace that makes dinner last a little longer." />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <h2 className="h2" data-lines><Lines text="The menu" /></h2>
            <p className="lead" data-fade>Breakfast is included with every stay. Lunch and dinner are served in the dining room, or by the fire on cold evenings. Tell us about allergies at check-in and the kitchen will plan around them.</p>
          </div>
          <div data-fade><DiningTabs /></div>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <h2 className="h2" data-lines style={{ marginBottom: 40 }}><Lines text="From our kitchen" /></h2>
          <div className="dish-grid" data-stagger>
            {signatureDishes.map((d, i) => (
              <article className="dish" key={d.name}>
                <div className="media"><Image src={d.src} alt={d.alt} fill sizes={i === 0 ? "(min-width: 1024px) 520px, 100vw" : "(min-width: 1024px) 360px, 50vw"} /></div>
                <h3>{d.name}</h3>
                <p>{d.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2" data-lines><Lines text="Food from|this valley" /></h2>
            <p className="lead" data-fade>Rajma from Kinnaur, apples from Kullu orchards, trout from cold mountain streams and ghee from a dairy two villages away. Our cooks grew up on these recipes and still make siddu the way their grandmothers did.</p>
          </div>
          <div className="media wide" data-clip>
            <div className="px" data-parallax="4"><Image src={photos.valley.src} alt={photos.valley.alt} fill sizes="(min-width: 768px) 50vw, 100vw" /></div>
          </div>
        </div>
        <div className="container">
          <div className="hours-card" data-stagger>
            <div><b>Breakfast</b>7:00 AM to 10:30 AM</div>
            <div><b>Lunch</b>12:30 PM to 3:00 PM</div>
            <div><b>Dinner</b>7:00 PM to 10:30 PM</div>
          </div>
        </div>
      </section>

      <Closing image={photos.fire} title="Dinner is at seven.|The fire is already lit."
        lead="Not staying with us? Call ahead and we'll keep a table."
        primary={{ href: "/contact", label: "Reserve a Table" }} secondary={{ href: "/rooms", label: "Explore Rooms" }} />
    </>
  );
}
