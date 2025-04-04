/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|gray)-\d00/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Agave Nerd Font", "sans-serif"],
      },
    },
  },
  plugins: [],
};
