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
        "primary-light-blue": "#2176FF",
        "primary-dark-blue": "#00072D",

        "secondary-light-blue": "#3B82F6", //blue-500
        "secondary-medium-blue": "#1D4ED8", //blue-700
        "secondary-dark-blue": "#172554", //blue-950

        "light-white": "#FFFFFF",

        "light-gray": "#D1D5DB", //gray-300
        "medium-gray": "#9CA3AF", //gray-400

        "medium-red": "#DC2626", //red-600
        "dark-red": "#B91C1C",  //red-700

        "medium-green": "#22C55E", //green-500
        "dark-green": "#15803D",  //green-700
      },
    },
  },
  plugins: [],
};
export default config;
