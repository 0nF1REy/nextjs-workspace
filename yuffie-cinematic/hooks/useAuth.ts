"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores";

interface AuthUser {
  id: string;
  email: string;
  username: string;
  userType: "admin" | "regular";
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { logout: logoutUserStore } = useUserStore();

  const checkAuthState = () => {
    try {
      const storedUser = sessionStorage.getItem("authenticated-user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário logado:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthState();
    setLoading(false);

    const handleStorageChange = () => {
      checkAuthState();
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("authenticated-user");
    setUser(null);

    logoutUserStore();

    window.dispatchEvent(new Event("auth-change"));
    router.push("/auth/login");
  };

  const login = (userData: AuthUser) => {
    sessionStorage.setItem("authenticated-user", JSON.stringify(userData));
    setUser(userData);

    window.dispatchEvent(new Event("auth-change"));
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.userType === "admin";

  return {
    user,
    loading,
    logout,
    login,
    isAuthenticated,
    isAdmin,
  };
}
