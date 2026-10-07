import Image from "next/image";
import { ShieldCheck, HeartHandshake } from "lucide-react";
import { photos } from "@/data/site";
import { Lines } from "@/components/sections/shared";

export function AboutSection({ isSurfaceAlt = false }: { isSurfaceAlt?: boolean }) {
  return (
    <section className={`section ${isSurfaceAlt ? "surface-alt" : "surface"} about-section`} aria-labelledby="about-title">
      <div className="container split">
        {/* Visual Column: Hotel Photo with Owner Badge */}
        <div className="about-media-col">
          <div className="media tall" data-clip>
            <div className="px" data-parallax="5">
              <Image
                src={photos.cabin.src}
                alt={photos.cabin.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
          {/* Owner Hospitality Badge */}
          <div className="owner-badge" data-fade>
            <div className="owner-badge-icon">
              <ShieldCheck className="ico" />
            </div>
            <div>
              <p className="owner-badge-title">Owned & Managed By</p>
              <h4 className="owner-badge-name">Akshit Shadaik</h4>
              <p className="owner-badge-sub">Personal Hospitality & Guest Care</p>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="about-content-col">
          <p className="kicker-tag" data-fade>About the Hotel</p>
          <h2 className="h2" id="about-title" data-lines>
            <Lines text="A Stay That Feels|Like *Home*" />
          </h2>

          <div className="about-paragraphs" data-fade>
            <p className="lead">
              Welcome to our hotel, where warm hospitality, comfort, and memorable experiences come together.
            </p>
            <p className="about-body">
              Our hotel was created with a simple vision — to give every guest a comfortable place to stay while making them feel genuinely welcomed and cared for. From thoughtfully designed rooms and relaxing spaces to attentive service, every detail is focused on making your stay pleasant and memorable.
            </p>
            <p className="about-body">
              Whether you are visiting for a peaceful getaway, a family holiday, a business trip, or exploring the beautiful surroundings, we aim to make your time with us special.
            </p>
          </div>

          {/* A Personal Touch Subsection */}
          <div className="personal-touch-card" data-fade>
            <div className="pt-header">
              <HeartHandshake className="ico-lg" />
              <h3>A Personal Touch</h3>
            </div>
            <p className="pt-text">
              The hotel is proudly owned and managed by <strong>Akshit Shadaik</strong>, with a strong focus on personal hospitality and guest satisfaction. We believe that a great hotel is not only about beautiful rooms and facilities, but also about the experience and memories guests take home with them.
            </p>
            <p className="pt-text">
              Our team is committed to providing genuine hospitality, comfortable stays, and service that makes every guest feel valued.
            </p>
          </div>

          <div className="welcome-signoff" data-fade>
            <p className="signoff-quote">
              &ldquo;We look forward to welcoming you and making your stay truly memorable.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
