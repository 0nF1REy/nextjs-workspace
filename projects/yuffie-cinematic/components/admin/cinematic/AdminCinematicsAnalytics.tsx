"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CinematicViewsBarChart } from "@/components/admin/cinematic/CinematicViewsBarChart";
import { CinematicTable } from "@/components/admin/cinematic/CinematicTable";

export function AdminCinematicsAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card className="bg-[#0d1118] border border-green-900/40">
        <CardHeader>
          <CardTitle className="text-green-400">
            Visualizações por Cinematic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CinematicViewsBarChart />
        </CardContent>
      </Card>
      <Card className="bg-[#0d1118] border border-gray-700/40">
        <CardHeader>
          <CardTitle className="text-gray-300">Tabela de Cinematics</CardTitle>
        </CardHeader>
        <CardContent>
          <CinematicTable />
        </CardContent>
      </Card>
    </div>
  );
}
