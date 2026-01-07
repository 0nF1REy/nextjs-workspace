import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e underscores"),
    email: z.email("E-mail inválido"),
    cpf: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => !value || cpf.isValid(value.replace(/\D/g, "")),
        "CPF inválido"
      ),
    phone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => !value || value.replace(/[^0-9]/g, "").length >= 10,
        "O número de telefone parece incompleto"
      ),
    birthDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value),
        "Use o formato DD/MM/AAAA"
      ),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    passwordConfirmation: z.string(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "Você deve aceitar os termos de uso."),
    acceptPrivacy: z
      .boolean()
      .refine(
        (val) => val === true,
        "Você deve aceitar a política de privacidade."
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;
