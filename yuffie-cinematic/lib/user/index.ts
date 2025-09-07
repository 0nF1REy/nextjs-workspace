export * from "./types";
export * from "./users";
export * from "./storage";
export * from "./mock-data";

export const getLoggedUsername = (): string => {
  const user = getCurrentUser();
  return user ? user.username : "0nF1REy";
};

import { getCurrentUser } from "./users";
