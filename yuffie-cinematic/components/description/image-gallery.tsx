"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import MediaViewer from "./media-viewer";

export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  description?: string;
  people?: string[];
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function ImageGallery({
  images,
  title = "Galeria de Imagens",
}: ImageGalleryProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-red-500 mb-4">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((item, index) => (
          <Card
            key={item.id}
            className="group overflow-hidden bg-black/40 border border-gray-800 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => openViewer(index)}
          >
            <div className="aspect-[16/9] relative">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:brightness-110"
              />
            </div>
            <CardFooter className="p-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <p className="text-xs text-gray-200 truncate">{item.title}</p>
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
