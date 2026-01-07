// Componente principal
export { default as MovieReviews } from "./index";

// Componentes individuais
export { MovieDetails } from "./details";
export { ReviewForm } from "./review-form";
export { ReviewItem } from "./review-item";
export { ReviewsList } from "./reviews-list";
export { StarRating } from "./star-rating";
export { StarRatingInput } from "./star-rating-input";

// Componentes reutilizáveis para modais e ações
export { EditReviewModal } from "./edit-review-modal";
export { DeleteReviewModal } from "./delete-review-modal";
export { ReviewActions } from "./review-actions";

// Utilitários
export { getContentType, formatContentTypeWithArticle } from "@/lib/utils";

// Tipos
export type {
  MovieDetailsProps,
  Review,
  UserReview,
  ReviewsState,
  ReviewsAction,
} from "./types";
