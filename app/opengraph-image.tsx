import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#faf9f6",
          padding: "80px",
          borderLeft: "24px solid #0f766e",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, color: "#0f766e", marginTop: 12 }}>{profile.title}</div>
        <div
          style={{
            fontSize: 26,
            color: "#4b4b4b",
            marginTop: 32,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Python · Data pipelines · Backend architecture — Dhaka, Bangladesh
        </div>
        <div style={{ fontSize: 24, color: "#767676", marginTop: "auto" }}>mrityunjoydas.com</div>
      </div>
    ),
    size,
  );
}
