import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),

  originalTitle: z.string().optional(),

  year: z
    .number()
    .min(1900, "Ano deve ser maior que 1900")
    .max(
      new Date().getFullYear() + 5,
      "Ano não pode ser muito distante no futuro"
    ),

  duration: z
    .number()
    .min(1, "Duração deve ser maior que 0")
    .max(600, "Duração deve ser menor que 600 minutos"),

  genres: z
    .array(z.string())
    .min(1, "Selecione pelo menos um gênero")
    .max(5, "Selecione no máximo 5 gêneros"),

  director: z
    .string()
    .min(1, "Diretor é obrigatório")
    .min(2, "Nome do diretor deve ter pelo menos 2 caracteres"),

  cast: z
    .array(
      z.object({
        name: z.string().min(1, "Nome do ator é obrigatório"),
        character: z.string().optional(),
      })
    )
    .min(1, "Adicione pelo menos um ator"),

  synopsis: z
    .string()
    .min(1, "Sinopse é obrigatória")
    .min(20, "Sinopse deve ter pelo menos 20 caracteres")
    .max(1000, "Sinopse deve ter no máximo 1000 caracteres"),

  poster: z.string().url("URL do poster deve ser válida").optional(),

  trailer: z.string().url("URL do trailer deve ser válida").optional(),

  rating: z
    .number()
    .min(0, "Nota deve ser maior ou igual a 0")
    .max(10, "Nota deve ser menor ou igual a 10")
    .optional(),

  classification: z.string().min(1, "Classificação é obrigatória"),

  language: z.string().min(1, "Idioma é obrigatório"),

  country: z.string().min(1, "País é obrigatório"),

  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type MovieForm = z.infer<typeof movieSchema>;
