"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experiences } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Desktop: section pins and the card track pans sideways with vertical scroll.
 *  Mobile / reduced motion: plain horizontal scroll-snap row. */
export function ExperiencePan() {
  const sec = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = sec.current!;
      const track = el.querySelector<HTMLElement>(".xp-track")!;
      const bar = el.querySelector(".xp-progress i");
      el.classList.add("is-pinned");
      const dist = () => Math.max(0, track.scrollWidth - track.clientWidth);
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: el, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1,
          invalidateOnRefresh: true, onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }),
        },
      });
      return () => el.classList.remove("is-pinned");
    });
    return () => mm.revert();
  }, { scope: sec });

  return (
    <section ref={sec} className="xp" aria-labelledby="xp-title">
      <div className="xp-pin">
        <div className="container xp-head sec-head">
          <div>
            <h2 className="h2" id="xp-title" data-lines>
              <span className="line"><span>More than a stay.</span></span>
              <span className="line"><span>A valley to explore.</span></span>
            </h2>
            <p className="lead" data-fade>Our team plans each day around the weather, the season and how slow you want to go.</p>
          </div>
          <Link href="/experiences" className="textlink" data-fade>All experiences <ArrowRight /></Link>
        </div>
        <div className="xp-track" data-stagger>
          {experiences.map((x) => (
            <article className="xp-card" key={x.title}>
              <div className="media"><Image src={x.src} alt={x.alt} fill sizes="(min-width: 768px) 360px, 78vw" /></div>
              <h3>{x.title}</h3>
              <p className="meta">{x.meta}</p>
              <p>{x.text}</p>
            </article>
          ))}
          <span className="xp-end" aria-hidden="true" />
        </div>
        <div className="container"><div className="xp-progress" aria-hidden="true"><i /></div></div>
      </div>
    </section>
  );
}
