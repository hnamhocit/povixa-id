"use client";

import { motion } from "framer-motion";
import { useAuthStore, type Provider } from "@/stores/auth.store";
import { signInWithOAuth } from "@/lib/auth-actions";
import { safeReturnTo } from "@/lib/redirect";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  provider: Provider;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export function SocialButton({ provider, label, icon, className }: SocialButtonProps) {
  const { isLoading, startLoading, stopLoading, setError } = useAuthStore();
  const isThisLoading = isLoading === provider;
  const isAnyLoading = isLoading !== null;

  const handleClick = async () => {
    if (isAnyLoading) return;
    startLoading(provider);
    try {
      // đọc lúc-tương-tác, KHÔNG phải lúc-render → không chạm runtime data của Next
      const raw = new URLSearchParams(window.location.search).get("redirect_url");
      const returnTo = safeReturnTo(raw); // null → action sẽ omit, callback fallback "/"
      await signInWithOAuth(provider, returnTo ?? undefined);
    } catch (err) {
      console.error(`OAuth ${provider} failed:`, err);
      stopLoading();
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isAnyLoading}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span>{label}</span>
      {isThisLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </motion.button>
  );
}
