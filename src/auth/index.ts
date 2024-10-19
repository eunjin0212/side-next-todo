import NextAuth, { NextAuthConfig } from "next-auth";
import Google from 'next-auth/providers/google';

export const BASE_PATH = "/api/auth";
const authOptions: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  basePath: BASE_PATH,
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);