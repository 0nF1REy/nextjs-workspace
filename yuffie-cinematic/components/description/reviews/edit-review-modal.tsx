"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRatingInput } from "./star-rating-input";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, rating: number) => void;
  initialContent: string;
  initialRating: number;
}

export function EditReviewModal({
  isOpen,
  onClose,
  onSave,
  initialContent,
  initialRating,
}: EditReviewModalProps) {
  const [editContent, setEditContent] = useState(initialContent);
  const [editRating, setEditRating] = useState(initialRating);

  const handleSave = () => {
    onSave(editContent, editRating);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700">
        <h3 className="text-lg font-bold text-yellow-400 mb-4">
          Editar Review
        </h3>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-medium">
            Sua review:
          </label>
          <textarea
            className={`w-full p-3 rounded bg-gray-800 text-gray-100 border resize-none focus:outline-none transition-colors ${
              editContent.length < 15
                ? "border-red-500 focus:border-red-400"
                : "border-gray-700 focus:border-yellow-400"
            }`}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            minLength={15}
            maxLength={500}
            placeholder="Escreva sua review aqui..."
          />

          {/* Contador de caracteres e validação */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm">
              {editContent.length < 15 ? (
                <span className="text-red-400">
                  Mínimo 15 caracteres (faltam {15 - editContent.length})
                </span>
              ) : (
                <span className="text-green-400">✓ Review válida</span>
              )}
            </div>
            <div className="text-sm text-gray-400">
              {editContent.length}/500
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">
            Sua avaliação:
          </label>
          <StarRatingInput
            rating={editRating}
            onRatingChange={setEditRating}
            size="md"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="px-4"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            size="sm"
            className={`px-4 transition-all duration-200 ${
              editContent.length < 15
                ? "bg-gray-600 hover:bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-black"
            }`}
            onClick={handleSave}
            disabled={editContent.length < 15}
            title={
              editContent.length < 15
                ? "Sua review deve ter pelo menos 15 caracteres"
                : "Salvar alterações"
            }
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
