"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      if (!isAdmin) {
        // Se não for admin, redireciona para home
        router.push("/");
        return;
      }
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  // Mostra loading enquanto verifica autenticação
  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#131b22] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
