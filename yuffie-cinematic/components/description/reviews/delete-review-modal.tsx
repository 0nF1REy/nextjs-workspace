"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeleteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteReviewModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-red-500/20 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Ícone de alerta */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full border border-red-500/20">
          <FontAwesomeIcon icon={faTrash} className="w-6 h-6 text-red-400" />
        </div>

        <h3 className="text-xl font-bold text-red-400 mb-3 text-center">
          Excluir Review
        </h3>

        <p className="text-gray-300 mb-8 text-center leading-relaxed">
          Tem certeza que deseja excluir esta review?{" "}
          <span className="text-red-300 font-medium">
            Esta ação não pode ser desfeita.
          </span>
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="px-8 py-3 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200 font-medium"
          >
            Cancelar
          </Button>
          <Button
            size="lg"
            onClick={onConfirm}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-red-500/25 transition-all duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
