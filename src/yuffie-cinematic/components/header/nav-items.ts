import {
  faHome,
  faFilm,
  faTv,
  faDragon,
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
  { href: "/animes", label: "Animes", icon: faDragon },
];
