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

// COMPONENTE: Exibição de erros
const ErrorMessage = ({ error }: { error?: unknown }) => {
  if (!error) return null;

  let message = "";

  if (typeof error === "string") {
    message = error;
  } else if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      message = error.message;
    } else if (
      "root" in error &&
      error.root &&
      typeof error.root === "object" &&
      "message" in error.root
    ) {
      message = String(error.root.message);
    } else if ("type" in error && error.type === "too_small") {
      message = "Este campo é obrigatório";
    }
  }

  if (!message) return null;

  return <p className="text-red-400 text-sm mt-1">{message}</p>;
};

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
    cast: {
      name: "Ex: Robert Downey Jr.",
      character: "Ex: Tony Stark / Homem de Ferro",
    },
  },
  serie: {
    title: "Ex: Breaking Bad",
    director: "Ex: Vince Gilligan",
    synopsis: "Descreva a história da série...",
    cast: {
      name: "Ex: Bryan Cranston",
      character: "Ex: Walter White",
    },
  },
  anime: {
    title: "Ex: Your Name",
    director: "Ex: Makoto Shinkai",
    synopsis: "Descreva a história do anime...",
    cast: {
      name: "Ex: Ryunosuke Kamiki",
      character: "Ex: Taki Tachibana (voz)",
    },
  },
};

export default function AddCinematicPage() {
  const [selectedType, setSelectedType] = useState<"filme" | "serie" | "anime">(
    "filme"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-500 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                  className={`font-medium mb-2 block transition-colors duration-200 ${
                    focusedField === "type" ? "text-red-400" : "text-gray-300"
                  }`}
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
                  className={`w-full px-3 py-2 bg-gray-800/50 rounded-md text-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    focusedField === "type"
                      ? "border border-red-400 focus:border-red-400"
                      : "border border-gray-600"
                  }`}
                  onFocus={() => setFocusedField("type")}
                  onBlur={() => setFocusedField(null)}
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
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "title"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Título *
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder={placeholders[selectedType].title}
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "title"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.title && <ErrorMessage error={errors.title} />}
                </div>

                <div>
                  <Label
                    htmlFor="director"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "director"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Diretor *
                  </Label>
                  <Input
                    id="director"
                    {...register("director")}
                    placeholder={placeholders[selectedType].director}
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "director"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("director")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.director && <ErrorMessage error={errors.director} />}
                </div>
              </div>

              {/* Ano */}
              <div>
                <Label
                  htmlFor="year"
                  className={`font-medium mb-2 block transition-colors duration-200 ${
                    focusedField === "year" ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  Ano *
                </Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year")}
                  placeholder="2024"
                  className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    focusedField === "year"
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-600"
                  }`}
                  onFocus={() => setFocusedField("year")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.year && <ErrorMessage error={errors.year} />}
              </div>

              {/* Campos condicionais baseados no tipo */}
              {selectedType === "filme" && (
                <div>
                  <Label
                    htmlFor="duration"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "duration"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Duração (min) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    {...register("duration")}
                    placeholder="120"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "duration"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("duration")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.duration && <ErrorMessage error={errors.duration} />}
                </div>
              )}

              {(selectedType === "serie" || selectedType === "anime") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="seasons"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "seasons"
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}
                    >
                      Temporadas *
                    </Label>
                    <Input
                      id="seasons"
                      type="number"
                      min="1"
                      {...register("seasons")}
                      placeholder="1"
                      className={`bg-gray-800/50 text-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-0 ${
                        focusedField === "seasons"
                          ? "border-red-400 focus:border-red-400"
                          : "border-gray-600"
                      }`}
                      onFocus={() => setFocusedField("seasons")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.seasons && <ErrorMessage error={errors.seasons} />}
                  </div>
                  <div>
                    <Label
                      htmlFor="episodes"
                      className={`font-medium mb-2 block transition-colors duration-200 ${
                        focusedField === "episodes"
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}
                    >
                      Episódios *
                    </Label>
                    <Input
                      id="episodes"
                      type="number"
                      min="1"
                      {...register("episodes")}
                      placeholder="12"
                      className={`bg-gray-800/50 text-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-0 ${
                        focusedField === "episodes"
                          ? "border-red-400 focus:border-red-400"
                          : "border-gray-600"
                      }`}
                      onFocus={() => setFocusedField("episodes")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.episodes && (
                      <ErrorMessage error={errors.episodes} />
                    )}
                  </div>
                </div>
              )}

              {selectedType === "anime" && (
                <div>
                  <Label
                    htmlFor="studio"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "studio"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Estúdio *
                  </Label>
                  <Input
                    id="studio"
                    {...register("studio")}
                    placeholder="Ex: Studio Ghibli"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "studio"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("studio")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.studio && <ErrorMessage error={errors.studio} />}
                </div>
              )}

              {/* Sinopse */}
              <div>
                <Label
                  htmlFor="synopsis"
                  className={`font-medium mb-2 block transition-colors duration-200 ${
                    focusedField === "synopsis"
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  Sinopse *
                </Label>
                <textarea
                  id="synopsis"
                  {...register("synopsis")}
                  placeholder={placeholders[selectedType].synopsis}
                  rows={4}
                  className={`w-full px-3 py-2 bg-gray-800/50 rounded-md text-white placeholder:text-gray-400 resize-none transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    focusedField === "synopsis"
                      ? "border border-red-400 focus:border-red-400"
                      : "border border-gray-600"
                  }`}
                  onFocus={() => setFocusedField("synopsis")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.synopsis && <ErrorMessage error={errors.synopsis} />}
              </div>

              {/* Classificação, Idioma e País */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="classification"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "classification"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Classificação *
                  </Label>
                  <Input
                    id="classification"
                    {...register("classification")}
                    placeholder="Ex: 12, 14, 16, 18"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "classification"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("classification")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.classification && (
                    <ErrorMessage error={errors.classification} />
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="language"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "language"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Idioma *
                  </Label>
                  <Input
                    id="language"
                    {...register("language")}
                    placeholder="Ex: Português, Inglês"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "language"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("language")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.language && <ErrorMessage error={errors.language} />}
                </div>

                <div>
                  <Label
                    htmlFor="country"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "country"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    País *
                  </Label>
                  <Input
                    id="country"
                    {...register("country")}
                    placeholder="Ex: Brasil, EUA"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "country"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("country")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.country && <ErrorMessage error={errors.country} />}
                </div>
              </div>

              {/* Gêneros */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label
                    className={`font-medium transition-colors duration-200 ${
                      focusedField?.startsWith("genres")
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Gêneros *
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => genresArray.append("")}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-3">
                  {genresArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          {...register(`genres.${index}`)}
                          placeholder="Ex: Ação, Drama, Ficção"
                          className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                            focusedField === `genres.${index}`
                              ? "border-red-400 focus:border-red-400"
                              : "border-gray-600"
                          }`}
                          onFocus={() => setFocusedField(`genres.${index}`)}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
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
                    {errors.genres.message ||
                      "Pelo menos um gênero é obrigatório"}
                  </p>
                )}
                {errors.genres?.root && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.genres.root.message}
                  </p>
                )}
              </div>

              {/* Elenco */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label
                    className={`font-medium transition-colors duration-200 ${
                      focusedField?.startsWith("cast")
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Elenco Principal *
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      castArray.append({ name: "", character: "" })
                    }
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
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
                      <div>
                        <Input
                          {...register(`cast.${index}.name`)}
                          placeholder={placeholders[selectedType].cast.name}
                          className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                            focusedField === `cast.${index}.name`
                              ? "border-red-400 focus:border-red-400"
                              : "border-gray-600"
                          }`}
                          onFocus={() => setFocusedField(`cast.${index}.name`)}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <Input
                          {...register(`cast.${index}.character`)}
                          placeholder={
                            placeholders[selectedType].cast.character
                          }
                          className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                            focusedField === `cast.${index}.character`
                              ? "border-red-400 focus:border-red-400"
                              : "border-gray-600"
                          }`}
                          onFocus={() =>
                            setFocusedField(`cast.${index}.character`)
                          }
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      {castArray.fields.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => castArray.remove(index)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20 md:col-span-2 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.cast && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cast.message || "Pelo menos um ator é obrigatório"}
                  </p>
                )}
                {errors.cast?.root && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cast.root.message}
                  </p>
                )}
              </div>

              {/* Poster e Trailer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="poster"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "poster"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Poster (URL)
                  </Label>
                  <Input
                    id="poster"
                    {...register("poster")}
                    placeholder="https://exemplo.com/poster.jpg"
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "poster"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("poster")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.poster && <ErrorMessage error={errors.poster} />}
                </div>

                <div>
                  <Label
                    htmlFor="trailer"
                    className={`font-medium mb-2 block transition-colors duration-200 ${
                      focusedField === "trailer"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    Trailer (URL)
                  </Label>
                  <Input
                    id="trailer"
                    {...register("trailer")}
                    placeholder="https://youtube.com/watch?v=..."
                    className={`bg-gray-800/50 text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      focusedField === "trailer"
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-600"
                    }`}
                    onFocus={() => setFocusedField("trailer")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {errors.trailer && <ErrorMessage error={errors.trailer} />}
                </div>
              </div>

              {/* Status */}
              <div>
                <Label
                  htmlFor="status"
                  className={`font-medium mb-2 block transition-colors duration-200 ${
                    focusedField === "status" ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  Status
                </Label>
                <select
                  id="status"
                  {...register("status")}
                  className={`w-full px-3 py-2 bg-gray-800/50 rounded-md text-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    focusedField === "status"
                      ? "border border-red-400 focus:border-red-400"
                      : "border border-gray-600"
                  }`}
                  onFocus={() => setFocusedField("status")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                {errors.status && <ErrorMessage error={errors.status} />}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 cursor-pointer"
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

        {/* Botão Voltar */}
        <div className="flex justify-center mt-8">
          <Link href="/admin/cinematic">
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
