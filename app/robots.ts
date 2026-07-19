import type { MetadataRoute } from "next";
import { site } from "@/config/content";

// Allow-all posture: welcomes both search engines and AI answer engines
// (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot,
// Google-Extended, Applebot-Extended, CCBot, bingbot, …). A bare
// "User-agent: * / Allow: /" already permits every one of them.
// NOTE: don't let a CDN/WAF (e.g. Vercel Firewall) block AI bots — that would
// silently override this.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
