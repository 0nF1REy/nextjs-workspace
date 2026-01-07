import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "E-mail inválido" }).min(1, "E-mail é obrigatório"),

  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),

  remember: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof loginSchema>;
