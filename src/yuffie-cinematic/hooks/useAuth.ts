"use client";

import { useRouter } from "next/navigation";
import {
  useUserStore,
  useFavoritesStore,
  useRatingsStore,
  useReviewsStore,
} from "@/stores";
import type { User } from "@/lib/user/types";
import { RegisterForm } from "@/lib/validations/register";

async function fetchUserData() {
  try {
    const res = await fetch("/api/user/data");
    if (res.ok) {
      const data = await res.json();
      useFavoritesStore.getState().setFavorites(data.favorites || []);
      useRatingsStore.getState().setRatings(data.ratings || {});
      useReviewsStore.getState().setLikes(data.likedReviewIds || []);
    }
  } catch {}
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
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha no login");
    }

    const userData: User = await response.json();
    setUser(userData);
    await fetchUserData();

    if (userData.userType === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  };

  const registerAndLogin = async (data: RegisterForm) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Ocorreu um erro no registro.");
    }

    setUser(result);
    await fetchUserData();

    router.push("/welcome");
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
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
    registerAndLogin,
    logout,
    isAuthenticated,
    isAdmin,
  };
}
