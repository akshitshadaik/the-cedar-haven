"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion, markReady } from "@/lib/gsap";

const SEEN = "ch-seen";

/**
 * First visit per session only (an inline head script hides it for return visits before paint).
 * The ridge line tracks real readiness: fonts plus the first hero/page image, capped at 3s.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP((_ctx, contextSafe) => {
    const html = document.documentElement;
    if (html.classList.contains(SEEN) || prefersReducedMotion()) {
      markReady();
      setGone(true);
      return;
    }
    html.classList.add("is-loading");

    const path = root.current!.querySelector<SVGPathElement>("path")!;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    const intro = gsap.timeline()
      .fromTo(".pl-word .line > span", { yPercent: 105, y: 0 }, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" })
      .fromTo(".pl-meta", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
    // ridge creeps toward 85% while we wait; the last stretch completes when assets are in
    const progress = gsap.to(path, { strokeDashoffset: len * 0.15, duration: 2.4, ease: "power1.out" });

    const firstImg = document.querySelector<HTMLImageElement>("main img");
    const imgReady = !firstImg || firstImg.complete
      ? Promise.resolve()
      : new Promise<void>((r) => { firstImg.addEventListener("load", () => r(), { once: true }); firstImg.addEventListener("error", () => r(), { once: true }); });
    const minTime = new Promise((r) => setTimeout(r, 1300));
    const cap = new Promise((r) => setTimeout(r, 3000));

    // Idempotent finish. The exit timeline normally calls it; a timer backs it up because
    // requestAnimationFrame (and so GSAP) is frozen in background tabs and must never hold content hostage.
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem(SEEN, "1"); } catch {}
      html.classList.remove("is-loading");
      markReady();
      setGone(true);
    };

    const exit = contextSafe!(() => {
      progress.kill();
      window.setTimeout(finish, 2500);
      gsap.timeline({ onComplete: finish })
        .to(path, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" })
        .to(".pl-word, .pl-meta", { yPercent: -30, opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.1")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.25")
        .add(() => { if (!finished) markReady(); }, "-=0.55"); // hero intro starts as the curtain clears
    });

    Promise.race([Promise.all([document.fonts?.ready, imgReady, minTime, intro.then()]), cap]).then(exit);
  }, { scope: root });

  if (gone) return null;
  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-inner">
        <p className="pl-word">
          <span className="line"><span>The Cedar</span></span>
          <span className="line"><span><em>Haven</em></span></span>
        </p>
        <svg className="pl-ridge" viewBox="0 0 600 80" fill="none" preserveAspectRatio="none">
          <path d="M0 74 L60 52 L95 62 L150 22 L185 40 L235 6 L290 48 L335 30 L385 58 L445 14 L485 36 L530 24 L600 60" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <p className="pl-meta">Old Manali Road · 2,050 m</p>
      </div>
    </div>
  );
}
