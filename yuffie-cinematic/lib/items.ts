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
    poster: "/assets/images/movies/a-time-to-kill-1996.jpg",
    detail: "/movie-description",
    category: "filme",
  },
  {
    title: "Arquivo X",
    poster: "/assets/images/series/the-x-files-1993.jpg",
    detail: "/serie-description",
    category: "serie",
  },
  {
    title: "O Poderoso Chefão",
    poster: "/assets/images/movies/the-godfather-1972.jpg",
    category: "filme",
  },
  {
    title: "Anjos Caídos",
    poster: "/assets/images/movies/fallen-angels-1995.jpg",
    category: "filme",
  },
  {
    title: "Amadeus",
    poster: "/assets/images/movies/amadeus-1984.jpg",
    category: "filme",
  },
  {
    title: "John Wick: Capítulo 2",
    poster: "/assets/images/movies/john-wick-chapter-2-2017.jpg",
    category: "filme",
  },
  {
    title: "Ip Man",
    poster: "/assets/images/movies/ip-man-2008.jpg",
    category: "filme",
  },
  {
    title: "Um Sonho de Liberdade",
    poster: "/assets/images/movies/the-shawshank-redemption-1994.jpg",
    category: "filme",
  },
  {
    title: "Efeito Borboleta",
    poster: "/assets/images/movies/the-butterfly-effect-2004.jpg",
    category: "filme",
  },
  {
    title: "O Jogo da Imitação",
    poster: "/assets/images/movies/the-imitation-game-2014.jpg",
    category: "filme",
  },
  {
    title: "Parasita",
    poster: "/assets/images/movies/parasite-2019.jpg",
    category: "filme",
  },
  {
    title: "De Volta para o Futuro",
    poster: "/assets/images/movies/back-to-the-future-1985.jpg",
    category: "filme",
  },
  {
    title: "Um Tira da Pesada",
    poster: "/assets/images/movies/beverly-hills-cop-1984.jpg",
    category: "filme",
  },
  {
    title: "Fuga de Nova York",
    poster: "/assets/images/movies/escape-from-new-york-1981.jpg",
    category: "filme",
  },
  {
    title: "Matador de Aluguel",
    poster: "/assets/images/movies/road-house-1989.jpg",
    category: "filme",
  },
  {
    title: "Eles Vivem",
    poster: "/assets/images/movies/they-live-1988.jpg",
    category: "filme",
  },
  {
    title: "13 Reasons Why",
    poster: "/assets/images/series/13-reasons-why-2017.jpg",
    category: "serie",
  },
  {
    title: "Breaking Bad",
    poster: "/assets/images/series/breaking-bad-2008.png",
    category: "serie",
  },
  {
    title: "Cobra Kai",
    poster: "/assets/images/series/cobra-kai-2018.jpg",
    category: "serie",
  },
  {
    title: "Desencanto",
    poster: "/assets/images/series/desencanto-2018.jpg",
    category: "serie",
  },
  {
    title: "Futurama",
    poster: "/assets/images/series/futurama-1999.jpg",
    category: "serie",
  },
  {
    title: "iCarly",
    poster: "/assets/images/series/icarly-2007.jpg",
    category: "serie",
  },
  {
    title: "Rick and Morty",
    poster: "/assets/images/series/rick-and-morty-2013.png",
    category: "serie",
  },
  {
    title: "Smiling Friends",
    poster: "/assets/images/series/smiling-friends-2022.jpg",
    category: "serie",
  },
  {
    title: "Squid Game",
    poster: "/assets/images/series/squid-game-2021.jpg",
    category: "serie",
  },
  {
    title: "Stranger Things",
    poster: "/assets/images/series/stranger-things-2016.jpg",
    category: "serie",
  },
  {
    title: "Supernatural",
    poster: "/assets/images/series/supernatural-2005.jpg",
    category: "serie",
  },
  {
    title: "The Boys",
    poster: "/assets/images/series/the-boys-2019.jpg",
    category: "serie",
  },
  {
    title: "The Simpsons",
    poster: "/assets/images/series/the-simpsons-1989.jpg",
    category: "serie",
  },
  {
    title: "Todo Mundo Odeia o Chris",
    poster: "/assets/images/series/todo-mundo-odeia-o-chris-2005.jpg",
    category: "serie",
  },
  {
    title: "Barakamon",
    poster: "/assets/images/animes/barakamon-2014.jpg",
    category: "anime",
  },
  {
    title: "Berserk",
    poster: "/assets/images/animes/berserk-1997.jpg",
    category: "anime",
  },
  {
    title: "Bleach",
    poster: "/assets/images/animes/bleach-2004.jpg",
    category: "anime",
  },
  {
    title: "Cowboy Bebop",
    poster: "/assets/images/animes/cowboy-bebop-1998.jpg",
    category: "anime",
  },
  {
    title: "Durarara!!",
    poster: "/assets/images/animes/durarara-2010.jpg",
    category: "anime",
  },
  {
    title: "Fairy Tail",
    poster: "/assets/images/animes/fairy-tail-2014.jpg",
    category: "anime",
  },
  {
    title: "Fullmetal Alchemist",
    poster: "/assets/images/animes/fullmetal-alchemist-2003.jpg",
    category: "anime",
  },
  {
    title: "Gintama",
    poster: "/assets/images/animes/gintama-2006.jpg",
    category: "anime",
  },
  {
    title: "Great Teacher Onizuka",
    poster: "/assets/images/animes/great-teacher-onizuka-1999.jpg",
    category: "anime",
  },
  {
    title: "Gunsmith Cats",
    poster: "/assets/images/animes/gunsmith-cats-1995.jpg",
    category: "anime",
  },
  {
    title: "Katekyou Hitman Reborn!",
    poster: "/assets/images/animes/katekyou-hitman-reborn-2006.jpg",
    category: "anime",
  },
  {
    title: "Kill la Kill",
    poster: "/assets/images/animes/kill-la-kill-2013.jpg",
    category: "anime",
  },
  {
    title: "Little Witch Academia",
    poster: "/assets/images/animes/little-witch-academia-2017.jpg",
    category: "anime",
  },
  {
    title: "Perfect Blue",
    poster: "/assets/images/animes/perfect-blue-1998.jpg",
    category: "anime",
  },
  {
    title: "Steins;Gate",
    poster: "/assets/images/animes/steins-gate-2011.jpg",
    category: "anime",
  },
];
