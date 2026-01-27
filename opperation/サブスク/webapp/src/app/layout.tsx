import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { CancellationGuideProvider } from "@/contexts/CancellationGuideContext";

export const metadata: Metadata = {
  title: "サブスク確認ツール",
  description: "サブスクリプションを可視化・管理するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <AuthProvider>
          <SubscriptionProvider>
            <CancellationGuideProvider>
              {children}
            </CancellationGuideProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
