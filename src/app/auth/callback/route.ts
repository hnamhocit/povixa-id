import { NextResponse } from "next/server";
import { safeReturnTo } from "@/lib/redirect";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;
  const code = searchParams.get("code");
  const returnTo = safeReturnTo(searchParams.get("redirect_url")); // ← ĐỌC + sanitize boundary cuối

  // Detect public origin through reverse proxies (Nginx / Cloudflare / Coolify / Docker)
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ||
    (forwardedHost?.includes("localhost") ||
    forwardedHost?.includes("127.0.0.1")
      ? "http"
      : "https");
  const origin = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // internal path ("/terms") -> prepend origin; absolute ("https://pomoduo…") -> dùng nguyên
      const target = returnTo
        ? returnTo.startsWith("/")
          ? `${origin}${returnTo}`
          : returnTo
        : `${origin}/`;
      return NextResponse.redirect(target);
    }
    console.error(
      "[Auth Callback] exchangeCodeForSession failed:",
      error.message,
      error,
    );
  } else {
    console.warn(
      "[Auth Callback] No code provided in callback search parameters",
    );
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
