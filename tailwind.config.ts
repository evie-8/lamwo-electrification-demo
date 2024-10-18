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
        'fade-in-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(1000px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-1000px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-selected': {
          '0%': { boxShadow: '0px 0px 0px 0px rgba(91, 211, 219, 0.897)' },
          '100%': { boxShadow: '0px 0px 0px 20px rgba(0, 0, 0, 0)' },
        },
      },
      animation: {
        extendandshrink: 'scaling 2.5s ease-in-out infinite',
        'fade-in-bottom': 'fade-in-bottom 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both',
        'fade-in': 'fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-in-left': 'slide-in-left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'pulse-selected': 'pulse-selected 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
