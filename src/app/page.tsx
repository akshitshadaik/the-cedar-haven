import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Coffee, Flame, Footprints, MountainSnow } from "lucide-react";
import { photos } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperiencePan } from "@/components/sections/ExperiencePan";
import { DiningTabs } from "@/components/sections/DiningTabs";
import { Gallery } from "@/components/sections/Gallery";
import { AvailabilityBar, Closing, Lines, RoomsEditorial } from "@/components/sections/shared";

export default function Home() {
  return (
    <>
      <Hero />
      <AvailabilityBar />

      {/* Welcome: what the place actually is, in specifics */}
      <section className="section" aria-labelledby="welcome-title">
        <div className="container welcome">
          <div>
            <h2 className="h2" id="welcome-title" data-lines><Lines text="A small hotel|above the *Beas valley*" /></h2>
            <p className="lead" data-fade>Twelve rooms on Old Manali Road, a ten-minute walk from the Manu Temple. Every balcony faces the Pir Panjal range, and the kitchen cooks the way Kullu homes do.</p>
            <ul className="facts" data-stagger>
              <li><MountainSnow /><span><b>Snow line from bed</b>All rooms face north-east</span></li>
              <li><Coffee /><span><b>Breakfast till 10:30</b>Siddu and kahwa on Sundays</span></li>
              <li><Footprints /><span><b>Trails from the gate</b>Jogini Falls is 2 km away</span></li>
              <li><Flame /><span><b>Wood-fired heat</b>Bukhari stoves, October to March</span></li>
            </ul>
          </div>
          <div className="welcome-photo">
            <div className="media" data-clip>
              <div className="px" data-parallax="4"><Image src={photos.welcome.src} alt={photos.welcome.alt} fill sizes="(min-width: 768px) 46vw, 100vw" /></div>
            </div>
            <p className="note hand" aria-label="Slow. Stay. Belong." data-fade><span>Slow.</span><span>Stay.</span><span>Belong.</span></p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />


      {/* Rooms */}
      <section className="section" aria-labelledby="rooms-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="rooms-title" data-lines><Lines text="Three ways|to wake up here" /></h2>
              <p className="lead" data-fade>Breakfast, Wi-Fi and mountain views are included with every room.</p>
            </div>
            <Link href="/rooms" className="textlink" data-fade>Compare rooms <ArrowRight /></Link>
          </div>
          <RoomsEditorial />
        </div>
      </section>

      {/* Dining */}
      <section className="section surface-alt dining" aria-labelledby="dining-title">
        <div className="container dining-grid">
          <div className="collage">
            <div className="media c1" data-clip><div className="px" data-parallax="4"><Image src={photos.thali.src} alt={photos.thali.alt} fill sizes="(min-width: 768px) 40vw, 80vw" /></div></div>
            <div className="media c2" data-clip><Image src={photos.curry.src} alt={photos.curry.alt} fill sizes="(min-width: 768px) 22vw, 44vw" /></div>
            <div className="media c3" data-clip><Image src={photos.samosa.src} alt={photos.samosa.alt} fill sizes="(min-width: 768px) 20vw, 40vw" /></div>
          </div>
          <div>
            <h2 className="h2" id="dining-title" data-lines><Lines text="The Cedar Table" /></h2>
            <p className="sub" data-fade>Taste the Himalayas</p>
            <p className="lead" data-fade>Rajma from Kinnaur, apples from Kullu orchards and trout from cold mountain streams, cooked slowly and served by the fire.</p>
            <div data-fade><DiningTabs /></div>
            <div className="actions" data-fade style={{ alignItems: "center", gap: 28 }}>
              <p className="hours" style={{ margin: 0 }}><Clock /> Open daily, 7:00 AM to 10:30 PM</p>
              <Link href="/dining" className="textlink">See the full menu <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <ExperiencePan />

      {/* Gallery preview */}
      <section className="section surface" aria-labelledby="gallery-title">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2" id="gallery-title" data-lines><Lines text="Moments at The Cedar Haven" /></h2>
            <Link href="/gallery" className="textlink" data-fade>Open the gallery <ArrowRight /></Link>
          </div>
          <Gallery limit={6} filters={false} />
        </div>
      </section>

      <Closing image={photos.stars} title="Come for the *quiet*.|Stay for the stars."
        lead="Clear nights from October to March. We'll leave a blanket on the deck."
        primary={{ href: "/booking", label: "Book Your Stay" }} secondary={{ href: "/rooms", label: "Explore Rooms" }} />
    </>
  );
}
