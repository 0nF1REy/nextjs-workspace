"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { movieSchema, type MovieForm } from "@/lib/validations/movie";
import { z } from "zod";

const formSchema = movieSchema.omit({ status: true });
type FormData = z.infer<typeof formSchema>;

export default function AddMoviePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [genreFields, setGenreFields] = useState([""]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      originalTitle: "",
      year: new Date().getFullYear(),
      duration: undefined,
      synopsis: "",
      classification: "",
      language: "",
      country: "",
      genres: [""],
      cast: [{ name: "", character: "" }],
      poster: "",
      trailer: "",
      rating: undefined,
    },
  });

  const {
    fields: castFields,
    append: appendCast,
    remove: removeCast,
  } = useFieldArray({
    control,
    name: "cast",
  });

  const addGenre = () => {
    setGenreFields([...genreFields, ""]);
  };

  const removeGenreField = (index: number) => {
    if (genreFields.length > 1) {
      setGenreFields(genreFields.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: FormData) => {
    // Filtra gêneros vazios antes da validação
    const filteredData = {
      ...data,
      genres: data.genres.filter((genre) => genre.trim().length > 0),
    };

    // Simula salvamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Adiciona o status default antes de salvar
    const movieData: MovieForm = {
      ...filteredData,
      status: "draft" as const,
    };

    console.log("Filme cadastrado:", movieData);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Título e Diretor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-gray-300 font-medium mb-2 block"
                  >
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
                    className="text-gray-300 font-medium mb-2 block"
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
                  <Label
                    htmlFor="year"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Ano *
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", {
                      valueAsNumber: true,
                      setValueAs: (value) => {
                        if (
                          value === "" ||
                          value === null ||
                          value === undefined
                        )
                          return undefined;
                        const num = Number(value);
                        return isNaN(num) ? undefined : num;
                      },
                    })}
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
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Duração (min) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    {...register("duration", {
                      valueAsNumber: true,
                      setValueAs: (value) => {
                        if (
                          value === "" ||
                          value === null ||
                          value === undefined
                        )
                          return undefined;
                        const num = Number(value);
                        return isNaN(num) ? undefined : num;
                      },
                    })}
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
                  <Label
                    htmlFor="rating"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Avaliação (0-10)
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    {...register("rating", {
                      valueAsNumber: true,
                      setValueAs: (value) => {
                        if (
                          value === "" ||
                          value === null ||
                          value === undefined
                        )
                          return undefined;
                        const num = Number(value);
                        return isNaN(num) ? undefined : num;
                      },
                    })}
                    placeholder="8.5"
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
                <Label
                  htmlFor="synopsis"
                  className="text-gray-300 font-medium mb-2 block"
                >
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

              {/* Classificação, Idioma e País */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="classification"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Classificação *
                  </Label>
                  <Input
                    id="classification"
                    {...register("classification")}
                    placeholder="Ex: 12, 14, 16, 18"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.classification && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.classification.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="language"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Idioma *
                  </Label>
                  <Input
                    id="language"
                    {...register("language")}
                    placeholder="Ex: Português, Inglês"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.language && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="country"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    País *
                  </Label>
                  <Input
                    id="country"
                    {...register("country")}
                    placeholder="Ex: Brasil, EUA"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.country && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Gêneros */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-gray-300 font-medium">Gêneros *</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addGenre}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-3">
                  {genreFields.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        {...register(`genres.${index}` as const)}
                        placeholder="Ex: Ação, Drama, Ficção"
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {genreFields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeGenreField(index)}
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
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-gray-300 font-medium">
                    Elenco Principal *
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendCast({ name: "", character: "" })}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-3">
                  {castFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                      <Input
                        {...register(`cast.${index}.name` as const)}
                        placeholder="Ex: Robert Downey Jr."
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      <Input
                        {...register(`cast.${index}.character` as const)}
                        placeholder="Ex: Tony Stark / Homem de Ferro"
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {castFields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeCast(index)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20 md:col-span-2"
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
