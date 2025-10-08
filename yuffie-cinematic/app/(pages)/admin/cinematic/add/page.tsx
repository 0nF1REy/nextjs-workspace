
"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cinematicSchema } from "@/lib/validations/cinematic";

const typeOptions = [
  { value: "filme", label: "Filme" },
  { value: "serie", label: "Série" },
  { value: "anime", label: "Anime" },
] as const;

export default function AddCinematicPage() {
  const [selectedType, setSelectedType] = useState<"filme" | "serie" | "anime">("filme");
  
  const form = useForm({
    resolver: zodResolver(cinematicSchema),
    defaultValues: {
      type: "filme" as const,
      title: "",
      director: "",
      year: new Date().getFullYear(),
      rating: 0,
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

  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = form;

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

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Cinematic cadastrado:", data);
    alert("Cinematic cadastrado com sucesso!\n" + JSON.stringify(data, null, 2));
    reset();
  };

  const handleTypeChange = (newType: "filme" | "serie" | "anime") => {
    setSelectedType(newType);
    setValue("type", newType);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Adicionar Cinematic</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tipo</label>
          <select
            {...register("type")}
            value={selectedType}
            onChange={e => handleTypeChange(e.target.value as "filme" | "serie" | "anime")}
            className="border rounded px-2 py-1 w-full"
          >
            {typeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Título</label>
          <input {...register("title")} className="border rounded px-2 py-1 w-full" />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Diretor</label>
          <input {...register("director")} className="border rounded px-2 py-1 w-full" />
          {errors.director && <span className="text-red-500 text-sm">{errors.director.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Ano</label>
          <input type="number" {...register("year", { valueAsNumber: true })} className="border rounded px-2 py-1 w-full" />
          {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
        </div>

        {selectedType === "filme" && (
          <div>
            <label className="block font-medium mb-1">Duração (minutos)</label>
            <input 
              type="number" 
              {...register("duration", { valueAsNumber: true })} 
              className="border rounded px-2 py-1 w-full" 
            />
            {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
          </div>
        )}

        {(selectedType === "serie" || selectedType === "anime") && (
          <>
            <div>
              <label className="block font-medium mb-1">Temporadas</label>
              <input 
                type="number" 
                {...register("seasons", { valueAsNumber: true })} 
                className="border rounded px-2 py-1 w-full" 
              />
              {errors.seasons && <span className="text-red-500 text-sm">{errors.seasons.message}</span>}
            </div>
            <div>
              <label className="block font-medium mb-1">Episódios</label>
              <input 
                type="number" 
                {...register("episodes", { valueAsNumber: true })} 
                className="border rounded px-2 py-1 w-full" 
              />
              {errors.episodes && <span className="text-red-500 text-sm">{errors.episodes.message}</span>}
            </div>
          </>
        )}

        {selectedType === "anime" && (
          <div>
            <label className="block font-medium mb-1">Estúdio</label>
            <input {...register("studio")} className="border rounded px-2 py-1 w-full" />
            {errors.studio && <span className="text-red-500 text-sm">{errors.studio.message}</span>}
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Nota (0-10)</label>
          <input type="number" step="0.1" {...register("rating", { valueAsNumber: true })} className="border rounded px-2 py-1 w-full" />
          {errors.rating && <span className="text-red-500 text-sm">{errors.rating.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Sinopse</label>
          <textarea {...register("synopsis")} className="border rounded px-2 py-1 w-full" />
          {errors.synopsis && <span className="text-red-500 text-sm">{errors.synopsis.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Classificação</label>
          <input {...register("classification")} className="border rounded px-2 py-1 w-full" />
          {errors.classification && <span className="text-red-500 text-sm">{errors.classification.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Idioma</label>
          <input {...register("language")} className="border rounded px-2 py-1 w-full" />
          {errors.language && <span className="text-red-500 text-sm">{errors.language.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">País</label>
          <input {...register("country")} className="border rounded px-2 py-1 w-full" />
          {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Gêneros</label>
          {genresArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-1">
              <input
                {...register(`genres.${idx}`)}
                className="border rounded px-2 py-1 flex-1"
                placeholder="Gênero"
              />
              <button type="button" onClick={() => genresArray.remove(idx)} className="text-red-500">Remover</button>
            </div>
          ))}
          <button type="button" onClick={() => genresArray.append("")} className="text-blue-500">Adicionar gênero</button>
          {errors.genres && <span className="text-red-500 text-sm">{errors.genres.message as string}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Elenco</label>
          {castArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-1">
              <input
                {...register(`cast.${idx}.name`)}
                className="border rounded px-2 py-1 flex-1"
                placeholder="Nome do ator"
              />
              <input
                {...register(`cast.${idx}.character`)}
                className="border rounded px-2 py-1 flex-1"
                placeholder="Personagem"
              />
              <button type="button" onClick={() => castArray.remove(idx)} className="text-red-500">Remover</button>
            </div>
          ))}
          <button type="button" onClick={() => castArray.append({ name: "", character: "" })} className="text-blue-500">Adicionar ator</button>
          {errors.cast && <span className="text-red-500 text-sm">{errors.cast.message as string}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Poster (URL)</label>
          <input {...register("poster")} className="border rounded px-2 py-1 w-full" />
          {errors.poster && <span className="text-red-500 text-sm">{errors.poster.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Trailer (URL)</label>
          <input {...register("trailer")} className="border rounded px-2 py-1 w-full" />
          {errors.trailer && <span className="text-red-500 text-sm">{errors.trailer.message}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select {...register("status")} className="border rounded px-2 py-1 w-full">
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
          {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}
