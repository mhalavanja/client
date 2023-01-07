/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,ts,svelte}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.blue,
      yellow: colors.yellow,
      red: colors.red,
    },

    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
  darkMode: "class",
};
