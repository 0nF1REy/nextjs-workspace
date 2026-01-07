"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "@/stores";
import { UserProfile } from "@/lib/user/types";

const profileEditSchema = z.object({
  displayName: z
    .string()
    .min(3, "Nome de exibição deve ter pelo menos 3 caracteres")
    .max(50, "Nome de exibição deve ter no máximo 50 caracteres"),
  bio: z
    .string()
    .max(300, "Biografia deve ter no máximo 300 caracteres")
    .optional()
    .or(z.literal("")),
});

type ProfileEditForm = z.infer<typeof profileEditSchema>;

interface UseProfileEditOptions {
  user: UserProfile | null;
  isOwnProfile: boolean;
  onSuccess?: () => void;
}

interface UseProfileEditReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  showSuccessMessage: boolean;

  form: ReturnType<typeof useForm<ProfileEditForm>>;
  handleSubmit: () => void;
}

export function useProfileEdit({
  user,
  isOwnProfile,
  onSuccess,
}: UseProfileEditOptions): UseProfileEditReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { updateUser } = useUserStore();

  const form = useForm<ProfileEditForm>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      displayName: "",
      bio: "",
    },
  });

  const openModal = () => {
    if (user && isOwnProfile) {
      form.reset({
        displayName: user.displayName || "",
        bio: user.bio || "",
      });
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = async (data: ProfileEditForm) => {
    try {
      const zustandUser = useUserStore.getState().currentUser;
      if (!zustandUser || !user || zustandUser.id !== user.id) {
        console.error("Usuário não autorizado para editar este perfil");
        return;
      }

      updateUser({
        displayName: data.displayName,
        bio: data.bio || undefined,
      });

      if (typeof window !== "undefined") {
        try {
          const authUser = sessionStorage.getItem("authenticated-user");
          if (authUser) {
            const parsedUser = JSON.parse(authUser);
            const updatedUser = {
              ...parsedUser,
              displayName: data.displayName,
            };
            sessionStorage.setItem(
              "authenticated-user",
              JSON.stringify(updatedUser)
            );

            window.dispatchEvent(new Event("auth-change"));
          }
        } catch (error) {
          console.error("Erro ao atualizar sessionStorage:", error);
        }
      }

      closeModal();

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    showSuccessMessage,
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}

export { profileEditSchema };
export type { ProfileEditForm };
