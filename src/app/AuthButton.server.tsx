import { SessionProvider } from "next-auth/react";
import { BASE_PATH } from "@/auth";

import AuthButtonClient from "./AuthButton.client";
import { Session } from 'next-auth';

export default function AuthButton({ session }: { session?: Session }) {
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}