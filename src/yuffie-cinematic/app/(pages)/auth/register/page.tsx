"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { IMaskInput } from "react-imask";

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
  const { registerAndLogin } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    watch,
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

  const areCheckboxesChecked = watch("acceptTerms") && watch("acceptPrivacy");
  const inputClassName =
    "bg-[#131b22]/80 w-full h-11 rounded-lg border border-gray-700/50 px-4 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/50";

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20"></div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex items-center justify-center">
        <Card
          className="relative w-full max-w-2xl bg-[#0d1118] 
             border border-green-900/40 shadow-2xl rounded-2xl overflow-hidden
             transition-all duration-700 ease-out
             hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(4,120,87,0.1)]
             hover:border-green-800/60
             hover:scale-[1.01]"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium block text-gray-300"
                  >
                    Nome
                  </label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className={inputClassName}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium block text-gray-300"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className={inputClassName}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium block text-gray-300"
                >
                  Nome de Usuário
                </label>
                <Input
                  id="username"
                  {...register("username")}
                  className={inputClassName}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="cpf"
                    className="text-sm font-medium block text-gray-300"
                  >
                    CPF
                  </label>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <IMaskInput
                        mask="000.000.000-00"
                        value={field.value || ""}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="___.___.___-__"
                        className={inputClassName}
                      />
                    )}
                  />
                  {errors.cpf && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium block text-gray-300"
                  >
                    Telefone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <IMaskInput
                        mask="(00) 00000-0000"
                        value={field.value || ""}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="(__) _____-____"
                        className={inputClassName}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="birthDate"
                  className="text-sm font-medium block text-gray-300"
                >
                  Data de Nascimento
                </label>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="00/00/0000"
                      value={field.value || ""}
                      onAccept={(value) => field.onChange(value)}
                      placeholder="DD/MM/AAAA"
                      className={inputClassName}
                    />
                  )}
                />
                {errors.birthDate && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium block text-gray-300"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={inputClassName}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium block text-gray-300"
                  >
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={inputClassName}
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
                    className="text-sm font-medium block text-gray-300"
                  >
                    Confirmar Senha
                  </label>
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    {...register("passwordConfirmation")}
                    className={inputClassName}
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.passwordConfirmation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register("acceptTerms")}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-400"
                  >
                    Eu aceito os{" "}
                    <Link
                      href="/legal"
                      className="text-green-400 hover:underline"
                    >
                      Termos de Uso
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-red-400 text-xs">
                    {errors.acceptTerms.message}
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    {...register("acceptPrivacy")}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500"
                  />
                  <label
                    htmlFor="acceptPrivacy"
                    className="text-sm text-gray-400"
                  >
                    Eu li e aceito a{" "}
                    <Link
                      href="/legal"
                      className="text-green-400 hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
                {errors.acceptPrivacy && (
                  <p className="text-red-400 text-xs">
                    {errors.acceptPrivacy.message}
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
                  disabled={isSubmitting || !areCheckboxesChecked}
                  className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      "w-full bg-gray-800/50 hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300",
                  })}
                >
                  Fazer login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
