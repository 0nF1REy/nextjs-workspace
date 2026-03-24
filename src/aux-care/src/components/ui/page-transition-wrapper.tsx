"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

const layerVariants: Variants = {
  initial: (i: number) => ({
    y: "0%",
    rotate: -4 + i * 2,
  }),
  animate: (i: number) => ({
    y: "-110%",
    rotate: -4 + i * 2,
    transition: {
      duration: 0.9,
      ease: [0.85, 0, 0.15, 1],
      delay: 0.12 * i,
    },
  }),
  exit: (i: number) => ({
    y: "0%",
    rotate: -4 + i * 2,
    transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] },
  }),
};

const contentVariants: Variants = {
  initial: { opacity: 0.98, scale: 0.995 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.45 },
  },
  exit: { opacity: 0.9, scale: 0.995, transition: { duration: 0.25 } },
};

const flashVariant: Variants = {
  initial: { scale: 0, opacity: 0.1 },
  animate: {
    scale: 18,
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.18 },
  },
};

export function PageTransitionWrapper({
  children,
}: PageTransitionWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="relative"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div variants={contentVariants} className="relative z-10">
          {children}
        </motion.div>

        <motion.span
          variants={flashVariant}
          initial="initial"
          animate="animate"
          className="fixed z-40 left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        />

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={layerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed left-0 top-0 w-[120%] h-screen z-30`}
            style={{
              transformOrigin: "left",
              transform: `skewY(${-6 + i * 2}deg)`,
              background:
                i === 0
                  ? "linear-gradient(120deg,#0ea5e9 0%, #0369a1 100%)"
                  : i === 1
                  ? "linear-gradient(120deg,#7c3aed 0%, #4f46e5 100%)"
                  : "linear-gradient(120deg,#06b6d4 0%, #0891b2 100%)",
              left: i === 1 ? "-6%" : i === 2 ? "-10%" : "-2%",
              opacity: 0.98,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
