import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountDashboard } from "@/components/account-dashboard";

async function AccountContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Chưa đăng nhập → đá về login, quay lại /account sau khi auth xong
  if (!user) {
    redirect("/login?redirect_url=/");
  }

  // Map metadata từ provider (github/google/facebook)
  const meta = user.user_metadata ?? {};
  const mappedUser = {
    name: meta.full_name || meta.name || user.email?.split("@")[0] || "User",
    email: user.email ?? "",
    avatar: meta.avatar_url || meta.picture || null,
    provider: meta.provider || user.app_metadata?.provider || "email",
  };

  return <AccountDashboard user={mappedUser} />;
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-background" />}>
      <AccountContent />
    </Suspense>
  );
}
