/**
 * Suy ra cookie domain cha cho SSO multi-subdomain.
 * - Deploy: mọi app (*.povixa.cloud) share cookie ".povixa.cloud".
 * - Dev (localhost): trả undefined -> cookie bind host hiện tại, dev vẫn chạy.
 *
 * CHẠY ĐƯỢC ở cả 3 runtime: Edge (proxy), Node (server.ts), Browser (client.ts).
 */
export function cookieDomain(host?: string | null): string | undefined {
  if (host) {
    const cleanHost = host.split(":")[0];
    return cleanHost.endsWith("povixa.cloud") ? ".povixa.cloud" : undefined;
  }
  if (typeof window === "undefined") {
    // server / proxy (Edge): không có window -> suy từ env
    const site = process.env.NEXT_PUBLIC_SITE_URL || "";
    return site.includes("povixa.cloud") ? ".povixa.cloud" : undefined;
  }
  // browser: đọc hostname thật
  return window.location.hostname.endsWith("povixa.cloud")
    ? ".povixa.cloud"
    : undefined;
}
