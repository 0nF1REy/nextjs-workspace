"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClapperboard,
  faChartLine,
  faUsers,
  faSignOutAlt,
  faBars,
  faTimes,
  faHome,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Verificação de autenticação
    const isAuthenticated = sessionStorage.getItem("admin-authenticated");
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authenticated");
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#131b22] text-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[#0d1118] border-r border-gray-700/50 transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-lg font-bold text-red-400">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/admin/dashboard"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            href="/admin/movies"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/admin/movies"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faClapperboard} className="w-5 h-5" />
            Filmes
          </Link>

          <Link
            href="/admin/users"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/admin/users"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
            Usuários
          </Link>

          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/admin/analytics"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
            Analytics
          </Link>

          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/admin/settings"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
            Configurações
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 space-y-2">
          <Link href="/" onClick={() => setIsSidebarOpen(false)}>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-600/50 text-gray-300 hover:bg-blue-600/20 hover:border-blue-500/50"
            >
              <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-3" />
              Voltar ao Site
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start border-red-500/50 text-red-300 hover:bg-red-600/20 hover:border-red-400/70"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#131b22]/90 backdrop-blur-sm border-b border-gray-700/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-100">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">
                admin@dominio.com.br
              </span>
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-73px)]">{children}</main>
      </div>
    </div>
  );
}
