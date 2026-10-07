import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Manrope } from "next/font/google";
import { Providers } from "@/components/motion/Providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Preloader } from "@/components/motion/Preloader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: "The Cedar Haven | A Himalayan Retreat in Manali", template: "%s | The Cedar Haven" },
  description:
    "A fictional boutique Himalayan hotel project in Manali showcasing comfortable rooms, local dining, nature experiences and warm mountain hospitality.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "The Cedar Haven",
    type: "website",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&h=630&q=75"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${manrope.variable} ${caveat.variable}`}>
      <head>
        {/* Return visits in this session skip the preloader; decided before first paint */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('ch-seen'))document.documentElement.classList.add('ch-seen')}catch(e){}" }} />
        {/* Without JS nothing animates in, so drop the pre-animation hidden states and the preloader */}
        <noscript>
          <style>{`.line>span{transform:none!important}[data-hero],[data-fade],[data-stagger]>*{opacity:1!important}[data-clip]{clip-path:none!important}.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>
          <Preloader />
          <a className="skip" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
