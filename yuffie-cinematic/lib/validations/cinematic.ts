import { z } from "zod";

// Validadores customizados para arrays
const nonEmptyStringArray = (fieldName: string, minItems = 1) =>
  z
    .array(z.string())
    .min(
      minItems,
      `Pelo menos ${minItems} ${fieldName.toLowerCase()} é obrigatório`
    )
    .refine((arr) => arr.some((item) => item.trim().length > 0), {
      message: `Pelo menos ${minItems} ${fieldName.toLowerCase()} deve ser preenchido`,
    });

const castSchema = z
  .array(
    z.object({
      name: z.string(),
      character: z.string(),
    })
  )
  .min(1, "Pelo menos um ator é obrigatório")
  .refine(
    (cast) =>
      cast.some(
        (actor) =>
          actor.name.trim().length > 0 && actor.character.trim().length > 0
      ),
    {
      message: "Pelo menos um ator com nome e personagem deve ser preenchido",
    }
  );

export const cinematicSchema = z.object({
  type: z.enum(["filme", "serie", "anime"]),
  title: z.string().min(1, "Título obrigatório"),
  director: z.string().min(1, "Diretor obrigatório"),
  year: z.coerce
    .number()
    .int("Ano deve ser um número inteiro")
    .min(1900, "Ano deve ser maior que 1900")
    .max(new Date().getFullYear(), "Ano não pode ser futuro"),
  duration: z.coerce
    .number()
    .int("Duração deve ser um número inteiro")
    .min(1, "Duração deve ser maior que 0")
    .optional(),
  seasons: z.coerce
    .number()
    .int("Temporadas deve ser um número inteiro")
    .min(1, "Temporadas deve ser maior que 0")
    .optional(),
  episodes: z.coerce
    .number()
    .int("Episódios deve ser um número inteiro")
    .min(1, "Episódios deve ser maior que 0")
    .optional(),
  studio: z.string().optional(),
  synopsis: z.string().min(1, "Sinopse obrigatória"),
  classification: z.string().min(1, "Classificação obrigatória"),
  language: z.string().min(1, "Idioma obrigatório"),
  country: z.string().min(1, "País obrigatório"),
  genres: nonEmptyStringArray("Gênero"),
  cast: castSchema,
  poster: z.string().optional(),
  trailer: z.string().optional(),
  status: z.enum(["draft", "published"]),
});

export type CinematicForm = z.infer<typeof cinematicSchema>;
