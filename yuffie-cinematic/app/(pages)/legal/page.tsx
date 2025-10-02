"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function LegalPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "aviso";
  const [tabValue, setTabValue] = useState(initialTab);

  useEffect(() => {
    setTabValue(initialTab);
  }, [initialTab]);

  return (
    <section className="w-full min-h-screen bg-[#131b22] text-gray-100 pt-4">
      {/* Main Container / Constrained Wrapper */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 pt-16">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500 mb-2 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                Informações Legais
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-400 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Conheça nossos termos, políticas e avisos legais para garantir uma
              experiência transparente e segura.
            </p>
          </motion.div>

          <Tabs
            value={tabValue}
            onValueChange={setTabValue}
            className="w-full space-y-8"
          >
            {/* Abas */}
            <TabsList
              className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-2xl mx-auto gap-3 h-auto p-2 
                               bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl"
            >
              <TabsTrigger
                value="aviso"
                className="text-sm sm:text-base px-4 py-3 text-gray-300 rounded-lg font-semibold 
                         transition-all duration-300 ease-out
                         hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300
                         data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700
                         data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25
                         data-[state=active]:border data-[state=active]:border-red-500/20"
              >
                Aviso Legal
              </TabsTrigger>
              <TabsTrigger
                value="privacidade"
                className="text-sm sm:text-base px-4 py-3 text-gray-300 rounded-lg font-semibold 
                         transition-all duration-300 ease-out
                         hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-300
                         data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700
                         data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25
                         data-[state=active]:border data-[state=active]:border-blue-500/20"
              >
                Política de Privacidade
              </TabsTrigger>
              <TabsTrigger
                value="termos"
                className="text-sm sm:text-base px-4 py-3 text-gray-300 rounded-lg font-semibold 
                         transition-all duration-300 ease-out
                         hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-purple-300
                         data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700
                         data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25
                         data-[state=active]:border data-[state=active]:border-purple-500/20"
              >
                Termos de Uso
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo das abas */}
            <div className="w-full mt-8">
              <TabsContent value="aviso" className="mt-0">
                <motion.div
                  className="relative bg-[#0d1118] border border-red-900/40 rounded-2xl overflow-hidden
                             transition-all duration-500 ease-out hover:border-red-800/60"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-red-500/3 pointer-events-none"></div>

                  <div className="relative z-10 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                        Aviso Legal
                      </h2>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-6"></div>

                    <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        Este site é destinado apenas para fins informativos e de
                        entretenimento. Não garantimos a precisão ou atualidade
                        das informações apresentadas.
                      </p>
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        O uso dos conteúdos é de responsabilidade exclusiva do
                        usuário. Não nos responsabilizamos por quaisquer danos
                        decorrentes do uso das informações aqui
                        disponibilizadas.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="privacidade" className="mt-0">
                <motion.div
                  className="relative bg-[#0d1118] border border-blue-900/40 rounded-2xl overflow-hidden
                             transition-all duration-500 ease-out hover:border-blue-800/60"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-blue-500/3 pointer-events-none"></div>

                  <div className="relative z-10 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-blue-500">
                        Política de Privacidade e Proteção de Dados
                      </h2>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-6"></div>

                    <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        Valorizamos sua privacidade. Nenhum dado pessoal
                        sensível é coletado sem o seu consentimento explícito.
                      </p>
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        Utilizamos cookies apenas para melhorar a experiência do
                        usuário. Você pode gerenciar suas preferências de
                        privacidade a qualquer momento.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="termos" className="mt-0">
                <motion.div
                  className="relative bg-[#0d1118] border border-purple-900/40 rounded-2xl overflow-hidden
                             transition-all duration-500 ease-out hover:border-purple-800/60"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-purple-500/3 pointer-events-none"></div>

                  <div className="relative z-10 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-purple-500">
                        Termos de Uso
                      </h2>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mb-6"></div>

                    <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        Ao acessar este site, você concorda em respeitar todas
                        as leis e regulamentos aplicáveis.
                      </p>
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        É proibida a reprodução ou distribuição dos conteúdos
                        sem autorização prévia.
                      </p>
                      <p className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        Reservamo-nos o direito de modificar estes termos a
                        qualquer momento, sem aviso prévio.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
