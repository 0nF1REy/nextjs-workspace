import { CinematicDetail } from "./types";

export const movieDetails: CinematicDetail[] = [
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
    title: "The Godfather",
    synopsis:
      "A saga da família mafiosa Corleone, que luta para manter o poder em meio a traições, guerras entre famílias rivais e mudanças na sociedade americana.",
    year: 1972,
    creator: "Francis Ford Coppola",
    cover: "/assets/images/movies/the-godfather-1972.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    rating: 5,
    genre: ["Crime", "Drama"],
    duration: 175,
    type: "movie",
  },
  {
    id: "parasite",
    title: "Parasite",
    synopsis:
      "A família Kim, pobre e astuta, infiltra-se na casa de uma rica família de Seul, levando a uma série de acontecimentos inesperados e sombrios.",
    year: 2019,
    creator: "Bong Joon-ho",
    cover: "/assets/images/movies/parasite-2019.jpg",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    rating: 5,
    genre: ["Drama", "Thriller"],
    duration: 132,
    type: "movie",
  },
];
