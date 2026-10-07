"use client";

import { useRef, useState } from "react";
import { menu } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export function DiningTabs() {
  const [tab, setTab] = useState(1); // open on Himalayan Specialties
  const root = useRef<HTMLDivElement>(null);
  const changed = useRef(false);

  useGSAP(() => {
    if (!changed.current || prefersReducedMotion()) return;
    gsap.fromTo("[role=tabpanel]:not([hidden]) li", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" });
  }, { dependencies: [tab], scope: root });

  const select = (i: number) => {
    changed.current = true;
    setTab(i);
    root.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[i]?.focus();
  };

  return (
    <div ref={root}>
      <div className="tabs" role="tablist" aria-label="Menu categories"
        onKeyDown={(e) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) select((tab + d + menu.length) % menu.length);
        }}>
        {menu.map((m, i) => (
          <button key={m.id} className="tab" role="tab" id={`t-${m.id}`} aria-controls={`p-${m.id}`}
            aria-selected={i === tab} tabIndex={i === tab ? 0 : -1} onClick={() => select(i)}>
            {m.label}
          </button>
        ))}
      </div>
      {menu.map((m, i) => (
        <ul key={m.id} className="menu-list" role="tabpanel" id={`p-${m.id}`} aria-labelledby={`t-${m.id}`} hidden={i !== tab}>
          {m.items.map(([name, desc]) => <li key={name}><b>{name}</b><span>{desc}</span></li>)}
        </ul>
      ))}
    </div>
  );
}
