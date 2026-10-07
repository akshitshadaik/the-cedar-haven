import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The preloader announces when the page is uncovered so entrance animations don't play behind it.
declare global { interface Window { __chReady?: boolean } }

export function markReady() {
  if (window.__chReady) return;
  window.__chReady = true;
  window.dispatchEvent(new Event("ch:ready"));
}

/** Run now if the page is already uncovered, otherwise once the preloader lifts. Returns a cancel fn. */
export function whenReady(run: () => void) {
  if (window.__chReady) { run(); return () => {}; }
  window.addEventListener("ch:ready", run, { once: true });
  return () => window.removeEventListener("ch:ready", run);
}
