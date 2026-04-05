/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.css",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        primary: "#6366F1",
        secondary: "#22C55E",
        danger: "#EF4444",
        background: "#0F172A",
        card: "#1E293B",
        text: "#E2E8F0",
        glass: "rgba(255,255,255,0.05)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};