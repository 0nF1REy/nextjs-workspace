import { NextResponse, type NextRequest } from "next/server";
import inMemoryStore from "@/lib/database/database";
import { getAuthenticatedUser } from "@/lib/auth/helpers";

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { movieId, rating } = (await req.json()) as {
    movieId: string;
    rating: number;
  };
  if (!inMemoryStore.userData[user.username]) {
    inMemoryStore.userData[user.username] = {};
  }
  if (!inMemoryStore.userData[user.username].ratings) {
    inMemoryStore.userData[user.username].ratings = {};
  }

  const userRatings = inMemoryStore.userData[user.username].ratings!;
  userRatings[movieId] = { movieId, rating, timestamp: Date.now() };

  return NextResponse.json(userRatings);
}
