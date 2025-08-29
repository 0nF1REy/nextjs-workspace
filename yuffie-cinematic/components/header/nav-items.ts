import {
  faHome,
  faFilm,
  faTv,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavItem {
  href: string;
  label: string;
  icon: IconDefinition;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Início", icon: faHome },
  { href: "/movies", label: "Filmes", icon: faFilm },
  { href: "/series", label: "Séries", icon: faTv },
  { href: "/favorites", label: "Favoritos", icon: faHeart },
  { href: "/reviews", label: "Reviews", icon: faStar },
];
