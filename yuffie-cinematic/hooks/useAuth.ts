"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

    // Escuta mudanças no sessionStorage
    const handleStorageChange = () => {
      checkAuthState();
    };

    // Adiciona listener para mudanças no sessionStorage
    window.addEventListener("storage", handleStorageChange);

    // Custom event para mudanças locais no sessionStorage
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("authenticated-user");
    setUser(null);
    // Dispara evento customizado para notificar outros componentes
    window.dispatchEvent(new Event("auth-change"));
    router.push("/auth/login");
  };

  const login = (userData: AuthUser) => {
    sessionStorage.setItem("authenticated-user", JSON.stringify(userData));
    setUser(userData);
    // Dispara evento customizado para notificar outros componentes
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
