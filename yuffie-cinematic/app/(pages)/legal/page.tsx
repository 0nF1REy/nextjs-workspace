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
    <section className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-3xl font-bold text-center text-red-600 mb-8"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Informações Legais
        </motion.h1>

        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          {/* Abas */}
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full mb-6 gap-2 justify-center">
            <TabsTrigger
              value="aviso"
              className="text-sm sm:text-base px-2 py-2 text-gray-300 rounded-lg font-semibold hover:bg-red-800 hover:text-white transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Aviso Legal
            </TabsTrigger>
            <TabsTrigger
              value="privacidade"
              className="text-sm sm:text-base px-2 py-2 text-gray-300 rounded-lg font-semibold hover:bg-red-800 hover:text-white transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Política de Privacidade
            </TabsTrigger>
            <TabsTrigger
              value="termos"
              className="text-sm sm:text-base px-2 py-2 text-gray-300 rounded-lg font-semibold hover:bg-red-800 hover:text-white transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Termos de Uso
            </TabsTrigger>
          </TabsList>

          {/* Conteúdo das abas */}
          <TabsContent value="aviso">
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed bg-[#111] p-6 rounded-xl border border-gray-800 shadow-lg"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-red-500 border-b border-gray-700 pb-2">
                Aviso Legal
              </h2>
              <p>
                Este site é destinado apenas para fins informativos e de
                entretenimento. Não garantimos a precisão ou atualidade das
                informações apresentadas.
              </p>
              <p>
                O uso dos conteúdos é de responsabilidade exclusiva do usuário.
                Não nos responsabilizamos por quaisquer danos decorrentes do uso
                das informações aqui disponibilizadas.
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacidade">
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed bg-[#111] p-6 rounded-xl border border-gray-800 shadow-lg"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-red-500 border-b border-gray-700 pb-2">
                Política de Privacidade e Proteção de Dados
              </h2>
              <p>
                Valorizamos sua privacidade. Nenhum dado pessoal sensível é
                coletado sem o seu consentimento explícito.
              </p>
              <p>
                Utilizamos cookies apenas para melhorar a experiência do
                usuário. Você pode gerenciar suas preferências de privacidade a
                qualquer momento.
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="termos">
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed bg-[#111] p-6 rounded-xl border border-gray-800 shadow-lg"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-red-500 border-b border-gray-700 pb-2">
                Termos de Uso
              </h2>
              <p>
                Ao acessar este site, você concorda em respeitar todas as leis e
                regulamentos aplicáveis.
              </p>
              <p>
                É proibida a reprodução ou distribuição dos conteúdos sem
                autorização prévia.
              </p>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer
                momento, sem aviso prévio.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
