import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeReturnTo } from "@/lib/redirect";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const returnTo = safeReturnTo(searchParams.get("redirect_url")); // ← ĐỌC + sanitize boundary cuối

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // internal path ("/terms") -> prepend origin; absolute ("https://pomoduo…") -> dùng nguyên
      const target = returnTo
        ? returnTo.startsWith("/") ? `${origin}${returnTo}` : returnTo
        : "/";
      return NextResponse.redirect(target);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
