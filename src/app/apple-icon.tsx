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
          background: "#191715",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderRadius: 99,
            background: "#f5f4f0",
            left: 92,
            top: 58,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: 99,
            background: "#f5f4f0",
            opacity: 0.45,
            left: 58,
            top: 112,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
