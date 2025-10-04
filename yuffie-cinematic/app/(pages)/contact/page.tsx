"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

// Schema de validação Zod
const contactSchema = z.object({
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

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estados para controlar o foco dos inputs
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const watchedMessage = watch("message", "");
  const messageLength = watchedMessage.length;

  const onSubmit = async (data: ContactForm) => {
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Contato enviado:", data);
    setIsSubmitted(true);

    // Reset após sucesso
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 4000);
  };

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full bg-[#131b22] text-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#0d1118] border border-green-900/40">
          <CardContent className="text-center py-16">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-6xl text-green-500 mb-6"
            />
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Mensagem Enviada!
            </h2>
            <p className="text-gray-300 mb-4">
              Obrigado pelo contato. Nossa equipe retornará em breve.
            </p>
            <p className="text-sm text-gray-400">
              Protocolo: #YC-{Math.floor(Math.random() * 100000)}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 flex items-center justify-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            Fale Conosco
          </h1>
        </div>

        <Card className="bg-[#0d1118] border border-blue-900/40 relative z-20">
          <CardHeader>
            <CardTitle className="text-xl text-blue-400">
              Entre em Contato
            </CardTitle>
            <p className="text-gray-400">
              Envie sua dúvida, sugestão ou reporte um problema
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nome e E-mail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="name"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "name"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Seu nome completo"
                    className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "email"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                    className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Telefone */}
              <div>
                <Label
                  htmlFor="phone"
                  className={`font-medium mb-2 block transition-colors duration-200 ${
                    focusedField === "phone" ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(11) 99999-9999"
                  onChange={handlePhoneChange}
                  className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Assunto e Prioridade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="subject"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "subject"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    Assunto *
                  </Label>
                  <select
                    id="subject"
                    {...register("subject")}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all duration-200"
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="bug">Reportar Bug</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="priority"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "priority"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    Prioridade *
                  </Label>
                  <select
                    id="priority"
                    {...register("priority")}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all duration-200"
                    onFocus={() => setFocusedField("priority")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Selecione a prioridade</option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label
                    htmlFor="message"
                    className={`font-medium transition-colors duration-200 ${
                      focusedField === "message"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    Mensagem *
                  </Label>
                  <span
                    className={`text-sm ${
                      messageLength > 500 ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    {messageLength}/500
                  </span>
                </div>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Descreva sua dúvida, problema ou sugestão..."
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Termos */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  {...register("agreeTerms")}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <Label
                  htmlFor="agreeTerms"
                  className="text-sm text-gray-300 leading-relaxed"
                >
                  Concordo com os{" "}
                  <Link
                    href="/legal?tab=termos"
                    className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    termos de uso
                  </Link>{" "}
                  e autorizo o contato através dos dados fornecidos. *
                </Label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-400 text-sm">
                  {errors.agreeTerms.message}
                </p>
              )}

              {/* Botão de Enviar */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`w-4 h-4 mr-2 ${
                      isSubmitting ? "animate-bounce" : ""
                    }`}
                  />
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Botão Voltar */}
        <div className="flex justify-center mt-8">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
