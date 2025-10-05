"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./SearchBar";
import { UserProfile } from "./user-profile";

export function HeaderComponent() {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-3">
          <Link href="/">
            <motion.div
              className="group relative w-[55px] h-[55px]"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Partículas circulares */}
              {[...Array(8)].map((_, i) => {
                const angle = i * 45 * (Math.PI / 180);
                const radius = 35;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-500 rounded-full 
                             opacity-0 scale-0
                             group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-300 ease-out"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 1, 0.4],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                );
              })}

              {/* Anel externo */}
              <motion.div
                className="absolute rounded-full border border-red-500/20
                         opacity-0 scale-0
                         group-hover:opacity-100 group-hover:scale-100
                         transition-all duration-500 ease-out"
                style={{
                  width: "70px",
                  height: "70px",
                  left: "-7.5px",
                  top: "-7.5px",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />

              {/* Anel interno */}
              <motion.div
                className="absolute rounded-full border border-red-400/30
                         opacity-0 scale-0
                         group-hover:opacity-100 group-hover:scale-100
                         transition-all duration-700 ease-out delay-100"
                style={{
                  width: "65px",
                  height: "65px",
                  left: "-5px",
                  top: "-5px",
                }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative z-10"
                whileHover={{
                  rotate: [0, 8, -5, 3, 0],
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                  },
                }}
              >
                <Image
                  src="/assets/images/brand/yuffie-cinematic-isotipo.png"
                  alt="Yuffie's Cinematic Icon"
                  width={55}
                  height={55}
                  priority
                  className="drop-shadow-lg transition-all duration-500 group-hover:drop-shadow-2xl group-hover:brightness-110"
                />
              </motion.div>
            </motion.div>
          </Link>

          {/* Logotipo */}
          <div className="hidden md:block mt-3">
            <Link href="/">
              <motion.div
                className="group relative inline-block"
                whileHover={{
                  scale: 1.05,
                  x: 5,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Linha inferior */}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 group-hover:w-16 -translate-x-1/2 origin-center
             h-2 transition-all duration-700 ease-out"
                  style={{
                    backgroundImage:
                      "radial-gradient(currentColor 50%, transparent 50%)",
                    backgroundSize: "8px 8px",
                    backgroundRepeat: "repeat-x",
                    color: "#ef4444",
                  }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{
                    y: [0, -2, 0],
                    transition: {
                      duration: 1.2,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Image
                    src="/assets/images/brand/yuffie-cinematic-logotipo-01.png"
                    alt="Yuffie's Cinematic Logo"
                    width={192}
                    height={24}
                    className="object-contain 
                             transition-all duration-500 ease-out
                             group-hover:drop-shadow-lg 
                             group-hover:brightness-110
                             group-hover:contrast-105"
                  />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <DesktopNav />
          <div className="flex items-center gap-4 ml-50">
            <SearchBar />
            <UserProfile />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <SearchBar />
          <UserProfile />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
