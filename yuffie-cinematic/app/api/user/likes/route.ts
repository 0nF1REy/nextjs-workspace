import { NextResponse, type NextRequest } from "next/server";
import inMemoryStore from "@/lib/database/database";
import { getAuthenticatedUser } from "@/lib/auth/helpers";

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { reviewId } = (await req.json()) as { reviewId: string };
  if (!reviewId) {
    return NextResponse.json(
      { error: "reviewId é obrigatório" },
      { status: 400 }
    );
  }

  if (!inMemoryStore.userData[user.username]) {
    inMemoryStore.userData[user.username] = {};
  }
  if (!inMemoryStore.userData[user.username].likedReviewIds) {
    inMemoryStore.userData[user.username].likedReviewIds = [];
  }

  const userLikes = inMemoryStore.userData[user.username].likedReviewIds!;
  const isLiked = userLikes.includes(reviewId);

  if (isLiked) {
    inMemoryStore.userData[user.username].likedReviewIds = userLikes.filter(
      (id) => id !== reviewId
    );
  } else {
    userLikes.push(reviewId);
  }

  return NextResponse.json(
    inMemoryStore.userData[user.username].likedReviewIds
  );
}
