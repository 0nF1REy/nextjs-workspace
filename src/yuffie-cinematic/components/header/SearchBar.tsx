"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { movies, series, animes } from "@/lib/items";
import type { Item } from "@/lib/items/types";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const allItems: Item[] = useMemo(() => [...movies, ...series, ...animes], []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = allItems
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
    setSuggestions(filtered);
  }, [query, allItems]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  function handleSelect(item: Item) {
    setQuery("");
    setFocused(false);
    setMobileSearchOpen(false);
    router.push(`/details/${item.id}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (suggestions.length > 0 && (focused || mobileSearchOpen)) {
      handleSelect(suggestions[0]);
    } else if (query.trim()) {
      router.push(`/movies?query=${encodeURIComponent(query)}`);
      setFocused(false);
      setMobileSearchOpen(false);
    }
  }

  function openMobileSearch() {
    setMobileSearchOpen(true);
  }

  function closeMobileSearch() {
    setMobileSearchOpen(false);
    setQuery("");
    setSuggestions([]);
  }

  return (
    <>
      {/* Desktop Search */}
      <form
        className="relative hidden md:block w-96"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Buscar filmes, animes ou séries..."
            className="bg-gray-800 text-white border-gray-700 w-full"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                       shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:shadow-xl
                       border border-red-400/30 hover:border-red-300/50
                       transition-all duration-300 ease-out hover:scale-105 active:scale-95
                       backdrop-blur-sm cursor-pointer group relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                       before:via-white/10 before:to-transparent before:translate-x-[-100%] 
                       hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          >
            <FontAwesomeIcon 
              icon={faSearch} 
              className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 relative z-10" 
            />
          </Button>
        </div>
        <AnimatePresence>
          {focused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-full mt-2 w-full z-50"
            >
              <Card className="bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                <ul>
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-800 rounded-xl transition"
                      onClick={() => handleSelect(item)}
                    >
                      <div className="relative w-10 h-14 flex-shrink-0">
                        <Image
                          src={item.poster}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md border border-gray-700"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">
                          {item.title}
                        </span>
                        <span className="text-gray-400 text-xs capitalize">
                          {item.type === "serie"
                            ? "Série"
                            : item.type === "movie"
                            ? "Filme"
                            : "Anime"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Mobile Search */}
      <Button
        onClick={openMobileSearch}
        size="icon"
        className="md:hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                   shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:shadow-xl
                   border border-red-400/30 hover:border-red-300/50
                   transition-all duration-300 ease-out hover:scale-105 active:scale-95
                   backdrop-blur-sm cursor-pointer group relative overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                   before:via-white/10 before:to-transparent before:translate-x-[-100%] 
                   hover:before:translate-x-[100%] before:transition-transform before:duration-700"
      >
        <FontAwesomeIcon 
          icon={faSearch} 
          className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 relative z-10" 
        />
      </Button>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 md:hidden"
            onClick={closeMobileSearch}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    ref={mobileInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar filmes ou séries..."
                    className="bg-gray-800 text-white border-gray-700 flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                               shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:shadow-xl
                               border border-red-400/30 hover:border-red-300/50
                               transition-all duration-300 ease-out hover:scale-105 active:scale-95
                               backdrop-blur-sm cursor-pointer group relative overflow-hidden
                               before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                               before:via-white/10 before:to-transparent before:translate-x-[-100%] 
                               hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                  >
                    <FontAwesomeIcon 
                      icon={faSearch} 
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 relative z-10" 
                    />
                  </Button>
                  <Button
                    type="button"
                    onClick={closeMobileSearch}
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Mobile Suggestions */}
              {suggestions.length > 0 && (
                <Card className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                  <ul>
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="relative w-10 h-14 flex-shrink-0">
                          <Image
                            src={item.poster}
                            alt={item.title}
                            fill
                            className="object-cover rounded-md border border-gray-600"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-semibold">
                            {item.title}
                          </span>
                          <span className="text-gray-400 text-xs capitalize">
                            {item.type === "serie"
                              ? "Série"
                              : item.type === "movie"
                              ? "Filme"
                              : "Anime"}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
