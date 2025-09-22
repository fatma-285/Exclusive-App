"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken() {
  const store = await cookies();
  const encodedToken =
    store.get("next-auth.session-token")?.value ||
    store.get("__Secure-next-auth.session-token")?.value;

  if (!encodedToken) return null;
  // //////////////////////////
  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decodedToken;
}
