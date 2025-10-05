"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface UseConditionalRedirectOptions {
  redirectAdminTo?: string;
  redirectUnauthenticatedTo?: string;
  requireAuth?: boolean;
}

export function useConditionalRedirect({
  redirectAdminTo,
  redirectUnauthenticatedTo,
  requireAuth = false,
}: UseConditionalRedirectOptions) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Se requer autenticação e usuário não está logado
      if (requireAuth && !isAuthenticated && redirectUnauthenticatedTo) {
        router.push(redirectUnauthenticatedTo);
        return;
      }

      // Se é admin e deve ser redirecionado
      if (isAdmin && redirectAdminTo) {
        router.push(redirectAdminTo);
        return;
      }
    }
  }, [
    loading,
    isAuthenticated,
    isAdmin,
    router,
    redirectAdminTo,
    redirectUnauthenticatedTo,
    requireAuth,
  ]);

  return {
    loading,
    isAuthenticated,
    isAdmin,
    shouldRender:
      !loading &&
      (!requireAuth || isAuthenticated) &&
      (!redirectAdminTo || !isAdmin),
  };
}
