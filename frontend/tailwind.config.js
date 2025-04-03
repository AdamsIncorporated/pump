/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Consolas", "sans-serif"],
      },
    },
  },
  plugins: [],
  mode: "jit", // Ensure JIT mode is enabled
  purge: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/assets/index.html"],
};
