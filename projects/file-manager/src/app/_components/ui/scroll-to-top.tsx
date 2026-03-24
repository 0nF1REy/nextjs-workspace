"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 300,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        bg-[#2563eb] hover:bg-[#1d4ed8]
        text-white
        rounded-full p-3 shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
        active:scale-95
        backdrop-blur-sm
        ${className}
      `}
      aria-label="Scroll to top"
      title="Voltar ao topo"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
};
