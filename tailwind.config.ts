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
    },
  },
  plugins: [],
};
export default config;
