import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upasana Prabhakar — Full-Stack Developer & AI Builder",
  description: "Full-Stack Developer and AI systems builder. Top 7 at HackFest 2, GDG Cloud New Delhi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}