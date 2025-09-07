import { UserProfile, UserReview } from "./types";
import {
  getUserReviewsFromStorage,
  getFavoritesFromStorage,
  getUserRatings,
} from "./storage";
import {
  simulatedUserReviews,
  simulatedUserFavorites,
  simulatedUserRatings,
} from "./mock-data";

export const users: UserProfile[] = [
  {
    id: "0nF1REy",
    username: "0nF1REy",
    displayName: "Alan Ryan",
    avatar: "/assets/images/profile-avatar/alan-ryan.jpg",
    bio: "Dono e administrador do site",
    joinDate: "2025-10-01",
    favoriteGenres: ["Sci-Fi", "Crime", "Anime", "Mystery"],
  },
  {
    id: "CineMaster",
    username: "CineMaster",
    displayName: "Cinema Master",
    avatar: "https://i.pravatar.cc/300?u=CineMaster",
    bio: "Crítico de cinema independente. Amo filmes clássicos e produções indie.",
    joinDate: "2023-08-22",
    favoriteGenres: ["Drama", "Crime", "Mystery", "Biography"],
  },
  {
    id: "AnimeOtaku",
    username: "AnimeOtaku",
    displayName: "Otaku Supreme",
    avatar: "https://i.pravatar.cc/300?u=AnimeOtaku",
    bio: "Viciado em animes desde criança. Especialista em shounen e seinen!",
    joinDate: "2024-03-10",
    favoriteGenres: ["Anime", "Action", "Adventure", "Fantasy"],
  },
  {
    id: "HorrorFan",
    username: "HorrorFan",
    displayName: "Night Terror",
    avatar: "https://i.pravatar.cc/300?u=HorrorFan",
    bio: "Se não tem terror, não me interessa. Quanto mais assustador, melhor!",
    joinDate: "2023-10-31",
    favoriteGenres: ["Horror", "Thriller", "Supernatural", "Mystery"],
  },
];

// Usuário logado atual
export const CURRENT_USER_ID = "0nF1REy";

// Função para buscar usuário por ID
export const getUserById = (id: string): UserProfile | undefined => {
  return users.find((user) => user.id === id);
};

// Função para buscar usuário por username
export const getUserByUsername = (
  username: string
): UserProfile | undefined => {
  return users.find((user) => user.username === username);
};

// Função para obter o usuário logado
export const getCurrentUser = (): UserProfile | undefined => {
  return getUserById(CURRENT_USER_ID);
};

// Função para obter usuário com stats dinâmicos
export const getUserWithStats = (
  username: string
):
  | (UserProfile & {
      watchingStatus?: {
        watching: number;
        completed: number;
        planToWatch: number;
      };
    })
  | undefined => {
  const user = getUserByUsername(username);
  if (!user) return undefined;

  const stats = getUserStats(username);

  return {
    ...user,
    watchingStatus: {
      watching: Math.floor(stats.totalFavorites * 0.1),
      completed: stats.totalReviews,
      planToWatch: Math.floor(stats.totalFavorites * 0.3),
    },
  };
};

// Função para calcular stats dinamicamente
export const getUserStats = (username?: string) => {
  const currentUsername = username || getCurrentUser()?.username || "0nF1REy";

  // Para o usuário logado, usar localStorage
  if (currentUsername === "0nF1REy") {
    const reviews = getUserReviewsFromStorage().filter(
      (r: UserReview) => r.author === currentUsername
    );
    const favorites = getFavoritesFromStorage();
    const ratings = getUserRatings();

    return {
      totalReviews: reviews.length,
      totalFavorites: favorites.length,
      totalRatings: ratings.length,
    };
  }

  // Para outros usuários, usar dados simulados
  const userReviews = simulatedUserReviews.filter(
    (r) => r.author === currentUsername
  );
  const userFavorites = simulatedUserFavorites[currentUsername] || [];
  const userRatings = simulatedUserRatings[currentUsername] || [];

  return {
    totalReviews: userReviews.length,
    totalFavorites: userFavorites.length,
    totalRatings: userRatings.length,
  };
};

// Função para obter reviews simuladas de um usuário
export const getSimulatedUserReviews = (username: string) => {
  return simulatedUserReviews.filter((review) => review.author === username);
};

// Função para obter favoritos simulados de um usuário
export const getSimulatedUserFavorites = (username: string) => {
  return simulatedUserFavorites[username] || [];
};

// Função para obter ratings simulados de um usuário
export const getSimulatedUserRatings = (username: string) => {
  return simulatedUserRatings[username] || [];
};

// Função para verificar se um usuário existe
export const userExists = (id: string): boolean => {
  return users.some((user) => user.id === id);
};

// Função para listar todos os usuários
export const getAllUsers = (): UserProfile[] => {
  return users;
};
