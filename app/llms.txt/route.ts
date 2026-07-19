import { getAllPosts } from "@/lib/posts";
import { person, site, socials } from "@/config/content";

export const revalidate = 86400;

// llms.txt — a Markdown summary of the site for LLMs / AI agents (llmstxt.org).
// Generated from the same post source as the sitemap + RSS so it never drifts.
export async function GET() {
  const posts = getAllPosts();

  const writing = posts
    .map((p) => `- [${p.title ?? p.slug}](${site.url}/posts/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const links = socials.map((s) => `- [${s.label}](${s.url})`).join("\n");

  const md = `# ${person.name}

> ${site.description}

Key facts: ${person.jobTitle} at ${person.worksFor.name} (${person.worksFor.url}); based in ${person.address.locality}, ${person.address.country}; ${person.nationality}. Works on ${person.knowsAbout.slice(0, 5).join(", ")}.

## Pages

- [Home](${site.url}): Profile, links, music I love, and recent posts.
- [Lately — microblog](${site.url}/posts): Short posts (poems, songs, thoughts, and notes from building Airflora), newest first, filterable by topic.

## Writing

${writing}

## Links

${links}

## Optional

- [RSS feed](${site.url}/feed.xml)
`;

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
