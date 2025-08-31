"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTh,
  FaFlag,
  FaPen,
} from "react-icons/fa";

interface MediaViewerProps {
  images: {
    id: string;
    title: string;
    src: string;
    description?: string;
    people?: string[];
    photoCredit?: string;
    sourceLink?: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

export default function MediaViewer({
  images,
  isOpen,
  onClose,
  startIndex = 0,
}: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (isOpen) setCurrentIndex(startIndex);
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-center px-4 text-white text-lg">
        <div className="w-full max-w-5xl flex justify-between items-center">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="hover:text-red-500 flex items-center gap-2 text-base"
          >
            <FaTimes /> Fechar
          </button>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-yellow-400">
              {currentIndex + 1} de {images.length}
            </span>
            <FaTh className="cursor-pointer hover:text-white" />
            <FaShareAlt className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col">
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="object-contain max-h-[80vh] rounded-lg shadow-lg mx-auto"
          />

          {/* Info Section */}
          <div className="bg-black/70 text-gray-200 p-4 text-sm flex justify-between items-start rounded-t-lg mt-4">
            <div>
              {currentImage.description && (
                <p className="text-blue-400 mt-1">{currentImage.description}</p>
              )}

              {currentImage.title && (
                <p className="mt-1">
                  <span className="font-semibold">Título: </span>
                  <span className="text-yellow-300">{currentImage.title}</span>
                </p>
              )}

              {currentImage.people && currentImage.people.length > 0 && (
                <p className="mt-2">
                  <span className="font-semibold">Pessoas: </span>
                  <span className="text-yellow-300">
                    {currentImage.people.join(", ")}
                  </span>
                </p>
              )}

              {currentImage.photoCredit && (
                <p className="text-xs text-gray-400 mt-2">
                  {currentImage.photoCredit}{" "}
                  {currentImage.sourceLink && (
                    <a
                      href={currentImage.sourceLink}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {currentImage.sourceLink}
                    </a>
                  )}
                </p>
              )}
            </div>

            {/* Ícones */}
            <div className="flex flex-col gap-4 text-gray-400">
              <FaPen
                className="cursor-pointer hover:text-white"
                title="Editar etiquetas"
              />
              <FaFlag
                className="cursor-pointer hover:text-white"
                title="Denunciar imagem"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botões de navegação */}
      <button
        onClick={prevImage}
        aria-label="Imagem anterior"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black text-white text-2xl"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextImage}
        aria-label="Próxima imagem"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black text-white text-2xl"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
