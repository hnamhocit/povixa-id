import Link from "next/link";
import type { ReactNode } from "react";
import { ModeToggle } from "@/components/ThemeToggle";

export type LegalAccent = "primary" | "success" | "info";

const A: Record<
  LegalAccent,
  { num: string; marker: string; link: string; chip: string; badge: string }
> = {
  primary: {
    num: "text-primary",
    marker: "[&_li::marker]:text-primary",
    link: "text-primary decoration-primary/30 underline-offset-4 hover:decoration-primary/70",
    chip: "border-primary/25 bg-primary/[0.08] text-primary",
    badge: "text-primary",
  },
  success: {
    num: "text-success",
    marker: "[&_li::marker]:text-success",
    link: "text-success decoration-success/30 underline-offset-4 hover:decoration-success/70",
    chip: "border-success/25 bg-success/[0.08] text-success",
    badge: "text-success",
  },
  info: {
    num: "text-info",
    marker: "[&_li::marker]:text-info",
    link: "text-info decoration-info/30 underline-offset-4 hover:decoration-info/70",
    chip: "border-info/25 bg-info/[0.08] text-info",
    badge: "text-info",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

export function LegalSection({
  n,
  title,
  accent = "primary",
  children,
}: {
  n?: number;
  title: string;
  accent?: LegalAccent;
  children: ReactNode;
}) {
  const a = A[accent];
  return (
    <section>
      <header className="mb-5 flex items-baseline gap-3 border-b border-border pb-3">
        {n != null && (
          <span className={`font-mono text-xs tabular-nums ${a.num}`}>{pad(n)}</span>
        )}
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      </header>

      {/* FIX: bỏ ${a.link} — body trung tính, accent chỉ còn ở marker */}
      <div
        className={`space-y-3 text-[15px] leading-7 text-foreground/80 [&_strong]:text-foreground [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 ${a.marker}`}
      >
        {children}
      </div>
    </section>
  );
}

export function LegalChip({
  accent = "primary",
  children,
}: {
  accent?: LegalAccent;
  children: ReactNode;
}) {
  const a = A[accent];
  return <span className={`rounded-full border px-2.5 py-1 text-xs ${a.chip}`}>{children}</span>;
}

export function LegalShell({
  title,
  updatedAt,
  badge,
  accent = "primary",
  backHref = "/login",
  footerLink,
  children,
}: {
  title: string;
  updatedAt: string;
  badge: string;
  accent?: LegalAccent;
  backHref?: string;
  footerLink?: { href: string; label: string };
  children: ReactNode;
}) {
  const a = A[accent];
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[oklch(0.985_0.006_85)] to-[oklch(0.965_0.009_85)] text-foreground dark:from-[oklch(0.145_0.012_285)] dark:to-[oklch(0.105_0.012_285)]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </Link>
          <ModeToggle />
        </div>

        <header className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <img src="/logo.svg" alt="Povixa" className="h-7 w-7" />
            <span className={`font-mono text-xs uppercase tracking-[0.22em] ${a.badge}`}>{badge}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Cập nhật lần cuối: <span className="font-mono text-foreground/80">{updatedAt}</span>
          </p>
        </header>

        <article className="space-y-10">{children}</article>

        <div className="mt-20 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© 2026 Povixa Cloud. All rights reserved.</p>
          {footerLink && (
            <Link href={footerLink.href} className={`text-sm underline ${a.link}`}>
              {footerLink.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
