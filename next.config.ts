import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enriched link/Spotify thumbnails come from arbitrary hosts, so we render
  // them with plain <img>. next/image is reserved for local assets below.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "**.spotifycdn.com" },
      // Featured card image (LCP) — let Vercel optimize + edge-cache it.
      { protocol: "https", hostname: "**.restor.eco" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
