/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        adminSlate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#0B1120",
        },
        adminBlue: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
          light: "#3B82F6",
          subtle: "#EFF6FF",
          accent: "#0284C7",
        },
        ngNavy: {
          DEFAULT: "#0F172A",
          dark: "#0B1120",
          light: "#1E293B",
          subtle: "#F1F5F9",
        },
        ngBlue: {
          DEFAULT: "#1D4ED8",
          dark: "#1E40AF",
          light: "#3B82F6",
          subtle: "#EFF6FF",
        },
        ngAccent: {
          coral: "#EA580C",
          gold: "#D97706",
          green: "#059669",
        }
      },
      fontFamily: {
        sans: ["'Inter'", "'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)",
        card: "0 2px 8px -1px rgba(15, 23, 42, 0.06), 0 1px 3px -1px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 8px 20px -3px rgba(15, 23, 42, 0.08)",
        modal: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
      }
    },
  },
  plugins: [],
};
