import type { Metadata } from "next";
import type { ReactNode } from 'react';
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "400 500 700",
});

export const metadata: Metadata = {
  title: "Next TODO",
  description: "For the best todo ever",
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
