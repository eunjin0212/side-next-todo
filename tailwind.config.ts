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
    extend: {
      colors: {
        positive: '#60a5fa',
        negative: '#fb7185',
        warning: '#fbbf24',
        success: '#4ade80',
        primary: '#1e3a8a',
        disabled: '#d4d4d4',
        emphasized: '#fef9c3',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        shake: 'shake 2s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
