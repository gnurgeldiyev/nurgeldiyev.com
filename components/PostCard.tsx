import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Post, PostType } from "@/lib/posts";
import { formatPostDate } from "@/lib/posts";
import LinkPreviewCard from "./LinkPreviewCard";
import SpotifyTrack from "./SpotifyTrack";
import { ArrowIcon, MapPinIcon } from "./icons";

const TYPE_META: Record<PostType, { label: string; emoji: string }> = {
  note: { label: "Note", emoji: "✍️" },
  link: { label: "Link", emoji: "🔗" },
  song: { label: "Song", emoji: "🎶" },
  photo: { label: "Photo", emoji: "📷" },
  video: { label: "Video", emoji: "🎬" },
  place: { label: "Place", emoji: "📍" },
};

export default async function PostCard({
  post,
  standalone = false,
}: {
  post: Post;
  standalone?: boolean;
}) {
  const meta = TYPE_META[post.type];
  const showFooter = !standalone || (post.tags?.length ?? 0) > 0;

  return (
    <article className={`card ${standalone ? "p-6 sm:p-8" : "p-6 sm:p-7"}`}>
      {/* Header: type glyph + label / date */}
      <header className="flex items-center gap-3.5">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-xl"
          aria-hidden
        >
          {meta.emoji}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {meta.label}
          </p>
          <time dateTime={post.date} className="text-xs text-faint">
            {formatPostDate(post.date)}
          </time>
        </div>
      </header>

      {/* Title */}
      {post.title &&
        (standalone ? (
          <h1 className="mt-5 font-display text-3xl leading-tight text-main">{post.title}</h1>
        ) : (
          <h3 className="mt-4 font-display text-2xl leading-tight text-main">
            <Link
              href={`/posts/${post.slug}`}
              className="transition-colors hover:text-accent"
            >
              {post.title}
            </Link>
          </h3>
        ))}

      {/* Body */}
      <div className="prose-post mt-3 text-[15px]">
        <MDXRemote source={post.content} />
      </div>

      {/* Type-specific enriched attachment */}
      {post.type === "link" && post.url && <LinkPreviewCard url={post.url} />}
      {post.type === "song" && post.url && (
        <div className="mt-4">
          <SpotifyTrack url={post.url} />
        </div>
      )}
      {post.type === "place" && post.location && (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
          <MapPinIcon className="h-4 w-4" />
          {post.location}
        </div>
      )}
      {post.type === "photo" && post.image && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title || ""} loading="lazy" className="w-full object-cover" />
        </div>
      )}
      {post.type === "video" && post.video && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <video src={post.video} controls playsInline preload="metadata" className="w-full" />
        </div>
      )}

      {/* Footer: topics + permalink */}
      {showFooter && (
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full bg-card-2 px-2 py-0.5 text-[11px] font-medium text-faint"
              >
                #{t}
              </span>
            ))}
          </div>
          {!standalone && (
            <Link
              href={`/posts/${post.slug}`}
              className="group inline-flex shrink-0 items-center gap-1 text-xs font-medium text-soft transition-colors hover:text-accent"
            >
              Read
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
