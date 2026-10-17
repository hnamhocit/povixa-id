import { ImageResponse } from "next/og";

export const alt = "Povixa ID — Unified Identity Vault";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0914",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.2) 0%, transparent 45%)",
        position: "relative",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Outer Glow Border Box */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          borderRadius: 32,
          padding: "50px 60px",
          backgroundColor: "rgba(18, 14, 34, 0.65)",
        }}
      >
        {/* Top Bar: Brand info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Povixa Cloud Logo</title>
              <defs>
                <linearGradient
                  id="povixa-og-grad"
                  x1="6"
                  y1="4"
                  x2="42"
                  y2="44"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              <rect
                x="4"
                y="4"
                width="40"
                height="40"
                rx="12"
                fill="#0B0914"
                stroke="url(#povixa-og-grad)"
                strokeWidth="2.5"
              />
              <path
                d="M17 34V14H26.5C30.0899 14 33 16.9101 33 20.5C33 24.0899 30.0899 27 26.5 27H21.5V34H17Z"
                fill="url(#povixa-og-grad)"
              />
              <circle cx="26" cy="20.5" r="2.5" fill="#0B0914" />
              <circle cx="34" cy="34" r="3" fill="#38BDF8" />
            </svg>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Povixa Cloud
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(56, 189, 248, 0.3)",
              backgroundColor: "rgba(56, 189, 248, 0.08)",
              padding: "6px 16px",
              borderRadius: 9999,
              color: "#38BDF8",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span>●</span>
            <span>Secure Unified Identity</span>
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Povixa ID
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#E2E8F0",
              lineHeight: 1.35,
              maxWidth: 780,
            }}
          >
            Một định danh cho toàn bộ hệ sinh thái kỹ thuật của bạn.
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#94A3B8",
              marginTop: 4,
            }}
          >
            Đăng nhập một lần • Bảo mật đa lớp • Pomoduo & Bonsai Reader
          </div>
        </div>

        {/* Bottom Feature Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#CBD5E1",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <span>⚡</span>
            <span>Single Sign-On (SSO)</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#CBD5E1",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <span>🛡️</span>
            <span>Identity Vault</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#CBD5E1",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <span>🔑</span>
            <span>OAuth & Magic Auth</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
