import { create } from "zustand";
import { FavoriteItem } from "@/lib/user/types";

interface FavoritesState {
  favorites: FavoriteItem[];
  setFavorites: (favorites: FavoriteItem[]) => void;
  toggleFavorite: (item: FavoriteItem) => Promise<boolean>;
  isFavorite: (itemId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  toggleFavorite: async (item) => {
    const isCurrentlyFavorite = get().isFavorite(item.id);
    const currentFavorites = get().favorites;

    const optimisticFavorites = isCurrentlyFavorite
      ? currentFavorites.filter((fav) => fav.id !== item.id)
      : [...currentFavorites, { ...item, timestamp: Date.now() }];

    set({ favorites: optimisticFavorites });

    try {
      if (isCurrentlyFavorite) {
        await fetch(`/api/user/favorites?itemId=${item.id}`, {
          method: "DELETE",
        });
      } else {
        await fetch("/api/user/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      return !isCurrentlyFavorite;
    } catch {
      set({ favorites: currentFavorites });
      return isCurrentlyFavorite;
    }
  },
  isFavorite: (itemId) => {
    return get().favorites.some((fav) => fav.id === itemId);
  },
}));
