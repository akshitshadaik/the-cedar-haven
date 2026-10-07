import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { contact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="f-cta">
          <p className="f-head">The mountains are<br /><em>a short drive away.</em></p>
          <div className="f-cta-side">
            <Link href="/booking" className="btn btn-light">Book Your Stay <ArrowRight /></Link>
            <a className="f-big-link" href={contact.phoneHref}>{contact.phone}</a>
            <a className="f-big-link" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>

        <div className="f-cols">
          <div>
            <h2>Find us</h2>
            <p>{contact.address}</p>
            <a href="https://www.openstreetmap.org/?mlat=32.2432&mlon=77.1892#map=14/32.2432/77.1892" target="_blank" rel="noreferrer" className="f-link">Open in maps <ArrowRight /></a>
          </div>
          <div>
            <h2>Hours</h2>
            <p>Reception: {contact.reception}</p>
            <p>Restaurant: {contact.restaurant}</p>
            <p>Check-in 2 PM, check-out 11 AM</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul className="f-nav">
              {[["/rooms", "Rooms"], ["/dining", "Dining"], ["/experiences", "Experiences"], ["/gallery", "Gallery"], ["/about", "About"], ["/contact", "Contact"]].map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Follow</h2>
            <ul className="f-nav">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="f-legal">
          <p>© 2026 The Cedar Haven. A fictional hotel created as a college academic project.</p>
          <a href="#main" className="f-top">Back to top <ArrowUp /></a>
        </div>
      </div>
      <p className="f-word" aria-hidden="true">Cedar Haven</p>
    </footer>
  );
}
