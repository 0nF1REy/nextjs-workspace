"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores";
import type { User } from "@/lib/user/types";

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
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha no login");
      }

      const userData: User = await response.json();
      setUser(userData);

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