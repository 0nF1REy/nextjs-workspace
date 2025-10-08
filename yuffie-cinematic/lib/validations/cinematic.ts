import { z } from "zod";

export const cinematicSchema = z.object({
  type: z.enum(["filme", "serie", "anime"]),
  title: z.string().min(1, "Título obrigatório"),
  director: z.string().min(1, "Diretor obrigatório"),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  duration: z.number().int().min(1).optional(),
  seasons: z.number().int().min(1).optional(),
  episodes: z.number().int().min(1).optional(),
  studio: z.string().optional(),
  rating: z.number().min(0).max(10),
  synopsis: z.string().min(1, "Sinopse obrigatória"),
  classification: z.string().min(1, "Classificação obrigatória"),
  language: z.string().min(1, "Idioma obrigatório"),
  country: z.string().min(1, "País obrigatório"),
  genres: z.array(z.string().min(1)).min(1, "Pelo menos um gênero obrigatório"),
  cast: z.array(z.object({ 
    name: z.string().min(1, "Nome do ator obrigatório"), 
    character: z.string().min(1, "Nome do personagem obrigatório") 
  })).min(1, "Pelo menos um ator obrigatório"),
  poster: z.string().optional(),
  trailer: z.string().optional(),
  status: z.enum(["draft", "published"]),
});

export type CinematicForm = z.infer<typeof cinematicSchema>;
