import { NextResponse, type NextRequest } from "next/server";
import inMemoryStore from "@/lib/database/database";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3];

  if (!id) {
    return NextResponse.json(
      { error: "ID da review faltando" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { content, rating } = body;

  const reviewIndex = inMemoryStore.reviews.findIndex((r) => r.id === id);

  if (reviewIndex === -1) {
    return NextResponse.json(
      { error: "Review não encontrada" },
      { status: 404 }
    );
  }

  inMemoryStore.reviews[reviewIndex] = {
    ...inMemoryStore.reviews[reviewIndex],
    content,
    rating,
  };

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

  const initialLength = inMemoryStore.reviews.length;
  inMemoryStore.reviews = inMemoryStore.reviews.filter((r) => r.id !== id);

  if (inMemoryStore.reviews.length === initialLength) {
    return NextResponse.json(
      { error: "Review não encontrada" },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}
