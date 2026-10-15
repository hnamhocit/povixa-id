"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { safeReturnTo } from "@/lib/redirect";

type Provider = "github" | "google" | "facebook";

export async function signInWithOAuth(provider: Provider, returnTo?: string) {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
