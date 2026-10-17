import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0914",
        borderRadius: 36,
        padding: 24,
      }}
    >
      <svg
        width="132"
        height="132"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Povixa ID</title>
        <defs>
          <linearGradient
            id="povixa-grad-apple"
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
          fill="#120E22"
          stroke="url(#povixa-grad-apple)"
          strokeWidth="2.5"
        />
        <path
          d="M17 34V14H26.5C30.0899 14 33 16.9101 33 20.5C33 24.0899 30.0899 27 26.5 27H21.5V34H17Z"
          fill="url(#povixa-grad-apple)"
        />
        <circle cx="26" cy="20.5" r="2.5" fill="#120E22" />
        <circle cx="34" cy="34" r="3" fill="#38BDF8" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
