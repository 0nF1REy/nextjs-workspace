import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/user/types";

interface UserState {
  // Estado
  currentUser: User | null;
  isLoggedIn: boolean;

  // Ações
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearUserData: () => void;

  // Seletores (Getters)
  getCurrentUser: () => User | null;
  getUserId: () => string | null;
  getUsername: () => string | null;
}

const DEFAULT_USER: User = {
  id: "0nF1REy",
  username: "0nF1REy",
  displayName: "Alan Ryan",
  avatar: "/assets/images/profile-avatar/alan-ryan.jpg",
  bio: "Dono e administrador do site",
  joinDate: "2025-10-01",
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Estado inicial - auto login com usuário padrão
      currentUser: DEFAULT_USER,
      isLoggedIn: true,

      // Ações
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

      // Função para limpar dados e resetar
      clearUserData: () => {
        // Remove dados do localStorage
        localStorage.removeItem("user-store");
        localStorage.removeItem("yuffie-migrated-to-zustand");

        // Reseta para o estado inicial
        set(() => ({
          currentUser: DEFAULT_USER,
          isLoggedIn: true,
        }));

        if (process.env.NODE_ENV === "development") {
          console.log("Dados do usuário limpos e resetados para padrão");
        }
      },

      // Seletores (Getters)
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
