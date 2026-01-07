"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ReviewActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  showActions?: boolean;
}

export function ReviewActions({
  onEdit,
  onDelete,
  showActions = true,
}: ReviewActionsProps) {
  if (!showActions) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="text-yellow-400 border-yellow-400 hover:bg-yellow-100/10 p-2"
        onClick={onEdit}
        title="Editar review"
      >
        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-red-400 border-red-400 hover:bg-red-100/10 p-2"
        onClick={onDelete}
        title="Excluir review"
      >
        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
      </Button>
    </div>
  );
}
