"use client";

import { motion } from "framer-motion";
import styles from "./page-footer.module.scss";

export function PageFooter() {
  return (
    <motion.footer
      className={styles.footerVintage}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
    >
      © 2025 Alan Ryan da Silva Domingues - Todos os direitos reservados
    </motion.footer>
  );
}
