import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   fontFamily: {
    'pretendard': ['Pretendard Variable']
   },
   colors: {
    positive: '#60a5fa',
    negative: '#fb7185',
    warning: '#fbbf24',
    success: '#4ade80',
    primary: '#1e3a8a',
    disabled: '#d4d4d4',
    emphasized: '#fef9c3',
   },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
