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
  icons: "https://github.com/user-attachments/assets/805af5d2-4709-4554-a13b-520e040ae11a",
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
