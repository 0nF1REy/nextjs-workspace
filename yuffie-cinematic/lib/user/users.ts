import { UserProfile, UserReview } from "./types";
import {
  getUserReviewsFromStorage,
  getFavoritesFromStorage,
  getUserRatings,
} from "./storage";
import {
  simulatedUserReviews,
  simulatedUserFavorites,
  simulatedUserRatings,
} from "./mock-data";

export const users: UserProfile[] = [
  {
    id: "0nF1REy",
    username: "0nF1REy",
    displayName: "Alan Ryan",
    avatar: "/assets/images/profile-avatar/alan-ryan.jpg",
    bio: "Apaixonado por explorar universos de ficção científica, desvendar mistérios complexos e acompanhar tramas criminais envolventes. Fascinado pela riqueza da cultura japonesa.",
    joinDate: "2025-10-01",
    favoriteGenres: ["Sci-Fi", "Crime", "Anime", "Mystery"],
    email: "alanryan619@gmail.com",
    password: "alan.2020",
    userType: "regular",
  },
  {
    id: "AdminSite",
    username: "AdminSite",
    displayName: "Administrador do Site",
    avatar: "https://i.pravatar.cc/300?u=AdminSite",
    bio: "Administrador principal da plataforma",
    joinDate: "2025-01-01",
    favoriteGenres: ["Sci-Fi", "Drama", "Action", "Thriller"],
    email: "admin@dominio.com.br",
    password: "Admin@123",
    userType: "admin",
  },
  {
    id: "CineMaster",
    username: "CineMaster",
    displayName: "Cinema Master",
    avatar: "https://i.pravatar.cc/300?u=CineMaster",
    bio: "Crítico de cinema independente. Amo filmes clássicos e produções indie.",
    joinDate: "2023-08-22",
    favoriteGenres: ["Drama", "Crime", "Mystery", "Biography"],
    email: "cinemaster@exemplo.com",
    password: "Cinema@123",
    userType: "regular",
  },
  {
    id: "AnimeOtaku",
    username: "AnimeOtaku",
    displayName: "Otaku Supreme",
    avatar: "https://i.pravatar.cc/300?u=AnimeOtaku",
    bio: "Viciado em animes desde criança. Especialista em shounen e seinen!",
    joinDate: "2024-03-10",
    favoriteGenres: ["Anime", "Action", "Adventure", "Fantasy"],
    email: "otaku@anime.com",
    password: "Anime@123",
    userType: "regular",
  },
  {
    id: "HorrorFan",
    username: "HorrorFan",
    displayName: "Night Terror",
    avatar: "https://i.pravatar.cc/300?u=HorrorFan",
    bio: "Se não tem terror, não me interessa. Quanto mais assustador, melhor!",
    joinDate: "2023-10-31",
    favoriteGenres: ["Horror", "Thriller", "Supernatural", "Mystery"],
    email: "horror@terror.com",
    password: "Terror@123",
    userType: "regular",
  },
  {
    id: "Kyo",
    username: "Kyo",
    displayName: "Kyo Kusanagi",
    avatar: "https://i.pravatar.cc/300?u=Kyo",
    bio: "Apaixonado por Artes Marciais e cultura japonesa.",
    joinDate: "2025-01-15",
    favoriteGenres: ["Action", "Martial Arts", "Adventure"],
    email: "kyo@kusanagi.com",
    password: "Kyo@Fire123",
    userType: "regular",
  },
  {
    id: "Iori",
    username: "Iori",
    displayName: "Iori Yagami",
    avatar: "https://i.pravatar.cc/300?u=Iori",
    bio: "Músico e compositor. Sempre buscando novas inspirações.",
    joinDate: "2024-11-20",
    favoriteGenres: ["Music", "Drama", "Biography"],
    email: "iori@yagami.com",
    password: "Music@123",
    userType: "regular",
  },
  {
    id: "Terry",
    username: "Terry",
    displayName: "Terry Bogard",
    avatar: "https://i.pravatar.cc/300?u=Terry",
    bio: "Lutador de rua e aventureiro. Sempre pronto para desafios.",
    joinDate: "2023-09-10",
    favoriteGenres: ["Action", "Fighting", "Adventure"],
    email: "terry@bogard.com",
    password: "Fighting@123",
    userType: "regular",
  },
  {
    id: "Mai",
    username: "Mai",
    displayName: "Mai Shiranui",
    avatar: "https://i.pravatar.cc/300?u=Mai",
    bio: "Especialista em Ninjutsu, adoro velocidade e agilidade.",
    joinDate: "2025-06-05",
    favoriteGenres: ["Action", "Stealth", "Fantasy"],
    email: "mai@shiranui.com",
    password: "Ninja@123",
    userType: "regular",
  },
  {
    id: "Eikichi",
    username: "Eikichi",
    displayName: "Eikichi Onizuka",
    avatar: "https://i.pravatar.cc/300?u=Eikichi",
    bio: "Professor de Educação Moral com métodos nada convencionais.",
    joinDate: "2000-04-01",
    favoriteGenres: ["Comedy", "Drama", "Teaching"],
    email: "eikichi@onizuka.com",
    password: "Teacher@123",
    userType: "regular",
  },
  {
    id: "Audrey",
    username: "Audrey",
    displayName: "Audrey Delgado Held Vasconcelos De Medeiros",
    avatar: "https://i.pravatar.cc/300?u=Audrey",
    bio: "Especialista em Urgência e Emergência, dedicada à saúde.",
    joinDate: "2015-06-13",
    favoriteGenres: ["Drama", "Biography", "Romance"],
    email: "audrey@saude.com",
    password: "Urgencia@123",
    userType: "regular",
  },
  {
    id: "Charles",
    username: "Charles",
    displayName: "Charles Andrei Fabri De Proença",
    avatar: "https://i.pravatar.cc/300?u=Charles",
    bio: "Doutor em Desenvolvimento de Sistemas, apaixonado por tecnologia.",
    joinDate: "2010-05-15",
    favoriteGenres: ["Sci-Fi", "Thriller", "Drama"],
    email: "charles@dev.com",
    password: "Sistema@123",
    userType: "regular",
  },
  {
    id: "Danilo",
    username: "Danilo",
    displayName: "Danilo Camargo Dias",
    avatar: "https://i.pravatar.cc/300?u=Danilo",
    bio: "Especialista em Programação Web, sempre buscando aprender mais.",
    joinDate: "2008-02-20",
    favoriteGenres: ["Action", "Adventure", "Comedy"],
    email: "danilo@web.com",
    password: "WebDev@123",
    userType: "regular",
  },
  {
    id: "Elaine",
    username: "Elaine",
    displayName: "Elaine Cristina Martins",
    avatar: "https://i.pravatar.cc/300?u=Elaine",
    bio: "Mestre em Oncologia, dedicada à saúde e bem-estar dos pacientes.",
    joinDate: "2019-11-30",
    favoriteGenres: ["Medical", "Research", "Health"],
    email: "elaine@oncologia.com",
    password: "Oncologia@123",
    userType: "regular",
  },
  {
    id: "Joao",
    username: "Joao",
    displayName: "Joao Paulo De Macedo Lepinsk",
    avatar: "https://i.pravatar.cc/300?u=Joao",
    bio: "Doutor em Segurança de Sistemas de Informação. Focado em proteção digital.",
    joinDate: "1990-03-12",
    favoriteGenres: ["Crime", "Mystery", "Thriller"],
    email: "joao@seguranca.com",
    password: "Seguranca@123",
    userType: "regular",
  },
  {
    id: "Poliana",
    username: "Poliana",
    displayName: "Poliana Aparecida Corazza De Oliveira",
    avatar: "https://i.pravatar.cc/300?u=Poliana",
    bio: "Especialista em Obstetrícia, cuidando da saúde materna.",
    joinDate: "2003-07-08",
    favoriteGenres: ["Drama", "Family", "Biography"],
    email: "poliana@obstetricia.com",
    password: "Materna@123",
    userType: "regular",
  },
  {
    id: "Regina",
    username: "Regina",
    displayName: "Regina Celia Cesar",
    avatar: "https://i.pravatar.cc/300?u=Regina",
    bio: "Mestre em Vigilância Sanitária, comprometida com a prevenção.",
    joinDate: "2021-01-05",
    favoriteGenres: ["Documentary", "Drama", "Biography"],
    email: "regina@vigilancia.com",
    password: "Sanitaria@123",
    userType: "regular",
  },
  {
    id: "Vagner",
    username: "Vagner",
    displayName: "Vagner De Lima Assis",
    avatar: "https://i.pravatar.cc/300?u=Vagner",
    bio: "Doutor em Gerontogeriátrica, especialista em cuidado a idosos.",
    joinDate: "2012-06-17",
    favoriteGenres: ["Drama", "Comedy", "Family"],
    email: "vagner@geriatria.com",
    password: "Geriatria@123",
    userType: "regular",
  },
  {
    id: "Maira",
    username: "Maira",
    displayName: "Maira Baz Sanmartin",
    avatar: "https://i.pravatar.cc/300?u=Maira",
    bio: "Especialista em Banco de Dados, apaixonada por organização de informações.",
    joinDate: "2024-09-25",
    favoriteGenres: ["Mystery", "Crime", "Thriller"],
    email: "maira@database.com",
    password: "Database@123",
    userType: "regular",
  },
];

// Usuário logado atual
export const CURRENT_USER_ID = "0nF1REy";

// Função para buscar usuário por ID
export const getUserById = (id: string): UserProfile | undefined => {
  return users.find((user) => user.id === id);
};

// Função para buscar usuário por username
export const getUserByUsername = (
  username: string
): UserProfile | undefined => {
  return users.find((user) => user.username === username);
};

// Função para obter o usuário logado
export const getCurrentUser = (): UserProfile | undefined => {
  return getUserById(CURRENT_USER_ID);
};

// Função para obter usuário com stats dinâmicos
export const getUserWithStats = (
  username: string
):
  | (UserProfile & {
      watchingStatus?: {
        watching: number;
        completed: number;
        planToWatch: number;
      };
    })
  | undefined => {
  const user = getUserByUsername(username);
  if (!user) return undefined;

  const stats = getUserStats(username);

  return {
    ...user,
    watchingStatus: {
      watching: Math.floor(stats.totalFavorites * 0.1),
      completed: stats.totalReviews,
      planToWatch: Math.floor(stats.totalFavorites * 0.3),
    },
  };
};

// Função para calcular stats dinamicamente
export const getUserStats = (username?: string) => {
  const currentUsername = username || getCurrentUser()?.username || "0nF1REy";

  // Para o usuário logado, usar localStorage
  if (currentUsername === "0nF1REy") {
    const reviews = getUserReviewsFromStorage().filter(
      (r: UserReview) => r.author === currentUsername
    );
    const favorites = getFavoritesFromStorage();
    const ratings = getUserRatings();

    return {
      totalReviews: reviews.length,
      totalFavorites: favorites.length,
      totalRatings: ratings.length,
    };
  }

  // Para outros usuários, usar dados simulados
  const userReviews = simulatedUserReviews.filter(
    (r) => r.author === currentUsername
  );
  const userFavorites = simulatedUserFavorites[currentUsername] || [];
  const userRatings = simulatedUserRatings[currentUsername] || [];

  return {
    totalReviews: userReviews.length,
    totalFavorites: userFavorites.length,
    totalRatings: userRatings.length,
  };
};

// Função para obter reviews simuladas de um usuário
export const getSimulatedUserReviews = (username: string) => {
  return simulatedUserReviews.filter((review) => review.author === username);
};

// Função para obter favoritos simulados de um usuário
export const getSimulatedUserFavorites = (username: string) => {
  return simulatedUserFavorites[username] || [];
};

// Função para obter ratings simulados de um usuário
export const getSimulatedUserRatings = (username: string) => {
  return simulatedUserRatings[username] || [];
};

// Função para verificar se um usuário existe
export const userExists = (id: string): boolean => {
  return users.some((user) => user.id === id);
};

// Função para listar todos os usuários
export const getAllUsers = (): UserProfile[] => {
  return users;
};
