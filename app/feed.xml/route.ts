import { getAllPosts } from "@/lib/posts";
import { person, site } from "@/config/content";

export const revalidate = 86400;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  return new Date(`${date}T09:00:00Z`).toUTCString();
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${site.url}/posts/${p.slug}`;
      const title = p.title ?? p.excerpt.slice(0, 60);
      const categories = (p.tags ?? []).map((t) => `      <category>${esc(t)}</category>`).join("\n");
      return `    <item>
      <title>${esc(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <dc:creator>${esc(person.name)}</dc:creator>
${categories}
      <description>${esc(p.excerpt)}</description>
      <content:encoded><![CDATA[${p.content}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0] ? rfc822(posts[0].date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} — Lately</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
