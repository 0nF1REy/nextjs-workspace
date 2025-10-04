import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/user/types";

interface UserState {
  // State
  currentUser: User | null;
  isLoggedIn: boolean;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Getters
  getCurrentUser: () => User | null;
  getUserId: () => string | null;
  getUsername: () => string | null;
}

const DEFAULT_USER: User = {
  id: "0nF1REy",
  username: "FireyGamer",
  displayName: "Firey Gamer",
  avatar: "/assets/images/profile-avatar/user-avatar.png",
  bio: "Amante de filmes, séries e animes. Sempre em busca de novas experiências cinematográficas!",
  joinDate: "2023-01-15",
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state - auto login com usuário padrão
      currentUser: DEFAULT_USER,
      isLoggedIn: true,

      // Actions
      login: (user) =>
        set({
          currentUser: user,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          currentUser: null,
          isLoggedIn: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        })),

      // Getters
      getCurrentUser: () => {
        const state = get();
        return state.currentUser;
      },

      getUserId: () => {
        const state = get();
        return state.currentUser?.id || null;
      },

      getUsername: () => {
        const state = get();
        return state.currentUser?.username || null;
      },
    }),
    {
      name: "yuffie-user-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
