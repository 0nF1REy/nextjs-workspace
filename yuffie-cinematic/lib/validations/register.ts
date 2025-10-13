import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "O nome de usuário pode conter apenas letras, números e underscores"
      ),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;
