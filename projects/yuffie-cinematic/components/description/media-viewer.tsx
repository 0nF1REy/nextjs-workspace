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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col"
      onClick={handleBackdropClick}
    >
      {/* Conteúdo central */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4"
        onClick={handleBackdropClick}
      >
        {/* Top Bar */}
        <div
          className="flex justify-center px-4 py-3 bg-black/60 backdrop-blur-sm text-white text-lg sticky top-0 z-50 w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-between items-center">
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="hover:text-red-500 flex items-center gap-2 text-base transition-colors duration-200"
            >
              <FaTimes /> Fechar
            </button>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-yellow-400">
                {currentIndex + 1} de {images.length}
              </span>
              <FaTh className="cursor-pointer hover:text-white transition-colors duration-200 hover:scale-110" />
              <FaShareAlt className="cursor-pointer hover:text-white transition-colors duration-200 hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Imagem principal */}
        <div
          className="w-full max-w-5xl flex flex-col mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="object-contain max-h-[70vh] w-auto rounded-lg shadow-2xl mx-auto"
          />

          {/* Info Section */}
          <div className="bg-black/60 backdrop-blur-sm text-gray-200 p-4 rounded-lg mt-4 flex justify-between items-start gap-6">
            <div className="flex-1 space-y-1">
              {currentImage.description && (
                <p className="text-blue-400">{currentImage.description}</p>
              )}
              {currentImage.title && (
                <p>
                  <span className="font-semibold">Título: </span>
                  <span className="text-yellow-400">{currentImage.title}</span>
                </p>
              )}
              {currentImage.people && currentImage.people.length > 0 && (
                <p>
                  <span className="font-semibold">Pessoas: </span>
                  <span className="text-red-400">
                    {currentImage.people.join(", ")}
                  </span>
                </p>
              )}
              {currentImage.photoCredit && (
                <p className="text-xs text-gray-400">
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
                className="cursor-pointer hover:text-white transition-colors duration-200 hover:scale-110"
                title="Editar etiquetas"
              />
              <FaFlag
                className="cursor-pointer hover:text-white transition-colors duration-200 hover:scale-110"
                title="Denunciar imagem"
              />
            </div>
          </div>
        </div>

        {/* Navegação */}
        <button
          onClick={prevImage}
          aria-label="Imagem anterior"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black p-3 rounded-full text-white text-2xl shadow-lg transition-transform duration-200 hover:scale-110"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextImage}
          aria-label="Próxima imagem"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black p-3 rounded-full text-white text-2xl shadow-lg transition-transform duration-200 hover:scale-110"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
