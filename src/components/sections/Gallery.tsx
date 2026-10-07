"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gallery, img, type GalleryCat } from "@/data/site";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef } from "@/components/motion/Providers";

const FILTERS: { id: "all" | GalleryCat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hotel", label: "The Hotel" },
  { id: "rooms", label: "Rooms" },
  { id: "dining", label: "Dining" },
  { id: "experiences", label: "Experiences" },
  { id: "nature", label: "Nature" },
];

type Item = (typeof gallery)[number];

export function Gallery({ limit, filters = true }: { limit?: number; filters?: boolean }) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [open, setOpen] = useState<Item | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const [touched, setTouched] = useState(false);
  const pick = (id: typeof filter) => {
    if (id === filter) return;
    setTouched(true);
    setFilter(id);
  };

  // After the first filter change the grid remounts per filter (key) and drops data-stagger, so tiles
  // animate in via CSS (.is-filtered) instead of sharing GSAP targets with the scroll-reveal batch.
  useEffect(() => { if (touched) ScrollTrigger.refresh(); }, [filter, touched]);
  const shown = items.filter((it) => filter === "all" || it.cat === filter);

  // Every close path (button, backdrop, Escape) releases smooth scroll; don't rely on the close event alone
  const closeBox = () => {
    if (dialog.current?.open) dialog.current.close();
    setOpen(null);
    lenisRef.current?.start();
  };

  const show = (it: Item) => {
    setOpen(it);
    dialog.current?.showModal();
    lenisRef.current?.stop();
    if (!prefersReducedMotion()) gsap.fromTo(dialog.current, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div>
      {filters && (
        <div className="filters" role="group" aria-label="Filter gallery" data-fade>
          {FILTERS.map((f) => (
            <button key={f.id} className="filter" aria-pressed={filter === f.id} onClick={() => pick(f.id)}>{f.label}</button>
          ))}
        </div>
      )}
      <div key={filter} className={`g-grid${touched ? " is-filtered" : ""}`} {...(touched ? {} : { "data-stagger": "" })}>
        {shown.map((it, i) => (
          <button key={it.id} className="g-item" style={{ "--i": i } as React.CSSProperties} onClick={() => show(it)} aria-label={`View larger: ${it.alt}`}>
            <Image src={img(it.id, it.w, it.h)} alt={it.alt} width={it.w} height={it.h} sizes="(min-width: 1024px) 420px, (min-width: 480px) 50vw, 50vw" />
          </button>
        ))}
      </div>

      <dialog ref={dialog} className="lightbox" aria-label="Image preview"
        onClose={closeBox}
        onCancel={(e) => { e.preventDefault(); closeBox(); }}
        onClick={(e) => e.target === e.currentTarget && closeBox()}>
        <button className="lb-close" aria-label="Close preview" onClick={closeBox}><X /></button>
        {open && (
          <>
            <Image src={img(open.id, 1600, Math.round((1600 * open.h) / open.w))} alt={open.alt} width={1600} height={Math.round((1600 * open.h) / open.w)} sizes="90vw" />
            <p>{open.alt}</p>
          </>
        )}
      </dialog>
    </div>
  );
}
