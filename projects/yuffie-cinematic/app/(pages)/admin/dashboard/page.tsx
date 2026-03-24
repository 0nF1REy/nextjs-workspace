"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { WelcomeHeader } from "@/components/admin/dashboard/WelcomeHeader";
import { AccessInfo } from "@/components/admin/dashboard/AccessInfo";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { StatsCards } from "@/components/admin/dashboard/StatsCards";

const adminData = {
  email: "admin@dominio.com.br",
  level: "Administrador",
  lastActivity: new Date(),
};

export default function AdminDashboardPage() {
  const {} = useAuth();

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20"></div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 p-6 space-y-6">
        <div className="grid gap-8 w-full max-w-screen-2xl mx-auto">
          <Card className="relative w-full bg-[#0d1118] border border-green-900/40 shadow-2xl rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            <CardHeader>
              <WelcomeHeader />
            </CardHeader>
            <CardContent className="space-y-8 pb-12 relative z-10">
              <AccessInfo
                email={adminData.email}
                level={adminData.level}
                lastActivity={adminData.lastActivity}
              />
            </CardContent>
          </Card>
          <StatsCards />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
