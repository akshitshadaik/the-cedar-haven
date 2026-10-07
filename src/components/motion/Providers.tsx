"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { LucideProvider } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// One Lenis instance for the whole app; menus and the lightbox pause it.
export const lenisRef: { current: Lenis | null } = { current: null };

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New route starts at the top; keep Lenis' internal position in sync with Next's scroll reset.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return (
    <LucideProvider strokeWidth={1.5} className="ico">
      {children}
    </LucideProvider>
  );
}
