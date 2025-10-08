"use client";

import { AdminCinematicsHeader } from "@/components/admin/cinematic/AdminCinematicsHeader";
import { AdminCinematicsQuickActions } from "@/components/admin/cinematic/AdminCinematicsQuickActions";
import { AdminCinematicsAnalytics } from "@/components/admin/cinematic/AdminCinematicsAnalytics";
import { AdminCinematicsRecentActivity } from "@/components/admin/cinematic/AdminCinematicsRecentActivity";

export default function AdminCinematicsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminCinematicsHeader />
      <AdminCinematicsQuickActions />
      <AdminCinematicsAnalytics />
      <AdminCinematicsRecentActivity />
    </div>
  );
}
