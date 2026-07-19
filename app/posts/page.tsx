import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import PostsBrowser from "@/components/PostsBrowser";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/icons";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { profile, site, topics } from "@/config/content";
import { blogNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Posts",
  description: `A slow, running log by ${profile.name} — poems, songs, thoughts, and notes from building Airflora.`,
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getAllPosts();
  // Show curated topics in their canonical order, only those that have posts.
  const present = new Set(posts.flatMap((p) => p.tags ?? []));
  const tags = topics.filter((t) => present.has(t));
  const items = posts.map((p) => ({
    slug: p.slug,
    date: p.date,
    tags: p.tags ?? [],
    card: <PostCard post={p} />,
  }));

  return (
    <main className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
      <JsonLd data={blogNode()} />
      <JsonLd
        data={breadcrumbNode([
          { name: "Home", url: site.url },
          { name: "Posts", url: `${site.url}/posts` },
        ])}
      />
      <div className="mb-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-1 text-sm text-soft transition-colors hover:text-accent"
        >
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {profile.name}
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display text-4xl text-main">Lately</h1>
        <p className="mt-2 max-w-lg text-soft">
          A slow, running log — poems I keep close, songs on repeat, half-formed
          thoughts, and notes from building Airflora.
        </p>
      </header>

      <PostsBrowser items={items} tags={tags} />

      <Footer />
    </main>
  );
}
