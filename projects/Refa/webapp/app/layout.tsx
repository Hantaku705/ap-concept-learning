import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReFa プロモーション変遷分析",
  description: "2019年〜2025年：インバウンド崩壊からの復活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
