import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { cookieDomain } from "@/lib/supabase/domains";

const PUBLIC = ["/login", "/terms", "/privacy"]; // mọi thứ KHÁC (kể cả "/") cần login

export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: cookieDomain(),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // ← đừng hardcode true
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (c) => {
          c.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          c.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname, search } = request.nextUrl;
  const isPublic = PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // (A) chưa login vào route protected CỦA ID → SINH redirect_url (internal path)
  if (!isPublic && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect_url", pathname + (search ?? "")); // ← producer
    return NextResponse.redirect(url);
  }

  // (B) đã login mà còn đứng ở /login → về "/", CLEAR query (anti-loop)
  if (pathname === "/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = ""; // ← clear, không carry redirect_url cũ
    return NextResponse.redirect(url);
  }

  // (C) /login?redirect_url=... từ APP CON → isPublic=true → rơi xuống đây, next() xuyên qua
  //     proxy KHÔNG đụng redirect_url. Nó đi nguyên vẹn xuống login page.
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
