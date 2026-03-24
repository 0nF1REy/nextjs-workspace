"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import { TccSidebar } from "@/components/tcc/sidebar";
import { TccContent } from "@/components/tcc/content";
import { NavItem } from "@/components/tcc/types";
import Introduction from "@/content/tcc/introduction.mdx";
import Development from "@/content/tcc/development.mdx";
import PanoramaConsumption from "@/content/tcc/panorama-consumption.mdx";
import PersonalFactors from "@/content/tcc/personal-factors.mdx";
import SocialApproach from "@/content/tcc/social-approach.mdx";
import ClinicalApproach from "@/content/tcc/clinical-approach.mdx";
import NeurobiologicalAspects from "@/content/tcc/neurobiological-aspects.mdx";
import PsychosocialImpacts from "@/content/tcc/psychosocial-impacts.mdx";
import CareStrategies from "@/content/tcc/care-strategies.mdx";
import IntersectoralApproaches from "@/content/tcc/intersectoral-approaches.mdx";
import FutureImplications from "@/content/tcc/future-implications.mdx";
import RoleOfNursing from "@/content/tcc/role-of-nursing.mdx";
import NurseRoleCaps from "@/content/tcc/nurse-role-caps.mdx";
import HarmReduction from "@/content/tcc/harm-reduction.mdx";
import FamilyMediation from "@/content/tcc/family-mediation.mdx";
import EthicalRole from "@/content/tcc/ethical-role.mdx";
import MaterialMethods from "@/content/tcc/material-methods.mdx";
import Funding from "@/content/tcc/funding.mdx";
import ResultsDiscussion from "@/content/tcc/results-discussion.mdx";
import CriticalSynthesis from "@/content/tcc/critical-synthesis.mdx";
import FinalConsiderations from "@/content/tcc/final-considerations.mdx";
import References from "@/content/tcc/references.mdx";
import Glossary from "@/content/tcc/glossary.mdx";

const navigationItems: NavItem[] = [
  { id: "introducao", title: "INTRODUÇÃO", level: 1, numbering: "1." },
  {
    id: "desenvolvimento",
    title: "DESENVOLVIMENTO",
    level: 1,
    numbering: "2.",
  },
  {
    id: "panorama-consumo",
    title: "Panorama do consumo de crack no Brasil",
    level: 2,
    numbering: "2.1",
  },
  {
    id: "fatores-pessoais",
    title: "Fatores pessoais adversos e vulnerabilidades",
    level: 2,
    numbering: "2.2",
  },
  {
    id: "abordagem-social",
    title: "Abordagem social e contextos adversos",
    level: 3,
    numbering: "2.2.1",
  },
  {
    id: "abordagem-clinica",
    title: "Abordagem clínica e neurobiológica",
    level: 3,
    numbering: "2.2.2",
  },
  {
    id: "aspectos-neurobiologicos",
    title: "Aspectos neurobiológicos e fisiológicos",
    level: 2,
    numbering: "2.3",
  },
  {
    id: "impactos-psicossociais",
    title: "Impactos psicossociais e socioeconômicos",
    level: 2,
    numbering: "2.4",
  },
  {
    id: "estrategias-cuidado",
    title: "Estratégias de cuidado e abordagens terapêuticas",
    level: 2,
    numbering: "2.5",
  },
  {
    id: "abordagens-intersetoriais",
    title: "Abordagens intersetoriais e políticas públicas",
    level: 2,
    numbering: "2.6",
  },
  {
    id: "implicacoes-futuras",
    title: "Implicações futuras",
    level: 2,
    numbering: "2.7",
  },
  {
    id: "papel-enfermagem",
    title: "Papel da enfermagem no cuidado ao usuário de crack",
    level: 2,
    numbering: "2.8",
  },
  {
    id: "papel-enfermeiro-caps",
    title: "Papel do enfermeiro no caps-ad (acolhimento e pts)",
    level: 3,
    numbering: "2.8.1",
  },
  {
    id: "atuacao-reducao-danos",
    title: "Atuação na redução de danos",
    level: 3,
    numbering: "2.8.2",
  },
  {
    id: "mediacao-familia",
    title: "Mediação com a família (perspectiva sistêmica)",
    level: 3,
    numbering: "2.8.3",
  },
  {
    id: "papel-etico",
    title: "Papel ético e humanizado da profissão",
    level: 3,
    numbering: "2.8.4",
  },

  {
    id: "material-metodos",
    title: "MATERIAL E MÉTODOS",
    level: 1,
    numbering: "3.",
  },
  { id: "custeios", title: "CUSTEIOS", level: 1, numbering: "4." },
  {
    id: "resultados-discussao",
    title: "RESULTADOS E DISCUSSÃO",
    level: 1,
    numbering: "5.",
  },
  {
    id: "sintese-critica-dos-achados",
    title: "Síntese crítica dos achados",
    level: 2,
    numbering: "5.1",
  },
  {
    id: "consideracoes-finais",
    title: "CONSIDERAÇÕES FINAIS",
    level: 1,
    numbering: "6.",
  },
  { id: "referencias", title: "REFERÊNCIAS", level: 1, numbering: "7." },
  { id: "glossario", title: "GLOSSÁRIO", level: 1, numbering: "8." },
];

export default function TccPage() {
  const [activeId, setActiveId] = useState<string>(navigationItems[0].id);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen px-4 gap-2">
      <div className="-ml-4 sm:-ml-6 lg:-ml-50 hidden md:block">
        <TccSidebar navItems={navigationItems} activeId={activeId} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col min-h-screen w-screen max-w-none mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-15"
      >
        <TccContent
          navItems={navigationItems}
          mdxMap={{
            introducao: Introduction,
            desenvolvimento: Development,
            "panorama-consumo": PanoramaConsumption,
            "fatores-pessoais": PersonalFactors,
            "abordagem-social": SocialApproach,
            "abordagem-clinica": ClinicalApproach,
            "aspectos-neurobiologicos": NeurobiologicalAspects,
            "impactos-psicossociais": PsychosocialImpacts,
            "estrategias-cuidado": CareStrategies,
            "abordagens-intersetoriais": IntersectoralApproaches,
            "implicacoes-futuras": FutureImplications,
            "papel-enfermagem": RoleOfNursing,
            "papel-enfermeiro-caps": NurseRoleCaps,
            "atuacao-reducao-danos": HarmReduction,
            "mediacao-familia": FamilyMediation,
            "papel-etico": EthicalRole,
            "material-metodos": MaterialMethods,
            custeios: Funding,
            "resultados-discussao": ResultsDiscussion,
            "sintese-critica-dos-achados": CriticalSynthesis,
            "consideracoes-finais": FinalConsiderations,
            referencias: References,
            glossario: Glossary,
          }}
        />
      </motion.div>
    </div>
  );
}
