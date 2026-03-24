"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LegalContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "aviso";
  const [tabValue, setTabValue] = useState(initialTab);

  useEffect(() => {
    setTabValue(initialTab);
  }, [initialTab]);

  return (
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
            Este site foi desenvolvido em 2025 pelos estudantes do curso técnico
            em enfermagem da escola Etec Dr. Demétrio Azevedo Jr., vinculada à
            instituição Centro Paula Souza, como parte do projeto acadêmico de
            Trabalho de Conclusão de Curso (TCC), e não se configura como
            produto comercial. As informações apresentadas têm caráter
            exclusivamente educacional e não substituem orientações
            profissionais ou legais.
          </p>
          <p>
            O uso deste site é de inteira responsabilidade do usuário. A equipe
            desenvolvedora não se responsabiliza por quaisquer danos, diretos ou
            indiretos, decorrentes de sua utilização.
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
            Este site não realiza coleta, armazenamento ou compartilhamento de
            dados pessoais de seus usuários.
          </p>
          <p>
            Este site tem caráter exclusivamente informativo e educacional,
            apresentando dados e conteúdos relacionados à dependência do crack e
            estratégias de abordagem em saúde. Nenhuma informação pessoal dos
            visitantes é coletada ou armazenada, e não há manipulação de dados
            sensíveis de pacientes ou usuários. As informações exibidas são
            baseadas em fontes públicas ou fictícias para fins de demonstração e
            estudo, garantindo total segurança e privacidade. O acesso ao site é
            livre, e todos os dados apresentados destinam-se unicamente à
            compreensão de conceitos, visualização de gráficos e apoio a
            projetos educativos, sem prestação direta de serviços de saúde. Esta
            abordagem assegura que o site siga práticas responsáveis de
            divulgação de informações, promovendo transparência e segurança aos
            usuários.
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
            O acesso e a utilização deste site acadêmico destinam-se
            exclusivamente a fins de demonstração no âmbito do Trabalho de
            Conclusão de Curso (TCC).
          </p>
          <p>
            É expressamente vedada a reprodução, cópia ou utilização do conteúdo
            para fins comerciais.
          </p>
          <p>
            Ao navegar neste site, o usuário reconhece que o conteúdo tem
            caráter acadêmico e educacional, podendo incluir informações
            baseadas em dados ou práticas reais, mas não substitui orientações
            profissionais, legais ou serviços especializados.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
