"use server";

import { signIn as SignIn, signOut as SignOut } from "./index";

export async function signIn() {
  await SignIn();
}

export async function signOut() {
  await SignOut();
}