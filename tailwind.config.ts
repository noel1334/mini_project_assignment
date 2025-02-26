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
      },
      fontFamily: { 
        'geist': ['Geist', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;