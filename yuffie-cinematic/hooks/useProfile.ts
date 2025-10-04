"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "@/lib/user/types";
import { useUserStore } from "@/stores";
import { getUserById } from "@/lib/user";

interface UseProfileOptions {
  userId: string;
}

interface UseProfileReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isOwnProfile: boolean;
  refetch: () => void;
}

/**
 * Hook customizado para gerenciar dados de perfil
 * Centraliza a lógica de busca e estado do perfil
 */
export function useProfile({ userId }: UseProfileOptions): UseProfileReturn {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Zustand store
  const { getCurrentUser } = useUserStore();
  const currentUser = getCurrentUser();

  // Verificar se é o próprio perfil
  const isOwnProfile = Boolean(currentUser && currentUser.id === userId);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let userData: UserProfile | null = null;

      if (isOwnProfile && currentUser) {
        // Para o usuário logado, usar dados do Zustand
        userData = {
          ...currentUser,
          favoriteGenres: ["Sci-Fi", "Crime", "Anime", "Mystery"],
        } as UserProfile;
      } else {
        // Para outros usuários, buscar dados estáticos ou API
        userData = getUserById(userId) || null;
      }

      if (!userData) {
        setError("Usuário não encontrado");
      }

      setUser(userData);
    } catch (err) {
      setError("Erro ao carregar perfil");
      console.error("Erro ao buscar usuário:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser, isOwnProfile]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return {
    user,
    loading,
    error,
    isOwnProfile,
    refetch: fetchUser,
  };
}
