import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),

  email: z
    .email({ message: "E-mail inválido" })
    .min(10, "E-mail deve ter pelo menos 10 caracteres"),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato deve ser (11) 99999-9999"),

  subject: z
    .string()
    .min(1, "Selecione um assunto")
    .refine((val) => ["suporte", "bug", "sugestao", "outros"].includes(val), {
      message: "Selecione um assunto válido",
    }),

  priority: z
    .string()
    .min(1, "Selecione uma prioridade")
    .refine((val) => ["baixa", "media", "alta", "urgente"].includes(val), {
      message: "Selecione uma prioridade válida",
    }),

  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .min(20, "Mensagem deve ter pelo menos 20 caracteres")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),

  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos para continuar",
  }),
});

export type ContactForm = z.infer<typeof contactSchema>;
