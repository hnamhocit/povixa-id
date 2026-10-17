import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Povixa ID — Unified Identity Vault",
    short_name: "Povixa ID",
    description:
      "Cổng định danh và xác thực tập trung cho hệ sinh thái Povixa Cloud.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0914",
    theme_color: "#7C3AED",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
