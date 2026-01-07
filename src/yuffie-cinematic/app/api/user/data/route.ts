import { NextResponse } from "next/server";
import inMemoryStore from "@/lib/database/database";
import { getAuthenticatedUser } from "@/lib/auth/helpers";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const userData = inMemoryStore.userData[user.username] || {
    favorites: [],
    ratings: {},
    likedReviewIds: [],
  };

  return NextResponse.json(userData);
}
