import type { MetadataRoute } from "next";
import { site } from "@/config/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Guga",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#1f7a4d",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
