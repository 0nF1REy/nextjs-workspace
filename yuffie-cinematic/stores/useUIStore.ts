import { create } from "zustand";

interface UIState {
  // Estados de carregamento
  isLoading: boolean;
  loadingMessage: string;

  // Estados dos modais
  modals: {
    editReview: boolean;
    deleteReview: boolean;
    imageGallery: boolean;
    userProfile: boolean;
  };

  // Estado da pesquisa
  searchQuery: string;
  searchHistory: string[];

  // Tema e preferências
  theme: "dark" | "light";
  sidebarCollapsed: boolean;

  // Ações
  setLoading: (loading: boolean, message?: string) => void;
  toggleModal: (modal: keyof UIState["modals"]) => void;
  setModalOpen: (modal: keyof UIState["modals"], open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  resetUI: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Estado inicial
  isLoading: false,
  loadingMessage: "",

  modals: {
    editReview: false,
    deleteReview: false,
    imageGallery: false,
    userProfile: false,
  },

  searchQuery: "",
  searchHistory: [],

  theme: "dark",
  sidebarCollapsed: false,

  // Ações
  setLoading: (loading, message = "") =>
    set({
      isLoading: loading,
      loadingMessage: message,
    }),

  toggleModal: (modal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: !state.modals[modal],
      },
    })),

  setModalOpen: (modal, open) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: open,
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  addToSearchHistory: (query) =>
    set((state) => {
      if (!query.trim() || state.searchHistory.includes(query)) {
        return state;
      }

      const newHistory = [query, ...state.searchHistory.slice(0, 9)]; // Keep last 10
      return { searchHistory: newHistory };
    }),

  clearSearchHistory: () => set({ searchHistory: [] }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  resetUI: () =>
    set({
      isLoading: false,
      loadingMessage: "",
      modals: {
        editReview: false,
        deleteReview: false,
        imageGallery: false,
        userProfile: false,
      },
      searchQuery: "",
    }),
}));
