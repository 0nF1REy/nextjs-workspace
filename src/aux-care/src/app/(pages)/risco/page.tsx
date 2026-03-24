"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
};

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function RiscoPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3"
        >
          Entenda os fatores de risco
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 mb-10 leading-relaxed"
        >
          Explore os fatores correlacionados que podem aumentar o risco do uso
          de Crack. Aperte em cada elemento do mapa de risco e saiba mais sobre
          seus impactos.
        </motion.p>

        <motion.div
          variants={gridContainerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 },
            }}
            className="overflow-hidden rounded-lg shadow-sm bg-white"
          >
            <div className="relative w-full h-40">
              <Image
                src="/assets/images/community.png"
                alt="Community Support"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 },
            }}
            className="overflow-hidden rounded-lg shadow-sm bg-white"
          >
            <div className="relative w-full h-40">
              <Image
                src="/assets/images/avatar.png"
                alt="Saúde Mental"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 },
            }}
            className="overflow-hidden rounded-lg shadow-sm bg-white"
          >
            <div className="relative w-full h-40">
              <Image
                src="/assets/images/person.png"
                alt="Trauma"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 },
            }}
            className="overflow-hidden rounded-lg shadow-sm bg-white"
          >
            <div className="relative w-full h-40">
              <Image
                src="/assets/images/plants.png"
                alt="Ambiente"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          Fatores de risco detalhados
        </motion.h2>
        <motion.div variants={gridContainerVariants} className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-3">
            <motion.div variants={itemVariants}>
              <AccordionItem value="social">
                <AccordionTrigger className="bg-gray-100 rounded-md px-4 text-base text-gray-900">
                  Vulnerabilidade Social
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 pb-4 rounded-md text-base text-gray-600">
                  A vulnerabilidade Social engloba fatores como a pobreza, falta
                  de acesso à educação e o desemprego, e o isolamento social, o
                  que pode aumentar o risco do uso de substâncias como válvula
                  de escape.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AccordionItem value="mental">
                <AccordionTrigger className="bg-gray-100 rounded-md px-4 text-base text-gray-900">
                  Desafios à Saúde Mental
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 pb-4 rounded-md text-base text-gray-600">
                  Condições como ansiedade, depressão e outros transtornos
                  mentais podem contribuir para a busca de substâncias como
                  forma de automedicação ou alívio.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AccordionItem value="trauma">
                <AccordionTrigger className="bg-gray-100 rounded-md px-4 text-base text-gray-900">
                  Trauma
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 pb-4 rounded-md text-base text-gray-600">
                  Experiências traumáticas na infância ou vida adulta podem
                  aumentar a vulnerabilidade ao uso problemático de substâncias.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AccordionItem value="ambiente">
                <AccordionTrigger className="bg-gray-100 rounded-md px-4 text-base text-gray-900">
                  Fatores Relacionados ao Ambiente
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 pb-4 rounded-md text-base text-gray-600">
                  A exposição a ambientes onde o uso de drogas é comum, a falta
                  de apoio comunitário e influência de pares podem facilitar o
                  início e a manutenção do uso.
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </div>
    </motion.div>
  );
}
