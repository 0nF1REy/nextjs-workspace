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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-500 mb-2 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            {title}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-[16/9] bg-[#0d1118] border border-red-900/40 rounded-xl overflow-hidden
                       animate-pulse shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3"></div>
              <div className="relative z-10 w-full h-full bg-gray-700/50"></div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 mt-6 text-center flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          Carregando imagens...
        </div>
      </section>
    );
  }

  // Se não há imagens, não renderiza nada
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          {title}
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-3"></div>
        <p className="text-gray-400 text-sm">
          {images.length} imagens • Clique para visualizar em tela cheia
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((item, index) => (
          <Card
            role="button"
            aria-label={`Abrir imagem ${item.title}`}
            key={item.id}
            className="group relative overflow-hidden bg-[#0d1118] border border-red-900/40 
             transition-all duration-500 cursor-pointer p-0 
             shadow-lg rounded-xl 
             hover:scale-105 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)]"
            onClick={() => openViewer(index)}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3 pointer-events-none 
                           transition-opacity duration-500 ease-out group-hover:from-red-500/8 group-hover:to-purple-500/8 z-10"
            ></div>

            <div className="relative aspect-[16/9] w-full h-full">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-20" />

              <CardFooter className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="w-full">
                  <p
                    className="text-sm text-gray-200 truncate font-medium mb-1 
                      transition-all duration-500 group-hover:text-cyan-300 
                      group-hover:translate-y-[-2px]"
                  >
                    {item.title}
                  </p>

                  {item.description && (
                    <p
                      className="text-xs text-gray-400 truncate 
                        transition-all duration-500 group-hover:text-red-300 
                        group-hover:translate-y-[-1px]"
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </CardFooter>
            </div>
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
