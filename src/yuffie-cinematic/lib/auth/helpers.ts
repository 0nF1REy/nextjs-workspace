import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getUserByUsername } from "@/lib/user/users";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(sessionCookie, secretKey);
    const username = payload.username as string;
    if (!username) return null;

    return getUserByUsername(username);
  } catch {
    return null;
  }
}
