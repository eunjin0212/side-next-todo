import type { Metadata } from "next";
import type { ReactNode } from 'react';
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "400 500 700",
});

const name = 'Eunjin Kim'

export const metadata: Metadata = {
  title: "Next TODO",
  applicationName: "Next TODO",
  description: "For the best todo ever",
  icons: "https://github.com/user-attachments/assets/c8212f4d-1985-4fad-ab6b-599740e3fd42",
  authors: { name },
  generator: "Next.js",
  keywords: "todo, todo list",
  referrer: "no-referrer-when-downgrade",
  themeColor: "#60a5fa",
  publisher: name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} font-pretendard antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
