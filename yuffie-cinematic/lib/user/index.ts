export * from "./types";
export * from "./users";
export * from "./storage";
export * from "./mock-data";

import { getCurrentUser } from "./users";

export const getLoggedUsername = (): string | null => {
  // Primeiro tenta usar o useAuth (sessionStorage)
  if (typeof window !== "undefined") {
    try {
      const authUser = sessionStorage.getItem("authenticated-user");
      if (authUser) {
        const parsedUser = JSON.parse(authUser);
        return parsedUser.username || null;
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário autenticado:", error);
    }
  }
  
  // Se não há usuário autenticado, retorna null
  return null;
};

export const getLoggedUserId = (): string | null => {
  // Primeiro tenta usar o useAuth (sessionStorage)
  if (typeof window !== "undefined") {
    try {
      const authUser = sessionStorage.getItem("authenticated-user");
      if (authUser) {
        const parsedUser = JSON.parse(authUser);
        return parsedUser.id || null;
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário autenticado:", error);
    }
  }
  
  // Se não há usuário autenticado, retorna null
  return null;
};

export const getLoggedUserDisplayName = (): string => {
  const user = getCurrentUser();
  return user ? (user.displayName || user.username || "Usuário") : "Usuário";
};
