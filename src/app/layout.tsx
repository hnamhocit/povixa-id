import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://id.povixa.cloud";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0914" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Povixa ID — Unified Identity Vault",
    template: "%s | Povixa ID",
  },
  description:
    "Một định danh cho toàn bộ hệ sinh thái kỹ thuật Povixa Cloud. Đăng nhập an toàn, bảo mật và liền mạch vào Pomoduo, Bonsai Reader và các ứng dụng.",
  applicationName: "Povixa ID",
  authors: [{ name: "Povixa Cloud", url: "https://povixa.cloud" }],
  generator: "Next.js",
  keywords: [
    "Povixa ID",
    "Povixa Cloud",
    "SSO",
    "Single Sign-On",
    "Identity Vault",
    "Xác thực tập trung",
    "Pomoduo",
    "Bonsai Reader",
    "OAuth2",
    "Bảo mật tài khoản",
  ],
  creator: "Povixa Cloud",
  publisher: "Povixa Cloud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.svg"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Povixa ID",
    title: "Povixa ID — Unified Identity Vault",
    description:
      "Một định danh cho toàn bộ hệ sinh thái kỹ thuật của bạn. Đăng nhập một lần, bảo mật và liền mạch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Povixa ID — Unified Identity Vault",
    description:
      "Một định danh cho toàn bộ hệ sinh thái kỹ thuật của bạn. Đăng nhập một lần, bảo mật và liền mạch.",
    creator: "@povixacloud",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "authentication",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Povixa Cloud",
      url: "https://povixa.cloud",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Povixa ID",
      description:
        "Unified Identity Vault & Single Sign-On for the Povixa Cloud ecosystem.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "vi-VN",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
