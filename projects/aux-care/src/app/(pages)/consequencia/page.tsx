"use client";

import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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

const data = [
  { region: "Brasil", value: 1.5 },
  { region: "América do Sul", value: 1.3 },
  { region: "Mundo", value: 1.1 },
];

export default function ConsequenciaPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen mt-16 gap-8 px-4 pb-15"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Consequências do Uso de Crack
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 leading-relaxed"
        >
          O uso de crack traz consequências sérias para a saúde física e mental,
          além de impactos sociais e financeiros. Abaixo resumimos as principais
          categorias e apresentamos um gráfico ilustrativo sobre prevalência.
        </motion.p>

        <motion.section variants={itemVariants} className="w-full space-y-4">
          <h2 className="text-xl font-semibold">Saúde Física</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            O uso prolongado pode prejudicar os sistemas cardiovascular,
            respiratório e neurológico — aumentando o risco de arritmias,
            doenças pulmonares e danos cerebrais a longo prazo.
          </p>

          <h2 className="text-xl font-semibold">Saúde Mental</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            O uso está associado a depressão, ansiedade, psicose e outros
            transtornos; a dependência altera a química cerebral e pode causar
            comportamentos compulsivos e desregulação emocional.
          </p>

          <h2 className="text-xl font-semibold">
            Impactos Sociais e Financeiros
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Isolamento social, perda de emprego e maior exposição a situações de
            risco são comuns. O ônus financeiro do uso pode levar a dívidas e
            perda de bens.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Estatísticas (ilustrativas)
          </h2>
          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Card className="border rounded-xl">
              <CardHeader>
                <CardTitle>Prevalência do uso de crack</CardTitle>
                <CardDescription>
                  2025{" "}
                  <span className="text-emerald-600 font-medium">+0.2%</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barSize={40}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="region" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}%`}
                      domain={[0, 2]}
                      width={40}
                    />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "Prevalência"]}
                      labelFormatter={(label) => `Região: ${label}`}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "0.5rem",
                        border: "1px solid #e5e7eb",
                      }}
                      cursor={{ fill: "rgba(124, 58, 237, 0.06)" }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                      fill="#7c3aed"
                      animationDuration={800}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>

              <CardFooter className="text-sm text-muted-foreground">
                Valores ilustrativos para fins de layout.
              </CardFooter>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
