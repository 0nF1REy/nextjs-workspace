"use client";

import { motion, Variants } from "framer-motion";
import { FiAlertCircle, FiActivity, FiHeart, FiShield } from "react-icons/fi";
import ImpactCardComponent from "@/components/homepage/impactcard/impactCard";
import { BadgeCard } from "@/components/homepage/badgecard/badgeCard";
import { DrugsCarousel } from "@/components/homepage/DrugsCarousel/DrugsCarousel";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
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
      damping: 12,
    },
  },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
          <div className="w-full flex justify-center">
            <motion.div
              className="w-full"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 15px 30px -10px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <ImpactCardComponent />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
          <h2 className="text-2xl font-semibold text-gray-800">
            Principais informações
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full items-stretch"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-full"
            >
              <BadgeCard
                title="Fatores de Risco"
                icon={<FiAlertCircle size={22} />}
                href="/risco"
                bgColor="bg-transparent"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-full"
            >
              <BadgeCard
                title="Consequências"
                icon={<FiActivity size={22} />}
                href="/consequencia"
                bgColor="bg-transparent"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-full"
            >
              <BadgeCard
                title="Opções de Tratamento"
                icon={<FiHeart size={22} />}
                href="/tratamento"
                bgColor="bg-transparent"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-full"
            >
              <BadgeCard
                title="Estratégias de Prevenção"
                icon={<FiShield size={22} />}
                href="/prevencao"
                bgColor="bg-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl">
            <DrugsCarousel />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
