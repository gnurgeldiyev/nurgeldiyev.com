import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ---------------------------------------------------------------------------
// Microblog posts = MDX files in /content/posts. To publish, drop a new
// `.mdx` file with frontmatter and push — the feed and enrichment take care
// of the rest.
// ---------------------------------------------------------------------------

export type PostType = "note" | "link" | "song" | "photo" | "video" | "place";

export interface PostFrontmatter {
  title?: string;
  date: string; // ISO — YYYY-MM-DD
  type?: PostType;
  url?: string; // link / song target
  image?: string; // for photo posts
  video?: string; // for video posts
  location?: string; // for place posts
  tags?: string[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  type: PostType;
  content: string; // raw MDX body
  excerpt: string; // plain-text preview
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function toExcerpt(md: string, max = 180): string {
  const text = md
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "") // list markers only
    .replace(/[#>*_~]/g, "") // markdown tokens, but keep word hyphens
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

// YAML turns an unquoted `date: 2026-07-15` into a Date object (UTC midnight),
// so normalize whatever we get back into a clean "YYYY-MM-DD" string.
function toISODate(d: unknown): string {
  if (d instanceof Date && !Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  if (typeof d === "string") return d.slice(0, 10);
  return "";
}

function inferType(fm: PostFrontmatter): PostType {
  if (fm.type) return fm.type;
  if (fm.video) return "video";
  if (fm.image) return "photo";
  if (fm.location) return "place";
  if (fm.url) return "link";
  return "note";
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      const slug = file.replace(/\.mdx?$/, "");
      return {
        ...fm,
        slug,
        date: toISODate(fm.date),
        type: inferType(fm),
        content: content.trim(),
        excerpt: toExcerpt(content),
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      } satisfies Post;
    })
    .filter((p) => Boolean(p.date))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRecentPosts(n = 3): Post[] {
  return getAllPosts().slice(0, n);
}

export function formatPostDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
