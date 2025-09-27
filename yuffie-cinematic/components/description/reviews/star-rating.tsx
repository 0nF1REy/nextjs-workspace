import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { RATING_MAX } from "../StarRatingInteractive";

export function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = RATING_MAX - fullStars - (hasHalfStar ? 1 : 0);

  // Estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        className="text-yellow-400"
      />
    );
  }

  // Estrela pela metade
  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalfStroke}
        className="text-yellow-400"
      />
    );
  }

  // Estrelas vazias
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`empty-${i}`}
        icon={faStarRegular}
        className="text-gray-500"
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
}
