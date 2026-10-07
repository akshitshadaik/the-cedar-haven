import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Object form: a URL() pattern implies `search: ''`, which rejects Unsplash's crop/size query.
    // ponytail: any query on /photo-* is allowed; pin `search` per image if the optimizer gets abused.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
