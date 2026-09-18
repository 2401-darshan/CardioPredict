/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#f5f7f6",
          dark: "#0a0e14",
        },
        surface: {
          light: "#ffffff",
          dark: "#111722",
        },
        line: {
          light: "#e3e7e5",
          dark: "#1f2733",
        },
        ink: {
          light: "#0b1015",
          dark: "#e9edf1",
        },
        muted: {
          light: "#5c6a68",
          dark: "#8a97a3",
        },
        brand: {
          50: "#eafff6",
          100: "#c9ffe9",
          200: "#8ffdd4",
          300: "#4ff2bd",
          400: "#22dba5",
          500: "#0fbb8c",
          600: "#0a9873",
          700: "#0a795e",
          800: "#0b604c",
          900: "#0a4e40",
        },
        clinicalRed: "#e5484d",
        clinicalAmber: "#f0a83c",
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
