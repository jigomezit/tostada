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
        guitar: {
          dark: "#3A2E1F",
          medium: "#8B6F47",
          black: "#1A1A1A",
          gold: "#D4AF37",
          cream: "#F5F5DC",
        },
      },
    },
  },
  plugins: [],
};
export default config;

