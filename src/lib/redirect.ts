const PARENT = ".povixa.cloud";

export function safeReturnTo(raw: string | null | undefined): string | null {
  if (!raw) return null;

  // internal path: /settings?tab=x
  if (raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("\\")) {
    if (/[\x00-\x1f\x7f]/.test(raw)) return null;
    return raw;
  }

  // absolute URL CÙNG parent (app con subdomain)
  try {
    const u = new URL(raw);
    if (process.env.NODE_ENV === "production" && u.protocol !== "https:") return null;
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (!(u.hostname === "povixa.cloud" || u.hostname.endsWith(PARENT))) return null; // endsWith có dấu chấm → chặn evilpovixa.cloud
    if (u.username || u.password) return null;
    return u.href;
  } catch {
    return null;
  }
}
