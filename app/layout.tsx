import type { Metadata } from "next";
import { Be_Vietnam_Pro, DM_Mono } from "next/font/google";
import { profile, siteUrl } from "@/lib/portfolio";
import "./globals.css";

// Font chính cho CẢ site. Trang tham khảo dùng Poppins + DM Sans, nhưng cả hai
// (và DM Mono) đều **không có subset vietnamese** — unicode-range của chúng bỏ
// trống U+1EA0–1EF1, đúng chỗ chứa ả/ệ/ứ/ị… nên chữ Việt ở app gia phả sẽ rơi
// về font hệ thống theo từng ký tự. Be Vietnam Pro là geometric sans gần giống,
// có đủ subset vietnamese và weight 400–800.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// Chỉ dùng cho nhãn nhỏ THUẦN ASCII (eyebrow, counter carousel, năm) — DM Mono
// không có tiếng Việt, đừng đưa chữ Việt vào `font-mono`.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

// `lang="en"` vì portfolio là site chính. Subtree gia phả (/apps/family-tree)
// là tiếng Việt và tự đặt `lang="vi"` trong layout của nó — <html lang> chỉ
// đặt được ở root.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role} — Swift, SwiftUI, React Native`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnam.variable} ${dmMono.variable} font-sans antialiased relative`}
      >
        {children}
      </body>
    </html>
  );
}
