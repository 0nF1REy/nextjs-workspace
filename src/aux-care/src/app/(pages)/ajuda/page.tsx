"use client";

import { Phone, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function AjudaPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
        >
          Obtenha ajuda agora
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 mb-10 leading-relaxed"
        >
          Se você ou alguém que você conhece está lutando contra o vício de
          crack, não hesite em procurar ajuda. Existem muitos recursos
          disponíveis para ajudá-lo a se recuperar e levar uma vida saudável e
          feliz.
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          Linhas de apoio e emergência
        </motion.h2>
        <motion.div variants={itemVariants} className="space-y-4 mb-10 w-full">
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px -5px rgba(0,0,0,0.1)",
            }}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm gap-4"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2 rounded-lg bg-gray-100">
                <Phone className="w-6 h-6 text-gray-700" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900">
                  Linha de Apoio Nacional ao Uso de Substâncias
                </p>
                <p className="text-base text-gray-600">
                  Disponível 24 horas por dia, 7 dias por semana
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              Ligar
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px -5px rgba(0,0,0,0.1)",
            }}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm gap-4"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2 rounded-lg bg-gray-100">
                <Phone className="w-6 h-6 text-gray-700" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900">
                  Linha de Apoio à Crise
                </p>
                <p className="text-base text-gray-600">
                  Disponível 24 horas por dia, 7 dias por semana
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              Ligar
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          Serviços de aconselhamento online
        </motion.h2>
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 20px -5px rgba(0,0,0,0.1)",
          }}
          className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm mb-10 gap-4 w-full"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 rounded-lg bg-gray-100">
              <Globe className="w-6 h-6 text-gray-700" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900">Aconselhamento Online</p>
              <p className="text-base text-gray-600">
                Conecte-se com um conselheiro licenciado de qualquer lugar
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Visitar
          </motion.button>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          Encontre ajuda profissional na sua área
        </motion.h2>
        <motion.div variants={itemVariants} className="space-y-3 w-full">
          <input
            type="text"
            placeholder="Digite seu código postal"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            Pesquisar
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
