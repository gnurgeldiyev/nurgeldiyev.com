import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/icons";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, getPost } from "@/lib/posts";
import { profile, site } from "@/config/content";
import { blogPostingNode, breadcrumbNode } from "@/lib/schema";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = post.title || "Post";
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      publishedTime: post.date,
      url: `${site.url}/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
      <JsonLd data={blogPostingNode(post)} />
      <JsonLd
        data={breadcrumbNode([
          { name: "Home", url: site.url },
          { name: "Posts", url: `${site.url}/posts` },
          { name: post.title ?? "Post", url: `${site.url}/posts/${post.slug}` },
        ])}
      />
      <div className="mb-8">
        <Link
          href="/posts"
          className="group inline-flex items-center gap-1 text-sm text-soft transition-colors hover:text-accent"
        >
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          All posts
        </Link>
      </div>

      <PostCard post={post} standalone />

      <div className="mt-8 flex items-center gap-3">
        <Link href="/" className="text-sm text-soft transition-colors hover:text-accent">
          ← Back to {profile.name.split(" ")[0]}
        </Link>
      </div>

      <Footer />
    </main>
  );
}
