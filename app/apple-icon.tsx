import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f7a4d",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        g
      </div>
    ),
    { ...size }
  );
}
