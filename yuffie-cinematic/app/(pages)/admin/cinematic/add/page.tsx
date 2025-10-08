"use client";

import React, { useState } from "react";
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
import { cinematicSchema } from "@/lib/validations/cinematic";

const typeOptions = [
  { value: "filme", label: "Filme" },
  { value: "serie", label: "Série" },
  { value: "anime", label: "Anime" },
] as const;

const placeholders = {
  filme: {
    title: "Ex: Vingadores: Ultimato",
    director: "Ex: Anthony Russo",
    synopsis: "Descreva a história do filme...",
  },
  serie: {
    title: "Ex: Breaking Bad",
    director: "Ex: Vince Gilligan",
    synopsis: "Descreva a história da série...",
  },
  anime: {
    title: "Ex: Your Name",
    director: "Ex: Makoto Shinkai",
    synopsis: "Descreva a história do anime...",
  },
};

export default function AddCinematicPage() {
  const [selectedType, setSelectedType] = useState<"filme" | "serie" | "anime">(
    "filme"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(cinematicSchema),
    defaultValues: {
      type: "filme" as const,
      title: "",
      director: "",
      year: new Date().getFullYear(),
      synopsis: "",
      classification: "",
      language: "",
      country: "",
      genres: [""],
      cast: [{ name: "", character: "" }],
      poster: "",
      trailer: "",
      status: "draft" as const,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = form;

  // Configuração específica para arrays
  const genresArray = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: control as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: "genres" as any,
  });

  const castArray = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: control as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: "cast" as any,
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    console.log("Cinematic cadastrado:", data);

    // Simula salvamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);

    // Reset após sucesso
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  const handleTypeChange = (newType: "filme" | "serie" | "anime") => {
    setSelectedType(newType);
    setValue("type", newType);
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
              Cinematic Cadastrado!
            </h2>
            <p className="text-gray-300">
              O cinematic foi adicionado com sucesso ao catálogo.
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
          <Link href="/admin/cinematic">
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
            Cadastrar Novo Cinematic
          </h1>
        </div>

        <Card className="bg-[#0d1118] border border-red-900/40">
          <CardHeader>
            <CardTitle className="text-xl text-red-400">
              Informações do Cinematic
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Tipo */}
              <div>
                <Label
                  htmlFor="type"
                  className="text-gray-300 font-medium mb-2 block"
                >
                  Tipo *
                </Label>
                <select
                  id="type"
                  {...register("type")}
                  value={selectedType}
                  onChange={(e) =>
                    handleTypeChange(
                      e.target.value as "filme" | "serie" | "anime"
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                >
                  {typeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

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
                    placeholder={placeholders[selectedType].title}
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
                    placeholder={placeholders[selectedType].director}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.director && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.director.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Ano */}
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

              {/* Campos condicionais baseados no tipo */}
              {selectedType === "filme" && (
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
                    min="1"
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
              )}

              {(selectedType === "serie" || selectedType === "anime") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="seasons"
                      className="text-gray-300 font-medium mb-2 block"
                    >
                      Temporadas *
                    </Label>
                    <Input
                      id="seasons"
                      type="number"
                      min="1"
                      {...register("seasons", { valueAsNumber: true })}
                      placeholder="1"
                      className="bg-gray-800/50 border-gray-600 text-white"
                    />
                    {errors.seasons && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.seasons.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="episodes"
                      className="text-gray-300 font-medium mb-2 block"
                    >
                      Episódios *
                    </Label>
                    <Input
                      id="episodes"
                      type="number"
                      min="1"
                      {...register("episodes", { valueAsNumber: true })}
                      placeholder="12"
                      className="bg-gray-800/50 border-gray-600 text-white"
                    />
                    {errors.episodes && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.episodes.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedType === "anime" && (
                <div>
                  <Label
                    htmlFor="studio"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Estúdio *
                  </Label>
                  <Input
                    id="studio"
                    {...register("studio")}
                    placeholder="Ex: Studio Ghibli"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.studio && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.studio.message}
                    </p>
                  )}
                </div>
              )}

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
                  placeholder={placeholders[selectedType].synopsis}
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
                    onClick={() => genresArray.append("")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-3">
                  {genresArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...register(`genres.${index}`)}
                        placeholder="Ex: Ação, Drama, Ficção"
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {genresArray.fields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => genresArray.remove(index)}
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
                    {errors.genres.message as string}
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
                    onClick={() =>
                      castArray.append({ name: "", character: "" })
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-3">
                  {castArray.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                      <Input
                        {...register(`cast.${index}.name`)}
                        placeholder="Ex: Robert Downey Jr."
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      <Input
                        {...register(`cast.${index}.character`)}
                        placeholder="Ex: Tony Stark / Homem de Ferro"
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                      {castArray.fields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => castArray.remove(index)}
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
                    {errors.cast.message as string}
                  </p>
                )}
              </div>

              {/* Poster e Trailer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="poster"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Poster (URL)
                  </Label>
                  <Input
                    id="poster"
                    {...register("poster")}
                    placeholder="https://exemplo.com/poster.jpg"
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.poster && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.poster.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="trailer"
                    className="text-gray-300 font-medium mb-2 block"
                  >
                    Trailer (URL)
                  </Label>
                  <Input
                    id="trailer"
                    {...register("trailer")}
                    placeholder="https://youtube.com/watch?v=..."
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                  {errors.trailer && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.trailer.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <Label
                  htmlFor="status"
                  className="text-gray-300 font-medium mb-2 block"
                >
                  Status
                </Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                {errors.status && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.status.message}
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
                  {isSubmitting ? "Salvando..." : "Cadastrar Cinematic"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
