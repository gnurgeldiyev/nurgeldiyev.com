import { ImageResponse } from "next/og";
import { getAllPosts, getPost, formatPostDate } from "@/lib/posts";
import { person, site } from "@/config/content";

export const alt = "Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Lately";
  const date = post ? formatPostDate(post.date) : "";
  const tags = post?.tags?.map((t) => `#${t}`).join("  ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f5",
          color: "#1a1a17",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#1f7a4d",
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {date}
        </div>

        <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.15, maxWidth: "1040px" }}>
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span style={{ display: "flex", color: "#8a897f" }}>{tags}</span>
          <span style={{ display: "flex", gap: "16px", color: "#52514a" }}>
            {person.name}
            <span style={{ color: "#1f7a4d", fontWeight: 700 }}>{site.url.replace("https://", "")}</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
