import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Discussion Companion",
  description:
    "Early-stage web companion for Reddit: thread ideas and structured draft feedback.",
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
