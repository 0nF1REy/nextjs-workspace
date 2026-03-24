"use client";

import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
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
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function TratamentoPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900"
        >
          Opções de Tratamento para Dependência de Crack
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 text-lg text-gray-700 leading-relaxed"
        >
          Explore as diversas abordagens terapêuticas disponíveis para superar a
          dependência de crack e iniciar sua jornada de recuperação.
        </motion.p>

        <motion.section variants={itemVariants} className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Terapias Comportamentais
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            As terapias comportamentais são fundamentais no tratamento da
            dependência de crack, ajudando os indivíduos a identificar e
            modificar comportamentos e pensamentos relacionados ao uso da droga.
            A Terapia Cognitivo-Comportamental (TCC) é uma das abordagens mais
            eficazes, focando em desenvolver habilidades de enfrentamento e
            prevenção de recaídas. A Terapia de Contingência, que utiliza
            recompensas para reforçar comportamentos positivos, também se mostra
            promissora. Além disso, a Entrevista Motivacional pode ser empregada
            para aumentar a motivação do paciente para a mudança.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Medicamentos
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Embora não existam medicamentos específicos aprovados para o
            tratamento da dependência de crack, alguns medicamentos podem ser
            utilizados para tratar comorbidades, como depressão e ansiedade, que
            frequentemente acompanham o uso de crack. Além disso, pesquisas
            estão em andamento para desenvolver medicamentos que possam reduzir
            os desejos e sintomas de abstinência associados ao crack.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Grupos de Apoio
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Os grupos de apoio, como os Narcóticos Anônimos (NA), oferecem um
            ambiente de suporte e compreensão mútuos, onde os indivíduos podem
            compartilhar suas experiências e desafios na recuperação. A
            participação em grupos de apoio pode ajudar a reduzir o isolamento
            social e fornecer um senso de comunidade, o que é crucial para a
            manutenção da sobriedade.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Centros de Tratamento
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Os centros de tratamento oferecem uma variedade de serviços,
            incluindo desintoxicação, terapia individual e em grupo, suporte
            médico e acompanhamento pós-tratamento. ao escolher um centro de
            tratamento, é importante considerar a abordagem terapêutica
            utilizada, a qualificação da equipe, a duração do tratamento e o
            suporte oferecido à família. A busca por um centro de tratamento
            adequado é um passo crucial na jornada de recuperação.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Como Procurar Ajuda Profissional
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Procurar ajuda profissional é um sinal de força e o primeiro passo
            para a recuperação. É possível buscar ajuda em clínicas
            especializadas, hospitais, centros de atenção psicossocial (CAPS) e
            através de profissionais de saúde mental, como psicólogos e
            psiquiatras. Não hesite em entrar em contato com um profissional ou
            centro de tratamento para obter orientação e iniciar o processo de
            recuperação.
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="flex justify-start">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md cursor-pointer"
          >
            Encontre Ajuda
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
