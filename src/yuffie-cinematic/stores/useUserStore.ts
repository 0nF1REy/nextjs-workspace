import { create } from "zustand";
import { User } from "@/lib/user/types";

interface UserState {
  currentUser: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Estado inicial
  currentUser: null,

  // Ações simplificadas
  setUser: (user) => set({ currentUser: user }),

  updateUser: (updates) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updates }
        : null,
    })),
}));
