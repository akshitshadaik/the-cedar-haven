# The Cedar Haven

A boutique Himalayan retreat website for a fictional hotel in Manali, Himachal Pradesh. College academic hospitality project.

**Live:** https://cedar-haven.vercel.app

## Stack

- Next.js 16 (App Router, Cache Components) + React 19 + TypeScript
- GSAP + ScrollTrigger (`@gsap/react`) for reveals, parallax, the pinned experiences pan and the preloader
- Lenis smooth scrolling
- `next/font` (Cormorant Garamond, Manrope, Caveat), `next/image` (AVIF/WebP), lucide-react icons
- Plain CSS with design tokens in `src/app/globals.css`

## Pages

`/` · `/about` · `/rooms` · `/dining` · `/experiences` · `/gallery` · `/booking` · `/contact`

Room rates: Deluxe Mountain View Room ₹5,500, Premium Valley Suite ₹8,000, Cedar Family Room ₹10,000 per night.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Notes

- Content lives in `src/data/site.ts`.
- Pages stay Server Components; motion opts in through data attributes (`data-lines`, `data-fade`, `data-stagger`, `data-clip`, `data-parallax`) handled in `src/app/template.tsx`.
- All motion respects `prefers-reduced-motion`.
- The booking and contact forms are demonstration interfaces. No booking is created and nothing is sent.
- Photography is from Unsplash.
