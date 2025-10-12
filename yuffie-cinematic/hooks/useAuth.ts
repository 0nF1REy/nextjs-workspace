"use client";

import { useRouter } from "next/navigation";
import {
  useUserStore,
  useFavoritesStore,
  useRatingsStore,
  useReviewsStore,
} from "@/stores";
import type { User } from "@/lib/user/types";

async function fetchUserData() {
  try {
    const res = await fetch("/api/user/data");
    if (res.ok) {
      const data = await res.json();
      useFavoritesStore.getState().setFavorites(data.favorites || []);
      useRatingsStore.getState().setRatings(data.ratings || {});
      useReviewsStore.getState().setLikes(data.likedReviewIds || []);
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

function clearUserData() {
  useFavoritesStore.getState().setFavorites([]);
  useRatingsStore.getState().setRatings({});
  useReviewsStore.getState().setLikes([]);
}

export function useAuth() {
  const router = useRouter();
  const { currentUser, setUser } = useUserStore();

  const login = async (credentials: { email: string; password?: string }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Falha no login");
      }

      const userData: User = await response.json();
      setUser(userData);
      await fetchUserData();

      if (userData.userType === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setUser(null);
      clearUserData();
      router.push("/auth/login");
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.userType === "admin";
  const loading = false;

  return {
    user: currentUser,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };
}
