import { create } from "zustand";

interface UIState {
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  
  // Modal states
  modals: {
    editReview: boolean;
    deleteReview: boolean;
    imageGallery: boolean;
    userProfile: boolean;
  };
  
  // Search state
  searchQuery: string;
  searchHistory: string[];
  
  // Theme and preferences
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  
  // Actions
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
  // Initial state
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

  // Actions
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

  setSearchQuery: (query) =>
    set({ searchQuery: query }),

  addToSearchHistory: (query) =>
    set((state) => {
      if (!query.trim() || state.searchHistory.includes(query)) {
        return state;
      }
      
      const newHistory = [query, ...state.searchHistory.slice(0, 9)]; // Keep last 10
      return { searchHistory: newHistory };
    }),

  clearSearchHistory: () =>
    set({ searchHistory: [] }),

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
