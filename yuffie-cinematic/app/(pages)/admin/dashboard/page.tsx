"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faUser,
  faHome,
  faClapperboard,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { ClientOnly } from "@/components/client-only";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboardPage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100">
      {/* Fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Main Container / Constrained Wrapper */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex items-center justify-center">
        <Card className="relative w-full max-w-2xl bg-[#0d1118] border border-green-900/40 shadow-2xl rounded-2xl overflow-hidden">
          {/* Gradiente de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

          <CardHeader className="text-center space-y-6 pt-12 pb-8 relative z-10">
            {/* Ícone de sucesso */}
            <div className="flex justify-center">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-6xl text-green-500 animate-pulse"
                />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Mensagem de boas-vindas */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-green-500 tracking-tight">
                Bem-vindo, Admin!
              </h1>
              <p className="text-xl text-gray-300 font-medium">
                Login realizado com sucesso
              </p>
              <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                Você agora tem acesso completo ao painel administrativo do
                <span className="text-red-400 font-semibold">
                  {" "}
                  Yuffie Cinematic
                </span>
              </p>
            </div>

            {/* Logotipo da marca */}
            <div className="flex justify-center pt-4">
              <Image
                src="/assets/images/brand/yuffie-cinematic-isotipo.png"
                alt="Yuffie Cinematic"
                width={80}
                height={80}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-8 pb-12 relative z-10">
            {/* Informações de acesso */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-green-400 text-xl"
                />
                <h3 className="text-lg font-semibold text-green-400">
                  Informações de Acesso
                </h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="text-gray-400">E-mail:</span>{" "}
                  admin@dominio.com.br
                </p>
                <p>
                  <span className="text-gray-400">Nível:</span> Administrador
                </p>
                <p>
                  <span className="text-gray-400">Última atividade:</span>{" "}
                  <ClientOnly fallback="--/--/----, --:--:--">
                    {new Date().toLocaleString("pt-BR")}
                  </ClientOnly>
                </p>
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full h-16 bg-gray-800/50 border-gray-600/50 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon icon={faHome} className="text-blue-400" />
                    <span className="text-sm">Ir para Home</span>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/movies">
                <Button
                  variant="outline"
                  className="w-full h-16 bg-gray-800/50 border-gray-600/50 hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon
                      icon={faClapperboard}
                      className="text-red-400"
                    />
                    <span className="text-sm">Gerenciar Filmes</span>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/analytics">
                <Button
                  variant="outline"
                  className="w-full h-16 bg-gray-800/50 border-gray-600/50 hover:bg-yellow-600/20 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="text-yellow-400"
                    />
                    <span className="text-sm">Analytics</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Botão de Sair */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:border-red-400/70 hover:text-red-200 transition-all duration-300"
              >
                Fazer Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
