"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion, whenReady } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  const go = (dir: number) => {
    if (leaving !== null) return; // wipe in progress
    setLeaving(active);
    setActive((active + dir + heroSlides.length) % heroSlides.length);
  };

  // Intro (DESIGN.md §26): image settles, title lines rise, copy and CTA follow, ~1.7s total
  useGSAP((_ctx, contextSafe) => {
    if (prefersReducedMotion()) return;
    const intro = contextSafe!(() => gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".hero-slide.is-active img", { scale: 1.08, opacity: 0.85 }, { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
      .fromTo("h1 .line > span", { yPercent: 105, y: 0 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.2)
      .fromTo("[data-hero]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.55));
    const cancel = whenReady(intro);

    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap.to(".hero-media", { yPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    });
    return cancel;
  }, { scope: root });

  // Slide change: incoming slide wipes in from the right over the outgoing one
  useGSAP(() => {
    if (leaving === null) return;
    const done = () => setLeaving(null);
    if (prefersReducedMotion()) return done();
    const slide = root.current!.querySelectorAll<HTMLElement>(".hero-slide")[active];
    gsap.fromTo(slide, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", onComplete: done });
    gsap.fromTo(slide.querySelector("img"), { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power2.out" });
  }, { dependencies: [active], scope: root });

  // Gentle autoplay, paused for reduced motion and hidden tabs
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let t = window.setTimeout(() => go(1), 7000);
    const onVis = () => { window.clearTimeout(t); if (!document.hidden) t = window.setTimeout(() => go(1), 7000); };
    document.addEventListener("visibilitychange", onVis);
    return () => { window.clearTimeout(t); document.removeEventListener("visibilitychange", onVis); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, leaving]);

  return (
    <section ref={root} aria-label="Welcome">
      <div className="hero-frame">
        <div className="hero-media">
          {heroSlides.map((s, i) => (
            <div key={s.src} className={`hero-slide${i === active || i === leaving ? " is-active" : ""}`}
              style={{ zIndex: i === active ? 2 : i === leaving ? 1 : 0 }}>
              <Image src={s.src} alt={s.alt} fill sizes="100vw" preload={i === 0} loading={i === 0 ? undefined : "eager"} fetchPriority={i === 0 ? "high" : "low"} />
            </div>
          ))}
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>
              <span className="line"><span>The Cedar</span></span>
              <span className="line"><span><em>Haven</em></span></span>
            </h1>
            <p className="tag" data-hero>A Himalayan Retreat</p>
            <p className="quote" data-hero>Where the mountains slow you down and every stay feels like home.</p>
            <Link href="/booking" className="btn btn-light" data-hero>Book Your Stay <ArrowRight /></Link>
          </div>
        </div>

        <div className="hero-foot">
          <div className="container">
            <p className="loc" data-hero>Old Manali Road<br />2,050 m above sea level</p>
            <div className="slider-ctrl" data-hero>
              <span aria-live="polite"><b>{String(active + 1).padStart(2, "0")}</b> / {String(heroSlides.length).padStart(2, "0")}</span>
              <button onClick={() => go(-1)} aria-label="Previous image"><ArrowLeft /></button>
              <button onClick={() => go(1)} aria-label="Next image"><ArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
