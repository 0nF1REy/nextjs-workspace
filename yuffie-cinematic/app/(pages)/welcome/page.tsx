"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/stores";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const currentUser = useUserStore((state) => state.currentUser);
  const username =
    currentUser?.displayName || currentUser?.username || "Cinéfilo";

  return (
    <div className="min-h-screen w-full bg-[#131b22] text-gray-100 pt-4">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center"
        >
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
            <span className="block">Seja Bem-vindo,</span>
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              {username}!
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
            Sua jornada pelo universo cinematográfico começa agora. Explore
            nosso catálogo, descubra novas obras e compartilhe suas paixões.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-red-500/50 bg-red-500/10 text-red-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-500 hover:bg-red-500/20 hover:text-white"
              )}
            >
              Explorar o Catálogo
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/newsletter"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40"
              )}
            >
              Assinar a Newsletter
              <FontAwesomeIcon icon={faEnvelope} className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Torne-se um Apoiador
            </h2>
            <p className="mt-3 text-gray-400">
              Seu apoio nos ajuda a manter e expandir o Yuffie Cinematic.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-black/40 p-8 text-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="h-6 w-6 text-purple-400"
                />
              </div>
              <h3 className="text-xl font-semibold text-purple-300">
                Apoiador Mensal
              </h3>
              <p className="mt-2 text-gray-400">
                Acesso a recursos exclusivos, emblema de perfil e nosso eterno
                agradecimento.
              </p>
              <Link
                href="/apoie"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-6 border-purple-500/50 bg-purple-500/10 text-purple-300 transition-all duration-300 hover:scale-105 hover:border-purple-500 hover:bg-purple-500/20 hover:text-white"
                )}
              >
                Saber Mais
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-black/40 p-8 text-center transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-6 w-6 text-yellow-400"
                />
              </div>
              <h3 className="text-xl font-semibold text-yellow-300">
                Doação Única
              </h3>
              <p className="mt-2 text-gray-400">
                Contribua com qualquer valor para nos ajudar a cobrir os custos
                de manutenção.
              </p>
              <Link
                href="/apoie"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-6 border-yellow-500/50 bg-yellow-500/10 text-yellow-300 transition-all duration-300 hover:scale-105 hover:border-yellow-500 hover:bg-yellow-500/20 hover:text-white"
                )}
              >
                Fazer uma Doação
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
