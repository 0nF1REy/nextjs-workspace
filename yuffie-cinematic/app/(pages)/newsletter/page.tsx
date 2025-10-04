"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  faBell,
  faCalendar,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

// Schema de validação Zod
import { newsletterSchema, NewsletterForm } from "@/lib/validations/newsletter";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const interestOptions = [
  { value: "filmes", label: "Filmes" },
  { value: "series", label: "Séries" },
  { value: "animes", label: "Animes" },
  { value: "documentarios", label: "Documentários" },
  { value: "lancamentos", label: "Lançamentos" },
  { value: "classicos", label: "Clássicos" },
  { value: "reviews", label: "Reviews" },
  { value: "noticias", label: "Notícias" },
];

export default function NewsletterPage() {
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
    getValues,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
      acceptPromotions: false,
      acceptTerms: false,
    },
  });

  const watchedInterests = watch("interests", []);

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = getValues("interests");
    if (checked) {
      if (currentInterests.length < 5) {
        setValue("interests", [...currentInterests, interest]);
      }
    } else {
      setValue(
        "interests",
        currentInterests.filter((i) => i !== interest)
      );
    }
  };

  const onSubmit: SubmitHandler<NewsletterForm> = async (data) => {
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Newsletter inscrita:", data);
    setIsSubmitted(true);

    // Reset após sucesso
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen w-full bg-[#131b22] text-gray-100 flex items-center justify-center">
          <Card className="w-full max-w-md bg-[#0d1118] border border-green-900/40">
            <CardContent className="text-center py-16">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-6xl text-green-500 mb-6"
              />
              <h2 className="text-2xl font-bold text-green-500 mb-4">
                Inscrição Realizada!
              </h2>
              <p className="text-gray-300 mb-4">
                Bem-vindo à nossa newsletter! Você receberá as melhores
                novidades do cinema.
              </p>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#131b22] text-gray-100">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        </div>

        <div className="relative w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-500 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faBell} />
              Newsletter
            </h1>
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardContent className="py-6 text-center">
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-4xl text-purple-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Reviews Exclusivos
                </h3>
                <p className="text-sm text-gray-300">
                  Análises detalhadas e primeiras impressões dos lançamentos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/30 to-purple-800/20 border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardContent className="py-6 text-center">
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={faGift}
                    className="text-4xl text-purple-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Recomendações Personalizadas
                </h3>
                <p className="text-sm text-gray-300">
                  Dicas de filmes e séries baseadas no seu perfil e preferências
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-800/20 border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardContent className="py-6 text-center">
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-4xl text-purple-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Novidades do Cinema
                </h3>
                <p className="text-sm text-gray-300">
                  Trailers, notícias e tudo sobre o mundo cinematográfico
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#0d1118] border border-purple-900/40">
            <CardHeader>
              <CardTitle className="text-xl text-purple-400">
                Inscreva-se
              </CardTitle>
              <p className="text-gray-400">
                Receba as melhores novidades do mundo do cinema
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome e Sobrenome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "firstName"
                          ? "text-purple-400"
                          : "text-gray-300"
                      }`}
                    >
                      Primeiro Nome *
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="João"
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="lastName"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "lastName"
                          ? "text-purple-400"
                          : "text-gray-300"
                      }`}
                    >
                      Sobrenome *
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Silva"
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* E-mail e Data de Nascimento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="email"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "email"
                          ? "text-purple-400"
                          : "text-gray-300"
                      }`}
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="joao@email.com"
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="birthDate"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "birthDate"
                          ? "text-purple-400"
                          : "text-gray-300"
                      }`}
                    >
                      Data de Nascimento *
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      {...register("birthDate")}
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 cursor-pointer"
                      onFocus={() => setFocusedField("birthDate")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.birthDate && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.birthDate.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interesses */}
                <div>
                  <Label
                    className={`font-medium mb-3 block transition-colors duration-200 ${
                      focusedField === "interests"
                        ? "text-purple-400"
                        : "text-gray-300"
                    }`}
                  >
                    Seus Interesses * (máximo 5)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestOptions.map((option) => {
                      const isChecked = watchedInterests.includes(option.value);
                      const isDisabled =
                        !isChecked && watchedInterests.length >= 5;

                      return (
                        <div
                          key={option.value}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id={option.value}
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={(e) =>
                              handleInterestChange(
                                option.value,
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 disabled:opacity-50 cursor-pointer"
                          />
                          <Label
                            htmlFor={option.value}
                            className={`text-sm ${
                              isDisabled ? "text-gray-500" : "text-gray-300"
                            }`}
                          >
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Selecionados: {watchedInterests.length}/5
                  </p>
                  {errors.interests && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.interests.message}
                    </p>
                  )}
                </div>

                {/* Frequência */}
                <div>
                  <Label
                    htmlFor="frequency"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "frequency"
                        ? "text-purple-400"
                        : "text-gray-300"
                    }`}
                  >
                    Frequência de E-mails *
                  </Label>
                  <select
                    id="frequency"
                    {...register("frequency")}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer transition-all duration-200"
                    onFocus={() => setFocusedField("frequency")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Selecione a frequência</option>
                    <option value="diario">Diário</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </select>
                  {errors.frequency && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.frequency.message}
                    </p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptPromotions"
                      {...register("acceptPromotions")}
                      className="mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 cursor-pointer"
                    />
                    <Label
                      htmlFor="acceptPromotions"
                      className="text-sm text-gray-300 leading-relaxed"
                    >
                      Aceito receber ofertas promocionais e descontos especiais
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      {...register("acceptTerms")}
                      className="mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 cursor-pointer"
                    />
                    <Label
                      htmlFor="acceptTerms"
                      className="text-sm text-gray-300 leading-relaxed"
                    >
                      Li e concordo com os{" "}
                      <Link
                        href="/legal?tab=termos"
                        className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
                      >
                        termos de uso
                      </Link>{" "}
                      e{" "}
                      <Link
                        href="/legal?tab=privacidade"
                        className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
                      >
                        política de privacidade.
                      </Link>
                      *
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-red-400 text-sm">
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>

                {/* Botão de Enviar */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      className={`w-4 h-4 mr-2 ${
                        isSubmitting ? "animate-pulse" : ""
                      }`}
                    />
                    {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
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
    </ProtectedRoute>
  );
}
