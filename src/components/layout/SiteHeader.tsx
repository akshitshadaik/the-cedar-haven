"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { contact } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef } from "@/components/motion/Providers";

const LEFT = [{ href: "/rooms", label: "Rooms" }, { href: "/dining", label: "Dining" }, { href: "/experiences", label: "Experiences" }];
const RIGHT = [{ href: "/about", label: "About" }, { href: "/gallery", label: "Gallery" }, { href: "/contact", label: "Contact" }];
const ALL = [{ href: "/", label: "Home" }, ...LEFT, ...RIGHT];
// Pages that open on a full-bleed photograph: the header sits on it, transparent and light
const PHOTO_ROUTES = ["/", "/about", "/rooms", "/dining", "/experiences", "/contact"];

const isCurrent = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label="The Cedar Haven, home" onClick={onClick}>
      <b>The Cedar Haven</b><small>Manali</small>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => { openRef.current = open; }, [open]);

  // Solid after 40px; slides away while scrolling down, returns on any scroll up.
  // Class toggles only: no React state per scroll frame.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (s) => {
        const el = header.current;
        if (!el) return;
        const y = s.scroll();
        el.classList.toggle("is-stuck", y > 40);
        el.classList.toggle("is-away", s.direction === 1 && y > 360 && !openRef.current);
      },
    });
  });

  // Full-screen menu: lock smooth scroll, stagger links in, focus the first one
  useGSAP(() => {
    if (!open) return;
    lenisRef.current?.stop();
    if (!prefersReducedMotion()) {
      gsap.timeline()
        .fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" })
        .fromTo(".mm-links .line > span", { yPercent: 105, y: 0 }, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, 0.12)
        .fromTo(".mm-foot", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.35);
    }
    menu.current?.querySelector<HTMLElement>(".mm-links a")?.focus();
    return () => lenisRef.current?.start();
  }, { dependencies: [open], scope: menu, revertOnUpdate: true });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const wide = window.matchMedia("(min-width: 1200px)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => { document.removeEventListener("keydown", onKey); wide.removeEventListener("change", onWide); };
  }, [open]);

  const close = () => setOpen(false);
  const link = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} aria-current={isCurrent(pathname, l.href) ? "page" : undefined}>{l.label}</Link>
  );

  return (
    <>
      <header ref={header} className="header" data-photo={PHOTO_ROUTES.includes(pathname) ? "true" : undefined}>
        <div className="container">
          <button ref={btn} className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu /><span>Menu</span>
          </button>
          <nav className="nav nav-left" aria-label="Stay">{LEFT.map(link)}</nav>
          <Logo />
          <div className="nav-right">
            <nav className="nav" aria-label="Visit">{RIGHT.map(link)}</nav>
            <Link href="/booking" className="btn btn-primary btn-book"><span>Book<span className="hide-sm"> Your Stay</span></span></Link>
          </div>
        </div>
      </header>

      <div ref={menu} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <div className="container mm-top">
          <Logo onClick={close} />
          <button className="menu-btn is-close" aria-label="Close menu" onClick={() => { close(); btn.current?.focus(); }}>
            <X /><span>Close</span>
          </button>
        </div>
        <div className="container mm-body">
          <ul className="mm-links">
            {ALL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={isCurrent(pathname, l.href) ? "page" : undefined}>
                  <span className="line"><span>{l.label}</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mm-foot">
            <p>{contact.address}</p>
            <p><a href={contact.phoneHref}>{contact.phone}</a> · <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <Link href="/booking" className="btn btn-light" onClick={close}>Book Your Stay <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </>
  );
}
