import { UserReview, FavoriteItem, UserRating } from "./types";

export const simulatedUserReviews: UserReview[] = [
  // CineMaster Reviews
  {
    id: "review-cm-1",
    author: "CineMaster",
    content:
      "The Godfather é simplesmente o melhor filme já feito. A direção de Coppola, a atuação de Marlon Brando e a trilha sonora criam uma experiência cinematográfica perfeita. Uma obra-prima atemporal.",
    rating: 5,
    date: "2024-08-15T14:30:00.000Z",
    cinematicId: "the-godfather",
    avatarSeed: "CineMaster",
    likes: 45,
  },
  {
    id: "review-cm-2",
    author: "CineMaster",
    content:
      "Amadeus é uma biografia musical brilhante. A trilha sonora de Mozart é divina e F. Murray Abraham entrega uma performance excepcional como Salieri. Cinema de alta qualidade.",
    rating: 5,
    date: "2024-07-22T19:45:00.000Z",
    cinematicId: "amadeus",
    avatarSeed: "CineMaster",
    likes: 31,
  },
  {
    id: "review-cm-3",
    author: "CineMaster",
    content:
      "A Time to Kill aborda questões sociais profundas com uma narrativa envolvente. Matthew McConaughey e Sandra Bullock estão excelentes. Um drama jurídico poderoso.",
    rating: 4,
    date: "2024-06-10T16:20:00.000Z",
    cinematicId: "a-time-to-kill",
    avatarSeed: "CineMaster",
    likes: 23,
  },
  {
    id: "review-cm-4",
    author: "CineMaster",
    content:
      "The Imitation Game conta a história fascinante de Alan Turing. Benedict Cumberbatch está magnífico e a direção é impecável. Um filme importante sobre um herói subestimado.",
    rating: 5,
    date: "2024-05-18T20:15:00.000Z",
    cinematicId: "imitation-game",
    avatarSeed: "CineMaster",
    likes: 38,
  },

  // AnimeOtaku Reviews
  {
    id: "review-ao-1",
    author: "AnimeOtaku",
    content:
      "Steins;Gate é um anime de viagem no tempo absolutamente genial! A construção da narrativa é perfeita e os personagens são cativantes. Um dos melhores animes já feitos!",
    rating: 5,
    date: "2024-08-20T21:15:00.000Z",
    cinematicId: "steins-gate",
    avatarSeed: "AnimeOtaku",
    likes: 89,
  },
  {
    id: "review-ao-2",
    author: "AnimeOtaku",
    content:
      "Cowboy Bebop é uma obra-prima atemporal! A trilha sonora jazz é incrível e cada episódio é uma pequena obra de arte. Spike Spiegel é icônico!",
    rating: 5,
    date: "2024-08-05T18:30:00.000Z",
    cinematicId: "cowboy-bebop",
    avatarSeed: "AnimeOtaku",
    likes: 78,
  },
  {
    id: "review-ao-3",
    author: "AnimeOtaku",
    content:
      "Fullmetal Alchemist tem uma das melhores histórias do anime. A alquimia, os personagens complexos e as questões morais fazem deste anime uma experiência única.",
    rating: 5,
    date: "2024-07-18T20:45:00.000Z",
    cinematicId: "fullmetal-alchemist",
    avatarSeed: "AnimeOtaku",
    likes: 67,
  },
  {
    id: "review-ao-4",
    author: "AnimeOtaku",
    content:
      "Perfect Blue é um thriller psicológico perturbador e brilhante. Satoshi Kon criou uma obra-prima que questiona a realidade e a identidade. Simplesmente genial!",
    rating: 5,
    date: "2024-06-25T19:30:00.000Z",
    cinematicId: "perfect-blue",
    avatarSeed: "AnimeOtaku",
    likes: 56,
  },

  // HorrorFan Reviews
  {
    id: "review-hf-1",
    author: "HorrorFan",
    content:
      "The X-Files é a série de investigação paranormal definitiva! Mulder e Scully têm uma química incrível e cada episódio é uma pequena obra de terror/mistério.",
    rating: 5,
    date: "2024-08-25T23:30:00.000Z",
    cinematicId: "the-x-files",
    avatarSeed: "HorrorFan",
    likes: 73,
  },
  {
    id: "review-hf-2",
    author: "HorrorFan",
    content:
      "Supernatural começou como uma série de terror sobrenatural incrível. As primeiras temporadas são puro ouro com monstros assustadores e uma atmosfera sombria.",
    rating: 4,
    date: "2024-08-12T22:15:00.000Z",
    cinematicId: "supernatural",
    avatarSeed: "HorrorFan",
    likes: 42,
  },
  {
    id: "review-hf-3",
    author: "HorrorFan",
    content:
      "Stranger Things captura perfeitamente a nostalgia dos anos 80 com elementos sobrenaturais assustadores. O Demogorgon ainda me dá arrepios!",
    rating: 4,
    date: "2024-07-28T21:00:00.000Z",
    cinematicId: "stranger-things",
    avatarSeed: "HorrorFan",
    likes: 61,
  },
  {
    id: "review-hf-4",
    author: "HorrorFan",
    content:
      "They Live é um clássico cult de John Carpenter! A crítica social disfarçada de filme de ficção científica é genial. 'I have come here to chew bubblegum and kick ass!'",
    rating: 4,
    date: "2024-06-15T20:45:00.000Z",
    cinematicId: "they-live",
    avatarSeed: "HorrorFan",
    likes: 35,
  },
];

export const simulatedUserFavorites: Record<string, FavoriteItem[]> = {
  CineMaster: [
    {
      id: "the-godfather",
      title: "The Godfather",
      cover: "/assets/images/movies/the-godfather-1972.jpg",
      type: "movie",
      timestamp: 1692112800000,
    },
    {
      id: "amadeus",
      title: "Amadeus",
      cover: "/assets/images/movies/amadeus-1984.jpg",
      type: "movie",
      timestamp: 1691854400000,
    },
    {
      id: "shawshank-redemption",
      title: "Shawshank Redemption",
      cover: "/assets/images/movies/the-shawshank-redemption-1994.jpg",
      type: "movie",
      timestamp: 1691768000000,
    },
    {
      id: "a-time-to-kill",
      title: "A Time to Kill",
      cover: "/assets/images/movies/a-time-to-kill-1996.jpg",
      type: "movie",
      timestamp: 1691681600000,
    },
    {
      id: "imitation-game",
      title: "The Imitation Game",
      cover: "/assets/images/movies/the-imitation-game-2014.jpg",
      type: "movie",
      timestamp: 1691595200000,
    },
  ],
  AnimeOtaku: [
    {
      id: "steins-gate",
      title: "Steins;Gate",
      cover: "/assets/images/animes/steins-gate-2011.jpg",
      type: "anime",
      timestamp: 1692371200000,
    },
    {
      id: "cowboy-bebop",
      title: "Cowboy Bebop",
      cover: "/assets/images/animes/cowboy-bebop-1998.jpg",
      type: "anime",
      timestamp: 1692284800000,
    },
    {
      id: "fullmetal-alchemist",
      title: "Fullmetal Alchemist",
      cover: "/assets/images/animes/fullmetal-alchemist-2003.jpg",
      type: "anime",
      timestamp: 1692198400000,
    },
    {
      id: "perfect-blue",
      title: "Perfect Blue",
      cover: "/assets/images/animes/perfect-blue-1998.jpg",
      type: "anime",
      timestamp: 1692112000000,
    },
    {
      id: "gintama",
      title: "Gintama",
      cover: "/assets/images/animes/gintama-2006.jpg",
      type: "anime",
      timestamp: 1692025600000,
    },
    {
      id: "kill-la-kill",
      title: "Kill la Kill",
      cover: "/assets/images/animes/kill-la-kill-2013.jpg",
      type: "anime",
      timestamp: 1691939200000,
    },
  ],
  HorrorFan: [
    {
      id: "the-x-files",
      title: "The X-Files",
      cover: "/assets/images/series/the-x-files-1993.jpg",
      type: "serie",
      timestamp: 1692630000000,
    },
    {
      id: "supernatural",
      title: "Supernatural",
      cover: "/assets/images/series/supernatural-2005.jpg",
      type: "serie",
      timestamp: 1692543600000,
    },
    {
      id: "stranger-things",
      title: "Stranger Things",
      cover: "/assets/images/series/stranger-things-2016.jpg",
      type: "serie",
      timestamp: 1692457200000,
    },
    {
      id: "they-live",
      title: "They Live",
      cover: "/assets/images/movies/they-live-1988.jpg",
      type: "movie",
      timestamp: 1692370800000,
    },
  ],
};

export const simulatedUserRatings: Record<string, UserRating[]> = {
  CineMaster: [
    { movieId: "the-godfather", rating: 5, timestamp: 1692112800000 },
    { movieId: "amadeus", rating: 5, timestamp: 1691854400000 },
    { movieId: "shawshank-redemption", rating: 5, timestamp: 1691768000000 },
    { movieId: "a-time-to-kill", rating: 4, timestamp: 1691681600000 },
    { movieId: "imitation-game", rating: 5, timestamp: 1691595200000 },
    { movieId: "parasite", rating: 4, timestamp: 1691508800000 },
    { movieId: "fallen-angels", rating: 4, timestamp: 1691422400000 },
  ],
  AnimeOtaku: [
    { movieId: "steins-gate", rating: 5, timestamp: 1692371200000 },
    { movieId: "cowboy-bebop", rating: 5, timestamp: 1692284800000 },
    { movieId: "fullmetal-alchemist", rating: 5, timestamp: 1692198400000 },
    { movieId: "perfect-blue", rating: 5, timestamp: 1692112000000 },
    { movieId: "gintama", rating: 4, timestamp: 1692025600000 },
    { movieId: "kill-la-kill", rating: 4, timestamp: 1691939200000 },
    { movieId: "bleach", rating: 4, timestamp: 1691852800000 },
    { movieId: "berserk", rating: 5, timestamp: 1691766400000 },
  ],
  HorrorFan: [
    { movieId: "the-x-files", rating: 5, timestamp: 1692630000000 },
    { movieId: "supernatural", rating: 4, timestamp: 1692543600000 },
    { movieId: "stranger-things", rating: 4, timestamp: 1692457200000 },
    { movieId: "they-live", rating: 4, timestamp: 1692370800000 },
    { movieId: "escape-from-new-york", rating: 4, timestamp: 1692284400000 },
    { movieId: "the-boys", rating: 5, timestamp: 1692198000000 },
  ],
};
