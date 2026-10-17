"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeReturnTo } from "@/lib/redirect";
import { createClient } from "@/lib/supabase/server";

type Provider = "github" | "google" | "facebook";

export async function signInWithOAuth(provider: Provider, returnTo?: string) {
  const supabase = await createClient();

  let detectedOrigin: string | undefined;
  try {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") || headerList.get("host");
    if (host) {
      const proto =
        headerList.get("x-forwarded-proto") ||
        (host.includes("localhost") || host.includes("127.0.0.1")
          ? "http"
          : "https");
      detectedOrigin = `${proto}://${host}`;
    }
  } catch {
    // fallback nếu không có header context
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    detectedOrigin ||
    "http://localhost:3000";

  const safe = safeReturnTo(returnTo); // sanitize lần giữa (client có thể bị sửa)
  const cb = new URL(`${siteUrl}/auth/callback`);
  if (safe) cb.searchParams.set("redirect_url", safe);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: cb.toString() },
  });

  if (error) throw new Error(error.message);
  if (data?.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
