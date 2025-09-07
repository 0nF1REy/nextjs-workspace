"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faCalendar,
  faEye,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { getUserById } from "@/lib/user";
import { UserProfile } from "@/lib/user/types";
import NotFoundPage from "@/app/not-found";

// Componentes dinâmicos para dados do lado client
const DynamicUserStats = dynamic(
  () => import("@/components/profile/user-stats"),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-gray-800 animate-pulse">
            <CardContent className="p-4">
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
  }
);

const DynamicUserFavorites = dynamic(
  () => import("@/components/profile/user-favorites"),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 animate-pulse rounded-lg h-64"
          ></div>
        ))}
      </div>
    ),
  }
);

const DynamicUserReviews = dynamic(
  () => import("@/components/profile/user-reviews"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 animate-pulse rounded-lg h-32"
          ></div>
        ))}
      </div>
    ),
  }
);

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProfilePage({ params }: PageProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;

      // Buscar usuário pelo ID
      const foundUser = getUserById(resolvedParams.id);
      setUser(foundUser || null);
      setLoading(false);
    };

    getParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user) {
    return <NotFoundPage message="Usuário não encontrado." />;
  }

  const memberSince = new Date(user.joinDate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100 px-4 py-8">
      {/* Header do Perfil */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-red-500/30">
                  <Image
                    src={
                      user.avatar ||
                      `https://i.pravatar.cc/300?u=${user.username}`
                    }
                    alt={`Avatar de ${user.username}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-red-500 mb-2">
                    {user.username}
                  </h1>
                  {user.displayName && (
                    <p className="text-xl text-gray-300 mb-2">
                      {user.displayName}
                    </p>
                  )}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                    <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                    <span>Membro desde {memberSince}</span>
                  </div>
                </div>

                {user.bio && (
                  <p className="text-gray-300 leading-relaxed max-w-2xl">
                    {user.bio}
                  </p>
                )}

                {/* Gêneros Favoritos */}
                {user.favoriteGenres && user.favoriteGenres.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                      Gêneros Favoritos
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {user.favoriteGenres.map((genre: string) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-sm text-red-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status de Assistir */}
                {user.watchingStatus && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="w-6 h-6 text-blue-400 mb-2"
                      />
                      <p className="text-lg font-bold text-blue-300">
                        {user.watchingStatus.watching}
                      </p>
                      <p className="text-xs text-gray-400 uppercase">
                        Assistindo
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="w-6 h-6 text-green-400 mb-2"
                      />
                      <p className="text-lg font-bold text-green-300">
                        {user.watchingStatus.completed}
                      </p>
                      <p className="text-xs text-gray-400 uppercase">
                        Completos
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="w-6 h-6 text-purple-400 mb-2"
                      />
                      <p className="text-lg font-bold text-purple-300">
                        {user.watchingStatus.planToWatch}
                      </p>
                      <p className="text-xs text-gray-400 uppercase">
                        Para Assistir
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-gray-800 animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                    <div className="h-8 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <DynamicUserStats userId={user.id} />
        </Suspense>

        {/* Conteúdo em Abas */}
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-6 bg-gray-800">
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <FontAwesomeIcon icon={faHeart} className="w-4 h-4 mr-2" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <FontAwesomeIcon icon={faStar} className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="ratings"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <FontAwesomeIcon icon={faStar} className="w-4 h-4 mr-2" />
              Avaliações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40">
              <CardHeader>
                <CardTitle className="text-red-500">
                  Favoritos de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DynamicUserFavorites userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40">
              <CardHeader>
                <CardTitle className="text-red-500">
                  Reviews de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DynamicUserReviews userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40">
              <CardHeader>
                <CardTitle className="text-red-500">
                  Avaliações de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center py-8">
                  Seção de avaliações em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botão Voltar */}
        <div className="flex justify-center mt-8">
          <Link href="/">
            <Button variant="secondary" size="lg" className="hover:bg-red-600">
              ← Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
