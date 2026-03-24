import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFAF0",
        foreground: "#41444B",
        primary: "#D2691E",
        "primary-hover": "#B85A1A",
        accent: "#DAA520",
        "accent-hover": "#C0901A",
      },
      fontFamily: {
        sans: ["Merriweather", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
