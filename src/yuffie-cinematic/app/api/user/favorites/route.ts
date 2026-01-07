import { NextResponse, type NextRequest } from "next/server";
import inMemoryStore from "@/lib/database/database";
import { FavoriteItem } from "@/lib/user/types";
import { getAuthenticatedUser } from "@/lib/auth/helpers";

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const item = (await req.json()) as FavoriteItem;
  if (!inMemoryStore.userData[user.username]) {
    inMemoryStore.userData[user.username] = {};
  }
  if (!inMemoryStore.userData[user.username].favorites) {
    inMemoryStore.userData[user.username].favorites = [];
  }

  const userFavorites = inMemoryStore.userData[user.username].favorites!;
  const exists = userFavorites.some((fav) => fav.id === item.id);

  if (!exists) {
    userFavorites.push({ ...item, timestamp: Date.now() });
  }

  return NextResponse.json(userFavorites);
}

export async function DELETE(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json(
      { error: "itemId é obrigatório" },
      { status: 400 }
    );
  }

  if (inMemoryStore.userData[user.username]?.favorites) {
    inMemoryStore.userData[user.username].favorites = inMemoryStore.userData[
      user.username
    ].favorites!.filter((fav) => fav.id !== itemId);
  }

  return NextResponse.json(
    inMemoryStore.userData[user.username]?.favorites || []
  );
}
