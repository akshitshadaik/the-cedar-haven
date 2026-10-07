"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, whenReady } from "@/lib/gsap";

/**
 * Remounts on every navigation, so it owns the page fade and all generic
 * scroll reveals. Pages stay Server Components and opt in with data attributes:
 *   data-lines     heading whose .line > span children rise from a mask
 *   data-fade      opacity + y fade-up
 *   data-stagger   children enter as a staggered batch
 *   data-clip      image wrapper whose mask opens upward
 *   data-parallax  inner image layer with a small scrubbed drift (desktop)
 *   data-ridge     svg path that draws itself on scroll
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    let cleanup: (() => void) | undefined;
    
    // Defer setupReveals to useEffect to ensure React hydration completes
    // before GSAP applies dynamic inline styles (transform, opacity, clipPath) to DOM elements.
    const cancel = whenReady(() => {
      if (root.current) {
        cleanup = setupReveals(root.current);
      }
    });

    return () => {
      cancel();
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}

function setupReveals(rootEl: HTMLDivElement) {
  const q = gsap.utils.selector(rootEl);
  const mobile = window.innerWidth < 768;

  // opacity only: a transform here would break position:fixed pinning inside
  gsap.fromTo(rootEl, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });

  q("[data-lines]").forEach((h: Element) =>
    gsap.fromTo(h.querySelectorAll(".line > span"), { yPercent: 105, y: 0 }, {
      yPercent: 0, duration: 0.85, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: h, start: "top 84%", once: true },
    }),
  );

  q("[data-fade]").forEach((el: Element) =>
    gsap.fromTo(el, { opacity: 0, y: mobile ? 14 : 24 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    }),
  );

  ScrollTrigger.batch(q("[data-stagger] > *"), {
    start: "top 90%",
    once: true,
    onEnter: (els) =>
      gsap.fromTo(els, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: mobile ? 0.04 : 0.07, ease: "power2.out", overwrite: true,
      }),
  });

  q("[data-clip]").forEach((fig: Element) => {
    gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 82%", once: true } })
      .fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "expo.out" })
      .fromTo(fig.querySelector("img"), { scale: 1.06 }, { scale: 1, duration: 1.3, ease: "power2.out" }, 0);
  });

  q("[data-ridge]").forEach((path: Element) => {
    const len = (path as SVGPathElement).getTotalLength();
    gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: path.closest("section"), start: "top 75%", end: "bottom bottom", scrub: 1 },
    });
  });

  // Parallax stays on desktop only (DESIGN.md §29: 3-5% sections, 0-2% mobile)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    q("[data-parallax]").forEach((el: Element) => {
      const s = Number((el as HTMLElement).dataset.parallax) || 5;
      gsap.fromTo(el, { yPercent: -s }, {
        yPercent: s, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });

  // Safety net: reveals must never gate content. Some scroll sources (find-in-page, focus,
  // a jump that lands mid-Lenis glide) can skip a ScrollTrigger update; IntersectionObserver
  // sees real visibility, nudges ScrollTrigger, and force-shows anything still hidden.
  const show = (el: Element) => {
    if (el.matches("[data-lines]")) gsap.set(el.querySelectorAll(".line > span"), { yPercent: 0, y: 0 });
    else if (el.matches("[data-clip]")) gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
    else gsap.set(el, { opacity: 1, y: 0 });
  };
  const hidden = (el: Element) => {
    if (el.matches("[data-lines]")) {
      const line = el.querySelector(".line");
      const span = line?.firstElementChild;
      return !!span && span.getBoundingClientRect().top >= line!.getBoundingClientRect().bottom - 1;
    }
    if (el.matches("[data-clip]")) return getComputedStyle(el).clipPath.startsWith("inset(100%");
    return getComputedStyle(el).opacity === "0";
  };
  const io = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    if (!seen.length) return;
    ScrollTrigger.update();
    window.setTimeout(() => seen.forEach((el) => hidden(el) && show(el)), 1500);
  });
  q("[data-lines], [data-fade], [data-stagger] > *, [data-clip]").forEach((el: Element) => io.observe(el));

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => { mm.revert(); io.disconnect(); };
}
