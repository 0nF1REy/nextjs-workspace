"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LegalPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "aviso";
  const [tabValue, setTabValue] = useState(initialTab);

  useEffect(() => {
    setTabValue(initialTab);
  }, [initialTab]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:py-12 min-h-screen">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6 sm:mb-8">
        Informações Legais
      </h1>

      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full mb-6 h-auto sm:h-10">
          <TabsTrigger
            value="aviso"
            className="text-xs sm:text-sm px-2 py-3 sm:py-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Aviso Legal
          </TabsTrigger>
          <TabsTrigger
            value="privacidade"
            className="text-xs sm:text-sm px-2 py-3 sm:py-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Política de Privacidade
          </TabsTrigger>
          <TabsTrigger
            value="termos"
            className="text-xs sm:text-sm px-2 py-3 sm:py-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Termos de Uso
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="aviso"
          className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
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
          </div>
        </TabsContent>

        <TabsContent
          value="privacidade"
          className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Política de Privacidade e Proteção de Dados
            </h2>
            <p>
              Valorizamos sua privacidade. Nenhum dado pessoal sensível é
              coletado sem o seu consentimento explícito.
            </p>
            <p>
              Utilizamos cookies apenas para melhorar a experiência do usuário.
              Você pode gerenciar suas preferências de privacidade a qualquer
              momento.
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="termos"
          className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
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
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
