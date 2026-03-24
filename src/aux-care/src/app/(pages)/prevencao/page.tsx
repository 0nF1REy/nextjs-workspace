"use client";

import { motion, Variants } from "framer-motion";
import { InfoCard } from "@/components/prevencao/contentCard/contentCard";
import {
  IoBookOutline,
  IoPeopleOutline,
  IoHeartOutline,
  IoFitnessOutline,
  IoHomeOutline,
  IoCheckmarkDoneOutline,
  IoShieldCheckmarkOutline,
  IoHappyOutline,
  IoGlobeOutline,
  IoKeyOutline,
  IoPeopleCircleOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function PrevencaoPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-8 items-start">
        <motion.header
          variants={itemVariants}
          className="text-center sm:text-left w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Prevenção do Uso de Crack
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            A prevenção do uso de crack é crucial para proteger indivíduos,
            famílias e comunidades dos seus impactos devastadores. Estratégias
            eficazes fortalecem fatores de proteção e reduzem fatores de risco.
          </p>
        </motion.header>

        <motion.section variants={itemVariants} className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
            Para Indivíduos
          </h2>
          <motion.div
            variants={gridContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoBookOutline />}
                title="Educação e Conscientização"
                description="Informar-se sobre os riscos do crack é o primeiro passo para prevenção."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoPeopleOutline />}
                title="Apoio Social"
                description="Relações saudáveis oferecem suporte emocional e reduzem o isolamento."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoHeartOutline />}
                title="Saúde Mental"
                description="Cuidar da saúde mental, buscando ajuda profissional quando necessário."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoFitnessOutline />}
                title="Estilo de Vida Saudável"
                description="Praticar atividades físicas e hobbies ajuda a manter equilíbrio e bem-estar."
                gradientText={true}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants} className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
            Para Famílias
          </h2>
          <motion.div
            variants={gridContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoHomeOutline />}
                title="Comunicação Aberta"
                description="Crie um ambiente confortável para discutir questões relacionadas ao uso de substâncias."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoCheckmarkDoneOutline />}
                title="Estabelecer Limites"
                description="Definir regras claras e consistentes sobre o uso de drogas e álcool."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoShieldCheckmarkOutline />}
                title="Ambiente Seguro"
                description="Garantir um lar livre de drogas e álcool, promovendo segurança e apoio."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoHappyOutline />}
                title="Participação Familiar"
                description="Envolver-se em atividades familiares que promovam união e bem-estar."
                gradientText={true}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants} className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
            Para Comunidades
          </h2>
          <motion.div
            variants={gridContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoGlobeOutline />}
                title="Programas de Prevenção"
                description="Implementar programas educativos e preventivos em escolas e centros comunitários."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoKeyOutline />}
                title="Acesso a Serviços"
                description="Facilitar o acesso a serviços de saúde mental e tratamento para dependência."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoPeopleCircleOutline />}
                title="Redes de Apoio"
                description="Criar e fortalecer redes de apoio para indivíduos e famílias afetadas pelo uso de crack."
                gradientText={true}
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <InfoCard
                icon={<IoVolumeHighOutline />}
                title="Campanhas de Conscientização"
                description="Realizar campanhas informativas para aumentar a conscientização sobre os riscos do crack."
                gradientText={true}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.footer variants={itemVariants} className="w-full">
          <p className="text-gray-700 text-lg sm:text-lg leading-relaxed text-center sm:text-left">
            A prevenção é um esforço contínuo que requer o envolvimento de
            todos. Fortalecendo fatores de proteção e reduzindo fatores de
            risco, podemos construir comunidades mais saudáveis e resilientes.
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
}
