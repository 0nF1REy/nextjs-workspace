export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  description?: string;
  photoCredit?: string;
  sourceLink?: string;
  people?: string[];
}

export interface CinematicDetail {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  creator: string;
  cover: string;
  cast: string[];
  carouselImages: string[];
  rating: number;
  genre?: string[];
  duration?: number;
  galleryImages?: GalleryImage[];
  type: "movie" | "serie" | "anime";
}

export const cinematics: CinematicDetail[] = [
  {
    id: "a-time-to-kill",
    title: "A Time to Kill",
    synopsis:
      "Um jovem advogado defende um homem negro acusado de assassinar dois homens brancos que estupraram sua filha de 10 anos, provocando o renascimento da Ku Klux Klan.",
    year: 1996,
    creator: "Joel Schumacher",
    cover: "/assets/images/movies/a-time-to-kill-1996.jpg",
    cast: [
      "Matthew McConaughey",
      "Sandra Bullock",
      "Samuel L. Jackson",
      "Kevin Spacey",
    ],
    carouselImages: ["/assets/images/a-time-to-kill-banner.jpg"],
    rating: 4,
    genre: ["Drama", "Crime", "Thriller"],
    duration: 149,
    galleryImages: [
      {
        id: "1",
        title: "Cena do Tribunal",
        src: "/assets/images/gallery/a-time-to-kill/01.png",
        description: "Jake Brigance defendendo Carl Lee Hailey no tribunal",
        photoCredit: "Warner Bros Pictures",
        sourceLink: "https://warnerbros.com",
        people: [
          "Matthew McConaughey (Jake Brigance)",
          "Samuel L. Jackson (Carl Lee Hailey)",
          "Kevin Spacey (Rufus Buckley)",
        ],
      },
      {
        id: "2",
        title: "Bastidores da Produção",
        src: "/assets/images/gallery/a-time-to-kill/02.png",
        description: "Joel Schumacher dirigindo a cena do tribunal",
        photoCredit: "Warner Bros Pictures",
        sourceLink: "https://warnerbros.com",
        people: [
          "Joel Schumacher (Diretor)",
          "Matthew McConaughey (Jake Brigance)",
          "Peter Menzies Jr. (Diretor de Fotografia)",
        ],
      },
    ],
    type: "movie",
  },
  {
    id: "the-godfather",
    title: "O Poderoso Chefão",
    synopsis:
      "A história da família mafiosa Corleone e seu patriarca Vito Corleone.",
    year: 1972,
    creator: "Francis Ford Coppola",
    cover: "/assets/images/movies/the-godfather-1972.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    carouselImages: ["/assets/images/movies/the-godfather-1972.jpg"],
    rating: 5,
    genre: ["Crime", "Drama"],
    duration: 175,
    galleryImages: [],
    type: "movie",
  },
];
