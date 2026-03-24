import { UserReview, FavoriteItem, UserRating } from "../user/types";

interface UserData {
  favorites: FavoriteItem[];
  ratings: Record<string, UserRating>;
  likedReviewIds: string[];
}

const inMemoryStore = {
  reviews: [] as UserReview[],
  userData: {} as Record<string, Partial<UserData>>,
};

export default inMemoryStore;
