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

  // Kyo Reviews
  {
    id: "review-kyo-1",
    author: "Kyo",
    content:
      "Barakamon é um anime adorável. A evolução do personagem e as lições de vida são cativantes.",
    rating: 5,
    date: "2025-02-10T17:30:00.000Z",
    cinematicId: "barakamon",
    avatarSeed: "Kyo",
    likes: 12,
  },
  {
    id: "review-kyo-2",
    author: "Kyo",
    content: "Berserk é intenso e sombrio. A arte e a narrativa são épicas.",
    rating: 5,
    date: "2025-02-15T18:00:00.000Z",
    cinematicId: "berserk",
    avatarSeed: "Kyo",
    likes: 8,
  },

  // Iori Reviews
  {
    id: "review-iori-1",
    author: "Iori",
    content:
      "Cowboy Bebop é uma obra-prima. A trilha sonora e os personagens são inesquecíveis.",
    rating: 5,
    date: "2025-03-01T19:15:00.000Z",
    cinematicId: "cowboy-bebop",
    avatarSeed: "Iori",
    likes: 15,
  },
  {
    id: "review-iori-2",
    author: "Iori",
    content:
      "Fullmetal Alchemist tem uma das melhores histórias de anime. A alquimia e os dilemas morais são incríveis.",
    rating: 5,
    date: "2025-03-10T20:00:00.000Z",
    cinematicId: "fullmetal-alchemist",
    avatarSeed: "Iori",
    likes: 10,
  },

  // Terry Reviews
  {
    id: "review-terry-1",
    author: "Terry",
    content:
      "A Time to Kill é um drama jurídico poderoso. Matthew McConaughey está excelente.",
    rating: 4,
    date: "2025-01-20T16:30:00.000Z",
    cinematicId: "a-time-to-kill",
    avatarSeed: "Terry",
    likes: 9,
  },
  {
    id: "review-terry-2",
    author: "Terry",
    content:
      "The Godfather é uma obra-prima atemporal. Marlon Brando brilha em cada cena.",
    rating: 5,
    date: "2025-01-25T18:45:00.000Z",
    cinematicId: "the-godfather",
    avatarSeed: "Terry",
    likes: 14,
  },

  // Mai Reviews
  {
    id: "review-mai-1",
    author: "Mai",
    content:
      "Kill la Kill é animado e divertido, cheio de ação e estilo visual único.",
    rating: 5,
    date: "2025-04-05T20:30:00.000Z",
    cinematicId: "kill-la-kill",
    avatarSeed: "Mai",
    likes: 11,
  },
  {
    id: "review-mai-2",
    author: "Mai",
    content:
      "Perfect Blue é um thriller psicológico perturbador e brilhante. Satoshi Kon é genial.",
    rating: 5,
    date: "2025-04-10T19:15:00.000Z",
    cinematicId: "perfect-blue",
    avatarSeed: "Mai",
    likes: 13,
  },

  // Eikichi Reviews
  {
    id: "review-eikichi-1",
    author: "Eikichi",
    content:
      "Great Teacher Onizuka mostra que a educação pode ser divertida e impactante. Inspirador!",
    rating: 5,
    date: "2025-05-01T18:00:00.000Z",
    cinematicId: "great-teacher-onizuka",
    avatarSeed: "Eikichi",
    likes: 17,
  },
  // Audrey Reviews
  {
    id: "review-audrey-1",
    author: "Audrey",
    content:
      "Shawshank Redemption é inspirador e emocionante. A história de amizade e esperança é inesquecível.",
    rating: 5,
    date: "2025-05-12T18:00:00.000Z",
    cinematicId: "shawshank-redemption",
    avatarSeed: "Audrey",
    likes: 21,
  },
  {
    id: "review-audrey-2",
    author: "Audrey",
    content:
      "Ip Man é uma obra de arte nas artes marciais. As lutas são incríveis e a história emocionante.",
    rating: 5,
    date: "2025-05-18T19:15:00.000Z",
    cinematicId: "ip-man",
    avatarSeed: "Audrey",
    likes: 17,
  },

  // Charles Reviews
  {
    id: "review-charles-1",
    author: "Charles",
    content:
      "Back To The Future é diversão pura. A viagem no tempo e os personagens são icônicos.",
    rating: 5,
    date: "2025-06-01T17:30:00.000Z",
    cinematicId: "back-to-the-future",
    avatarSeed: "Charles",
    likes: 25,
  },
  {
    id: "review-charles-2",
    author: "Charles",
    content:
      "Amadeus é uma experiência musical incrível. Mozart e Salieri ganham vida na tela.",
    rating: 5,
    date: "2025-06-05T18:45:00.000Z",
    cinematicId: "amadeus",
    avatarSeed: "Charles",
    likes: 19,
  },

  // Danilo Reviews
  {
    id: "review-danilo-1",
    author: "Danilo",
    content:
      "Breaking Bad é uma aula de roteiro e atuação. Cada episódio é tenso e imprevisível.",
    rating: 5,
    date: "2025-06-12T20:00:00.000Z",
    cinematicId: "breaking-bad",
    avatarSeed: "Danilo",
    likes: 23,
  },
  {
    id: "review-danilo-2",
    author: "Danilo",
    content:
      "Cobra Kai revive o universo Karatê Kid de forma brilhante. Nostalgia e ação na medida certa.",
    rating: 4,
    date: "2025-06-18T21:15:00.000Z",
    cinematicId: "cobra-kai",
    avatarSeed: "Danilo",
    likes: 18,
  },

  // Elaine Reviews
  {
    id: "review-elaine-1",
    author: "Elaine",
    content:
      "Gintama é genial, mistura comédia, ação e referências culturais de maneira única.",
    rating: 5,
    date: "2025-07-01T19:30:00.000Z",
    cinematicId: "gintama",
    avatarSeed: "Elaine",
    likes: 22,
  },
  {
    id: "review-elaine-2",
    author: "Elaine",
    content:
      "Steins;Gate é um anime brilhante de viagem no tempo, cheio de suspense e emoção.",
    rating: 5,
    date: "2025-07-05T20:45:00.000Z",
    cinematicId: "steins-gate",
    avatarSeed: "Elaine",
    likes: 27,
  },

  // Joao Reviews
  {
    id: "review-joao-1",
    author: "Joao",
    content:
      "The X-Files é uma série clássica de mistério e investigação paranormal. Ícone dos anos 90.",
    rating: 4,
    date: "2025-07-12T18:00:00.000Z",
    cinematicId: "the-x-files",
    avatarSeed: "Joao",
    likes: 14,
  },
  {
    id: "review-joao-2",
    author: "Joao",
    content:
      "Stranger Things mistura nostalgia e suspense de forma incrível. Demogorgon é aterrorizante!",
    rating: 4,
    date: "2025-07-18T19:15:00.000Z",
    cinematicId: "stranger-things",
    avatarSeed: "Joao",
    likes: 16,
  },

  // Poliana Reviews
  {
    id: "review-poliana-1",
    author: "Poliana",
    content:
      "Fairy Tail é divertido e cheio de magia. Personagens cativantes e boas lições de amizade.",
    rating: 4,
    date: "2025-08-01T20:30:00.000Z",
    cinematicId: "fairy-tail",
    avatarSeed: "Poliana",
    likes: 12,
  },
  {
    id: "review-poliana-2",
    author: "Poliana",
    content:
      "Little Witch Academia é encantador e inspirador. Animação linda e história leve.",
    rating: 5,
    date: "2025-08-05T21:45:00.000Z",
    cinematicId: "little-witch-academia",
    avatarSeed: "Poliana",
    likes: 14,
  },

  // Regina Reviews
  {
    id: "review-regina-1",
    author: "Regina",
    content:
      "They Live é um clássico cult. Mistura crítica social com ficção científica de forma genial.",
    rating: 4,
    date: "2025-08-12T18:00:00.000Z",
    cinematicId: "they-live",
    avatarSeed: "Regina",
    likes: 11,
  },
  {
    id: "review-regina-2",
    author: "Regina",
    content:
      "Escape From New York é ação e tensão do início ao fim. John Carpenter manda muito bem.",
    rating: 4,
    date: "2025-08-18T19:15:00.000Z",
    cinematicId: "escape-from-new-york",
    avatarSeed: "Regina",
    likes: 13,
  },

  // Vagner Reviews
  {
    id: "review-vagner-1",
    author: "Vagner",
    content:
      "Futurama é divertido e inteligente. Mistura ficção científica e humor de maneira brilhante.",
    rating: 5,
    date: "2025-09-01T20:00:00.000Z",
    cinematicId: "futurama",
    avatarSeed: "Vagner",
    likes: 20,
  },
  {
    id: "review-vagner-2",
    author: "Vagner",
    content:
      "Rick and Morty é uma viagem absurda e hilária. Humor ácido e criatividade sem limites.",
    rating: 5,
    date: "2025-09-05T21:15:00.000Z",
    cinematicId: "rick-and-morty",
    avatarSeed: "Vagner",
    likes: 22,
  },

  // Maira Reviews
  {
    id: "review-maira-1",
    author: "Maira",
    content:
      "Katekyou Hitman Reborn! é divertido e cheio de ação. Personagens marcantes e desenvolvimento legal.",
    rating: 4,
    date: "2025-09-12T18:30:00.000Z",
    cinematicId: "katekyou-hitman-reborn",
    avatarSeed: "Maira",
    likes: 10,
  },
  {
    id: "review-maira-2",
    author: "Maira",
    content:
      "Durarara!! é cheio de mistérios e personagens complexos. História envolvente do início ao fim.",
    rating: 5,
    date: "2025-09-18T19:45:00.000Z",
    cinematicId: "durarara",
    avatarSeed: "Maira",
    likes: 12,
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
  Kyo: [
    {
      id: "barakamon",
      title: "Barakamon",
      cover: "/assets/images/animes/barakamon-2014.jpg",
      type: "anime",
      timestamp: 1730000000000,
    },
    {
      id: "berserk",
      title: "Berserk",
      cover: "/assets/images/animes/berserk-1997.jpg",
      type: "anime",
      timestamp: 1730500000000,
    },
  ],
  Iori: [
    {
      id: "cowboy-bebop",
      title: "Cowboy Bebop",
      cover: "/assets/images/animes/cowboy-bebop-1998.jpg",
      type: "anime",
      timestamp: 1731000000000,
    },
    {
      id: "fullmetal-alchemist",
      title: "Fullmetal Alchemist",
      cover: "/assets/images/animes/fullmetal-alchemist-2003.jpg",
      type: "anime",
      timestamp: 1731500000000,
    },
  ],
  Terry: [
    {
      id: "a-time-to-kill",
      title: "A Time to Kill",
      cover: "/assets/images/movies/a-time-to-kill-1996.jpg",
      type: "movie",
      timestamp: 1732000000000,
    },
    {
      id: "the-godfather",
      title: "The Godfather",
      cover: "/assets/images/movies/the-godfather-1972.jpg",
      type: "movie",
      timestamp: 1732500000000,
    },
  ],
  Mai: [
    {
      id: "kill-la-kill",
      title: "Kill la Kill",
      cover: "/assets/images/animes/kill-la-kill-2013.jpg",
      type: "anime",
      timestamp: 1733000000000,
    },
    {
      id: "perfect-blue",
      title: "Perfect Blue",
      cover: "/assets/images/animes/perfect-blue-1998.jpg",
      type: "anime",
      timestamp: 1733500000000,
    },
  ],
  Eikichi: [
    {
      id: "great-teacher-onizuka",
      title: "Great Teacher Onizuka",
      cover: "/assets/images/animes/great-teacher-onizuka-1999.jpg",
      type: "anime",
      timestamp: 1734000000000,
    },
  ],
  Audrey: [
    {
      id: "shawshank-redemption",
      title: "Shawshank Redemption",
      cover: "/assets/images/movies/the-shawshank-redemption-1994.jpg",
      type: "movie",
      timestamp: 1734500000000,
    },
    {
      id: "ip-man",
      title: "Ip Man",
      cover: "/assets/images/movies/ip-man-2008.jpg",
      type: "movie",
      timestamp: 1734600000000,
    },
  ],
  Charles: [
    {
      id: "back-to-the-future",
      title: "Back To The Future",
      cover: "/assets/images/movies/back-to-the-future-1985.jpg",
      type: "movie",
      timestamp: 1734700000000,
    },
    {
      id: "amadeus",
      title: "Amadeus",
      cover: "/assets/images/movies/amadeus-1984.jpg",
      type: "movie",
      timestamp: 1734800000000,
    },
  ],
  Danilo: [
    {
      id: "breaking-bad",
      title: "Breaking Bad",
      cover: "/assets/images/series/breaking-bad-2008.png",
      type: "serie",
      timestamp: 1734900000000,
    },
    {
      id: "cobra-kai",
      title: "Cobra Kai",
      cover: "/assets/images/series/cobra-kai-2018.jpg",
      type: "serie",
      timestamp: 1735000000000,
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
  Kyo: [
    { movieId: "barakamon", rating: 5, timestamp: 1730000000000 },
    { movieId: "berserk", rating: 5, timestamp: 1730500000000 },
  ],
  Iori: [
    { movieId: "cowboy-bebop", rating: 5, timestamp: 1731000000000 },
    { movieId: "fullmetal-alchemist", rating: 5, timestamp: 1731500000000 },
  ],
  Terry: [
    { movieId: "a-time-to-kill", rating: 4, timestamp: 1732000000000 },
    { movieId: "the-godfather", rating: 5, timestamp: 1732500000000 },
  ],
  Mai: [
    { movieId: "kill-la-kill", rating: 5, timestamp: 1733000000000 },
    { movieId: "perfect-blue", rating: 5, timestamp: 1733500000000 },
  ],
  Eikichi: [
    { movieId: "great-teacher-onizuka", rating: 5, timestamp: 1734000000000 },
  ],
};
