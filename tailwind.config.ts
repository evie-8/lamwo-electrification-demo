import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sunbird-navy-blue": "#282850",
        "sunbird-orange": "#FFAA28",
        "highlight-blue": "#2258AA"
      },
      keyframes: {
        scaling: {
          '0%, 100%': {
            transform: 'scale(0.2)',
            backgroundColor: '#282850',
          },
          '40%': {
            transform: 'scale(1)',
            backgroundColor: '#2258AA',
          },
          '50%': {
            transform: 'scale(1)',
            backgroundColor: '#2258AA',
          },
        },
      },
      animation: {
        extendandshrink: 'scaling 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
