import type { Metadata } from "next";
import type { ReactNode } from 'react';

import { SessionProvider } from "next-auth/react";
import { BASE_PATH } from "/auth";
import localFont from "next/font/local";
import Header from '@/components/Header';
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
  publisher: name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider basePath={BASE_PATH}>
        <body
          className={`${pretendard.variable} font-pretendard antialiased`}
        >
          <Header />
          <main>{children}</main>
        </body>
      </SessionProvider>

    </html>
  );
}
