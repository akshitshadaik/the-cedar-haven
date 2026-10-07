import type { Metadata } from "next";
import { photos } from "@/data/site";
import { ContactForm } from "@/components/sections/Forms";
import { ContactInfo, Lines, PageHero } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Cedar Haven in Manali, Himachal Pradesh. Address, phone, email, reception and restaurant hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="We'd love to|*welcome* you" image={photos.valley}
        lead="Questions about rooms, treks or getting here? Reception is open around the clock and usually replies within a few hours." />

      <section className="section">
        <div className="container book-grid">
          <ContactInfo title="Find us" />
          <div className="card" data-fade>
            <h2 style={{ fontSize: "var(--fs-h3)" }}>Send us a note</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <h2 className="h2" data-lines><Lines text="Getting here" /></h2>
          <ul className="cols3" data-stagger>
            <li><h3>By air</h3><p>Bhuntar airport (Kullu) is 50 km away, about 90 minutes by road. We can arrange a pickup.</p></li>
            <li><h3>By road</h3><p>Overnight Volvo buses run from Delhi and Chandigarh. Ask for the Old Manali Road stop.</p></li>
            <li><h3>By rail</h3><p>The nearest major station is Chandigarh, then roughly 7 hours by taxi through the Kullu valley.</p></li>
          </ul>
        </div>
      </section>
    </>
  );
}
