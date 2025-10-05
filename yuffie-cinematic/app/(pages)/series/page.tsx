"use client";

import GenericPage from "@/components/pages/GenericPage";
import { useConditionalRedirect } from "@/hooks/useConditionalRedirect";
import { series } from "@/lib/items";

export default function SeriesPage() {
  const { shouldRender } = useConditionalRedirect({
    requireAuth: true,
    redirectUnauthenticatedTo: "/auth/login",
    redirectAdminTo: "/admin/dashboard",
  });

  if (!shouldRender) {
    return (
      <div className="min-h-screen bg-[#131b22] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return <GenericPage items={series} title="Séries" />;
}
