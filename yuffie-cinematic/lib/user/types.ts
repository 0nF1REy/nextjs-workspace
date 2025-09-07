export interface User {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
}

export interface UserProfile extends User {
  favoriteGenres?: string[];
  watchingStatus?: {
    watching: number;
    completed: number;
    planToWatch: number;
  };
}

// Interface centralizada para reviews
export interface UserReview {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  cinematicId: string;
  avatarSeed: string;
  likes: number;
}

// Interfaces para localStorage
export interface FavoriteItem {
  id: string;
  title: string;
  cover: string;
  type: "movie" | "serie" | "anime";
  timestamp: number;
}

export interface UserRating {
  movieId: string;
  rating: number;
  timestamp: number;
}
