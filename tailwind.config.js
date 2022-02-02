module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        PottaOne: ['Potta One']
      },
      colors: {
        primary: "#65D8A5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
