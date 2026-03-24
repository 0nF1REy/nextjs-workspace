import { NextResponse, type NextRequest } from "next/server";
import inMemoryStore from "@/lib/database/database";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3];

  if (!id) {
    return NextResponse.json(
      { error: "ID da review faltando" },
      { status: 400 }
    );
  }

  const reviewIndex = inMemoryStore.reviews.findIndex((r) => r.id === id);

  if (reviewIndex === -1) {
    return NextResponse.json(
      { error: "Review não encontrada" },
      { status: 404 }
    );
  }

  inMemoryStore.reviews[reviewIndex].likes =
    (inMemoryStore.reviews[reviewIndex].likes || 0) + 1;

  return NextResponse.json(inMemoryStore.reviews[reviewIndex]);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3];

  if (!id) {
    return NextResponse.json(
      { error: "ID da review faltando" },
      { status: 400 }
    );
  }

  const reviewIndex = inMemoryStore.reviews.findIndex((r) => r.id === id);

  if (reviewIndex === -1) {
    return NextResponse.json(
      { error: "Review não encontrada" },
      { status: 404 }
    );
  }

  const currentLikes = inMemoryStore.reviews[reviewIndex].likes || 0;
  inMemoryStore.reviews[reviewIndex].likes = Math.max(0, currentLikes - 1);

  return NextResponse.json(inMemoryStore.reviews[reviewIndex]);
}
