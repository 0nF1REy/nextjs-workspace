import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const footerSections = [
  {
    title: "Plataforma",
    links: [
      { href: "/movies", label: "Filmes" },
      { href: "/series", label: "Séries" },
      { href: "/animes", label: "Animes" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { href: "#", label: "Discussões" },
      { href: "#", label: "Grupos" },
      { href: "#", label: "Recomendações" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "#", label: "Sobre Nós" },
      { href: "#", label: "Contato" },
      { href: "#", label: "Carreiras" },
    ],
  },
];

export const socialLinks = [
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "Facebook", icon: FaFacebook },
  { href: "#", label: "Twitter", icon: FaTwitter },
  { href: "#", label: "Linkedin", icon: FaLinkedin },
];

export const legalLinks = [
  { href: "/legal?tab=aviso", label: "AVISO LEGAL" },
  { href: "/legal?tab=termos", label: "TERMOS DE USO" },
  { href: "/legal?tab=privacidade", label: "POLÍTICA DE PRIVACIDADE" },
];
