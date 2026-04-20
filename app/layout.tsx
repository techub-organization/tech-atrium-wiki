import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "tech-atrium-wiki",
  description: "Tech stack driven developer wiki frontend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
