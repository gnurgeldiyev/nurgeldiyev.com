"use client";

import { useMemo, useState } from "react";

type SortOrder = "newest" | "oldest";

interface Item {
  slug: string;
  date: string;
  tags: string[];
  card: React.ReactNode; // server-rendered <PostCard/>, passed in as a slot
}

export default function PostsBrowser({ items, tags }: { items: Item[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const [order, setOrder] = useState<SortOrder>("newest");

  const visible = useMemo(() => {
    const list = tag ? items.filter((i) => i.tags.includes(tag)) : [...items];
    list.sort((a, b) =>
      order === "newest" ? (a.date < b.date ? 1 : -1) : a.date > b.date ? 1 : -1
    );
    return list;
  }, [items, tag, order]);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        {/* Topic filter — scrolls horizontally on mobile, wraps on sm+ */}
        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto sm:flex-wrap">
          <Chip active={tag === null} onClick={() => setTag(null)}>
            All
          </Chip>
          {tags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
              #{t}
            </Chip>
          ))}
        </div>

        {/* Sort */}
        <div className="inline-flex shrink-0 rounded-full border border-line bg-card p-0.5 text-xs font-medium">
          <SortButton active={order === "newest"} onClick={() => setOrder("newest")}>
            Latest
          </SortButton>
          <SortButton active={order === "oldest"} onClick={() => setOrder("oldest")}>
            Oldest
          </SortButton>
        </div>
      </div>

      <p className="mb-4 text-xs text-faint">
        {visible.length} {visible.length === 1 ? "post" : "posts"}
        {tag ? ` tagged #${tag}` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="card p-6 text-sm text-soft">Nothing here yet under #{tag}.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((i) => (
            <div key={i.slug} className="animate-[fade-up_0.4s_ease]">
              {i.card}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-transparent bg-accent-soft text-accent"
          : "border-line bg-card text-soft hover:text-main"
      }`}
    >
      {children}
    </button>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 transition-colors ${
        active ? "bg-accent text-white" : "text-soft hover:text-main"
      }`}
    >
      {children}
    </button>
  );
}
