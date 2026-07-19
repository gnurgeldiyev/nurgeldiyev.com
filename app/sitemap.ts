import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/config/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ?? "2026-01-01";

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/posts/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: site.url, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/posts`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...postEntries,
  ];
}
