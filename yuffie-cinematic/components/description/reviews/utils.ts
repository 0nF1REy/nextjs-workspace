import { movieItems } from "@/lib/items/movies";
import { seriesItems } from "@/lib/items/series";
import { animeItems } from "@/lib/items/animes";
import { getUserReviewsFromStorage } from "@/lib/user/storage";

// Função para detectar o tipo de conteúdo baseado no ID
export const getContentType = (
  cinematicId: string
): "filme" | "série" | "anime" => {
  const allItems = [...movieItems, ...seriesItems, ...animeItems];
  const item = allItems.find((item) => item.id === cinematicId);

  if (item?.type === "movie") return "filme";
  if (item?.type === "serie") return "série";
  if (item?.type === "anime") return "anime";

  // Fallback baseado no ID se não encontrar o item
  if (cinematicId.includes("movie") || cinematicId.includes("film"))
    return "filme";
  if (cinematicId.includes("series") || cinematicId.includes("serie"))
    return "série";
  if (cinematicId.includes("anime")) return "anime";

  // Default para filme se não conseguir identificar
  return "filme";
};

export function formatContentTypeWithArticle(type: string): string {
  const lower = type.toLowerCase();
  switch (lower) {
    case "filme":
      return "este filme";
    case "anime":
      return "este anime";
    case "série":
    case "serie":
      return "esta série";
    default:
      return "esta obra";
  }
}

// Função utilitária para obter todas as reviews de usuário
export const getAllUserReviews = () => {
  return getUserReviewsFromStorage();
};
