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
    seasons: [
      {
        id: "the-x-files-s1",
        seasonNumber: 1,
        title: "Temporada 1",
        synopsis:
          "Os agentes Fox Mulder e Dana Scully são designados para os Arquivos X, investigando casos inexplicáveis. Eles se deparam com conspirações governamentais e fenômenos paranormais.",
        cover: "/assets/images/series/the-x-files-1993.jpg",
        episodes: 24,
        releaseYear: 1993,
        highlights: ["Primeiro caso paranormal", "Mulder e Scully se conhecem"],
      },
      {
        id: "the-x-files-s2",
        seasonNumber: 2,
        title: "Temporada 2",
        synopsis:
          "Os agentes Fox Mulder e Dana Scully são designados para os Arquivos X, investigando casos inexplicáveis. Eles se deparam com conspirações governamentais e fenômenos paranormais.",
        cover: "/assets/images/series/the-x-files-1993.jpg",
        episodes: 25,
        releaseYear: 1994,
      },
    ],
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
    seasons: [
      {
        id: "bb-s1",
        seasonNumber: 1,
        title: "Temporada 1",
        synopsis:
          "Walter White, um professor de química do ensino médio, descobre que tem câncer e decide usar suas habilidades para produzir metanfetamina e garantir o futuro de sua família.",
        cover: "/assets/images/series/breaking-bad-2008.png",
      },
      {
        id: "bb-s2",
        seasonNumber: 2,
        title: "Temporada 2",
        synopsis:
          "Walter e Jesse enfrentam novos desafios e ameaças no perigoso mundo do tráfico de drogas.",
        cover: "/assets/images/series/breaking-bad-2008.png",
      },
    ],
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
    seasons: [
      {
        id: "st-s1",
        seasonNumber: 1,
        title: "Temporada 1",
        synopsis:
          "O desaparecimento de Will Byers leva seus amigos, sua mãe e o chefe de polícia a uma série de mistérios envolvendo experimentos secretos do governo e uma garota com poderes sobrenaturais.",
        cover: "/assets/images/series/stranger-things-2016.jpg",
      },
      {
        id: "st-s2",
        seasonNumber: 2,
        title: "Temporada 2",
        synopsis:
          "Um ano depois, os moradores de Hawkins ainda estão se recuperando dos horrores do Demogorgon e dos segredos do laboratório de Hawkins. Will Byers continua a ser assombrado por visões do Mundo Invertido.",
        cover: "/assets/images/series/stranger-things-2016.jpg",
      },
    ],
  },
];
