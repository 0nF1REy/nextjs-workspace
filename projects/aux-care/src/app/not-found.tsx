"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <motion.div variants={itemVariants}>
              <Image
                src="/assets/images/404.png"
                width={96}
                height={96}
                alt="Ilustração de página não encontrada"
                priority
                className="mb-4"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTitle className="text-8xl font-extrabold tracking-tighter md:text-9xl">
                404
              </CardTitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardDescription className="text-lg">
                Página Não Encontrada
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-muted-foreground">
                Oops! A página que você está procurando não existe ou foi
                movida.
              </p>
            </motion.div>
          </CardContent>
          <CardFooter>
            <motion.div variants={itemVariants} className="w-full">
              <Button asChild className="w-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para a Página Inicial
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
