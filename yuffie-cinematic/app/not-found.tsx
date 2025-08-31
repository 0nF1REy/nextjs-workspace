"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NotFoundPageProps {
  message?: string;
  searchParams?: { message?: string };
}

export default function NotFoundPage({
  message,
  searchParams,
}: NotFoundPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayMessage =
    message ||
    searchParams?.message ||
    "Parece que você se aventurou no reino digital desconhecido.";

  return (
    <main className="bg-[#0d0d0d] text-gray-200 min-h-screen flex flex-col">
      <section className="flex-grow flex items-center justify-center px-6 py-12 md:px-12">
        <div className="text-center space-y-6">
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold text-red-500"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            404
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {displayMessage}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-red-500 px-8 py-3 text-lg font-semibold text-gray-50 shadow-lg transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              prefetch={false}
            >
              Voltar ao site
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
