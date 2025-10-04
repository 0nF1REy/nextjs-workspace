"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faComments,
  faCalendar,
  faArrowLeft,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useProfile } from "@/hooks/useProfile";
import { useProfileEdit } from "@/hooks/useProfileEdit";
import NotFoundPage from "@/app/not-found";

// Componentes dinâmicos para dados do lado client
const DynamicUserStats = dynamic(
  () => import("@/components/profile/user-stats"),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i} className="bg-gray-800 animate-pulse">
            <CardContent className="p-4">
              <div className="h-6 bg-gray-700 rounded mb-2" />
              <div className="h-8 bg-gray-700 rounded" />
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
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="bg-gray-800 animate-pulse rounded-lg aspect-[3/4]"
          />
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
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-gray-800 animate-pulse rounded-lg h-32" />
        ))}
      </div>
    ),
  }
);

const DynamicUserRatings = dynamic(
  () => import("@/components/profile/user-ratings"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-12">
        <p className="text-gray-400">Carregando avaliações...</p>
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
  const [userId, setUserId] = useState<string>("");

  // Hooks customizados
  const { user, loading, error, isOwnProfile, refetch } = useProfile({
    userId,
  });
  const {
    isOpen: editModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
    showSuccessMessage,
    form,
    handleSubmit,
  } = useProfileEdit({
    user,
    isOwnProfile,
    onSuccess: refetch,
  });

  // Obter parâmetros da URL
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // Estados de carregamento e erro
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#131b22] text-gray-100 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500" />
      </div>
    );
  }

  if (error || !user) {
    return <NotFoundPage message="Usuário não encontrado." />;
  }

  const memberSince = new Date(user.joinDate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 pt-10 scrollbar-cinema">
      {/* Header do Perfil */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card
          className="relative bg-[#0d1118] border border-red-900/40 shadow-2xl rounded-2xl overflow-hidden mb-8
                       transition-all duration-700 ease-out
                       hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(239,68,68,0.1)]
                       hover:border-red-800/60
                       hover:scale-[1.01]"
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none 
                         transition-opacity duration-700 ease-out hover:from-red-500/8 hover:to-purple-500/8"
          ></div>

          <CardContent className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <div className="flex-shrink-0 md:self-center">
                <div className="relative group">
                  <div
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden 
                                border-4 border-red-500/30 shadow-2xl
                                transition-all duration-500 ease-out
                                group-hover:border-red-400/50 group-hover:scale-105
                                group-hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                  >
                    <Image
                      src={
                        user.avatar ||
                        `https://i.pravatar.cc/300?u=${user.username}`
                      }
                      alt={`Avatar de ${user.username}`}
                      fill
                      className="object-cover transition-all duration-500 ease-out
                               group-hover:brightness-110 group-hover:contrast-105"
                      priority
                    />
                  </div>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out 
                                 blur-xl -z-10"
                  ></div>
                </div>
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1 text-center md:text-left space-y-6 md:self-center">
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1
                        className="text-3xl md:text-4xl font-bold text-red-500 mb-2 
                                   tracking-tight drop-shadow-lg"
                      >
                        {user.username}
                      </h1>
                      {user.displayName && (
                        <p className="text-xl md:text-2xl text-gray-300 font-medium mb-2">
                          {user.displayName}
                        </p>
                      )}
                    </div>

                    {/* Botão Editar Perfil */}
                    {isOwnProfile && (
                      <Dialog
                        open={editModalOpen}
                        onOpenChange={(open) => !open && closeEditModal()}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={openEditModal}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                                       shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl
                                       border border-blue-400/30 hover:border-blue-300/50
                                       transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                       text-white font-medium px-4 py-2 rounded-lg
                                       flex items-center gap-2 cursor-pointer"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="w-4 h-4"
                            />
                            Editar Perfil
                          </Button>
                        </DialogTrigger>

                        <DialogContent
                          className="sm:max-w-md bg-[#0d1118] border border-gray-700/50 
                                                  [&>button[data-slot='dialog-close']]:bg-gray-800/50 
                                                  [&>button[data-slot='dialog-close']]:border 
                                                  [&>button[data-slot='dialog-close']]:border-gray-600/50 
                                                  [&>button[data-slot='dialog-close']]:text-gray-400 
                                                  [&>button[data-slot='dialog-close']]:hover:bg-red-600/20 
                                                  [&>button[data-slot='dialog-close']]:hover:border-red-500/50 
                                                  [&>button[data-slot='dialog-close']]:hover:text-red-300
                                                  [&>button[data-slot='dialog-close']]:transition-all 
                                                  [&>button[data-slot='dialog-close']]:duration-300 
                                                  [&>button[data-slot='dialog-close']]:hover:scale-110
                                                  [&>button[data-slot='dialog-close']]:hover:rotate-90
                                                  [&>button[data-slot='dialog-close']]:rounded-lg
                                                  [&>button[data-slot='dialog-close']]:backdrop-blur-sm
                                                  [&>button[data-slot='dialog-close']]:hover:shadow-lg
                                                  [&>button[data-slot='dialog-close']]:hover:shadow-red-500/20"
                        >
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-red-500 flex items-center gap-2">
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="w-5 h-5"
                              />
                              Editar Perfil
                            </DialogTitle>
                          </DialogHeader>

                          <form
                            onSubmit={handleSubmit}
                            className="space-y-4 mt-4"
                          >
                            <div className="space-y-2">
                              <Label
                                htmlFor="displayName"
                                className="text-sm font-medium text-gray-300"
                              >
                                Nome de Exibição *
                              </Label>
                              <Input
                                id="displayName"
                                {...form.register("displayName")}
                                placeholder="Digite seu nome de exibição"
                                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400
                                           focus:border-red-500/50 focus:ring-red-500/20"
                              />
                              {form.formState.errors.displayName && (
                                <p className="text-red-400 text-xs mt-1">
                                  {form.formState.errors.displayName.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="bio"
                                className="text-sm font-medium text-gray-300"
                              >
                                Biografia
                              </Label>
                              <textarea
                                id="bio"
                                {...form.register("bio")}
                                placeholder="Conte um pouco sobre você..."
                                rows={4}
                                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md
                                           text-white placeholder:text-gray-400
                                           focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20
                                           resize-none"
                              />
                              {form.formState.errors.bio && (
                                <p className="text-red-400 text-xs mt-1">
                                  {form.formState.errors.bio.message}
                                </p>
                              )}
                            </div>

                            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="group bg-gray-800/50 border-gray-600/50 text-gray-300 
                                           hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300
                                           transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                           backdrop-blur-sm rounded-lg px-4 py-2
                                           hover:shadow-lg hover:shadow-red-500/10
                                           flex items-center gap-2 cursor-pointer font-medium"
                                >
                                  <FontAwesomeIcon
                                    icon={faTimes}
                                    className="w-4 h-4 transition-all duration-300 ease-out
                                             group-hover:rotate-90 group-hover:text-red-400"
                                  />
                                  Cancelar
                                </Button>
                              </DialogClose>

                              <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                                           shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl
                                           border border-blue-400/30 hover:border-blue-300/50
                                           transition-all duration-300 ease-out hover:scale-105 active:scale-95
                                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                           cursor-pointer text-white font-medium px-4 py-2 rounded-lg
                                           flex items-center gap-2"
                              >
                                <FontAwesomeIcon
                                  icon={faSave}
                                  className={`w-4 h-4 transition-all duration-300 ease-out ${
                                    form.formState.isSubmitting
                                      ? "animate-spin"
                                      : "group-hover:scale-110 group-hover:text-red-100"
                                  }`}
                                />
                                {form.formState.isSubmitting
                                  ? "Salvando..."
                                  : "Salvar Alterações"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/30">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="w-4 h-4 text-red-400"
                      />
                      <span className="text-sm font-medium">
                        Membro desde {memberSince}
                      </span>
                    </div>
                  </div>
                </div>

                {user.bio && (
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                    <p className="text-gray-300 leading-relaxed max-w-2xl text-center md:text-left">
                      {user.bio}
                    </p>
                  </div>
                )}

                {/* Gêneros Favoritos */}
                {user.favoriteGenres && user.favoriteGenres.length > 0 && (
                  <div className="space-y-3">
                    <p
                      className="text-sm font-semibold text-red-400 uppercase tracking-wide 
                                 flex items-center justify-center md:justify-start gap-2"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Gêneros Favoritos
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {user.favoriteGenres.map((genre: string) => (
                        <span
                          key={genre}
                          className="px-3 py-2 bg-gradient-to-r from-red-600/20 to-red-500/20 
                                   border border-red-500/30 rounded-full text-sm text-red-300 
                                   font-medium backdrop-blur-sm
                                   transition-all duration-300 ease-out
                                   hover:from-red-600/30 hover:to-red-500/30 
                                   hover:border-red-400/50 hover:text-red-200
                                   hover:scale-105 hover:shadow-lg"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mensagem de Sucesso */}
        {showSuccessMessage && (
          <div className="mb-6">
            <div
              className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 
                            backdrop-blur-sm flex items-center gap-3 animate-in fade-in duration-300"
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faSave}
                  className="w-4 h-4 text-green-400"
                />
              </div>
              <div>
                <p className="text-green-300 font-medium">
                  Perfil atualizado com sucesso!
                </p>
                <p className="text-green-400/80 text-sm">
                  Suas alterações foram salvas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {Array.from({ length: 3 }, (_, i) => (
                <Card key={i} className="bg-gray-800 animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-700 rounded mb-2" />
                    <div className="h-8 bg-gray-700 rounded" />
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
          <TabsList className="grid grid-cols-3 gap-2 mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-1 h-15">
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white 
                       text-sm md:text-base transition-all duration-300 ease-out
                       hover:bg-red-500/20 rounded-lg py-2.5"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
              />
              <span className="hidden sm:inline">Favoritos</span>
              <span className="sm:hidden">Fav</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                       text-sm md:text-base transition-all duration-300 ease-out
                       hover:bg-blue-500/20 rounded-lg py-2.5"
            >
              <FontAwesomeIcon
                icon={faComments}
                className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
              />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger
              value="ratings"
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white 
                       text-sm md:text-base transition-all duration-300 ease-out
                       hover:bg-yellow-500/20 rounded-lg py-2.5"
            >
              <FontAwesomeIcon
                icon={faStar}
                className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2"
              />
              <span className="hidden sm:inline">Avaliações</span>
              <span className="sm:hidden">Aval</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <Card
              className="relative bg-[#0d1118] border border-red-900/40 rounded-2xl overflow-hidden
                           transition-all duration-500 ease-out hover:border-red-800/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-red-500/3 pointer-events-none"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-red-500 text-lg md:text-xl flex items-center gap-3 font-semibold">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                  </div>
                  Favoritos de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <DynamicUserFavorites userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card
              className="relative bg-[#0d1118] border border-blue-900/40 rounded-2xl overflow-hidden
                           transition-all duration-500 ease-out hover:border-blue-800/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-blue-500/3 pointer-events-none"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-blue-600 text-lg md:text-xl flex items-center gap-3 font-semibold">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4" />
                  </div>
                  Reviews de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <DynamicUserReviews userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings">
            <Card
              className="relative bg-[#0d1118] border border-yellow-900/40 rounded-2xl overflow-hidden
                           transition-all duration-500 ease-out hover:border-yellow-800/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-500/3 pointer-events-none"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-yellow-600 text-lg md:text-xl flex items-center gap-3 font-semibold">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                  </div>
                  Avaliações de {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <DynamicUserRatings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botão Voltar */}
        <div className="flex justify-center mt-8">
          <Link href="/">
            <Button
              variant="secondary"
              size="lg"
              className="bg-gray-800/50 hover:bg-red-600/80 border border-gray-700/30 hover:border-red-500/50
                       text-gray-300 hover:text-white transition-all duration-300 ease-out
                       backdrop-blur-sm rounded-xl px-6 py-3
                       hover:scale-105 hover:shadow-lg hover:shadow-red-500/20
                       flex items-center gap-3 font-medium"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
