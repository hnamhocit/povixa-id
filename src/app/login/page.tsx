import type { Metadata } from "next";
import { LoginContent } from "@/components/login-content";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập một lần an toàn vào Povixa ID để truy cập toàn bộ hệ sinh thái Povixa Cloud.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return <LoginContent />;
}
