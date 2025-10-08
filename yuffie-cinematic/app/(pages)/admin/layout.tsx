"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminRoute } from "@/components/AdminRoute";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      if (isSidebarOpen) {
        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        return scrollY;
      } else {
        const body = document.body;
        const scrollY = body.style.top;

        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        body.style.overflow = "";

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      }
    };

    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      handleBodyScroll();
    }

    return () => {
      const body = document.body;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: faHome,
      label: "Dashboard",
    },
    {
      href: "/admin/cinematic",
      icon: faClapperboard,
      label: "Cinematics",
    },
    {
      href: "/admin/users",
      icon: faUsers,
      label: "Usuários",
    },
    {
      href: "/admin/analytics",
      icon: faChartLine,
      label: "Analytics",
    },
    {
      href: "/admin/settings",
      icon: faCog,
      label: "Configurações",
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin";
    }
    return pathname.startsWith(href);
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
          "fixed top-0 left-0 z-50 h-full bg-[#0d1118] border-r border-red-900/40 transform transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="relative p-4 border-b border-red-900/40 h-20">
          {/* Logo Container */}
          <div className="flex items-center justify-center h-full">
            <div className="hidden lg:flex items-center justify-center w-full">
              {!isCollapsed ? (
                // Logo FULL desktop
                <Image
                  src="/assets/images/brand/yuffie-cinematic-logotipo-01.png"
                  alt="Yuffie Cinematic"
                  width={200}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              ) : (
                // Logo MINI desktop
                <Image
                  src="/assets/images/brand/yuffie-cinematic-isotipo.png"
                  alt="Yuffie"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  priority
                />
              )}
            </div>

            <div className="flex lg:hidden items-center justify-center w-full pr-12">
              <Image
                src="/assets/images/brand/yuffie-cinematic-logotipo-01.png"
                alt="Yuffie Cinematic"
                width={200}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white hover:bg-red-900/20 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </Button>

          {/* Desktop collapse button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={cn(
              "hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0d1118] border border-red-900/40 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors",
              "items-center justify-center cursor-pointer"
            )}
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faChevronRight : faChevronLeft}
              className="w-3 h-3"
            />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                "hover:bg-red-900/20 hover:scale-105",
                isActiveRoute(item.href)
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30"
                  : "text-gray-300 hover:text-white"
              )}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActiveRoute(item.href)
                    ? "text-white"
                    : "text-red-400 group-hover:text-red-300",
                  isCollapsed ? "mx-auto" : ""
                )}
              />

              {!isCollapsed && (
                <span className="font-medium transition-all duration-200">
                  {item.label}
                </span>
              )}

              {/* Tooltip para modo colapsado */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-red-900/40 space-y-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={cn(
              "w-full border-red-500/50 text-red-300 hover:bg-red-600/20 hover:border-red-400/70 transition-all duration-200 cursor-pointer",
              isCollapsed ? "px-0" : "justify-start"
            )}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className={cn("w-4 h-4", !isCollapsed && "mr-3")}
            />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#131b22]/95 backdrop-blur-md border-b border-red-900/40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden text-gray-400 hover:text-white hover:bg-red-900/20 transition-colors"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-100">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Gerencie seu conteúdo cinematográfico
                </p>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">
                admin@dominio.com.br
              </span>
              <div className="relative">
                <Image
                  src="https://i.pravatar.cc/300?u=AdminSite"
                  alt="Foto de perfil do admin"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shadow-lg"
                  priority
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#131b22]"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-89px)] p-6">
          <AdminRoute>{children}</AdminRoute>
        </main>
      </div>
    </div>
  );
}
