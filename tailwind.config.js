/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
            primary: "#F59E0B",
            "background-light": "#F3F4F6",
            "background-dark": "#111827",
            "surface-light": "#FFFFFF",
            "surface-dark": "#1F2937",
            "text-light": "#1F2937",
            "text-dark": "#E5E7EB",
            "text-secondary-light": "#6B7280",
            "text-secondary-dark": "#9CA3AF",
            "border-light": "#E5E7EB",
            "border-dark": "#374151",
          },
          fontFamily: {
            sans: ["Inter", "sans-serif"],
          },
          borderRadius: {
            DEFAULT: "0.5rem",
            lg: "1rem",
          },
    },
  },
  plugins: [],
}

