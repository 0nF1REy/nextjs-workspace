export * from "./types";
export * from "./users";
export * from "./mock-data";

import { getCurrentUser } from "./users";

export const getLoggedUserDisplayName = (): string => {
  const user = getCurrentUser();
  return user ? user.displayName || user.username || "Usuário" : "Usuário";
};
