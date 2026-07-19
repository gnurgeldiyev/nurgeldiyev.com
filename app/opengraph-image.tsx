import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { person, site } from "@/config/content";

export const alt = `${person.name} — ${person.jobTitle} at ${person.worksFor.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatar = await readFile(join(process.cwd(), "public/images/avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

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
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={132}
            height={132}
            alt=""
            style={{ borderRadius: "28px", objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, fontWeight: 700 }}>{person.name}</div>
            <div style={{ fontSize: 30, color: "#52514a" }}>
              {`${person.jobTitle} at ${person.worksFor.name}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 42, lineHeight: 1.35, maxWidth: "980px" }}>
          Helping people breathe clean air — notes, links, and things I love, from Leuven.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, color: "#1f7a4d", fontWeight: 700 }}>
            {site.url.replace("https://", "")}
          </div>
          <div style={{ fontSize: 30 }}>🇹🇲 🇪🇺</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
