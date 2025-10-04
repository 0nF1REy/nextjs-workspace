import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoriteItem } from "@/lib/user/types";

interface FavoritesState {
  // Estado
  favorites: FavoriteItem[];

  // Ações
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: string) => void;
  toggleFavorite: (item: FavoriteItem) => boolean;
  clearFavorites: () => void;

  // Seletores (Getters)
  isFavorite: (itemId: string) => boolean;
  getFavoritesByType: (type: "movie" | "serie" | "anime") => FavoriteItem[];
  getFavoritesCount: () => number;
  getFavoritesByGenre: () => FavoriteItem[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      favorites: [],

      // Ações
      addFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === item.id);
          if (exists) return state;

          return {
            favorites: [...state.favorites, { ...item, timestamp: Date.now() }],
          };
        }),

      removeFavorite: (itemId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== itemId),
        })),

      toggleFavorite: (item) => {
        const state = get();
        const isFavorited = state.favorites.some((fav) => fav.id === item.id);

        if (isFavorited) {
          get().removeFavorite(item.id);
          return false;
        } else {
          get().addFavorite(item);
          return true;
        }
      },

      clearFavorites: () => set({ favorites: [] }),

      // Seletores (Getters)
      isFavorite: (itemId) => {
        const state = get();
        return state.favorites.some((fav) => fav.id === itemId);
      },

      getFavoritesByType: (type) => {
        const state = get();
        return state.favorites
          .filter((fav) => fav.type === type)
          .sort((a, b) => b.timestamp - a.timestamp);
      },

      getFavoritesCount: () => {
        const state = get();
        return state.favorites.length;
      },

      getFavoritesByGenre: () => {
        const state = get();
        return state.favorites.sort((a, b) => b.timestamp - a.timestamp);
      },
    }),
    {
      name: "yuffie-favorites-storage",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
