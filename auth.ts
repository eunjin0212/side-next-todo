import NextAuth from "next-auth"
import Google from 'next-auth/providers/google';

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  pages: {
    signIn: '/',
    signOut: '/',
  },
  basePath: BASE_PATH,
})