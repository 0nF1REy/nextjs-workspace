"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { registerSchema, RegisterForm } from "@/lib/validations/register";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { registerAndLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    setError("");
    try {
      await registerAndLogin(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20"></div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex items-center justify-center">
        <Card
          className="relative w-full max-w-md bg-[#0d1118] 
             border border-green-900/40 shadow-2xl rounded-2xl overflow-hidden
             transition-all duration-700 ease-out
             hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(4,120,87,0.1)]
             hover:border-green-800/60
             hover:scale-[1.02]
             hover:bg-[#0f141d]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none transition-opacity duration-700 ease-out hover:from-green-500/8 hover:to-blue-500/8"></div>

          <CardHeader className="text-center space-y-4 pt-8 pb-6 relative z-10">
            <div className="flex justify-center">
              <Link href="/" className="group relative inline-block">
                <Image
                  src="/assets/images/brand/yuffie-cinematic-isotipo.png"
                  alt="Yuffie Cinematic Isótipo"
                  width={100}
                  height={100}
                  className="drop-shadow-lg transition-all duration-500 ease-in-out group-hover:scale-108 group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                  priority
                />
              </Link>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-500 tracking-tight">
                Crie sua Conta
              </h1>
              <p className="text-sm text-gray-400 font-medium">
                Junte-se à comunidade Yuffie&apos;s Cinematic
              </p>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <CardContent className="px-8 pb-6 space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className={`text-sm font-medium block transition-colors duration-200 ${
                    focusedField === "username"
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  Nome de Usuário
                </label>
                <Input
                  id="username"
                  {...register("username")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className={`text-sm font-medium block transition-colors duration-200 ${
                    focusedField === "email"
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className={`text-sm font-medium block transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="passwordConfirmation"
                  className={`text-sm font-medium block transition-colors duration-200 ${
                    focusedField === "passwordConfirmation"
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  Confirmar Senha
                </label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  {...register("passwordConfirmation")}
                  className="bg-[#131b22]/80 text-white border border-gray-700/50 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 rounded-lg h-11 px-4 placeholder:text-gray-500 backdrop-blur-sm"
                  onFocus={() => setFocusedField("passwordConfirmation")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.passwordConfirmation && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.passwordConfirmation.message}
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
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] border border-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? "Criando conta..." : "Finalizar Cadastro"}
                </Button>

                <div className="relative text-center">
                  <div className="absolute inset-0 flex items-center z-0">
                    <span className="w-full border-t border-gray-700/50"></span>
                  </div>
                  <div className="relative inline-block px-4 text-xs text-gray-400 rounded-md shadow-sm backdrop-blur-sm z-10">
                    Já tem uma conta?
                  </div>
                </div>

                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "w-full bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-300 ease-out hover:scale-105 active:scale-95",
                  })}
                >
                  Fazer login
                </Link>

                <div className="text-center pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm transition-colors duration-300"
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
