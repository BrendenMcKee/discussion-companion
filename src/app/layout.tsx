import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Discussion Companion",
  description:
    "Web companion for Reddit: surface thread ideas from subreddits you pick and refine drafts before you post.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
