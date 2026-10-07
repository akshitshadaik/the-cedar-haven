import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { ArrowRight, Clock, Mail, MapPin, Phone, Utensils } from "lucide-react";
import { contact, inr, rooms } from "@/data/site";

/** "|" splits masked lines for the data-lines reveal; *word* renders as italic emphasis. */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("|").map((l) => (
        <span className="line" key={l}>
          <span>{l.trim().split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}</span>
        </span>
      ))}
    </>
  );
}

/** Interior page opener. With an image: title sits on the photograph. Without: a typographic masthead. */
export function PageHero({ kicker, title, lead, image }: {
  kicker?: string; title: string; lead: string; image?: { src: string; alt: string };
}) {
  if (!image) {
    return (
      <section className="type-hero">
        <div className="container">
          <h1 data-lines><Lines text={title} /></h1>
          <p className="lead" data-fade>{lead}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="photo-hero">
      <div className="bg" data-parallax="4">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" preload />
      </div>
      <div className="container">
        <div>
          {kicker && <p className="kicker" data-fade>{kicker}</p>}
          <h1 data-lines><Lines text={title} /></h1>
        </div>
        <p className="lead" data-fade>{lead}</p>
      </div>
    </section>
  );
}

type Action = { href: string; label: string };

/** Full-bleed photo band that sinks behind a ridge into the footer. Content is per page. */
export function Closing({ title, lead, image, primary, secondary }: {
  title: string; lead?: string; image: { src: string; alt: string }; primary: Action; secondary?: Action;
}) {
  return (
    <section className="closing">
      <div className="bg" data-parallax="5"><Image src={image.src} alt={image.alt} fill sizes="100vw" /></div>
      <div className="container">
        <h2 className="h2" data-lines><Lines text={title} /></h2>
        {lead && <p className="lead" data-fade>{lead}</p>}
        <div className="actions" data-fade>
          <Link href={primary.href} className="btn btn-light">{primary.label} <ArrowRight /></Link>
          {secondary && <Link href={secondary.href} className="btn btn-outline-light">{secondary.label}</Link>}
        </div>
      </div>
      <svg className="ridge" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 150 L0 112 L110 78 L170 96 L270 30 L330 62 L420 8 L520 84 L600 54 L690 100 L800 22 L870 60 L950 38 L1040 94 L1130 58 L1210 82 L1310 30 L1380 66 L1440 52 L1440 150 Z" />
      </svg>
    </section>
  );
}

/** Check-in / check-out / guests, submitted as a GET to /booking which prefills its form. */
export function AvailabilityBar() {
  return (
    <div className="avail container" data-fade>
      <Form action="/booking" aria-label="Check availability">
        <label>Check-in<input type="date" name="checkin" required /></label>
        <label>Check-out<input type="date" name="checkout" required /></label>
        <label>Guests
          <select name="guests" defaultValue="2">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn-primary">Check availability <ArrowRight /></button>
      </Form>
    </div>
  );
}

export function ContactInfo({ title = "We'd love to welcome you" }: { title?: string }) {
  return (
    <div className="contact">
      <h3 data-lines><Lines text={title} /></h3>
      <ul className="c-list" data-stagger>
        <li><MapPin /><span><b>The Cedar Haven</b>{contact.address}</span></li>
        <li><Phone /><span><b>Phone</b><a href={contact.phoneHref}>{contact.phone}</a></span></li>
        <li><Mail /><span><b>Email</b><a href={`mailto:${contact.email}`}>{contact.email}</a></span></li>
        <li><Clock /><span><b>Reception</b>{contact.reception}</span></li>
        <li><Utensils /><span><b>Restaurant</b>{contact.restaurant}</span></li>
      </ul>
      <div className="map" data-fade>
        <iframe title="Map of Manali, Himachal Pradesh" loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.155%2C32.225%2C77.215%2C32.265&layer=mapnik&marker=32.2432%2C77.1892" />
      </div>
    </div>
  );
}

/** Home rooms: one lead room large, two supporting. No boxed cards. */
export function RoomsEditorial() {
  return (
    <div className="rooms-ed" data-stagger>
      {rooms.map((r, i) => (
        <article className="room-ed" key={r.id}>
          <Link href={`/booking?room=${r.id}`} aria-label={`Book the ${r.name}`} tabIndex={-1}>
            <div className="media"><Image src={r.image.src} alt={r.image.alt} fill sizes={i === 0 ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 40vw, 100vw"} /></div>
          </Link>
          <div className="row">
            <h3>{r.name}</h3>
            <p className="price">{inr(r.price)} <small>/ night</small></p>
          </div>
          <p className="desc">{r.short}</p>
          <Link href={`/booking?room=${r.id}`} className="textlink">Book this room <ArrowRight /></Link>
        </article>
      ))}
    </div>
  );
}
