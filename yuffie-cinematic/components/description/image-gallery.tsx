"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import MediaViewer from "./media-viewer";

export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  description?: string;
  people?: string[];
  photoCredit?: string;
  sourceLink?: string;
}

interface ImageGalleryProps {
  images?: GalleryImage[];
  title?: string;
  movieId?: number;
}

export default function ImageGallery({
  images: providedImages,
  title = "Galeria de Imagens",
  movieId,
}: ImageGalleryProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);

      // Simula carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setImages(providedImages || []);
      setIsLoading(false);
    };

    loadImages();
  }, [movieId, providedImages]);

  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  if (isLoading) {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-red-500 mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="aspect-[16/9] bg-gray-800 animate-pulse rounded-lg"
            />
          ))}
        </div>
        <p className="text-gray-400 mt-4 text-center">Carregando imagens...</p>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-red-500 mb-4">{title}</h2>
        <p className="text-gray-400">Nenhuma imagem encontrada.</p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-red-500 mb-4">{title}</h2>
      <p className="text-gray-400 text-sm mb-6">
        {images.length} imagens • Clique para visualizar em tela cheia
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((item, index) => (
          <Card
            role="button"
            aria-label={`Abrir imagem ${item.title}`}
            key={item.id}
            className="group overflow-hidden bg-black/40 border border-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer hover:border-red-500/50"
            onClick={() => openViewer(index)}
          >
            <div className="aspect-[16/9] relative">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>

            <CardFooter className="p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="w-full">
                <p className="text-sm text-gray-200 truncate font-medium mb-1">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-400 truncate">
                    {item.description}
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <MediaViewer
        images={images}
        isOpen={isViewerOpen}
        onClose={closeViewer}
        startIndex={selectedIndex}
      />
    </section>
  );
}
