"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .string()
    .min(10, "O e-mail deve ter no mínimo 10 caracteres.")
    .email("E-mail inválido."),
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
      router.push("/welcome");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20"></div>
      </div>

      <Card className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-red-900/40 shadow-2xl rounded-2xl backdrop-blur-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

        <CardHeader className="text-center space-y-4 pt-8 pb-6 relative z-10">
          <div className="relative inline-block">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-red-500 text-6xl drop-shadow-lg"
            />
            <div className="absolute inset-0 text-red-500 text-6xl opacity-30 blur-md">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-red-500 tracking-tight">
              Yuffie Cinematic
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] border border-red-500/20"
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
  );
}
