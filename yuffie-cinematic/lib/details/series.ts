import { CinematicDetail } from "./types";

export const serieDetails: CinematicDetail[] = [
  {
    id: "the-x-files",
    title: "The X-Files",
    synopsis:
      "Os agentes do FBI Fox Mulder e Dana Scully investigam casos misteriosos e paranormais conhecidos como Arquivos X.",
    year: 1993,
    creator: "Chris Carter",
    cover: "/assets/images/series/the-x-files-1993.jpg",
    cast: ["David Duchovny", "Gillian Anderson", "Mitch Pileggi"],
    carouselImages: ["/assets/images/the-x-files-banner.jpg"],
    rating: 4,
    genre: ["Mistério", "Ficção Científica", "Drama"],
    duration: 45,
    galleryImages: [
      {
        id: "1",
        title: "Agente Scully",
        src: "/assets/images/gallery/the-x-files/01.png",
        description: "Gillian Anderson em Arquivo X (1993)",
        photoCredit: "20th Century Fox",
        sourceLink: "https://www.20thcenturystudios.com",
        people: ["Gillian Anderson (Dana Scully)"],
      },
      {
        id: "2",
        title: "Agentes Mulder e Scully",
        src: "/assets/images/gallery/the-x-files/02.png",
        photoCredit: "20th Century Fox",
        sourceLink: "https://www.20thcenturystudios.com",
        people: [
          "David Duchovny (Fox Mulder)",
          "Gillian Anderson (Dana Scully)",
        ],
      },
    ],
    type: "serie",
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    synopsis:
      "Um professor de química do ensino médio, diagnosticado com câncer terminal, começa a fabricar metanfetamina para garantir o futuro de sua família.",
    year: 2008,
    creator: "Vince Gilligan",
    cover: "/assets/images/series/breaking-bad-2008.png",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
    carouselImages: ["/assets/images/breaking-bad-banner.jpg"],
    rating: 5,
    genre: ["Crime", "Drama", "Thriller"],
    duration: 47,
    galleryImages: [
      {
        id: "1",
        title: "Walter White e Jesse Pinkman",
        src: "/assets/images/gallery/breaking-bad/01.png",
        description: "Walter White com Jesse Pinkman em Albuquerque",
        photoCredit: "AMC",
        sourceLink: "https://www.amc.com",
        people: ["Bryan Cranston (Walter White)", "Aaron Paul (Jesse Pinkman)"],
      },
    ],
    type: "serie",
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    synopsis:
      "Na pequena cidade de Hawkins, Indiana, um grupo de crianças enfrenta forças sobrenaturais após o desaparecimento de um amigo.",
    year: 2016,
    creator: "Irmãos Duffer",
    cover: "/assets/images/series/stranger-things-2016.jpg",
    cast: [
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "David Harbour",
      "Winona Ryder",
    ],
    carouselImages: ["/assets/images/stranger-things-banner.jpg"],
    rating: 5,
    genre: ["Ficção Científica", "Terror", "Drama"],
    duration: 50,
    galleryImages: [
      {
        id: "1",
        title: "O Mundo Invertido",
        src: "/assets/images/gallery/stranger-things/01.png",
        description: "Onze em confronto com o Demogorgon",
        photoCredit: "Netflix",
        sourceLink: "https://www.netflix.com",
        people: ["Millie Bobby Brown (Onze)", "David Harbour (Jim Hopper)"],
      },
    ],
    type: "serie",
  },
];
