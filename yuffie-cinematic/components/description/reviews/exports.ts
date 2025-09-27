// Componente principal
export { default as MovieReviews } from "./index";

// Componentes individuais
export { MovieDetails } from "./details";
export { ReviewForm } from "./review-form";
export { ReviewItem } from "./review-item";
export { ReviewsList } from "./reviews-list";
export { StarRating } from "./star-rating";

// Utilitários
export {
  getContentType,
  formatContentTypeWithArticle,
  getAllUserReviews,
} from "./utils";

// Reducer
export { reviewsReducer } from "./reviews-reducer";

// Tipos
export type {
  MovieDetailsProps,
  Review,
  UserReview,
  ReviewsState,
  ReviewsAction,
} from "./types";
