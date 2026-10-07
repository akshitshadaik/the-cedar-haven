import { Suspense } from "react";
import type { Metadata } from "next";
import { BedDouble, Clock, Coffee, MapPin } from "lucide-react";
import { BookingForm } from "@/components/sections/Forms";
import { Lines } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Booking",
  description: "Plan your Himalayan escape at The Cedar Haven.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h2" data-lines style={{ fontSize: "var(--fs-display-lg)", marginBottom: 48 }}><Lines text="Plan your|*Himalayan* escape" /></h1>
        <div className="book-grid">
          <div className="card" data-fade>
            <h2 style={{ fontSize: "var(--fs-h3)" }}>Your stay</h2>
            {/* reads ?room= so "Book this room" links arrive preselected */}
            <Suspense fallback={<div style={{ minHeight: 520 }} />}>
              <BookingForm />
            </Suspense>
          </div>
          <aside className="summary" data-fade>
            <h3>Every stay includes</h3>
            <ul className="c-list" data-stagger>
              <li><BedDouble /><span><b>Room highlights</b>Mountain or valley views, cedar interiors, heating</span></li>
              <li><Coffee /><span><b>Breakfast included</b>Served 7:00 AM to 10:30 AM</span></li>
              <li><Clock /><span><b>24-hour reception</b>Help with treks, taxis and tables</span></li>
              <li><MapPin /><span><b>Manali, Himachal Pradesh</b>15 minutes from the Mall Road</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
