import { CinematicDetail } from "./types";

export const animeDetails: CinematicDetail[] = [
  {
    id: "cowboy-bebop",
    title: "Cowboy Bebop",
    synopsis:
      "No ano de 2071, caçadores de recompensas viajam pelo espaço em busca de criminosos perigosos, enfrentando seus próprios passados sombrios.",
    year: 1998,
    creator: "Shinichirō Watanabe",
    cover: "/assets/images/animes/cowboy-bebop-1998.jpg",
    cast: ["Kōichi Yamadera", "Unshō Ishizuka", "Megumi Hayashibara"],
    rating: 5,
    genre: ["Ação", "Ficção Científica", "Drama"],
    duration: 24,
    galleryImages: [
      {
        id: "1",
        title: "Tripulação da Bebop",
        src: "/assets/images/gallery/cowboy-bebop/01.png",
        description: "Spike Spiegel e sua equipe a bordo da nave Bebop",
        photoCredit: "Sunrise",
        sourceLink: "https://www.sunrise-inc.co.jp",
        people: ["Spike Spiegel", "Jet Black", "Faye Valentine", "Ed"],
      },
    ],
    type: "anime",
  },
  {
    id: "steins-gate",
    title: "Steins;Gate",
    synopsis:
      "Um grupo de amigos descobre uma maneira de enviar mensagens para o passado, desencadeando consequências inesperadas na linha do tempo.",
    year: 2011,
    creator: "Hiroshi Hamasaki",
    cover: "/assets/images/animes/steins-gate-2011.jpg",
    cast: ["Mamoru Miyano", "Kana Hanazawa", "Tomokazu Seki"],
    rating: 5,
    genre: ["Ficção Científica", "Drama", "Thriller"],
    duration: 24,
    galleryImages: [
      {
        id: "1",
        title: "Laboratório do Futuro Gadget",
        src: "/assets/images/gallery/steins-gate/01.png",
        description:
          "Okabe e seus amigos descobrindo o envio de mensagens ao passado",
        photoCredit: "White Fox",
        sourceLink: "https://whitefox.co.jp",
        people: [
          "Mamoru Miyano (Rintarō Okabe)",
          "Kana Hanazawa (Mayuri Shiina)",
        ],
      },
    ],
    type: "anime",
  },
];
