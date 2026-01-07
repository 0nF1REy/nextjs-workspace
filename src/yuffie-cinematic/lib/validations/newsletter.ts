import { z } from "zod";

export const newsletterSchema = z.object({
  firstName: z
    .string()
    .min(1, "Primeiro nome é obrigatório")
    .min(2, "Primeiro nome deve ter pelo menos 2 caracteres")
    .max(30, "Primeiro nome deve ter no máximo 30 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ]+$/, "Primeiro nome deve conter apenas letras"),

  lastName: z
    .string()
    .min(1, "Sobrenome é obrigatório")
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(30, "Sobrenome deve ter no máximo 30 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras"),

  email: z
    .email({ message: "E-mail inválido" })
    .min(1, "E-mail é obrigatório")
    .min(10, "E-mail deve ter pelo menos 10 caracteres"),

  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 13 && age <= 120;
      },
      { message: "Idade deve estar entre 13 e 120 anos" }
    ),

  interests: z
    .array(z.string())
    .min(1, "Selecione pelo menos um interesse")
    .max(5, "Selecione no máximo 5 interesses"),

  frequency: z.enum(["diario", "semanal", "mensal"], {
    message: "Selecione uma frequência válida",
  }),

  acceptPromotions: z.boolean(),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos para continuar",
  }),
});

export type NewsletterForm = z.infer<typeof newsletterSchema>;
