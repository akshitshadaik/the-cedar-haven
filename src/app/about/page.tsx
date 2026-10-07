import type { Metadata } from "next";
import { photos } from "@/data/site";
import { AboutSection } from "@/components/sections/AboutSection";
import { Closing, Lines, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our hotel, owned and managed by Akshit Shadaik, where warm hospitality, comfort, and memorable experiences come together.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About us" title="A stay that feels|like home" image={photos.lakeLodge}
        lead="Owned and managed by Akshit Shadaik with a focus on personal hospitality, comfort, and memorable Himalayan experiences." />

      <AboutSection />

      <section className="section surface-alt">

        <div className="container">
          <h2 className="h2" data-lines><Lines text="What we care about" /></h2>
          <ul className="values plain" data-stagger style={{ marginTop: 40 }}>
            <li><h3>Comfort</h3><p>Warm rooms, good beds, hot water and heating that works on the coldest night.</p></li>
            <li><h3>Nature</h3><p>Deodar forest at the gate and the snow line in view from every floor.</p></li>
            <li><h3>Hospitality</h3><p>A small team that remembers your name and how you take your chai.</p></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eco">
            <div>
              <h2 className="h2" data-lines><Lines text="A lighter footprint|in the mountains" /></h2>
              <p className="lead" data-fade style={{ marginTop: 18, color: "var(--cedar-green-800)" }}>Manali is fragile. We try to leave it better than we found it.</p>
            </div>
            <ul className="eco-list" data-stagger>
              <li><h3>Local sourcing</h3><p>Vegetables, apples and dairy come from farms within the valley.</p></li>
              <li><h3>Lower waste</h3><p>Refillable glass bottles and no single-use plastic in rooms.</p></li>
              <li><h3>Responsible treks</h3><p>Groups of eight or fewer, and we carry every wrapper back down.</p></li>
              <li><h3>Community</h3><p>Our team, guides and weavers are from the villages nearby.</p></li>
            </ul>
          </div>
        </div>
      </section>

      <Closing image={photos.lake} title="Come and see it|for yourself"
        primary={{ href: "/rooms", label: "Explore Rooms" }} secondary={{ href: "/contact", label: "Plan Your Stay" }} />
    </>
  );
}
