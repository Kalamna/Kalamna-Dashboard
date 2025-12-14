/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ADD THIS LINE
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
