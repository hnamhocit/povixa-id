import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AccountDashboard } from "@/components/account-dashboard";
import type { SystemApp, UserApp } from "@/lib/app-actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Tài khoản",
  description: "Quản lý tài khoản và bảo mật định danh Povixa ID.",
  robots: {
    index: false,
    follow: false,
  },
};

async function AccountContent() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Chưa đăng nhập → đá về login, quay lại /account sau khi auth xong
  if (!user) {
    redirect("/login?redirect_url=/");
  }

  // Fetch danh sách system_apps & user_apps từ Supabase
  let systemApps: SystemApp[] = [];
  let userApps: UserApp[] = [];

  try {
    const [
      { data: sysData, error: sysError },
      { data: usrData, error: usrError },
    ] = await Promise.all([
      supabase
        .from("system_apps")
        .select(
          "id, name, url, icon_url, is_pinned, dock_order, grid_col, grid_row, created_at",
        )
        .order("dock_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("user_apps")
        .select(
          "id, name, url, icon_url, is_pinned, dock_order, grid_col, grid_row, created_at",
        )
        .order("dock_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

    if (!sysError && sysData) systemApps = sysData;
    if (!usrError && usrData) userApps = usrData;
  } catch (err) {
    console.warn("Lỗi khi tải apps từ Supabase:", err);
  }

  // Map metadata từ provider (github/google/facebook)
  const meta = user.user_metadata ?? {};
  const mappedUser = {
    name: meta.full_name || meta.name || user.email?.split("@")[0] || "User",
    email: user.email ?? "",
    avatar: meta.avatar_url || meta.picture || null,
    provider: meta.provider || user.app_metadata?.provider || "email",
  };

  return (
    <AccountDashboard
      user={mappedUser}
      initialSystemApps={systemApps}
      initialUserApps={userApps}
    />
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background" />
      }
    >
      <AccountContent />
    </Suspense>
  );
}
