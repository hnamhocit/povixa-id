"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ThemeToggle";
import { SocialButton } from "@/components/social-button";
import { GithubIcon, GoogleIcon, FacebookIcon } from "@/components/icons/oauth-icons";
import { useAuthStore } from "@/stores/auth.store";

export function LoginContent() {
  const { error, clearError } = useAuthStore();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground lg:grid lg:grid-cols-2">
      <div className="absolute right-4 top-4 z-50 lg:right-8 lg:top-8"><ModeToggle /></div>

      {/* LEFT COLUMN (Brand) — giữ nguyên UI bạn đang có */}
      <div className="relative hidden overflow-hidden border-r border-border bg-card/30 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-info/20 blur-[140px]" />
        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.svg" alt="Povixa ID" className="h-8 w-8 rounded-lg shadow-md" />
          <span className="text-lg font-semibold tracking-tight">Povixa Cloud</span>
        </div>
        <div className="relative z-10 my-auto max-w-md">
          <div className="mb-6 inline-block rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">Secure Unified Identity</div>
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-foreground">Một định danh cho toàn bộ hệ sinh thái kỹ thuật của bạn.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Đăng nhập một lần để truy cập liền mạch vào Pomoduo, Bonsai Reader và các công cụ khác.</p>
        </div>
        <div className="relative z-10 font-mono text-xs text-muted-foreground">System Status: Operational • v1.2.0</div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="relative flex min-h-screen items-center justify-center p-8 lg:min-h-0 lg:p-16">
        <div className="w-full max-w-[380px] space-y-6">
          <div className="space-y-2">
            <div className="mb-6 flex items-center gap-2.5 lg:hidden">
              <img src="/logo.svg" alt="Povixa ID" className="h-7 w-7 rounded-md" />
              <span className="text-base font-semibold">Povixa ID</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground">Chọn phương thức xác thực an toàn.</p>
          </div>

          {error && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
              <div className="flex justify-between items-start gap-2">
                <span>{error}</span>
                <button onClick={clearError} className="hover:text-destructive/80">×</button>
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            {/* KHÔNG truyền returnTo — button tự đọc location lúc click */}
            <SocialButton provider="google" label="Tiếp tục với Google" icon={<GoogleIcon />} />
            <SocialButton provider="github" label="Tiếp tục với GitHub" icon={<GithubIcon />} />
            <SocialButton provider="facebook" label="Tiếp tục với Facebook" icon={<FacebookIcon />} />
          </div>

          <p className="pt-4 text-center text-xs text-muted-foreground">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <Link href="/terms" className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">Điều khoản</Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">Bảo mật</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
