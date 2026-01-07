"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NotFoundPageProps {
  message?: string;
}

export default function NotFoundPage({ message }: NotFoundPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayMessage =
    message || "Parece que você se aventurou no reino digital desconhecido.";

  return (
    <main className="bg-[#131b22] text-gray-200 min-h-screen flex flex-col pt-4">
      {/* Main Container / Constrained Wrapper */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="flex-grow flex items-center justify-center px-6 py-12 md:px-12">
          <div className="w-full max-w-2xl mx-auto">
            <motion.div
              className="relative bg-[#0d1118] border border-red-900/40 rounded-2xl overflow-hidden p-8 md:p-12
                         shadow-2xl transition-all duration-700 ease-out
                         hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(239,68,68,0.1)]
                         hover:border-red-800/60
                         hover:scale-[1.01]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none 
                             transition-opacity duration-700 ease-out hover:from-red-500/8 hover:to-purple-500/8"
              ></div>

              <div className="relative z-10 text-center space-y-8">
                {/* Ícone e Número 404 */}
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                    </div>
                  </div>

                  <motion.h1
                    className="text-6xl md:text-8xl font-extrabold text-red-500 tracking-tight"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    404
                  </motion.h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-400 rounded-full mx-auto"></div>
                </div>

                {/* Título e Mensagem */}
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200">
                    Página Não Encontrada
                  </h2>

                  <motion.div
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                      {displayMessage}
                    </p>
                  </motion.div>
                </div>

                {/* Botão de Voltar */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="pt-4"
                >
                  <Link href="/">
                    <button
                      className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 text-lg font-semibold
                               bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                               text-white rounded-xl shadow-lg transition-all duration-300 
                               hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] 
                               border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Voltar ao site
                    </button>
                  </Link>
                </motion.div>

                {/* Informações adicionais */}
                <motion.div
                  className="pt-6 border-t border-gray-700/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <p className="text-gray-400 text-sm">
                    Se você acredita que isso é um erro, entre em contato
                    conosco ou tente acessar novamente mais tarde.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
