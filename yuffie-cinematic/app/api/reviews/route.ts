import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import inMemoryStore from "@/lib/database/database";
import { UserReview } from "@/lib/user/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newReview: UserReview = {
    ...body,
    id: uuidv4(),
    date: new Date().toISOString(),
    likes: 0,
  };

  inMemoryStore.reviews.push(newReview);

  return NextResponse.json(newReview, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cinematicId = searchParams.get("cinematicId");
  const author = searchParams.get("author");

  let reviews = inMemoryStore.reviews;

  if (cinematicId) {
    reviews = reviews.filter((r) => r.cinematicId === cinematicId);
  }

  if (author) {
    reviews = reviews.filter((r) => r.author === author);
  }

  return NextResponse.json(reviews);
}
