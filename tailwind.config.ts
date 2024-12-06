import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "logo-white":
          "url('https://imcgmbh.s3.eu-central-1.amazonaws.com/logo-imc-standard-white.svg')",
      },
      colors: {
        foreground: "#364f73",
        secondary: "#e9393e",
        orange: "#ff4637",
      },
    },
  },
  plugins: [],
};
export default config;
