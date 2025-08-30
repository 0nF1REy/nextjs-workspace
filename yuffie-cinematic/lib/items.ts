export type Item = {
  title: string;
  poster: string;
  video?: string | null;
  detail?: string;
  category: "filme" | "serie" | "anime";
};

export const items: Item[] = [
  {
    title: "Tempo de Matar",
    poster: "/assets/images/a-time-to-kill-1996.jpg",
    detail: "/movie-description",
    category: "filme",
  },
  {
    title: "Arquivo X",
    poster: "/assets/images/the-x-files-1993.jpg",
    detail: "/serie-description",
    category: "serie",
  },
  {
    title: "O Poderoso Chefão",
    poster: "/assets/images/the-godfather-1972.jpg",
    category: "filme",
  },
  {
    title: "Anjos Caídos",
    poster: "/assets/images/fallen-angels-1995.jpg",
    category: "anime",
  },
  {
    title: "Amadeus",
    poster: "/assets/images/amadeus-1984.jpg",
    category: "filme",
  },
  {
    title: "John Wick: Capítulo 2",
    poster: "/assets/images/john-wick-chapter-2-2017.jpg",
    category: "filme",
  },
  {
    title: "Ip Man",
    poster: "/assets/images/ip-man-2008.jpg",
    category: "filme",
  },
  {
    title: "Um Sonho de Liberdade",
    poster: "/assets/images/the-shawshank-redemption-1994.jpg",
    category: "filme",
  },
  {
    title: "Efeito Borboleta",
    poster: "/assets/images/the-butterfly-effect-2004.jpg",
    category: "serie",
  },
  {
    title: "O Jogo da Imitação",
    poster: "/assets/images/the-imitation-game-2014.jpg",
    category: "serie",
  },
  {
    title: "Parasita",
    poster: "/assets/images/parasite-2019.jpg",
    category: "serie",
  },
  {
    title: "De Volta para o Futuro",
    poster: "/assets/images/back-to-the-future-1985.jpg",
    category: "anime",
  },
  {
    title: "Um Tira da Pesada",
    poster: "/assets/images/beverly-hills-cop-1984.jpg",
    category: "anime",
  },
  {
    title: "Fuga de Nova York",
    poster: "/assets/images/escape-from-new-york-1981.jpg",
    category: "anime",
  },
];
