import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import inMemoryStore from "@/lib/database/database";
import { UserReview } from "@/lib/user/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getUserByUsername } from "@/lib/user/users";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET não está definido nas variáveis de ambiente.");
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(sessionCookie, secretKey);
    const username = payload.username as string;
    if (!username) return null;

    return getUserByUsername(username);
  } catch (error) {
    console.log("Falha ao verificar o token da sessão:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const newReview: UserReview = {
    content: body.content,
    rating: body.rating,
    cinematicId: body.cinematicId,
    id: uuidv4(),
    author: user.username,
    avatarSeed: user.avatar || `https://i.pravatar.cc/300?u=${user.username}`,
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
