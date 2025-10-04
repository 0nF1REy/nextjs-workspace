"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .email("E-mail inválido.")
    .min(10, "O e-mail deve ter no mínimo 10 caracteres."),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(25, "A senha deve ter no máximo 25 caracteres."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    if (
      data.email === "admin@dominio.com.br" &&
      data.password === "Admin@123"
    ) {
      setError("");
      // Marca como autenticado
      sessionStorage.setItem("admin-authenticated", "true");
      router.push("/welcome");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Main Container / Constrained Wrapper */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-25 min-h-screen flex items-center justify-center">
        <Card
          className="relative w-full max-w-md bg-[#0d1118] 
             border border-red-900/40 shadow-2xl rounded-2xl overflow-hidden
             transition-all duration-700 ease-out
             hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(239,68,68,0.1)]
             hover:border-red-800/60
             hover:scale-[1.02]
             hover:bg-[#0f141d]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none transition-opacity duration-700 ease-out hover:from-red-500/8 hover:to-purple-500/8"></div>

          <CardHeader className="text-center space-y-4 pt-8 pb-6 relative z-10">
            {/* Isotipo */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="group relative inline-block transform transition-all duration-500 ease-in-out 
                   hover:scale-108 hover:rotate-2 cursor-pointer
                   hover:drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]
                   active:scale-95 active:rotate-0"
              >
                <div
                  className="relative z-10 transition-all duration-500 ease-in-out
                     group-hover:brightness-115 group-hover:contrast-110
                     group-hover:saturate-130"
                >
                  <Image
                    src="/assets/images/brand/yuffie-cinematic-isotipo.png"
                    alt="Yuffie Cinematic Isótipo"
                    width={100}
                    height={100}
                    className="drop-shadow-lg transition-all duration-500 ease-in-out
                       group-hover:drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                    priority
                  />
                </div>

                {/* Partículas de brilho */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2
                     opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-200"
                >
                  <div className="w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                </div>
                <div
                  className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1
                     opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-300"
                >
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <div
                  className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2
                     opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-400"
                >
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </Link>
            </div>

            {/* Label */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-red-500 tracking-tight">
                Yuffie&apos;s Cinematic
              </h1>
              <p className="text-sm text-gray-400 font-medium">
                Faça login para acessar sua conta
              </p>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <CardContent className="px-8 pb-6 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="px-8 pb-8 pt-2">
              <div className="w-full space-y-4">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] border border-red-500/20"
                >
                  Entrar na Plataforma
                </Button>

                <div className="text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                    Voltar para a página inicial
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
