/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF0F5",
          100: "#FFE0EC",
          200: "#FFC2D9",
          300: "#FF9EC4",
          400: "#FF6FA5",
          500: "#FF3D88",
          600: "#E91E63",
          700: "#C2185B",
          800: "#880E4F",
          900: "#560027"
        },
        pixel: {
          cream: "#FFF8F0",
          brown: "#8B5E3C",
          dark: "#2D1B2E",
          gold: "#FFD700",
          mint: "#A8E6CF",
          coral: "#FF8B94"
        }
      },
      fontFamily: {
        pixel: ["VT323", "monospace"],
        body: ["VT323", "monospace"],
        display: ["Pixelify Sans", "monospace"]
      }
    }
  },
  plugins: []
};
