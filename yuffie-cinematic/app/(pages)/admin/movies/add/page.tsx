"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  faFilm,
  faPlus,
  faTimes,
  faCheck,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

// Schema de validação Zod
const movieSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),

  director: z
    .string()
    .min(1, "Diretor é obrigatório")
    .min(3, "Nome do diretor deve ter pelo menos 3 caracteres")
    .max(50, "Nome do diretor deve ter no máximo 50 caracteres"),

  year: z
    .number()
    .min(1900, "Ano deve ser a partir de 1900")
    .max(new Date().getFullYear() + 5, "Ano não pode ser muito futuro"),

  duration: z
    .number()
    .min(10, "Duração deve ser de pelo menos 10 minutos")
    .max(600, "Duração deve ser de no máximo 600 minutos"),

  rating: z
    .number()
    .min(0, "Avaliação deve ser entre 0 e 5")
    .max(5, "Avaliação deve ser entre 0 e 5"),

  synopsis: z
    .string()
    .min(1, "Sinopse é obrigatória")
    .min(50, "Sinopse deve ter pelo menos 50 caracteres")
    .max(1000, "Sinopse deve ter no máximo 1000 caracteres"),

  genres: z
    .array(
      z.object({
        name: z.string().min(1, "Nome do gênero é obrigatório"),
      })
    )
    .min(1, "Pelo menos um gênero é obrigatório"),

  cast: z
    .array(
      z.object({
        actor: z.string().min(1, "Nome do ator é obrigatório"),
      })
    )
    .min(1, "Pelo menos um ator é obrigatório"),
});

type MovieForm = z.infer<typeof movieSchema>;

export default function AddMoviePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MovieForm>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      genres: [{ name: "" }],
      cast: [{ actor: "" }],
    },
  });

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({
    control,
    name: "genres",
  });

  const {
    fields: castFields,
    append: appendCast,
    remove: removeCast,
  } = useFieldArray({
    control,
    name: "cast",
  });

  const onSubmit = async (data: MovieForm) => {
    // Simula salvamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Filme cadastrado:", data);
    setIsSubmitted(true);

    // Reset após sucesso
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
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
              Filme Cadastrado!
            </h2>
            <p className="text-gray-300">
              O filme foi adicionado com sucesso ao catálogo.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20"></div>
      </div>

      <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/welcome">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
            <FontAwesomeIcon icon={faFilm} />
            Cadastrar Novo Filme
          </h1>
        </div>

        <Card className="bg-[#0d1118] border border-red-900/40">
          <CardHeader>
            <CardTitle className="text-xl text-red-400">
              Informações do Filme
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Título e Diretor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300 font-medium">
                    Título *
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Ex: Vingadores: Ultimato"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="director"
                    className="text-gray-300 font-medium"
                  >
                    Diretor *
                  </Label>
                  <Input
                    id="director"
                    {...register("director")}
                    placeholder="Ex: Anthony Russo"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.director && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.director.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Ano, Duração e Avaliação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="year" className="text-gray-300 font-medium">
                    Ano *
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    placeholder="2024"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.year && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="duration"
                    className="text-gray-300 font-medium"
                  >
                    Duração (min) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    {...register("duration", { valueAsNumber: true })}
                    placeholder="120"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.duration && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="rating" className="text-gray-300 font-medium">
                    Avaliação (0-5) *
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    {...register("rating", { valueAsNumber: true })}
                    placeholder="4.5"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.rating && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sinopse */}
              <div>
                <Label htmlFor="synopsis" className="text-gray-300 font-medium">
                  Sinopse *
                </Label>
                <textarea
                  id="synopsis"
                  {...register("synopsis")}
                  placeholder="Descreva a história do filme..."
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder:text-gray-400 resize-none"
                />
                {errors.synopsis && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.synopsis.message}
                  </p>
                )}
              </div>

              {/* Gêneros */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-gray-300 font-medium">Gêneros *</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendGenre({ name: "" })}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2">
                  {genreFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...register(`genres.${index}.name` as const)}
                        placeholder="Ex: Ação, Drama, Ficção"
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {genreFields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeGenre(index)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.genres && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.genres.message}
                  </p>
                )}
              </div>

              {/* Elenco */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-gray-300 font-medium">
                    Elenco Principal *
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendCast({ actor: "" })}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2">
                  {castFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...register(`cast.${index}.actor` as const)}
                        placeholder="Ex: Robert Downey Jr."
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {castFields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeCast(index)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.cast && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cast.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8"
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    className={`w-4 h-4 mr-2 ${
                      isSubmitting ? "animate-spin" : ""
                    }`}
                  />
                  {isSubmitting ? "Salvando..." : "Cadastrar Filme"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
